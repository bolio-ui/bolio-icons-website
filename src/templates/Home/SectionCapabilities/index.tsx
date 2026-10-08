import React from 'react'
import Image from 'next/image'
import { Section, Container, Text, Button, useTheme } from '@bolio-ui/core'
import {
  Activity,
  Airplay,
  Heart,
  Search,
  Sun,
  Moon,
  Download
} from '@bolio-ui/icons'
import Eyebrow from 'src/components/Eyebrow'
import styles from './SectionCapabilities.module.css'

const sampleIcons = [
  { name: 'Activity', Icon: Activity },
  { name: 'Airplay', Icon: Airplay },
  { name: 'Heart', Icon: Heart },
  { name: 'Search', Icon: Search },
  { name: 'Sun', Icon: Sun },
  { name: 'Moon', Icon: Moon }
]

const components = [
  { title: 'Text', image: '/img/png/home/typography.png' },
  { title: 'Icons', image: '/img/png/home/icons.png' },
  { title: 'Button', image: '/img/png/home/button.png' }
]

function SectionCapabilities() {
  const theme = useTheme()
  const [active, setActive] = React.useState(0)
  const panelsRef = React.useRef<Array<HTMLDivElement | null>>([])

  const panels = [
    { id: 'icons', label: 'Icons', color: theme.palette.primary },
    { id: 'usage', label: 'Usage', color: theme.palette.secondary },
    { id: 'download', label: 'Download', color: theme.palette.success },
    { id: 'bolio-ui', label: 'Bolio UI', color: theme.palette.warning }
  ]

  React.useEffect(() => {
    // The panel crossing the middle of the viewport is the active one.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(panelsRef.current.indexOf(entry.target as HTMLDivElement))
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    panelsRef.current.forEach((panel) => panel && observer.observe(panel))
    return () => observer.disconnect()
  }, [])

  return (
    <Section
      py={5}
      style={
        {
          '--cap-mono': theme.font.mono,
          '--cap-muted': theme.palette.accents_5,
          '--cap-strong': theme.palette.accents_6,
          '--cap-foreground': theme.palette.foreground,
          '--cap-border': theme.palette.border,
          '--cap-radius': theme.layout.radius,
          '--cap-bg': theme.palette.accents_1,
          '--cap-page-bg': theme.palette.background,
          '--cap-hover-border': theme.palette.accents_3
        } as React.CSSProperties
      }
    >
      <Container style={{ maxWidth: 1300 }}>
        <div className={styles.capabilities}>
          <nav className={styles.rail}>
            <Text className={styles.railTitle} font={0.75} my={0} mb={1.5}>
              What you get
            </Text>
            {panels.map((panel, index) => (
              <a
                key={panel.id}
                href={`#capability-${panel.id}`}
                className={`${styles.railItem} ${active === index ? styles.active : ''}`}
              >
                <span
                  className={styles.railBar}
                  style={{ backgroundColor: panel.color }}
                />
                {panel.label}
              </a>
            ))}
          </nav>

          <div className={styles.panels}>
            <div
              id="capability-icons"
              className={styles.panel}
              ref={(el) => {
                panelsRef.current[0] = el
              }}
            >
              <Eyebrow>Icons</Eyebrow>
              <Text h2 my={0} mb={1}>
                Simple, consistent and readable.
              </Text>
              <Text font={1.2} mt={0} className={styles.panelDescription}>
                Every icon is designed on the same grid, with the same stroke,
                so they look right side by side at any size.
              </Text>
              <div className={styles.card}>
                <div className={styles.cardBar}>
                  <span className={styles.muted}>icons</span>
                  <span className={styles.muted}>/</span>
                  <span>preview</span>
                </div>
                <div className={styles.iconsGrid}>
                  {sampleIcons.map(({ name, Icon }) => (
                    <div key={name} className={styles.iconItem}>
                      <Icon fontSize={24} />
                      <span className={styles.muted}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="capability-usage"
              className={styles.panel}
              ref={(el) => {
                panelsRef.current[1] = el
              }}
            >
              <Eyebrow>
                <span style={{ color: theme.palette.secondary }}>Usage</span>
              </Eyebrow>
              <Text h2 my={0} mb={1}>
                Import only what you need.
              </Text>
              <Text font={1.2} mt={0} className={styles.panelDescription}>
                Install the package and import icons by name, or one by one to
                keep your bundle as small as possible.
              </Text>
              <div className={styles.card}>
                <div className={styles.cardBar}>
                  <span className={styles.muted}>terminal</span>
                  <span className={styles.muted}>/</span>
                  <span>@bolio-ui/icons</span>
                </div>
                <div className={styles.codeBody}>
                  <pre className={styles.code}>
                    <span className={styles.mutedText}>
                      yarn add @bolio-ui/icons
                    </span>
                  </pre>
                  <pre className={styles.code}>
                    <span style={{ color: theme.palette.secondary }}>
                      {"import { Heart } from '@bolio-ui/icons'"}
                    </span>
                    {'\n'}
                    <span className={styles.mutedText}>
                      {"import Heart from '@bolio-ui/icons/heart'"}
                    </span>
                  </pre>
                </div>
              </div>
            </div>

            <div
              id="capability-download"
              className={styles.panel}
              ref={(el) => {
                panelsRef.current[2] = el
              }}
            >
              <Eyebrow>
                <span style={{ color: theme.palette.success }}>Download</span>
              </Eyebrow>
              <Text h2 my={0} mb={1}>
                Take the whole pack.
              </Text>
              <Text font={1.2} mt={0} className={styles.panelDescription}>
                Prefer working in your design tool? Download every icon as SVG
                and use them anywhere.
              </Text>
              <div className={styles.card}>
                <div className={styles.cardBar}>
                  <span className={styles.muted}>download</span>
                  <span className={styles.muted}>/</span>
                  <span>bolio-ui-icons.zip</span>
                </div>
                <div className={styles.fileBody}>
                  <div className={styles.fileInfo}>
                    <Text b my={0}>
                      Bolio UI Icons
                    </Text>
                    <Text my={0} className={styles.mutedText}>
                      All icons in SVG, free to use in personal and commercial
                      projects.
                    </Text>
                  </div>
                  <a href="/download/bolio-ui-icons.zip" download>
                    <Button auto scale={0.85} rounded icon={<Download />}>
                      Download Pack
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <div
              id="capability-bolio-ui"
              className={styles.panel}
              ref={(el) => {
                panelsRef.current[3] = el
              }}
            >
              <Eyebrow>
                <span style={{ color: theme.palette.warning }}>Bolio UI</span>
              </Eyebrow>
              <Text h2 my={0} mb={1}>
                Build even faster with Bolio UI.
              </Text>
              <Text font={1.2} mt={0} className={styles.panelDescription}>
                Premade responsive components designed and built by Bolio UI,
                ready for your next website.
              </Text>
              <a
                href="https://bolio-ui.com/docs/guide/"
                target="_blank"
                rel="noopener"
                className={styles.card}
              >
                <div className={styles.cardBar}>
                  <span className={styles.muted}>docs</span>
                  <span className={styles.muted}>/</span>
                  <span>components</span>
                </div>
                <div className={styles.componentsGrid}>
                  {components.map((component) => (
                    <div key={component.title} className={styles.componentItem}>
                      <Image
                        src={component.image}
                        alt={`${component.title} component`}
                        width={180}
                        height={121}
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <Text b my={0} mt={0.5}>
                        {component.title}
                      </Text>
                    </div>
                  ))}
                </div>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default SectionCapabilities
