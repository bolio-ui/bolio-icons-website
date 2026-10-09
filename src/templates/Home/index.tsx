import React from 'react'
import { NextSeo } from 'next-seo'
import iconsPackage from '@bolio-ui/icons/package.json'
import JsonLd from 'src/components/JsonLd'
import { allIcons } from 'src/lib/icons'
import { homeJsonLd } from 'src/lib/jsonld'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'src/lib/site'
import { Section, Container } from '@bolio-ui/core'
import Base from 'src/templates/Base'
import Hero from 'src/components/Hero'
import IconsGallery from 'src/components/IconsGallery'
import SectionCapabilities from './SectionCapabilities'

function Home() {
  return (
    <Base>
      <NextSeo
        title={SITE_TITLE}
        titleTemplate="%s"
        description={SITE_DESCRIPTION}
        canonical={`${SITE_URL}/`}
        openGraph={{
          url: `${SITE_URL}/`,
          title: SITE_TITLE,
          description: SITE_DESCRIPTION
        }}
      />
      <JsonLd data={homeJsonLd(iconsPackage.version, allIcons.length)} />
      <Hero
        content={{
          title: 'Bolio Icons',
          description:
            'Collection of simply beautiful icons. Each icon is designed with an emphasis on simplicity, consistency and readability. 🥷🏼'
        }}
      />
      <Section pb={4}>
        <Container>
          <IconsGallery />
        </Container>
      </Section>
      <SectionCapabilities />
    </Base>
  )
}

export default Home
