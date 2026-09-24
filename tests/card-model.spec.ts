/** Unit tests for the row-model derivation (card-model.ts). */
import { describe, expect, it } from 'vitest'
import type { ToolCallBlock } from '@deepseek-ai/dsh-client-ui-chat/client'
import { callRowModel } from '../src/client/card-model.ts'

function runningCall(callId: string, name: string, argsRaw: string): ToolCallBlock {
  return { phase: 'start', callId, name, argsRaw, turn: 1, step: 1, time: 0, subCalls: [] }
}

function preparingCall(callId: string, name: string): ToolCallBlock {
  return { phase: 'preparing', callId, name, turn: 1, step: 1, time: 0, subCalls: [] }
}

/** Settled read fixture carrying the persisted meta + model-facing envelope the card derives from. */
function settledRead(callId: string, argsRaw: string): ToolCallBlock {
  return {
    kind: 'tool-result', seq: 1, time: 0, callId,
    call: { name: 'read', argsRaw },
    callTime: 0,
    content: [{ type: 'text', text: '<path>a.ts</path>\n<type>file</type>\n<content>\nhello\n</content>' }],
    isError: false,
    meta: { path: 'a.ts', offset: 1, lines: [{ number: 1, text: 'hello' }], totalLines: 1 },
    subCalls: [],
  }
}

describe('callRowModel', () => {
  it('derives an openable file path only for read-family calls', () => {
    // A search call's `path` arg is the directory searched, never a file:
    // clicking it must not open the directory.
    const grep = callRowModel('grep', runningCall('g1', 'grep', JSON.stringify({ pattern: 'needle', path: 'D:\\search-root' })), undefined, undefined)
    expect(grep.filePath).toBeUndefined()
    expect(grep.summary).toBe('needle')

    const glob = callRowModel('glob', runningCall('g2', 'glob', JSON.stringify({ pattern: '**/*.ts', path: 'D:\\search-root' })), undefined, undefined)
    expect(glob.filePath).toBeUndefined()
  })

  it('derives the file path from read args (file_path or path)', () => {
    const byFilePath = callRowModel('read', runningCall('r1', 'read', JSON.stringify({ file_path: 'src/a.ts' })), undefined, undefined)
    expect(byFilePath.filePath).toBe('src/a.ts')
    const byPath = callRowModel('read', runningCall('r2', 'read', JSON.stringify({ path: 'src/b.ts' })), undefined, undefined)
    expect(byPath.filePath).toBe('src/b.ts')
  })

  it('mirrors the built-in variant titles and summaries for every tool family', () => {
    const write = callRowModel('write', runningCall('w1', 'write', JSON.stringify({ file_path: 'src/a.ts', content: 'x' })), undefined, undefined)
    expect(write.title).toBe('Write')
    expect(write.summary).toBe('src/a.ts')
    // File tools expose an openable path; single-file rows never show an args body.
    expect(write.filePath).toBe('src/a.ts')
    expect(write.body).toBeNull()

    const edit = callRowModel('edit', runningCall('e1', 'edit', JSON.stringify({ file_path: 'src/b.ts' })), undefined, undefined)
    expect(edit.title).toBe('Edit')
    expect(edit.filePath).toBe('src/b.ts')

    const bash = callRowModel('bash', runningCall('b1', 'bash', JSON.stringify({ description: 'List files', command: 'ls -la' })), undefined, undefined)
    expect(bash.title).toBe('Bash')
    expect(bash.summary).toBe('List files')
    expect(bash.filePath).toBeUndefined()

    const pwsh = callRowModel('pwsh', runningCall('p1', 'pwsh', JSON.stringify({ command: 'Get-ChildItem' })), undefined, undefined)
    expect(pwsh.title).toBe('Pwsh')
    expect(pwsh.summary).toBe('Get-ChildItem')

    const web = callRowModel('web_search', runningCall('s1', 'web_search', JSON.stringify({ queries: ['hello'] })), undefined, undefined)
    expect(web.title).toBe('Search')
    expect(web.summary).toBe('hello')

    const runCode = callRowModel('run_code', runningCall('c1', 'run_code', JSON.stringify({ code: 'console.log(1)', description: 'Say hi' })), undefined, undefined)
    expect(runCode.title).toBe('Code')
    expect(runCode.summary).toBe('Say hi')
    expect(runCode.body).toBe('console.log(1)')
  })

  it('gives unclassified tools the generic title and a toolName-prefixed summary', () => {
    const other = callRowModel('my_tool', runningCall('m1', 'my_tool', JSON.stringify({ foo: 'bar' })), undefined, undefined)
    expect(other.title).toBe('Tool call')
    expect(other.summary).toBe('my_tool · bar')
    expect(other.filePath).toBeUndefined()
  })

  it('marks a row expandable only when it carries a card, body, or output', () => {
    // Running read (no result meta yet): nothing to expand.
    const running = callRowModel('read', runningCall('r1', 'read', JSON.stringify({ file_path: 'a.ts' })), undefined, undefined)
    expect(running.expandable).toBe(false)
    // Settled read with persisted meta + envelope text: expandable.
    const model = callRowModel('read', settledRead('r2', JSON.stringify({ file_path: 'a.ts' })), undefined, undefined)
    expect(model.expandable).toBe(true)
    expect(model.read).not.toBeNull()
    expect(model.read!.label).toBe('a.ts')
    expect(model.read!.lines).toEqual([{ number: 1, text: 'hello' }])
    // A failing terminal exit surfaces as the row's error state.
    const failedBash: ToolCallBlock = {
      kind: 'tool-result', seq: 1, time: 0, callId: 'b2',
      call: { name: 'bash', argsRaw: JSON.stringify({ command: 'exit 2', description: 'Exit two' }) },
      callTime: 0,
      content: [{ type: 'text', text: 'boom\n[exit code: 2]' }],
      isError: false,
      subCalls: [],
    }
    const terminalModel = callRowModel('bash', failedBash, undefined, undefined)
    expect(terminalModel.state).toBe('error')
    expect(terminalModel.expandable).toBe(true)
    expect(terminalModel.terminal).not.toBeNull()
    expect(terminalModel.terminal!.card.exitCode).toBe(2)
    expect(terminalModel.terminal!.card.output).toBe('boom')
    expect(terminalModel.summary).toBe('Exit two')
  })

  it('derives an argument-free, non-expandable model for a preparing call', () => {
    const model = callRowModel('read', preparingCall('p1', 'read'), undefined, undefined)
    // PreparingToolCall has no argsRaw: no summary text body, nothing to expand.
    expect(model.state).toBe('running')
    expect(model.summary).toBe('p1')
    expect(model.body).toBeNull()
    expect(model.output).toBeNull()
    expect(model.filePath).toBeUndefined()
    expect(model.expandable).toBe(false)
  })

  it('derives a search card from persisted grep meta (matches shape)', () => {
    const settledGrep: ToolCallBlock = {
      kind: 'tool-result', seq: 1, time: 0, callId: 'g9',
      call: { name: 'grep', argsRaw: JSON.stringify({ pattern: 'needle', path: 'src' }) },
      callTime: 0,
      content: [{ type: 'text', text: 'src/a.ts:1: needle' }],
      isError: false,
      meta: {
        truncated: false, total: 1, shape: 'matches',
        files: [{ path: 'src/a.ts', matches: [{ lineNumber: 1, line: 'needle' }] }],
      },
      subCalls: [],
    }
    const model = callRowModel('grep', settledGrep, undefined, undefined)
    expect(model.expandable).toBe(true)
    expect(model.search).not.toBeNull()
    expect(model.search!.card).toMatchObject({ kind: 'matches', truncated: false, total: 1 })
  })
})
