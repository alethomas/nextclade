import type { State } from 'src/state/reducer'
import { LocaleKey, LocaleWithKey, getLocaleWithKey } from 'src/i18n/i18n'

export const selectLocaleKey = (state: State): LocaleKey => state.settings.localeKeyV2

export const selectLocale = (state: State): LocaleWithKey => getLocaleWithKey(selectLocaleKey(state))

export const selectNumThreads = (state: State) => state.settings.numThreadsV2

export const selectShouldRunAutomatically = (state: State) => state.settings.shouldRunAutomatically
