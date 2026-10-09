import React from 'react'
import { Slider, useTheme } from '@bolio-ui/core'
import { RotateCcw } from '@bolio-ui/icons'
import { useIconSettings } from 'src/context/IconSettings'
import { isDefaultStyle } from 'src/lib/icons'
import styles from './CustomizePanel.module.css'

const swatches = [
  '#111827',
  '#ffffff',
  '#8b5cf6',
  '#ef4444',
  '#22c55e',
  '#3b82f6',
  '#f59e0b'
]

interface Props {
  // The icon page previews larger, but shares the same preferences
  maxSize?: number
}

const CustomizePanel: React.FC<Props> = ({ maxSize = 64 }) => {
  const theme = useTheme()
  const { style, setStyle, resetStyle } = useIconSettings()

  return (
    <div
      className={styles.panel}
      style={
        {
          '--panel-border': theme.palette.border,
          '--panel-radius': theme.layout.radius,
          '--panel-bg': theme.palette.accents_1,
          '--panel-muted': theme.palette.accents_5,
          '--panel-foreground': theme.palette.foreground,
          '--panel-mono': theme.font.mono,
          '--panel-accent': theme.palette.secondary
        } as React.CSSProperties
      }
    >
      <div className={styles.header}>
        <span className={styles.title}>Customize icons</span>
        <button
          type="button"
          className={styles.reset}
          disabled={isDefaultStyle(style)}
          onClick={resetStyle}
        >
          <RotateCcw fontSize={14} />
          Reset
        </button>
      </div>

      <div className={styles.field}>
        <div className={styles.label}>
          <span>Size</span>
          <span className={styles.value}>{style.size}px</span>
        </div>
        <Slider
          hideValue
          type="secondary"
          min={16}
          max={maxSize}
          step={2}
          value={Math.min(style.size, maxSize)}
          onChange={(size) => setStyle({ size })}
          aria-label="Icon size"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.label}>
          <span>Stroke</span>
          <span className={styles.value}>{style.strokeWidth}</span>
        </div>
        <Slider
          hideValue
          type="secondary"
          min={0.5}
          max={3}
          step={0.25}
          value={style.strokeWidth}
          onChange={(strokeWidth) => setStyle({ strokeWidth })}
          aria-label="Stroke width"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.label}>
          <span>Color</span>
          <span className={styles.value}>{style.color ?? 'theme color'}</span>
        </div>
        <div className={styles.swatches}>
          <button
            type="button"
            className={styles.auto}
            title="Follows the theme's text color: dark in light mode, light in dark mode"
            aria-pressed={style.color === null}
            onClick={() => setStyle({ color: null })}
          >
            Default
          </button>
          {swatches.map((color) => (
            <button
              key={color}
              type="button"
              className={styles.swatch}
              style={{ backgroundColor: color }}
              aria-label={`Color ${color}`}
              aria-pressed={style.color === color}
              onClick={() => setStyle({ color })}
            />
          ))}
          <input
            type="color"
            className={styles.picker}
            aria-label="Custom color"
            value={style.color ?? '#8b5cf6'}
            onChange={(event) => setStyle({ color: event.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

export default CustomizePanel
