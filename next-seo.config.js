// Defaults for every page. Each page sets its own title, description,
// canonical and openGraph.url through NextSeo.
const SITE_URL = 'https://icons.bolio-ui.com'

const DefaultSEO = {
  defaultTitle: 'Bolio Icons - Simplicity, consistency and readability icons',
  titleTemplate: '%s | Bolio Icons',
  description:
    'Free, open source SVG icons for React. Simple, consistent and readable: copy the component or the SVG, customize it, or download the pack.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Bolio Icons',
    images: [
      {
        url: `${SITE_URL}/cover.png`,
        width: 2084,
        height: 2084,
        alt: 'Bolio Icons'
      }
    ]
  },
  twitter: {
    handle: '@bolio_ui',
    site: '@bolio_ui',
    cardType: 'summary_large_image'
  },
  additionalMetaTags: [
    { name: 'application-name', content: 'Bolio Icons' },
    { name: 'apple-mobile-web-app-title', content: 'Bolio Icons' },
    { name: 'format-detection', content: 'telephone=no' }
  ]
}

export default DefaultSEO
