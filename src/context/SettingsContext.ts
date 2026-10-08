import { createContext, useContext } from 'react'

export const themes = ['light', 'dark'] as const
export type ThemeType = (typeof themes)[number]
export type ThemePreference = ThemeType | 'system'

// Brand color of the site. Default keeps the preset palette, the others
// replace the secondary color (the one the cards and buttons use).
export const accents = [
  { name: 'Default', color: null },
  { name: 'Cyan', color: '#22D3EE' },
  { name: 'Indigo', color: '#6366F1' },
  { name: 'Teal', color: '#14B8A6' },
  { name: 'Fuchsia', color: '#D946EF' },
  { name: 'Lime', color: '#A3E635' },
  { name: 'Amber', color: '#FACC15' },
  { name: 'Slate', color: '#64748B' }
] as const
export type AccentName = (typeof accents)[number]['name']

interface Settings {
  themeType: ThemeType
  themePreference: ThemePreference
  switchTheme: (preference: ThemePreference) => void
  accent: AccentName
  switchAccent: (accent: AccentName) => void
}

export const SettingsContext = createContext<Settings>({
  themeType: 'light',
  themePreference: 'system',
  switchTheme: () => {},
  accent: 'Default',
  switchAccent: () => {}
})

export const useSettings = (): Settings => useContext(SettingsContext)
