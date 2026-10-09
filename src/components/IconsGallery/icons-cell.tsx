import React from 'react'
import NextLink from 'next/link'
import { Text, useTheme } from '@bolio-ui/core'
import { ArrowUpRight, Check, Star } from '@bolio-ui/icons'
import { IconEntry, IconStyle } from 'src/lib/icons'
import styles from './IconsGallery.module.css'

interface Props {
  icon: IconEntry
  style: IconStyle
  selecting: boolean
  selected: boolean
  favorite: boolean
  copyFormat: string
  onActivate: (icon: IconEntry) => void
  onToggleFavorite: (name: string) => void
}

const IconsCell: React.FC<Props> = ({
  icon,
  style,
  selecting,
  selected,
  favorite,
  copyFormat,
  onActivate,
  onToggleFavorite
}) => {
  const theme = useTheme()
  // Without a chosen color the icon and its name follow the theme's text
  const color = style.color ?? theme.palette.foreground
  const Component = icon.component

  return (
    <div className={styles.cell} data-selected={selected || undefined}>
      <div
        className={styles.tileCard}
        role="button"
        tabIndex={0}
        data-icon-cell
        aria-label={`${selecting ? 'Select' : 'Copy'} ${icon.name}`}
        aria-pressed={selecting ? selected : undefined}
        title={
          selecting
            ? `Select ${icon.name}`
            : `Copy ${icon.name} as ${copyFormat.toUpperCase()}`
        }
        onClick={() => onActivate(icon)}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onActivate(icon)
          }
        }}
      >
        <div className={styles.tile} style={{ color }}>
          <span className={styles.tileIcon} style={{ fontSize: style.size }}>
            <Component strokeWidth={style.strokeWidth} aria-hidden />
          </span>
          <Text b font="12px" style={{ color }}>
            {icon.name}
          </Text>
        </div>
      </div>

      {selecting ? (
        selected && (
          <span className={styles.badge}>
            <Check fontSize={14} />
          </span>
        )
      ) : (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.action}
            aria-label={`${favorite ? 'Remove' : 'Add'} ${icon.name} ${
              favorite ? 'from' : 'to'
            } favorites`}
            aria-pressed={favorite}
            title={`${favorite ? 'Remove from' : 'Add to'} favorites`}
            onClick={() => onToggleFavorite(icon.name)}
          >
            <Star fontSize={14} fill={favorite ? 'currentColor' : 'none'} />
          </button>
          <NextLink
            href={`/icons/${icon.slug}`}
            className={styles.action}
            aria-label={`Open the ${icon.name} page`}
            title={`Open the ${icon.name} page`}
          >
            <ArrowUpRight fontSize={14} />
          </NextLink>
        </div>
      )}
    </div>
  )
}

export default React.memo(IconsCell)
