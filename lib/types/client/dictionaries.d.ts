/**
 * The 19 better-locale override languages for the merged tool-call row copy,
 * keyed by language id. Each dictionary carries the same key set as `en`/`zh`
 * in `./locales.ts` (enforced by the `Record<MergeToolCallsKey, string>`
 * annotation); values keep `{placeholder}` interpolation (e.g. `{n}` in
 * `mergedCount`), matching the better-locale store's `LocaleDict` contract.
 *
 * The apply function registers these into `ctx.betterLocale` (the override
 * store) under `NS`, so when the user selects an override language through
 * dsh-plugin-better-locale (and DSH is on 'en', whose slot the override
 * borrows), the row copy renders in the override language.
 */
import type { MergeToolCallsKey } from './locales.ts';
/** All override-language dictionaries for the `NS` namespace. */
export declare const dicts: Record<string, Record<MergeToolCallsKey, string>>;
