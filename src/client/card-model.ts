/**
 * Pure card/row derivation from a frozen call slice, mirroring ui-tool's
 * meta-based card models (read/search/diff/terminal/web) at the plugin
 * boundary (those models are ui-tool internals and cannot be imported
 * cross-package). Same wire contract, same defensive treatment of untrusted
 * result metadata: cards derive from the call arguments plus the persisted
 * result `meta` and single text block. A merged row renders the same surface
 * the built-in row would: a variant title/icon plus a card primitive or IN/OUT
 * text. The localized label props each primitive now requires are supplied by
 * the render site (`rows.tsx`), not here.
 * @module
 */
import type {
  ToolCallBlock, ToolResultNode,
} from '@deepseek-ai/dsh-client-ui-chat/client'
import type {
  DiffBlockProps, DiffHunk, ReadBlockProps, SearchBlockProps, SearchFileGroup,
  TerminalBlockProps, WebBlockProps,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { classifyTool, VARIANT_TITLES, TOOL_TITLES, type ToolVariant } from './tool-names.ts'

/** Row state semantic, mirroring ui-tool's ToolRowState. */
export type RowState = 'running' | 'ok' | 'error' | 'stopped'

export type { ToolVariant } from './tool-names.ts'

/** Read-card props the ReadBlock primitive draws (per-render maxLines owned by the caller). */
export type ReadCardModel = Pick<ReadBlockProps, 'label' | 'lines' | 'totalLines' | 'lang'>

type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never

/** Search-card props (the primitive's own union minus the render site's fields). */
type SearchCardModelProps = DistributiveOmit<SearchBlockProps, 'labels' | 'maxLines' | 'className'>

/** Search-card props plus the capped-result recovery locator (mirrors ui-tool). */
export interface SearchCardModel {
  readonly card: SearchCardModelProps
  readonly recovery: string | undefined
}

/** Diff-card props (mirrors ui-tool; maxLines/labels/className belong to the render site). */
export interface DiffCardModel {
  readonly card: Pick<DiffBlockProps, 'diffs'>
}

/** Terminal-card props (mirrors ui-tool; maxLines/labels/className belong to the render site). */
export interface TerminalCardModel {
  readonly card: Pick<TerminalBlockProps, 'command' | 'cwd' | 'output' | 'exitCode' | 'signal' | 'running'>
  /** The call's model-authored description shown above the card. */
  readonly description: string | undefined
}

/** Web-card props (the primitive's own union minus the render site's fields). */
export type WebCardModel = DistributiveOmit<WebBlockProps, 'labels' | 'className'>

/** A parsed, object-shaped call arguments bag (mirrors ui-tool's ParsedToolCall). */
interface ParsedArgs {
  readonly name: string
  readonly args: Record<string, unknown>
}

/**
 * Parse the call head paired with one immutable Tool block.
 * @param block - running or settled Tool block.
 * @returns the Tool name and object arguments, or null when unavailable.
 */
function parsedArgsOf(block: ToolCallBlock): ParsedArgs | null {
  const call = 'kind' in block ? block.call : block
  if (call === null) return null
  let value: unknown
  try {
    value = JSON.parse(call.argsRaw)
  } catch {
    return null
  }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null
  return { name: call.name, args: value as Record<string, unknown> }
}

/**
 * Read the exact single text block consumed by first-party card derivations.
 * @param block - settled Tool result.
 * @returns its text, or undefined for any other content layout.
 */
function singleResultText(block: ToolResultNode): string | undefined {
  if (block.content.length !== 1) return undefined
  const only = block.content[0]
  return only?.type === 'text' ? only.text : undefined
}

/** True when a settled terminal card reports a failing exit (mirrors ui-tool). */
export function terminalFailed(model: TerminalCardModel): boolean {
  const { exitCode, signal, running } = model.card
  return running !== true && ((exitCode !== undefined && exitCode !== 0) || signal !== undefined)
}

/** Everything a merged row needs, derived once from the frozen slice. */
export interface CallRowModel {
  readonly state: RowState
  readonly variant: ToolVariant
  /** Row title: variant title, or the tool-owned title when it refines one. */
  readonly title: string
  /** Args/result-derived one-line summary (path for file tools, query for searches, …). */
  readonly summary: string
  /** Expanded-body input text (pretty args); null = no input section. */
  readonly body: string | null
  /** Flattened result text; null while running or when the result carries no text. */
  readonly output: string | null
  /** First result line on an error row (the collapsed summary's error text). */
  readonly errorSummary: string | null
  /** Openable workspace path from args; absent for non-file tools and errors. */
  readonly filePath: string | undefined
  /** Whether the row has anything to expand (a card, args body, or output). */
  readonly expandable: boolean
  /** Expanded-body content cards, mutually exclusive, or null when absent. */
  readonly terminal: TerminalCardModel | null
  readonly diff: DiffCardModel | null
  readonly read: ReadCardModel | null
  readonly search: SearchCardModel | null
  readonly web: WebCardModel | null
}

/**
 * Flatten a settled result's content blocks to display text.
 * @param node - settled result node.
 * @returns joined text (may be empty).
 */
export function resultText(node: ToolResultNode): string {
  const parts: string[] = []
  for (const block of node.content) {
    if (block.type === 'text') parts.push(block.text)
    else parts.push(JSON.stringify(block, null, 2))
  }
  if (parts.length === 0 && node.error !== undefined) parts.push(`${node.error.name}: ${node.error.code}`)
  return parts.join('\n')
}

function firstLine(text: string): string {
  const nl = text.indexOf('\n')
  return nl === -1 ? text : text.slice(0, nl)
}

/** Strip the workspace root from a workspace-rooted absolute path (display only). */
export function relativizeToCwd(text: string, cwd: string | undefined): string {
  if (cwd === undefined || cwd === '') return text
  const root = cwd.replace(/[/\\]+$/, '')
  if (text.startsWith(`${root}/`) || text.startsWith(`${root}\\`)) return text.slice(root.length + 1)
  return text
}

/**
 * Resolve a Workspace-relative path into the Host-facing spelling (local
 * mirror of `@deepseek-ai/dsh-util-workspace-path`'s `resolveWorkspacePath`:
 * that static utility package is not a dynamic client bundle row, so the
 * browser half carries this one-function copy).
 * @param cwd - Session Workspace root, when known.
 * @param path - Absolute or Workspace-relative path.
 * @returns an absolute path when a Workspace root is available, otherwise the original path.
 */
function resolveWorkspacePath(cwd: string | undefined, path: string): string {
  if (path.startsWith('/') || /^[A-Za-z]:[/\\]/.test(path) || path.startsWith('\\\\')) return path
  if (cwd === undefined || cwd === '') return path
  const base = cwd.replace(/[/\\]+$/, '')
  const relative = path.replace(/^[/\\]+/, '')
  return `${base}/${relative}`
}

/**
 * Abbreviate a POSIX home directory for display (local mirror of
 * `@deepseek-ai/dsh-util-workspace-path`'s `abbreviateHomePath`).
 * @param path - Absolute or already-short display path.
 * @param home - Host account home; absent skips abbreviation.
 * @returns `~` or `~/…` for the POSIX home and its descendants, otherwise `path`.
 */
function abbreviateHomePath(path: string, home: string | undefined): string {
  if (home === undefined || home === '') return path
  if (/^[A-Za-z]:[/\\]/.test(path) || path.startsWith('\\\\')
    || /^[A-Za-z]:[/\\]/.test(home) || home.startsWith('\\\\')) return path
  const root = home.replace(/\/+$/, '')
  if (root === '' || root === '/') return path
  if (path.replace(/\/+$/, '') === root) return '~'
  if (path.startsWith(`${root}/`)) return `~${path.slice(root.length)}`
  return path
}

function parseArgs(argsRaw: string): Record<string, unknown> | undefined {
  try {
    const parsed: unknown = JSON.parse(argsRaw)
    return typeof parsed === 'object' && parsed !== null ? parsed as Record<string, unknown> : undefined
  } catch {
    return undefined
  }
}

function pickString(args: Record<string, unknown>, keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = args[key]
    if (typeof value === 'string' && value !== '') return value
  }
  return undefined
}

/** Summary key preference per row variant (args-derived, mirrors ui-tool). */
const SUMMARY_KEYS: Record<ToolVariant, readonly string[]> = {
  bash: ['description', 'command'],
  read: ['path', 'file_path', 'url'],
  search: ['query', 'pattern', 'url'],
  write: ['path', 'file_path'],
  edit: ['path', 'file_path'],
  code: ['description'],
  others: [],
}

function deriveSummary(variant: ToolVariant, argsRaw: string): string {
  const parsed = parseArgs(argsRaw)
  if (parsed === undefined) return firstLine(argsRaw)
  // web_search takes a `queries` array: the summary joins the queries.
  if (variant === 'search' && Array.isArray(parsed.queries)) {
    const queries = parsed.queries.filter((query): query is string => typeof query === 'string' && query !== '')
    if (queries.length > 0) return queries.map(firstLine).join(', ')
  }
  const picked = pickString(parsed, SUMMARY_KEYS[variant])
  if (picked !== undefined) return firstLine(picked)
  for (const value of Object.values(parsed)) {
    if (typeof value === 'string' && value !== '') return firstLine(value)
  }
  return firstLine(argsRaw)
}

/** Path keys only — never `url` (web_fetch lands on the read variant). */
const FILE_PATH_KEYS = ['path', 'file_path'] as const

/** File-tool variants whose summary may be an openable workspace path. */
const FILE_PATH_VARIANTS: ReadonlySet<ToolVariant> = new Set(['read', 'write', 'edit'])

function deriveFilePath(variant: ToolVariant, argsRaw: string): string | undefined {
  if (!FILE_PATH_VARIANTS.has(variant)) return undefined
  const parsed = parseArgs(argsRaw)
  if (parsed === undefined) return undefined
  return pickString(parsed, FILE_PATH_KEYS)?.split('\n')[0]
}

function deriveBody(variant: ToolVariant, argsRaw: string): string | null {
  if (argsRaw === '') return null
  const parsed = parseArgs(argsRaw)
  if (parsed === undefined) return argsRaw
  // The code row's expanded body IS the program, not the args JSON envelope.
  if (variant === 'code') {
    const code = parsed.code
    if (typeof code === 'string' && code !== '') return code
  }
  return JSON.stringify(parsed, null, 2)
}

/** Derive the row model for one call of a grouped tool. */
export function callRowModel(
  toolName: string,
  block: ToolCallBlock,
  cwd: string | undefined,
  home: string | undefined,
): CallRowModel {
  const done = 'kind' in block
  const argsRaw = (done ? block.call?.argsRaw : block.argsRaw) ?? ''
  const state: RowState = !done ? 'running'
    : block.error?.code === 'interrupted' ? 'stopped'
      : block.isError ? 'error' : 'ok'
  const variant = classifyTool(toolName)
  const terminal = terminalCardOf(block, cwd)
  const read = readCardOf(block, cwd, home)
  const diff = diffCardOf(block)
  const search = searchCardOf(block)
  const web = webCardOf(block)
  const base = argsRaw === ''
    ? block.callId
    : abbreviateHomePath(relativizeToCwd(deriveSummary(variant, argsRaw), cwd), home)
  const toolTitle = TOOL_TITLES[toolName]
  // Others keeps the static "Tool call" title; the real tool name rides the
  // summary slot unless the tool owns a specific title (mirrors ui-tool).
  const argsSummary = variant === 'others' && toolName !== '' && toolTitle === undefined
    ? `${toolName} · ${base}`
    : base
  const filePath = deriveFilePath(variant, argsRaw)
  const output = done ? (resultText(block) || null) : null
  const errorSummary = state === 'error' && output !== null ? firstLine(output) : null
  // A terminal card's model-authored description is the contract's above-card
  // text (mirrors ui-tool); the old result-view replacement title is gone.
  const summary = terminal?.description ?? argsSummary
  // Single-file tools never expose an args body — the path link is the only
  // args interaction (mirrors ui-tool's singleFile rule).
  const body = filePath !== undefined ? null : deriveBody(variant, argsRaw)
  // A failing exit status is the terminal card's own error signal: the call
  // settles isError:false, and the red state dot is its only collapsed signal.
  const finalState = state === 'ok' && terminal !== null && terminalFailed(terminal)
    ? 'error'
    : state
  const expandable = terminal !== null || diff !== null || read !== null
    || search !== null || web !== null || body !== null || output !== null
  return {
    state: finalState,
    variant,
    title: toolTitle ?? VARIANT_TITLES[variant],
    summary,
    body,
    output,
    errorSummary,
    filePath,
    expandable,
    terminal,
    diff,
    read,
    search,
    web,
  }
}

/** Read-card derivation, or null when this call is not a read card (mirrors ui-tool). */
function readCardOf(block: ToolCallBlock, cwd: string | undefined, home: string | undefined): ReadCardModel | null {
  if (block.parentCallId !== undefined || !('kind' in block) || block.isError) return null
  const parsed = parsedArgsOf(block)
  if (parsed?.name !== 'read') return null
  const { file_path: path, offset, limit } = parsed.args
  if (typeof path !== 'string' || path.trim() === '') return null
  if (offset !== undefined && (typeof offset !== 'number' || !Number.isInteger(offset) || offset < 1)) return null
  if (limit !== undefined && (typeof limit !== 'number' || !Number.isInteger(limit) || limit < 1)) return null
  const meta = readMeta(block.meta)
  if (meta === null) return null
  const text = singleResultText(block)
  if (text === undefined) return null
  const body = /^<path>[^\n]*<\/path>\n<type>file<\/type>\n<content>\n([\s\S]*)\n<\/content>$/u.exec(text)?.[1]
  if (body === undefined) return null
  return {
    label: abbreviateHomePath(relativizeToCwd(meta.path, cwd), home),
    lines: meta.lines,
    totalLines: meta.totalLines,
    lang: meta.lang,
  }
}

interface ReadMeta {
  path: string
  lines: { number: number; text: string }[]
  totalLines: number
  lang?: string
}

function readMeta(meta: unknown): ReadMeta | null {
  if (typeof meta !== 'object' || meta === null || Array.isArray(meta)) return null
  const { path, offset, lines, totalLines, lang } = meta as Record<string, unknown>
  if (typeof path !== 'string' || typeof offset !== 'number' || !Number.isInteger(offset) || offset < 1) return null
  if (typeof totalLines !== 'number' || !Number.isInteger(totalLines) || totalLines < 0 || !Array.isArray(lines)) return null
  if (lang !== undefined && typeof lang !== 'string') return null
  const narrowed: { number: number; text: string }[] = []
  let previous = offset - 1
  for (const line of lines) {
    if (typeof line !== 'object' || line === null || Array.isArray(line)) return null
    const { number, text } = line as Record<string, unknown>
    if (typeof number !== 'number' || !Number.isInteger(number) || number < 1 || number <= previous) return null
    if (number > totalLines || typeof text !== 'string') return null
    previous = number
    narrowed.push({ number, text })
  }
  return {
    path,
    lines: narrowed,
    totalLines,
    ...(lang === undefined ? {} : { lang }),
  }
}

function isValidFiles(files: unknown): files is SearchFileGroup[] {
  return Array.isArray(files) && files.every(file =>
    typeof file === 'object' && file !== null
    && typeof (file as { path?: unknown }).path === 'string'
    && Array.isArray((file as { matches?: unknown }).matches)
    && (file as { matches: unknown[] }).matches.every(match =>
      typeof match === 'object' && match !== null
      && typeof (match as { lineNumber?: unknown }).lineNumber === 'number'
      && typeof (match as { line?: unknown }).line === 'string'))
}

function flattenContent(content: readonly { type: string; text?: string }[]): string | undefined {
  const text = content
    .filter((block): block is { type: 'text'; text: string } => block.type === 'text' && typeof block.text === 'string')
    .map(block => block.text)
    .join('\n')
  return text === '' ? undefined : text
}

/** Search-card derivation, or null when this call is not a search card (mirrors ui-tool). */
function searchCardOf(block: ToolCallBlock): SearchCardModel | null {
  if (block.parentCallId !== undefined || !('kind' in block) || block.isError) return null
  const parsed = parsedArgsOf(block)
  if (parsed === null || (parsed.name !== 'grep' && parsed.name !== 'glob')) return null
  const { pattern, path } = parsed.args
  if (typeof pattern !== 'string') return null
  if (parsed.name === 'grep' && pattern === '') return null
  if (parsed.name === 'glob' && pattern.trim() === '') return null
  if (path !== undefined && (typeof path !== 'string' || path.trim() === '')) return null
  if (parsed.name === 'grep') {
    const include = parsed.args.include
    if (include !== undefined && typeof include !== 'string') return null
  }
  if (typeof block.meta !== 'object' || block.meta === null || Array.isArray(block.meta)) return null
  const meta = block.meta as Record<string, unknown>
  if (typeof meta.truncated !== 'boolean') return null
  if (typeof meta.total !== 'number' || !Number.isInteger(meta.total) || meta.total < 0) return null
  const common = { truncated: meta.truncated, total: meta.total }
  const recovery = meta.truncated ? flattenContent(block.content) : undefined
  if (meta.shape === 'matches') {
    if (!isValidFiles(meta.files)) return null
    return { recovery, card: { kind: 'matches', files: meta.files, ...common } }
  }
  if (meta.shape !== 'paths') return null
  if (!Array.isArray(meta.paths) || !meta.paths.every(path => typeof path === 'string')) return null
  return { recovery, card: { kind: 'paths', paths: meta.paths, ...common } }
}

/** Narrow a result metadata `diffs` to well-formed hunks (mirrors ui-tool). */
function narrowDiffs(diffs: unknown): DiffHunk[] | null {
  if (!Array.isArray(diffs) || diffs.length === 0) return null
  const out: DiffHunk[] = []
  for (const hunk of diffs) {
    if (typeof hunk !== 'object' || hunk === null) return null
    const { path, oldText, newText } = hunk as Record<string, unknown>
    if (typeof path !== 'string') return null
    if (oldText !== null && typeof oldText !== 'string') return null
    if (typeof newText !== 'string') return null
    out.push({ path, oldText, newText })
  }
  return out
}

type IntendedDiff = { tool: 'write' | 'edit' | 'str_replace_editor'; diff: DiffHunk }

function intendedDiff(block: ToolCallBlock): IntendedDiff | null {
  const parsed = parsedArgsOf(block)
  if (parsed === null) return null
  if (parsed.name === 'str_replace_editor') {
    const { command, path, file_text: fileText, old_str: oldText, new_str: newText } = parsed.args
    if (typeof path !== 'string' || path.trim() === '') return null
    if (command === 'create') {
      if (fileText !== undefined && typeof fileText !== 'string') return null
      return { tool: 'str_replace_editor', diff: { path, oldText: null, newText: fileText ?? '' } }
    }
    if (command === 'str_replace') {
      if (oldText !== undefined && typeof oldText !== 'string') return null
      if (newText !== undefined && typeof newText !== 'string') return null
      return { tool: 'str_replace_editor', diff: { path, oldText: oldText ?? null, newText: newText ?? '' } }
    }
    return null
  }
  const { file_path: path } = parsed.args
  if (typeof path !== 'string' || path.trim() === '') return null
  if (parsed.name === 'write') {
    const { content } = parsed.args
    return typeof content === 'string'
      ? { tool: 'write', diff: { path, oldText: null, newText: content } }
      : null
  }
  if (parsed.name !== 'edit') return null
  const { old_string: oldText, new_string: newText, replace_all: replaceAll } = parsed.args
  if (typeof oldText !== 'string' || typeof newText !== 'string') return null
  if (replaceAll !== undefined && typeof replaceAll !== 'boolean') return null
  return { tool: 'edit', diff: { path, oldText: oldText || null, newText } }
}

function appliedDiffs(meta: unknown): DiffHunk[] | 'empty' | null {
  if (typeof meta !== 'object' || meta === null || Array.isArray(meta)) return null
  const diffs = (meta as Record<string, unknown>).diffs
  if (!Array.isArray(diffs)) return null
  if (diffs.length === 0) return 'empty'
  return narrowDiffs(diffs)
}

/** Diff-card derivation, or null when this call is not a diff card (mirrors ui-tool). */
function diffCardOf(block: ToolCallBlock): DiffCardModel | null {
  if (block.parentCallId !== undefined) return null
  const intended = intendedDiff(block)
  if (intended === null) return null
  if (!('kind' in block)) return { card: { diffs: [intended.diff] } }
  if (intended.tool === 'str_replace_editor') return null
  if (block.isError) return null
  const applied = appliedDiffs(block.meta)
  if (applied === null || applied === 'empty') {
    return intended.tool === 'write' ? { card: { diffs: [intended.diff] } } : null
  }
  return { card: { diffs: applied } }
}

interface ShellCall {
  command: string
  description: string | undefined
  workdir: string | undefined
  persistent: boolean
  background: boolean
}

function shellCallOf(name: string, args: Record<string, unknown>): ShellCall | null {
  if (name !== 'bash' && name !== 'pwsh') return null
  const { command, description, timeoutMs, workdir, run_in_background: background } = args
  if (typeof command !== 'string' || command.trim() === '') return null
  if (timeoutMs !== undefined && (typeof timeoutMs !== 'number' || !Number.isFinite(timeoutMs) || timeoutMs <= 0)) return null
  if (workdir !== undefined && typeof workdir !== 'string') return null
  if (background !== undefined && typeof background !== 'boolean') return null
  if (description === undefined) {
    // Persistent shell providers omit `description`; their settled results
    // carry no single process exit status, so they fall back to IN/OUT.
    return { command, description: undefined, workdir: undefined, persistent: true, background: false }
  }
  if (typeof description !== 'string' || description.trim() === '') return null
  return { command, description, workdir, persistent: false, background: background === true }
}

/**
 * Parse the result text's trailing exit-status marker (mirrors the shell
 * renderer's literal contract without importing that Host-only package).
 * @param text - rendered shell result text.
 * @returns output with a trailing exit-code or signal marker extracted.
 */
function parseExitStatus(text: string): { output: string; exitCode?: number; signal?: string } {
  const signal = /\n\[killed by signal: ([^\]\n]+)\]$/.exec(text)
  if (signal?.[1] !== undefined) return { output: text.slice(0, signal.index), signal: signal[1] }
  const exit = /\n\[exit code: (\d+)\]$/.exec(text)
  if (exit?.[1] !== undefined) return { output: text.slice(0, exit.index), exitCode: Number(exit[1]) }
  return { output: text, exitCode: 0 }
}

/**
 * Collapse `.` and `..` segments so the prompt label names the directory the
 * command actually ran in (local mirror of ui-tool's terminal normalization).
 * @param path - a joined or absolute path, possibly carrying `.`/`..` segments.
 * @returns the same path with those segments resolved.
 */
function normalizeSegments(path: string): string {
  if (!/(?:^|[/\\])\.\.?(?:[/\\]|$)/.test(path)) return path
  const backslashed = path.includes('\\') && !path.includes('/')
  const separator = backslashed ? '\\' : '/'
  const rooted = /^[/\\]/.test(path)
  const drive = /^[A-Za-z]:/.exec(path)?.[0] ?? ''
  const body = collapse(path.slice(drive.length), rooted || drive !== '', separator)
  const leading = rooted ? separator : ''
  return drive === '' ? `${leading}${body}` : `${drive}${rooted ? leading : separator}${body}`
}

function collapse(body: string, rooted: boolean, separator = '/'): string {
  const kept: string[] = []
  for (const segment of body.split(/[/\\]/)) {
    if (segment === '' || segment === '.') continue
    if (segment === '..') {
      if (kept.length > 0 && kept[kept.length - 1] !== '..') kept.pop()
      else if (!rooted) kept.push(segment)
      continue
    }
    kept.push(segment)
  }
  return kept.join(separator)
}

/**
 * Resolve a shell call's workdir for display: an absolute path is used as-is,
 * a relative one joins under the session workspace, and an omitted one IS the
 * session workspace.
 * @param workdir - the raw call's workdir, if any.
 * @param sessionCwd - the session workspace root, if the caller knows it.
 * @returns the working directory for the prompt label, or undefined.
 */
function resolveTerminalCwd(workdir: string | undefined, sessionCwd: string | undefined): string | undefined {
  if (workdir === undefined || workdir === '') return sessionCwd
  if (sessionCwd === undefined || sessionCwd === '') return normalizeSegments(workdir)
  return normalizeSegments(resolveWorkspacePath(sessionCwd, workdir))
}

/** Terminal-card derivation, or null when this call is not a terminal card (mirrors ui-tool). */
function terminalCardOf(block: ToolCallBlock, sessionCwd: string | undefined): TerminalCardModel | null {
  if (block.parentCallId !== undefined) return null
  const parsed = parsedArgsOf(block)
  if (parsed === null) return null
  if (parsed.name !== 'bash' && parsed.name !== 'pwsh') return null
  const call = shellCallOf(parsed.name, parsed.args)
  if (call === null || call.background) return null
  const cwd = resolveTerminalCwd(call.workdir, sessionCwd)
  if (!('kind' in block)) {
    return {
      description: call.description,
      card: {
        command: call.command,
        cwd,
        output: undefined,
        exitCode: undefined,
        signal: undefined,
        running: true,
      },
    }
  }
  if (block.isError || call.persistent) return null
  const output = singleResultText(block)
  if (output === undefined) return null
  const status = parseExitStatus(output)
  return {
    description: call.description,
    card: {
      command: call.command,
      cwd,
      output: status.output,
      exitCode: status.exitCode,
      signal: status.signal,
      running: false,
    },
  }
}

/** Web-card derivation, or null when this call is not a web card (mirrors ui-tool). */
function webCardOf(block: ToolCallBlock): WebCardModel | null {
  if (block.parentCallId !== undefined || !('kind' in block) || block.isError) return null
  const parsed = parsedArgsOf(block)
  if (parsed === null) return null
  if (parsed.name === 'web_search') {
    const { queries } = parsed.args
    if (!Array.isArray(queries) || queries.length === 0) return null
    if (!queries.every(query => typeof query === 'string' && query.trim() !== '')) return null
  } else if (parsed.name === 'web_fetch') {
    const { url } = parsed.args
    if (typeof url !== 'string' || url.trim() === '') return null
  } else {
    return null
  }
  if (typeof block.meta !== 'object' || block.meta === null || Array.isArray(block.meta)) return null
  const meta = block.meta as Record<string, unknown>
  if (typeof meta.truncated !== 'boolean') return null
  if (parsed.name === 'web_search') {
    const sources = webSources(meta.sources)
    if (sources === null || (meta.answer !== undefined && typeof meta.answer !== 'string')) return null
    return {
      kind: 'search',
      answer: meta.answer,
      sources,
      truncated: meta.truncated,
    }
  }
  if (typeof meta.url !== 'string') return null
  if (typeof meta.statusCode !== 'number' || !Number.isInteger(meta.statusCode)) return null
  return {
    kind: 'fetch',
    url: meta.url,
    statusCode: meta.statusCode,
    truncated: meta.truncated,
  }
}

interface WebSource {
  url: string
  title?: string
  snippet?: string
  publishedAt?: string
}

function webSources(value: unknown): WebSource[] | null {
  if (!Array.isArray(value)) return null
  const sources: WebSource[] = []
  for (const source of value) {
    if (typeof source !== 'object' || source === null) return null
    const { url, title, snippet, publishedAt } = source as Record<string, unknown>
    if (typeof url !== 'string') return null
    if (title !== undefined && typeof title !== 'string') return null
    if (snippet !== undefined && typeof snippet !== 'string') return null
    if (publishedAt !== undefined && typeof publishedAt !== 'string') return null
    sources.push({
      url,
      ...(title === undefined ? {} : { title }),
      ...(snippet === undefined ? {} : { snippet }),
      ...(publishedAt === undefined ? {} : { publishedAt }),
    })
  }
  return sources
}
