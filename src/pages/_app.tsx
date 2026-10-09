import React, { useCallback, useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import '@bolio-ui/core/styles.css'
import { BolioUIProvider, CssBaseline } from '@bolio-ui/core'
import {
  accents,
  AccentName,
  SettingsContext,
  themes,
  ThemePreference,
  ThemeType
} from 'src/context/SettingsContext'
import { IconSettingsProvider } from 'src/context/IconSettings'
import Favicon from 'src/components/Favicon'
import Navigation from 'src/components/Navigation'
import SEO from '../../next-seo.config'

import { appThemes, getThemeKey } from 'src/theme'

function App({ Component, pageProps }: AppProps) {
  const [themePreference, setThemePreference] =
    useState<ThemePreference>('system')
  const [systemType, setSystemType] = useState<ThemeType>('light')
  const [accent, setAccent] = useState<AccentName>(accents[0].name)
  const themeType = themePreference === 'system' ? systemType : themePreference

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => setSystemType(query.matches ? 'dark' : 'light')
    update()
    query.addEventListener('change', update)

    const saved = window.localStorage.getItem('accent')
    const found = accents.find((item) => item.name === saved)
    if (found) setAccent(found.name)

    // 'purple' is what the previous version stored for the dark theme
    const theme = window.localStorage.getItem('theme')
    if (theme === 'purple') setThemePreference('dark')
    else if (theme === 'system' || themes.includes(theme as ThemeType))
      setThemePreference(theme as ThemePreference)

    return () => query.removeEventListener('change', update)
  }, [])

  // The script in _document keeps the page hidden until the saved theme is
  // the one rendered, so the first paint is never on the wrong theme.
  useEffect(() => {
    const root = document.documentElement
    const pending = root.getAttribute('data-theme-pending')
    if (!pending || pending !== themeType) return

    // Transitions stay off until the next frame so nothing animates in.
    root.setAttribute('data-theme-switching', '')
    root.removeAttribute('data-theme-pending')
    root.removeAttribute('style')
    document.body.removeAttribute('style')
    const frame = requestAnimationFrame(() =>
      root.removeAttribute('data-theme-switching')
    )
    return () => {
      cancelAnimationFrame(frame)
      root.removeAttribute('data-theme-switching')
    }
  }, [themeType])

  const switchTheme = useCallback((theme: ThemePreference) => {
    setThemePreference(theme)
    window.localStorage.setItem('theme', theme)
  }, [])

  const switchAccent = useCallback((next: AccentName) => {
    setAccent(next)
    window.localStorage.setItem('accent', next)
  }, [])

  return (
    <>
      <Head>
        <Favicon />
      </Head>
      <BolioUIProvider
        themes={appThemes}
        themeType={getThemeKey(themeType, accent)}
      >
        <SettingsContext.Provider
          value={{
            themeType,
            themePreference,
            switchTheme,
            accent,
            switchAccent
          }}
        >
          <DefaultSeo {...SEO} />
          <CssBaseline />
          <IconSettingsProvider>
            <Navigation />
            <Component {...pageProps} />
          </IconSettingsProvider>
        </SettingsContext.Provider>
      </BolioUIProvider>
    </>
  )
}

export default App
