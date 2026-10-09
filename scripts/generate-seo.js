// Generated before each build (see "prebuild"):
//   public/svg/<slug>.svg  one standalone SVG per icon, so each icon page has
//                          a real image URL for ImageObject and Google Images
//   public/sitemap.xml     home + every icon page, with lastmod and the image
//   public/robots.txt
const fs = require('fs')
const path = require('path')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const Icons = require('@bolio-ui/icons')

const SITE_URL = 'https://icons.bolio-ui.com'
const publicDir = path.join(__dirname, '..', 'public')
const svgDir = path.join(publicDir, 'svg')

// Same rule as toSlug in src/lib/icons.ts
const toSlug = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/ /g, '-')

const escapeXml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const names = Object.keys(Icons).filter((name) => /^[A-Z]/.test(name))

fs.rmSync(svgDir, { recursive: true, force: true })
fs.mkdirSync(svgDir, { recursive: true })

const entries = names.map((name) => {
  const slug = toSlug(name)
  const markup = renderToStaticMarkup(React.createElement(Icons[name]))
    // the generated class names only matter inside React
    .replace(/ class="[^"]*"/, '')
    // standalone files have no text color to inherit
    .replace(/currentColor/g, '#111827')
    .replace('width="1em" height="1em"', 'width="24" height="24"')
  fs.writeFileSync(path.join(svgDir, `${slug}.svg`), markup)
  return { name, slug }
})

const lastmod = new Date().toISOString().slice(0, 10)

const pages = [
  `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  ...entries.map(
    ({ name, slug }) => `  <url>
    <loc>${SITE_URL}/icons/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <image:image>
      <image:loc>${SITE_URL}/svg/${slug}.svg</image:loc>
      <image:title>${escapeXml(name)} icon</image:title>
    </image:image>
  </url>`
  )
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.join('\n')}
</urlset>
`

// Nothing is blocked: Google needs the scripts and styles to render the pages.
// Filtered views (?q=, ?category=) all declare the home page as canonical.
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots)
console.log(`SEO: ${entries.length} svgs, ${pages.length} urls in sitemap.xml`)
