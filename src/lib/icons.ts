import { createElement } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import * as Icons from '@bolio-ui/icons'
import {
  getCategory,
  splitName,
  Category
} from 'src/components/IconsGallery/categories'
import { keywords } from './keywords'

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

export interface IconEntry {
  name: string
  slug: string
  component: IconComponent
  category: Category
  keywords: string
  haystack: string
}

// "ArrowDownLeft" -> "arrow-down-left", used in the icon page URL
export const toSlug = (name: string) => splitName(name).replace(/ /g, '-')

export const allIcons: IconEntry[] = Object.entries(Icons)
  .filter(([name]) => /^[A-Z]/.test(name))
  .map(([name, component]) => {
    const category = getCategory(name)
    const extra = keywords[name] ?? ''
    return {
      name,
      slug: toSlug(name),
      component: component as IconComponent,
      category,
      keywords: extra,
      // "ArrowDownLeft" is found by "arrow down", "down-left", "navigation"
      // or any of its synonyms
      haystack: `${splitName(name)} ${name.toLowerCase()} ${category.toLowerCase()} ${extra}`
    }
  })

const bySlug = new Map(allIcons.map((icon) => [icon.slug, icon]))
export const getIconBySlug = (slug: string) => bySlug.get(slug)

export const getFileName = (name: string): string =>
  name.replace(/^(.)/, (g) => g.toLowerCase())

export const getImportString = (name: string) => ({
  single: `import ${name} from '@bolio-ui/icons/${getFileName(name)}'`,
  normal: `import { ${name} } from '@bolio-ui/icons'`
})

export const PACKAGE_NAME = '@bolio-ui/icons'

export const installCommands = {
  yarn: `yarn add ${PACKAGE_NAME}`,
  npm: `npm install ${PACKAGE_NAME}`,
  pnpm: `pnpm add ${PACKAGE_NAME}`
} as const
export type PackageManager = keyof typeof installCommands

export interface IconStyle {
  size: number
  strokeWidth: number
  color: string | null
}

export const DEFAULT_STYLE: IconStyle = {
  size: 24,
  strokeWidth: 2,
  color: null
}

export const isDefaultStyle = (style: IconStyle) =>
  style.size === DEFAULT_STYLE.size &&
  style.strokeWidth === DEFAULT_STYLE.strokeWidth &&
  style.color === DEFAULT_STYLE.color

// Only what differs from the component's own defaults, so the copied code
// stays as short as possible
export const buildJsx = (name: string, style: IconStyle) => {
  const props = [
    style.size !== DEFAULT_STYLE.size &&
      `width={${style.size}} height={${style.size}}`,
    style.strokeWidth !== DEFAULT_STYLE.strokeWidth &&
      `strokeWidth={${style.strokeWidth}}`,
    style.color && `color="${style.color}"`
  ].filter(Boolean)
  return `<${name}${props.length ? ` ${props.join(' ')}` : ''} />`
}

export const buildComponentSource = (name: string, style: IconStyle) =>
  `import { ${name} } from '${PACKAGE_NAME}'

export function ${name}Icon() {
  return ${buildJsx(name, style)}
}`

// Renders the icon off screen and returns a standalone SVG: explicit size,
// no component class names, and the chosen color and stroke baked in.
export const iconToSvg = (icon: IconEntry, style: IconStyle): string => {
  const host = document.createElement('div')
  const root = createRoot(host)
  flushSync(() => root.render(createElement(icon.component)))
  const svg = host.querySelector('svg')
  if (!svg) {
    root.unmount()
    return ''
  }
  svg.removeAttribute('class')
  svg.setAttribute('width', String(style.size))
  svg.setAttribute('height', String(style.size))
  svg.setAttribute('stroke-width', String(style.strokeWidth))
  if (style.color) svg.setAttribute('stroke', style.color)
  const markup = svg.outerHTML
  root.unmount()
  return markup
}

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // older browsers and insecure contexts
    const area = document.createElement('textarea')
    area.value = text
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    area.remove()
  }
}

export const downloadBlob = (filename: string, blob: Blob) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export const svgToPngBlob = (svg: string, size: number): Promise<Blob> =>
  new Promise((resolve, reject) => {
    // currentColor has no page to inherit from inside an image
    const source = svg.replace(/currentColor/g, '#000000')
    const image = new Image()
    image.onload = () => {
      const scale = 2
      const canvas = document.createElement('canvas')
      canvas.width = size * scale
      canvas.height = size * scale
      const context = canvas.getContext('2d')
      if (!context) return reject(new Error('Canvas is not available'))
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('PNG failed'))),
        'image/png'
      )
    }
    image.onerror = () => reject(new Error('Could not load the SVG'))
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`
  })

// Minimal zip writer (stored, no compression): SVGs are tiny, and it avoids a
// dependency for a single feature.
const crcTable = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

const crc32 = (bytes: Uint8Array) => {
  let crc = 0xffffffff
  for (let i = 0; i < bytes.length; i++)
    crc = crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

export const makeZip = (files: { name: string; content: string }[]): Blob => {
  const encoder = new TextEncoder()
  const parts: Uint8Array[] = []
  const central: Uint8Array[] = []
  let offset = 0

  files.forEach(({ name, content }) => {
    const nameBytes = encoder.encode(name)
    const data = encoder.encode(content)
    const crc = crc32(data)

    const local = new DataView(new ArrayBuffer(30))
    local.setUint32(0, 0x04034b50, true)
    local.setUint16(4, 20, true)
    local.setUint16(6, 0x0800, true) // utf-8 names
    local.setUint32(14, crc, true)
    local.setUint32(18, data.length, true)
    local.setUint32(22, data.length, true)
    local.setUint16(26, nameBytes.length, true)
    parts.push(new Uint8Array(local.buffer), nameBytes, data)

    const entry = new DataView(new ArrayBuffer(46))
    entry.setUint32(0, 0x02014b50, true)
    entry.setUint16(4, 20, true)
    entry.setUint16(6, 20, true)
    entry.setUint16(8, 0x0800, true)
    entry.setUint32(16, crc, true)
    entry.setUint32(20, data.length, true)
    entry.setUint32(24, data.length, true)
    entry.setUint16(28, nameBytes.length, true)
    entry.setUint32(42, offset, true)
    central.push(new Uint8Array(entry.buffer), nameBytes)

    offset += 30 + nameBytes.length + data.length
  })

  const centralSize = central.reduce((sum, part) => sum + part.length, 0)
  const end = new DataView(new ArrayBuffer(22))
  end.setUint32(0, 0x06054b50, true)
  end.setUint16(8, files.length, true)
  end.setUint16(10, files.length, true)
  end.setUint32(12, centralSize, true)
  end.setUint32(16, offset, true)

  return new Blob(
    [...parts, ...central, new Uint8Array(end.buffer)] as BlobPart[],
    {
      type: 'application/zip'
    }
  )
}
