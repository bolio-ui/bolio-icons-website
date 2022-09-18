import React from 'react'
import { Section, Container, Image } from '@bolio-ui/core'
import { useMediaQuery } from 'src/hooks/useMediaQuery'
import Base from 'src/templates/Base'
import Hero from 'src/components/Hero'
import IconsGallery from 'src/components/IconsGallery'

function Home() {
  const isMobile = useMediaQuery(650)

  return (
    <>
      <Base>
        <Hero
          content={{
            title: 'Bolio Icons',
            description:
              'Collection of simply beautiful icons. Each icon is designed with an emphasis on simplicity, consistency and readability.'
          }}
        />
        <Section pb={4}>
          <Container>
            <IconsGallery />
          </Container>
        </Section>
      </Base>
      {isMobile ? (
        <>
          <Image
            src="/img/svg/gradient-left.svg"
            alt="home background gradient blue"
            style={{
              position: 'fixed',
              top: '-10%',
              right: '-35%',
              zIndex: 0
            }}
          />
          <Image
            src="/img/svg/gradient-right.svg"
            alt="docs background gradient violet"
            style={{
              position: 'fixed',
              top: '45%',
              left: '-35%',
              zIndex: 0
            }}
          />
        </>
      ) : (
        <>
          <Image
            src="/img/svg/gradient-left.svg"
            alt="docs background gradient blue"
            style={{
              position: 'fixed',
              bottom: '-50%',
              top: '-40%',
              right: '-35%',
              zIndex: 0
            }}
          />
          <Image
            src="/img/svg/gradient-right.svg"
            alt="docs background gradient violet"
            style={{
              position: 'fixed',
              bottom: '-50%',
              left: '-20%',
              right: '-50%',
              zIndex: 0
            }}
          />
        </>
      )}
    </>
  )
}

export default Home
