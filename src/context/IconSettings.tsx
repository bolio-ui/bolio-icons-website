import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { DEFAULT_STYLE, IconStyle, PackageManager } from 'src/lib/icons'

export type CopyFormat = 'jsx' | 'svg' | 'import' | 'name'

interface IconSettings {
  style: IconStyle
  setStyle: (style: Partial<IconStyle>) => void
  resetStyle: () => void
  copyFormat: CopyFormat
  setCopyFormat: (format: CopyFormat) => void
  packageManager: PackageManager
  setPackageManager: (manager: PackageManager) => void
  favorites: string[]
  toggleFavorite: (name: string) => void
}

const STORAGE_KEY = 'icon-settings'

const IconSettingsContext = createContext<IconSettings>({
  style: DEFAULT_STYLE,
  setStyle: () => {},
  resetStyle: () => {},
  copyFormat: 'jsx',
  setCopyFormat: () => {},
  packageManager: 'yarn',
  setPackageManager: () => {},
  favorites: [],
  toggleFavorite: () => {}
})

export const useIconSettings = () => useContext(IconSettingsContext)

interface Stored {
  style?: Partial<IconStyle>
  copyFormat?: CopyFormat
  packageManager?: PackageManager
  favorites?: string[]
}

export const IconSettingsProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [style, setStyleState] = useState<IconStyle>(DEFAULT_STYLE)
  const [copyFormat, setCopyFormat] = useState<CopyFormat>('jsx')
  const [packageManager, setPackageManager] = useState<PackageManager>('yarn')
  const [favorites, setFavorites] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  // Read after mount: the server render and the first client render must match
  useEffect(() => {
    try {
      const saved: Stored = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) ?? '{}'
      )
      if (saved.style) setStyleState({ ...DEFAULT_STYLE, ...saved.style })
      if (saved.copyFormat) setCopyFormat(saved.copyFormat)
      if (saved.packageManager) setPackageManager(saved.packageManager)
      if (Array.isArray(saved.favorites)) setFavorites(saved.favorites)
    } catch {
      // private mode or corrupted value: keep the defaults
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ style, copyFormat, packageManager, favorites })
      )
    } catch {
      // storage is a convenience, not a requirement
    }
  }, [loaded, style, copyFormat, packageManager, favorites])

  const setStyle = useCallback(
    (next: Partial<IconStyle>) =>
      setStyleState((current) => ({ ...current, ...next })),
    []
  )
  const resetStyle = useCallback(() => setStyleState(DEFAULT_STYLE), [])
  const toggleFavorite = useCallback(
    (name: string) =>
      setFavorites((current) =>
        current.includes(name)
          ? current.filter((item) => item !== name)
          : [...current, name]
      ),
    []
  )

  const value = useMemo(
    () => ({
      style,
      setStyle,
      resetStyle,
      copyFormat,
      setCopyFormat,
      packageManager,
      setPackageManager,
      favorites,
      toggleFavorite
    }),
    [
      style,
      setStyle,
      resetStyle,
      copyFormat,
      packageManager,
      favorites,
      toggleFavorite
    ]
  )

  return (
    <IconSettingsContext.Provider value={value}>
      {children}
    </IconSettingsContext.Provider>
  )
}
