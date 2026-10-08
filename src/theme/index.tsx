import { Themes } from '@bolio-ui/core'
import { accents, AccentName, ThemeType } from 'src/context/SettingsContext'

const DARK_BACKGROUND = '#0f0d23'

// The dark preset's greys are neutral blue-grays, which clash with the purple
// background. These are the same ramp tinted with the background's hue (247°).
const hsl = (lightness: number, saturation = 40) =>
  `hsl(247 ${saturation}% ${lightness}%)`

const darkNeutrals = {
  accents_1: hsl(11),
  accents_2: hsl(14),
  accents_3: hsl(18),
  accents_4: hsl(25),
  accents_5: hsl(62, 18),
  accents_6: hsl(68, 18),
  accents_7: hsl(76, 22),
  accents_8: hsl(96, 40),
  border: hsl(18),
  pre: hsl(11)
}

// Mixes a hex color with white or black, to derive the light and dark shades
const mix = (hex: string, target: number, amount: number) => {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  const out = channels.map((c) => Math.round(c + (target - c) * amount))
  return `#${out.map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

// Theme types used by BolioUIProvider. The dark preset keeps its historic
// 'purple' name; accents are suffixed to it ('light-Cyan', 'purple-Cyan').
export const getThemeKey = (mode: ThemeType, accent: AccentName) => {
  const base = mode === 'dark' ? 'purple' : 'light'
  return accent === 'Default' ? base : `${base}-${accent}`
}

const accentPalette = (color: string) => ({
  secondary: color,
  secondaryLight: mix(color, 255, 0.8),
  secondaryLighter: mix(color, 255, 0.5),
  secondaryDark: mix(color, 0, 0.7)
})

const darkPalette = { background: DARK_BACKGROUND, ...darkNeutrals }
const darkExpressiveness = {
  dropdownBoxShadow: `0 0 0 1px ${darkNeutrals.border}`
}

export const purpleTheme = Themes.createFromDark({
  type: 'purple',
  palette: darkPalette,
  expressiveness: darkExpressiveness
})

export const appThemes = [
  purpleTheme,
  ...accents.flatMap(({ name, color }) =>
    color
      ? [
          Themes.createFromLight({
            type: getThemeKey('light', name),
            palette: accentPalette(color)
          }),
          Themes.createFromDark({
            type: getThemeKey('dark', name),
            palette: { ...darkPalette, ...accentPalette(color) },
            expressiveness: darkExpressiveness
          })
        ]
      : []
  )
]
