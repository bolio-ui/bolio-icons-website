import React from 'react'
import type { BolioUIThemes } from '@bolio-ui/core/esm/Themes/Presets'
import { getContrastColor } from './contrast'

// CSS variables the gallery's stylesheet reads, shared with its placeholder
export const getGalleryVars = (theme: BolioUIThemes) =>
  ({
    '--gallery-bg': theme.palette.background,
    '--gallery-surface': theme.palette.accents_1,
    '--gallery-radius': theme.layout.radius,
    '--gallery-border': theme.palette.border,
    '--gallery-hover-border': theme.palette.accents_4,
    '--gallery-muted': theme.palette.accents_5,
    '--gallery-foreground': theme.palette.foreground,
    '--gallery-accent': theme.palette.secondary,
    '--gallery-accent-text': getContrastColor(theme.palette.secondary)
  }) as React.CSSProperties
