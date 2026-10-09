import {
  LICENSE_URL,
  ORGANIZATION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL
} from './site'

const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

const organization = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: ORGANIZATION.name,
  url: ORGANIZATION.url,
  logo: { '@type': 'ImageObject', url: ORGANIZATION.logo },
  sameAs: ORGANIZATION.sameAs
}

// The search box is a real feature: the home page reads ?q= from the URL
const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
}

export const homeJsonLd = (version: string, iconCount: number) => ({
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    website,
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': `${SITE_URL}/#software` }
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: '@bolio-ui/icons',
      description: `${iconCount} SVG icons as React components.`,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      softwareVersion: version,
      license: LICENSE_URL,
      downloadUrl: `${SITE_URL}/download/bolio-ui-icons.zip`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@id': ORGANIZATION_ID }
    }
  ]
})

interface IconPage {
  name: string
  slug: string
  category: string
  keywords: string
  description: string
  svgUrl: string
}

export const iconJsonLd = (icon: IconPage) => {
  const url = `${SITE_URL}/icons/${icon.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${icon.name} icon`,
        description: icon.description,
        inLanguage: 'en',
        isPartOf: { '@id': WEBSITE_ID },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        primaryImageOfPage: { '@id': `${url}#image` }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: SITE_NAME,
            item: `${SITE_URL}/`
          },
          { '@type': 'ListItem', position: 2, name: icon.name, item: url }
        ]
      },
      {
        '@type': 'ImageObject',
        '@id': `${url}#image`,
        name: `${icon.name} icon`,
        description: icon.description,
        contentUrl: icon.svgUrl,
        url: icon.svgUrl,
        encodingFormat: 'image/svg+xml',
        keywords: [icon.category, ...icon.keywords.split(' ')]
          .filter(Boolean)
          .join(', '),
        license: LICENSE_URL,
        acquireLicensePage: `${SITE_URL}/`,
        creditText: SITE_NAME,
        creator: { '@id': ORGANIZATION_ID }
      },
      organization,
      website
    ]
  }
}
