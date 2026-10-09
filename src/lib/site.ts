export const SITE_URL = 'https://icons.bolio-ui.com'
export const SITE_NAME = 'Bolio Icons'
export const SITE_TITLE =
  'Bolio Icons - Simplicity, consistency and readability icons'
export const SITE_DESCRIPTION =
  'Free, open source SVG icons for React. Simple, consistent and readable: copy the component or the SVG, customize it, or download the pack.'

export const OG_IMAGE = {
  url: `${SITE_URL}/cover.png`,
  width: 2084,
  height: 2084,
  alt: SITE_NAME
}

export const ORGANIZATION = {
  name: 'Bolio UI',
  url: 'https://bolio-ui.com',
  logo: `${SITE_URL}/img/favicon/android-icon-192x192.png`,
  sameAs: [
    'https://github.com/bolio-ui',
    'https://twitter.com/bolio_ui',
    'https://www.instagram.com/bolio.ui/'
  ]
}

export const LICENSE_URL = 'https://opensource.org/licenses/MIT'
export const iconSvgUrl = (slug: string) => `${SITE_URL}/svg/${slug}.svg`
export const iconOgImageUrl = (slug: string) => `${SITE_URL}/og/${slug}.png`
