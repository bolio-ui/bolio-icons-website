import React, { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Input,
  useInput,
  Modal,
  useModal,
  Snippet,
  Text,
  useTheme
} from '@bolio-ui/core'
import * as Icons from '@bolio-ui/icons'
import IconsCell, { getImportString } from './icons-cell'
import CategoryCarousel from './category-carousel'
import { categories, Category, getCategory, splitName } from './categories'
import { getContrastColor } from './contrast'
import styles from './IconsGallery.module.css'

const PAGE_SIZE = 96

const ImportSnippet: React.FC<React.PropsWithChildren<unknown>> = ({
  children
}) => {
  return (
    <Snippet
      toastText="Code copied!"
      toastType="secondary"
      text={children.toString()}
      rounded
    />
  )
}

const allIcons = Object.entries(Icons).map(([name, component]) => ({
  name,
  component,
  category: getCategory(name),
  // "ArrowDownLeft" is found by "arrow down", "down-left" or "navigation"
  haystack: `${splitName(name)} ${name.toLowerCase()} ${getCategory(
    name
  ).toLowerCase()}`
}))

const categoryCounts = categories.reduce(
  (acc, category) => ({
    ...acc,
    [category]: allIcons.filter((icon) => icon.category === category).length
  }),
  {} as Record<Category, number>
)

const IconsGallery: React.FC<unknown> = () => {
  const theme = useTheme()
  const { setVisible, bindings: modalBindings } = useModal()
  const { state: query, setState: setQuery, bindings } = useInput('')
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [importStr, setImportStr] = useState({
    title: '',
    single: '',
    normal: ''
  })

  const icons = useMemo(() => {
    const words = query
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
    return allIcons.filter(
      (icon) =>
        (category === 'All' || icon.category === category) &&
        words.every((word) => icon.haystack.includes(word))
    )
  }, [query, category])

  useEffect(() => setLimit(PAGE_SIZE), [query, category])

  const onCellClick = (name: string) => {
    const { single, normal } = getImportString(name)
    setImportStr({ title: name, single, normal })
    setVisible(true)
  }

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
  }

  const shown = icons.slice(0, limit)
  const filtered = query !== '' || category !== 'All'

  return (
    <div
      style={
        {
          '--gallery-bg': theme.palette.background,
          '--gallery-border': theme.palette.border,
          '--gallery-hover-border': theme.palette.accents_4,
          '--gallery-muted': theme.palette.accents_5,
          '--gallery-foreground': theme.palette.foreground,
          '--gallery-accent': theme.palette.secondary,
          '--gallery-accent-text': getContrastColor(theme.palette.secondary)
        } as React.CSSProperties
      }
    >
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Input
            width="100%"
            icon={<Icons.Search />}
            placeholder={`Search ${allIcons.length} icons...`}
            height={1.5}
            rounded
            clearable
            {...bindings}
          />
        </div>
        <CategoryCarousel<Category | 'All'>
          value={category}
          onChange={setCategory}
          options={[
            { value: 'All', count: allIcons.length },
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
        {filtered && (
          <button type="button" className={styles.clear} onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {icons.length > 0 ? (
        <div className={styles.grid}>
          {shown.map(({ name, component }) => (
            <IconsCell
              name={name}
              component={component}
              key={name}
              onClick={onCellClick}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <Text my={0}>No icons found{query && ` for "${query}"`}.</Text>
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

      <Modal width="30rem" {...modalBindings}>
        <Modal.Title style={{ fontWeight: 600 }}>{importStr.title}</Modal.Title>
        <Modal.Content>
          <p>{'Import:'}</p>
          <ImportSnippet>{importStr.normal}</ImportSnippet>
          <p>{'Import single component:'}</p>
          <ImportSnippet>{importStr.single}</ImportSnippet>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default IconsGallery
