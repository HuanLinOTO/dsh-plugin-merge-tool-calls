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
import type { ToolCallBlock, ToolResultNode } from '@deepseek-ai/dsh-client-ui-chat/client';
import type { DiffBlockProps, ReadBlockProps, SearchBlockProps, TerminalBlockProps, WebBlockProps } from '@deepseek-ai/dsh-client-ui-primitives';
import { type ToolVariant } from './tool-names.ts';
/** Row state semantic, mirroring ui-tool's ToolRowState. */
export type RowState = 'running' | 'ok' | 'error' | 'stopped';
export type { ToolVariant } from './tool-names.ts';
/** Read-card props the ReadBlock primitive draws (per-render maxLines owned by the caller). */
export type ReadCardModel = Pick<ReadBlockProps, 'label' | 'lines' | 'totalLines' | 'lang'>;
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
/** Search-card props (the primitive's own union minus the render site's fields). */
type SearchCardModelProps = DistributiveOmit<SearchBlockProps, 'labels' | 'maxLines' | 'className'>;
/** Search-card props plus the capped-result recovery locator (mirrors ui-tool). */
export interface SearchCardModel {
    readonly card: SearchCardModelProps;
    readonly recovery: string | undefined;
}
/** Diff-card props (mirrors ui-tool; maxLines/labels/className belong to the render site). */
export interface DiffCardModel {
    readonly card: Pick<DiffBlockProps, 'diffs'>;
}
/** Terminal-card props (mirrors ui-tool; maxLines/labels/className belong to the render site). */
export interface TerminalCardModel {
    readonly card: Pick<TerminalBlockProps, 'command' | 'cwd' | 'output' | 'exitCode' | 'signal' | 'running'>;
    /** The call's model-authored description shown above the card. */
    readonly description: string | undefined;
}
/** Web-card props (the primitive's own union minus the render site's fields). */
export type WebCardModel = DistributiveOmit<WebBlockProps, 'labels' | 'className'>;
/** True when a settled terminal card reports a failing exit (mirrors ui-tool). */
export declare function terminalFailed(model: TerminalCardModel): boolean;
/** Everything a merged row needs, derived once from the frozen slice. */
export interface CallRowModel {
    readonly state: RowState;
    readonly variant: ToolVariant;
    /** Row title: variant title, or the tool-owned title when it refines one. */
    readonly title: string;
    /** Args/result-derived one-line summary (path for file tools, query for searches, …). */
    readonly summary: string;
    /** Expanded-body input text (pretty args); null = no input section. */
    readonly body: string | null;
    /** Flattened result text; null while running or when the result carries no text. */
    readonly output: string | null;
    /** First result line on an error row (the collapsed summary's error text). */
    readonly errorSummary: string | null;
    /** Openable workspace path from args; absent for non-file tools and errors. */
    readonly filePath: string | undefined;
    /** Whether the row has anything to expand (a card, args body, or output). */
    readonly expandable: boolean;
    /** Expanded-body content cards, mutually exclusive, or null when absent. */
    readonly terminal: TerminalCardModel | null;
    readonly diff: DiffCardModel | null;
    readonly read: ReadCardModel | null;
    readonly search: SearchCardModel | null;
    readonly web: WebCardModel | null;
}
/**
 * Flatten a settled result's content blocks to display text.
 * @param node - settled result node.
 * @returns joined text (may be empty).
 */
export declare function resultText(node: ToolResultNode): string;
/** Strip the workspace root from a workspace-rooted absolute path (display only). */
export declare function relativizeToCwd(text: string, cwd: string | undefined): string;
/** Derive the row model for one call of a grouped tool. */
export declare function callRowModel(toolName: string, block: ToolCallBlock, cwd: string | undefined, home: string | undefined): CallRowModel;
