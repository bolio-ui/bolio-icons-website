import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Button,
  Input,
  SegmentedControl,
  Text,
  useInput,
  useTheme,
  useToasts
} from '@bolio-ui/core'
import { ArrowUpRight, Search, Star } from '@bolio-ui/icons'
import CustomizePanel from 'src/components/CustomizePanel'
import { CopyFormat, useIconSettings } from 'src/context/IconSettings'
import {
  allIcons,
  buildJsx,
  copyText,
  downloadBlob,
  getImportString,
  IconEntry,
  iconToSvg,
  isDefaultStyle,
  makeZip
} from 'src/lib/icons'
import CustomizeButton from './customize-button'
import CategoryCarousel from './category-carousel'
import IconsCell from './icons-cell'
import { categories, Category } from './categories'
import { getGalleryVars } from './vars'
import styles from './IconsGallery.module.css'

const PAGE_SIZE = 96
const FAVORITES = 'Favorites'
type Filter = 'All' | typeof FAVORITES | Category

const categoryCounts = categories.reduce(
  (acc, category) => ({
    ...acc,
    [category]: allIcons.filter((icon) => icon.category === category).length
  }),
  {} as Record<Category, number>
)

const formatLabels: Record<CopyFormat, string> = {
  jsx: 'JSX',
  svg: 'SVG',
  import: 'Import',
  name: 'Name'
}

const formatHints: Record<CopyFormat, string> = {
  jsx: 'React component, ready to paste in your code',
  svg: 'Standalone SVG markup, with your size, stroke and color',
  import: 'Just the import line from @bolio-ui/icons',
  name: 'Only the icon name'
}

const MAX_PREVIEW = 110

const isTyping = (target: EventTarget | null) => {
  const element = target as HTMLElement | null
  return (
    !!element &&
    (element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA' ||
      element.isContentEditable)
  )
}

const IconsGallery: React.FC<unknown> = () => {
  const theme = useTheme()
  const router = useRouter()
  const { setToast } = useToasts({ placement: 'bottomRight' })
  const { style, copyFormat, setCopyFormat, favorites, toggleFavorite } =
    useIconSettings()
  const { state: query, setState: setQuery, bindings } = useInput('')
  const [category, setCategory] = useState<Filter>('All')
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [customizing, setCustomizing] = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  // Filters live in the URL (?q=arrow&category=Arrows), so a search can be
  // shared. Read once on mount, written back on every change.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlCategory = params.get('category')
    setQuery(params.get('q') ?? '')
    if (
      urlCategory === FAVORITES ||
      categories.includes(urlCategory as Category)
    )
      setCategory(urlCategory as Filter)
    setReady(true)
  }, [setQuery])

  useEffect(() => {
    if (!ready) return
    const next: Record<string, string> = {}
    if (query) next.q = query
    if (category !== 'All') next.category = category
    router.replace({ pathname: router.pathname, query: next }, undefined, {
      shallow: true,
      scroll: false
    })
    // router is a new object on each navigation, only the filters matter here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, query, category])

  const icons = useMemo(() => {
    const words = query
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
    return allIcons.filter(
      (icon) =>
        (category === 'All' ||
          (category === FAVORITES
            ? favorites.includes(icon.name)
            : icon.category === category)) &&
        words.every((word) => icon.haystack.includes(word))
    )
  }, [query, category, favorites])

  useEffect(() => setLimit(PAGE_SIZE), [query, category])

  // "/" and Cmd/Ctrl+K jump to the search, Escape clears it
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const search = document.getElementById('icon-search')
      const shortcut =
        (event.key === '/' && !isTyping(event.target)) ||
        (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey))
      if (!shortcut || !search) return
      event.preventDefault()
      search.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const notify = useCallback(
    (text: string) => setToast({ text, type: 'secondary', delay: 2000 }),
    [setToast]
  )

  const getCopyText = useCallback(
    (icon: IconEntry) => {
      if (copyFormat === 'svg') return iconToSvg(icon, style)
      if (copyFormat === 'import') return getImportString(icon.name).normal
      if (copyFormat === 'name') return icon.name
      return buildJsx(icon.name, style)
    },
    [copyFormat, style]
  )

  const onActivate = useCallback(
    async (icon: IconEntry) => {
      if (selecting) {
        setSelected((current) =>
          current.includes(icon.name)
            ? current.filter((name) => name !== icon.name)
            : [...current, icon.name]
        )
        return
      }
      await copyText(getCopyText(icon))
      notify(`${icon.name} copied as ${formatLabels[copyFormat]}`)
    },
    [selecting, getCopyText, notify, copyFormat]
  )

  const selectedIcons = allIcons.filter((icon) => selected.includes(icon.name))

  const copySelected = async (kind: 'import' | 'jsx') => {
    const names = selectedIcons.map((icon) => icon.name)
    const text =
      kind === 'import'
        ? `import { ${names.join(', ')} } from '@bolio-ui/icons'`
        : selectedIcons.map((icon) => buildJsx(icon.name, style)).join('\n')
    await copyText(text)
    notify(`${names.length} icons copied`)
  }

  const downloadSelected = () => {
    const files = selectedIcons.map((icon) => ({
      name: `${icon.slug}.svg`,
      content: iconToSvg(icon, style)
    }))
    downloadBlob(`bolio-icons-${files.length}.zip`, makeZip(files))
    notify(`${files.length} SVGs downloaded`)
  }

  const stopSelecting = () => {
    setSelecting(false)
    setSelected([])
  }

  // Arrow keys move between tiles, following the grid's current columns
  const onGridKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const grid = gridRef.current
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    if (!grid || !keys.includes(event.key)) return
    const cells = Array.from(
      grid.querySelectorAll<HTMLElement>('[data-icon-cell]')
    )
    const current = cells.indexOf(document.activeElement as HTMLElement)
    if (current === -1) return
    const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length
    const step = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -columns,
      ArrowDown: columns
    }[event.key as 'ArrowLeft']
    const next = cells[current + step]
    if (!next) return
    event.preventDefault()
    next.focus()
  }

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
  }

  // What a click copies, shown with the first icon on screen
  const sample = icons[0] ?? allIcons[0]
  const sampleText = useMemo(() => {
    // The SVG is described, not rendered: rendering it here would flush a
    // React root in the middle of this component's own render
    const text =
      copyFormat === 'svg'
        ? `<svg width="${style.size}" height="${style.size}" viewBox="0 0 24 24" stroke="${
            style.color ?? 'currentColor'
          }" stroke-width="${style.strokeWidth}" ...>…</svg>`
        : getCopyText(sample)
    return text.length > MAX_PREVIEW ? `${text.slice(0, MAX_PREVIEW)}…` : text
  }, [copyFormat, style, getCopyText, sample])

  const shown = icons.slice(0, limit)
  const filtered = query !== '' || category !== 'All'

  return (
    <div style={getGalleryVars(theme)}>
      <div className={styles.toolbar}>
        <div className={styles.searchRow}>
          <div className={styles.search}>
            <Input
              id="icon-search"
              width="100%"
              icon={<Search />}
              placeholder={`Search ${allIcons.length} icons...  ( / )`}
              height={1.5}
              rounded
              clearable
              {...bindings}
            />
          </div>
          <CustomizeButton
            open={customizing}
            modified={!isDefaultStyle(style)}
            onClick={() => setCustomizing(!customizing)}
          />
        </div>
        <CategoryCarousel<Filter>
          value={category}
          onChange={setCategory}
          options={[
            { value: 'All', count: allIcons.length },
            { value: FAVORITES, count: favorites.length },
            ...categories.map((name) => ({
              value: name,
              count: categoryCounts[name]
            }))
          ]}
        />
      </div>

      <div className={styles.meta} aria-live="polite">
        <span>
          {icons.length} {icons.length === 1 ? 'icon' : 'icons'}
          {category !== 'All' && ` in ${category}`}
          {query && ` matching "${query}"`}
        </span>
        <div className={styles.metaActions}>
          {!selecting && (
            <div className={styles.formatLabel}>
              <span id="copy-format-label">Click an icon to copy as</span>
              <SegmentedControl
                scale={0.75}
                value={copyFormat}
                onChange={(value) => setCopyFormat(value as CopyFormat)}
                aria-labelledby="copy-format-label"
              >
                {(Object.keys(formatLabels) as CopyFormat[]).map((format) => (
                  <SegmentedControl.Item
                    key={format}
                    value={format}
                    title={formatHints[format]}
                  >
                    {formatLabels[format]}
                  </SegmentedControl.Item>
                ))}
              </SegmentedControl>
            </div>
          )}
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={selecting}
            onClick={() => (selecting ? stopSelecting() : setSelecting(true))}
          >
            {selecting ? 'Done' : 'Select'}
          </button>
          {filtered && (
            <button
              type="button"
              className={styles.clear}
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {!selecting && (
        <p className={styles.copyHint}>
          {formatHints[copyFormat]}
          <code className={styles.copySample} title={`Example: ${sample.name}`}>
            {sampleText}
          </code>
          <span className={styles.copyLegend}>
            <Star fontSize={12} /> favorite
            <ArrowUpRight fontSize={12} /> open the icon page
          </span>
        </p>
      )}

      {customizing && (
        <div className={styles.panelWrap} id="icon-customize">
          <CustomizePanel />
        </div>
      )}

      {icons.length > 0 ? (
        <div className={styles.grid} ref={gridRef} onKeyDown={onGridKeyDown}>
          {shown.map((icon) => (
            <IconsCell
              key={icon.name}
              icon={icon}
              style={style}
              selecting={selecting}
              selected={selected.includes(icon.name)}
              favorite={favorites.includes(icon.name)}
              copyFormat={copyFormat}
              onActivate={onActivate}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <Text my={0}>
            {category === FAVORITES && !query
              ? 'No favorites yet. Hover an icon and press the star.'
              : `No icons found${query ? ` for "${query}"` : ''}.`}
          </Text>
          <Button auto scale={0.75} rounded onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}

      {icons.length > shown.length && (
        <div className={styles.more}>
          <Button
            auto
            scale={0.85}
            rounded
            onClick={() => setLimit(limit + PAGE_SIZE)}
          >
            Show more ({icons.length - shown.length} left)
          </Button>
        </div>
      )}

      {selecting && (
        <div
          className={styles.selectionBar}
          role="region"
          aria-label="Selection"
        >
          <span className={styles.selectionCount}>
            {selected.length} selected
          </span>
          <Button
            auto
            scale={0.7}
            rounded
            onClick={() => setSelected(icons.map((icon) => icon.name))}
          >
            Select all {icons.length}
          </Button>
          <Button
            auto
            scale={0.7}
            rounded
            disabled={!selected.length}
            onClick={() => copySelected('import')}
          >
            Copy import
          </Button>
          <Button
            auto
            scale={0.7}
            rounded
            disabled={!selected.length}
            onClick={() => copySelected('jsx')}
          >
            Copy JSX
          </Button>
          <Button
            auto
            scale={0.7}
            rounded
            type="secondary"
            disabled={!selected.length}
            onClick={downloadSelected}
          >
            Download SVG zip
          </Button>
          <Button
            auto
            scale={0.7}
            rounded
            type="abort"
            onClick={() => setSelected([])}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  )
}

export default IconsGallery
