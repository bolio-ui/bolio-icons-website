import React from 'react'
import {
  Section,
  Text,
  Container,
  Grid,
  Row,
  Link,
  useTheme
} from '@bolio-ui/core'
import { Github, Instagram, Twitter } from '@bolio-ui/icons'
import Logo from 'src/components/Logo'
import FooterMeta from './FooterMeta'
import styles from './Footer.module.css'

const socials = [
  {
    label: 'Github',
    href: 'https://github.com/bolio-ui/bolio-ui',
    Icon: Github
  },
  {
    label: 'Twitter',
    href: 'https://www.twitter.com/bolio_ui/',
    Icon: Twitter
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bolio.ui/',
    Icon: Instagram
  }
]

function Footer() {
  const theme = useTheme()

  return (
    <Section
      py={2}
      style={
        {
          borderTop: `1px solid ${theme.palette.border}`,
          '--footer-muted': theme.palette.accents_5,
          '--footer-foreground': theme.palette.foreground
        } as React.CSSProperties
      }
    >
      <Container style={{ maxWidth: 1300 }}>
        <Grid.Container gap={2} alignItems="center">
          <Grid xs={12} md={6}>
            <Logo name="Bolio Icons" />
            <div className={styles.tagline}>
              <Text
                font={0.85}
                my={0}
                style={{ color: theme.palette.accents_5 }}
              >
                Simplicity, consistency and readability icons.
              </Text>
              <div className={styles.social}>
                {socials.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label={`Link to ${label} Bolio UI`}
                  >
                    <Icon fontSize={15} />
                  </Link>
                ))}
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={6}>
            <div className={styles.links}>
              <Row justify="end" style={{ flexWrap: 'wrap', gap: 24 }}>
                <Link href="https://bolio-ui.com/docs/components/icons">
                  Docs
                </Link>
                <Link href="/download/bolio-ui-icons.zip">Download</Link>
                <Link href="https://bolio-ui.com" target="_blank">
                  Bolio UI
                </Link>
              </Row>
            </div>
          </Grid>
        </Grid.Container>
        <div
          style={{
            marginTop: theme.layout.gap,
            borderTop: `1px solid ${theme.palette.border}`,
            paddingTop: theme.layout.gap
          }}
        >
          <FooterMeta />
        </div>
      </Container>
    </Section>
  )
}

export default Footer
