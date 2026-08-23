/**
 * merge-tool-calls — browser half.
 *
 * Shadows the shipped `tool.call.toolview` entries for every grouped tool at
 * priority -1 (the keyed slot's shadowing rule: lowest priority renders). An
 * empty `tools` config means every built-in generic-family tool
 * (see {@link ALL_TOOL_NAMES}); a non-empty list is an explicit whitelist.
 * The shadowed component merges consecutive calls of one tool in the chat flow
 * into a single card with compact child rows.
 *
 * @module @dsh-external/dsh-plugin-merge-tool-calls/client
 */

import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-tool/client'
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import { DEFAULT_MERGE_CONFIG, type MergeToolCallsConfig } from '../types.ts'
import { dicts } from './dictionaries.ts'
import { en, NS, zh, type MergeToolCallsKey } from './locales.ts'
import { MergedToolRow } from './rows.tsx'
import { installStyles } from './styles.ts'
import { ALL_TOOL_NAMES } from './tool-names.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Copy for the merged tool-call rows. */
    'merge-tool-calls': MergeToolCallsKey
  }
}

/** Required services: the slot registry (toolview shadowing) and locale. */
export const inject = ['slots', 'locale']

/** Structural view of better-locale's override store (optional; no runtime dep). */
interface BetterLocaleOverrideStore {
  register(ns: string, dicts: Record<string, Record<string, string>>): () => void
}

/**
 * Register one shadowed toolview per grouped tool.
 * @param ctx - client root context.
 * @param config - row config; defaults apply when the loader passes none.
 */
export function apply(ctx: ClientContext, config: Partial<MergeToolCallsConfig> = {}): void {
  const cfg: MergeToolCallsConfig = { ...DEFAULT_MERGE_CONFIG, ...config }
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'merge-tool-calls: dictionaries')
  ctx.effect(installStyles, 'merge-tool-calls: styles')

  // Optional third-language overrides: register the 19-language dicts into
  // `ctx.betterLocale` (published by dsh-plugin-better-locale) so a selected
  // override language (with DSH on 'en') replaces the row copy. The service
  // is optional — no better-locale, no dicts.
  const betterLocale = ctx.get('betterLocale') as BetterLocaleOverrideStore | undefined
  if (betterLocale !== undefined) {
    ctx.effect(
      () => betterLocale.register(NS, dicts),
      'merge-tool-calls: better-locale override dicts',
    )
  }

  const toolNames = cfg.tools.length === 0 ? ALL_TOOL_NAMES : [...new Set(cfg.tools)]
  for (const tool of toolNames) {
    ctx.slots.inject('tool.call.toolview', () => ctx.slots.register({
      name: 'tool.call.toolview',
      key: tool,
      priority: -1,
      locale: NS,
      inject: () => ({ cfg }),
    }, MergedToolRow))
  }
}
