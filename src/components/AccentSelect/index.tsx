import React from 'react'
import { Button, Popover, Themes, useTheme } from '@bolio-ui/core'
import { Droplet } from '@bolio-ui/icons'
import { accents, useSettings } from 'src/context/SettingsContext'
import styles from './AccentSelect.module.css'

const defaultColor = Themes.getPresetStaticTheme().palette.secondary

const AccentSelect: React.FC = () => {
  const theme = useTheme()
  const { accent, switchAccent } = useSettings()

  const content = () => (
    <div
      className={styles.accents}
      style={
        {
          '--accent-color': theme.palette.accents_5,
          '--accent-active-color': theme.palette.foreground,
          '--accent-focus': theme.palette.secondary,
          '--accent-bg': theme.palette.background
        } as React.CSSProperties
      }
    >
      {accents.map(({ name, color }) => (
        <button
          key={name}
          type="button"
          className={styles.accent}
          aria-label={`${name} accent`}
          aria-pressed={accent === name}
          onClick={() => switchAccent(name)}
        >
          <span
            className={styles.swatch}
            style={{ background: color ?? defaultColor }}
          />
          <span>{name}</span>
        </button>
      ))}
    </div>
  )

  return (
    <Popover content={content} placement="bottomEnd">
      <Button
        auto
        scale={0.75}
        rounded
        subtle
        icon={<Droplet />}
        className="accent-button"
        aria-label="Change theme color"
      >
        <span className="accent-label">Theme</span>
      </Button>
    </Popover>
  )
}

export default AccentSelect
