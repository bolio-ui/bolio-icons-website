// Generated before each build (see "prebuild"):
//   public/svg/<slug>.svg  one standalone SVG per icon, so each icon page has
//                          a real image URL for ImageObject and Google Images
//   public/og/<slug>.png   1200x630 social preview of each icon
//   public/sitemap.xml     home + every icon page, with lastmod and the image
//   public/robots.txt
const fs = require('fs')
const { execSync } = require('child_process')
const path = require('path')
const React = require('react')
const ts = require('typescript')
const { renderToStaticMarkup } = require('react-dom/server')
const { Resvg } = require('@resvg/resvg-js')
const Icons = require('@bolio-ui/icons')
const iconsPackage = require('@bolio-ui/icons/package.json')

const SITE_URL = 'https://icons.bolio-ui.com'
const publicDir = path.join(__dirname, '..', 'public')
const svgDir = path.join(publicDir, 'svg')
const ogDir = path.join(publicDir, 'og')
const fontsDir = path.join(__dirname, 'fonts')

// Same rule as toSlug in src/lib/icons.ts
const toSlug = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/ /g, '-')

const escapeXml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// The category rules live in the app (TypeScript); they are compiled here so
// there is a single copy of them
const loadCategories = () => {
  const file = path.join(
    __dirname,
    '..',
    'src/components/IconsGallery/categories.ts'
  )
  const { outputText } = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  })
  const compiled = { exports: {} }
  new Function('module', 'exports', outputText)(compiled, compiled.exports)
  return compiled.exports
}
const { getCategory } = loadCategories()

const names = Object.keys(Icons).filter((name) => /^[A-Z]/.test(name))

const LOGO_PATHS = [
  'M88.21,182.47c-.42-1.33,0,2.25,1.71,5.09,26.52,44.72,52.28,89.92,80.06,133.85C208.53,382.33,285.9,401,348.22,366c62.55-35.15,87-111.85,55.95-175.35-31.52-64.39-104.55-92.59-171.89-66C184.51,143.51,137,162.89,88.21,182.47Z',
  'M82.65,298.07c-1.06-.9,1.22,1.89,4.16,3.4,46.26,23.71,92.14,48.25,139.06,70.62,65.07,31,140.5,5.63,174.59-57.21,34.22-63.06,14.07-141-46.06-178.19C293.44,99,216.61,114,173.78,172.39,143.4,213.8,113.47,255.54,82.65,298.07Z'
]

// 1200x630 social preview: the icon on the left, its name on the right
const ogSvg = ({ name, category, inner }) => {
  const size = name.length <= 10 ? 84 : name.length <= 13 ? 72 : 60
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="85%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0f0d23"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="80.5" y="135.5" width="359" height="359" rx="40" fill="#181532" stroke="#2f2a5c"/>
  <g transform="translate(152 207) scale(9)" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</g>
  <g transform="translate(500 150) scale(0.1)" fill="#c25fff">${LOGO_PATHS.map((d) => `<path d="${d}"/>`).join('')}</g>
  <text x="560" y="182" font-family="Inter" font-weight="500" font-size="28" fill="#a9a4c9">Bolio Icons</text>
  <text x="500" y="320" font-family="Inter" font-weight="600" font-size="${size}" fill="#ffffff">${escapeXml(name)}</text>
  <text x="500" y="378" font-family="Inter" font-weight="500" font-size="30" fill="#a9a4c9">Free SVG icon for React</text>
  <rect x="500.5" y="420.5" width="${category.length * 13 + 44}" height="40" rx="20" fill="none" stroke="#3a3470"/>
  <text x="522" y="447" font-family="Inter" font-weight="500" font-size="22" fill="#a9a4c9">${escapeXml(category)}</text>
  <text x="1120" y="570" text-anchor="end" font-family="Inter" font-weight="500" font-size="24" fill="#7a75a0">icons.bolio-ui.com</text>
</svg>`
}

const renderOg = (svg) =>
  new Resvg(svg, {
    font: {
      fontFiles: [
        path.join(fontsDir, 'Inter_500Medium.ttf'),
        path.join(fontsDir, 'Inter_600SemiBold.ttf')
      ],
      loadSystemFonts: false,
      defaultFontFamily: 'Inter'
    }
  })
    .render()
    .asPng()

// lastmod says when the pages last really changed. The build date would
// change on every deploy and teach crawlers to ignore it, so it is the most
// recent of: the publish date of the installed icons version (new icons) and
// the last commit that touched the site (design and content changes).
const getPublishDate = async () => {
  try {
    const response = await fetch(
      'https://registry.npmjs.org/@bolio-ui%2ficons',
      {
        signal: AbortSignal.timeout(5000)
      }
    )
    const { time } = await response.json()
    return time[iconsPackage.version]
  } catch {
    return null
  }
}

const getCommitDate = () => {
  try {
    return execSync('git log -1 --format=%cI -- src public/download scripts', {
      cwd: path.join(__dirname, '..'),
      stdio: ['ignore', 'pipe', 'ignore']
    })
      .toString()
      .trim()
  } catch {
    return null
  }
}

const getLastmod = async () => {
  const dates = [await getPublishDate(), getCommitDate()]
    .filter(Boolean)
    .map((date) => new Date(date))
    .filter((date) => !Number.isNaN(date.getTime()))
  const latest = dates.length ? new Date(Math.max(...dates)) : new Date()
  return latest.toISOString().slice(0, 10)
}

const main = async () => {
  fs.rmSync(svgDir, { recursive: true, force: true })
  fs.rmSync(ogDir, { recursive: true, force: true })
  fs.mkdirSync(svgDir, { recursive: true })
  fs.mkdirSync(ogDir, { recursive: true })

  const entries = names.map((name) => {
    const slug = toSlug(name)
    const markup = renderToStaticMarkup(React.createElement(Icons[name]))
    // the shapes of the icon, without its <svg> wrapper
    const inner = markup.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
    const svg = markup
      // the generated class names only matter inside React
      .replace(/ class="[^"]*"/, '')
      // standalone files have no text color to inherit
      .replace(/currentColor/g, '#111827')
      .replace('width="1em" height="1em"', 'width="24" height="24"')
    fs.writeFileSync(path.join(svgDir, `${slug}.svg`), svg)
    fs.writeFileSync(
      path.join(ogDir, `${slug}.png`),
      renderOg(ogSvg({ name, category: getCategory(name), inner }))
    )
    return { name, slug }
  })

  const lastmod = await getLastmod()

  const urls = [
    [
      '<url>',
      `<loc>${SITE_URL}/</loc>`,
      `<lastmod>${lastmod}</lastmod>`,
      '</url>'
    ],
    ...entries.map(({ name, slug }) => [
      '<url>',
      `<loc>${SITE_URL}/icons/${slug}</loc>`,
      `<lastmod>${lastmod}</lastmod>`,
      '<image:image>',
      `<image:loc>${SITE_URL}/svg/${slug}.svg</image:loc>`,
      `<image:title>${escapeXml(name)} icon</image:title>`,
      '</image:image>',
      '</url>'
    ])
  ]

  // Built from lines, not template literals: the indentation of the code
  // would end up inside the files
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls.map((lines) => lines.map((line) => `  ${line}`).join('\n')),
    '</urlset>',
    ''
  ].join('\n')

  // Nothing is blocked: Google needs the scripts and styles to render the
  // pages. Filtered views (?q=, ?category=) declare the home as canonical.
  const robots = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    ''
  ].join('\n')

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots)
  console.log(
    `SEO: ${entries.length} svgs and images, ${urls.length} urls in sitemap.xml, lastmod ${lastmod}`
  )
}

main()
