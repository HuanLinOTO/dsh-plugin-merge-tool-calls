/**
 * The 19 better-locale override languages for the merged tool-call row copy,
 * keyed by language id. Values keep `{placeholder}` interpolation (e.g. `{n}`
 * in `mergedCount`), matching the better-locale store's `LocaleDict`
 * contract.
 *
 * Each dictionary is PARTIAL: languages carry the keys they translate, and a
 * missing key falls through the locale lookup chain to the base `en`/`zh`
 * dictionary registered by the plugin. Dictionaries written before the
 * v0.1.2-alpha.1 adaptation predate the read/search/diff/web card-label keys
 * (`read.*` / `search.*` / `diff.*` / `web.*` / `markdown.*` / `copy` /
 * `copied`); those render in English under an override language until a
 * translation lands here.
 *
 * The apply function registers these into `ctx.betterLocale` (the override
 * store) under `NS`, so when the user selects an override language through
 * dsh-plugin-better-locale (and DSH is on 'en', whose slot the override
 * borrows), the row copy renders in the override language.
 */
import type { MergeToolCallsKey } from './locales.ts';
/** All override-language dictionaries for the `NS` namespace. */
export declare const dicts: Record<string, Partial<Record<MergeToolCallsKey, string>>>;
