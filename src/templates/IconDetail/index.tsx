import React, { useCallback } from 'react'
import NextLink from 'next/link'
import { NextSeo } from 'next-seo'
import {
  Button,
  Container,
  Section,
  Snippet,
  Text,
  useTheme,
  useToasts
} from '@bolio-ui/core'
import { ArrowLeft, Star } from '@bolio-ui/icons'
import Base from 'src/templates/Base'
import CustomizePanel from 'src/components/CustomizePanel'
import PackageManagerTabs from 'src/components/PackageManagerTabs'
import { useIconSettings } from 'src/context/IconSettings'
import {
  allIcons,
  buildComponentSource,
  buildJsx,
  copyText,
  downloadBlob,
  getImportString,
  IconEntry,
  iconToSvg,
  svgToPngBlob
} from 'src/lib/icons'
import JsonLd from 'src/components/JsonLd'
import { iconJsonLd } from 'src/lib/jsonld'
import { iconOgImageUrl, iconSvgUrl, SITE_NAME, SITE_URL } from 'src/lib/site'
import styles from './IconDetail.module.css'

const PREVIEW_SCALE = 3
const RELATED_LIMIT = 18

const IconDetail: React.FC<{ icon: IconEntry }> = ({ icon }) => {
  const theme = useTheme()
  const { setToast } = useToasts({ placement: 'bottomRight' })
  const { style, favorites, toggleFavorite } = useIconSettings()
  const Component = icon.component
  const favorite = favorites.includes(icon.name)
  const imports = getImportString(icon.name)
  const related = allIcons
    .filter((item) => item.category === icon.category && item !== icon)
    .slice(0, RELATED_LIMIT)

  const notify = useCallback(
    (text: string) => setToast({ text, type: 'secondary', delay: 2000 }),
    [setToast]
  )

  const copy = async (text: string, label: string) => {
    await copyText(text)
    notify(`${label} copied`)
  }

  const downloadSvg = () => {
    downloadBlob(
      `${icon.slug}.svg`,
      new Blob([iconToSvg(icon, style)], { type: 'image/svg+xml' })
    )
  }

  const downloadPng = async () => {
    try {
      const png = await svgToPngBlob(iconToSvg(icon, style), style.size)
      downloadBlob(`${icon.slug}.png`, png)
    } catch {
      notify('Could not create the PNG')
    }
  }

  const title = `${icon.name} icon`
  const url = `${SITE_URL}/icons/${icon.slug}`
  const synonyms = icon.keywords.split(' ').slice(0, 4).join(', ')
  // Search results show about 155 characters
  const description = `${icon.name} icon${
    synonyms ? ` (${synonyms})` : ''
  }: a free ${icon.category.toLowerCase()} SVG icon from ${SITE_NAME}. Copy the React component or the SVG, customize it, or download.`

  return (
    <Base>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title: `${title} | ${SITE_NAME}`,
          description,
          images: [
            {
              url: iconOgImageUrl(icon.slug),
              width: 1200,
              height: 630,
              alt: `${icon.name} icon`
            }
          ]
        }}
      />
      <JsonLd
        data={iconJsonLd({
          name: icon.name,
          slug: icon.slug,
          category: icon.category,
          keywords: icon.keywords,
          description,
          svgUrl: iconSvgUrl(icon.slug)
        })}
      />
      <Section py={2}>
        <Container
          style={
            {
              '--detail-border': theme.palette.border,
              '--detail-hover-border': theme.palette.accents_4,
              '--detail-muted': theme.palette.accents_5,
              '--detail-foreground': theme.palette.foreground,
              '--detail-bg': theme.palette.accents_1,
              '--detail-radius': theme.layout.radius,
              '--detail-mono': theme.font.mono
            } as React.CSSProperties
          }
        >
          <NextLink href="/" className={styles.back}>
            <ArrowLeft fontSize={14} />
            All icons
          </NextLink>

          <div className={styles.header}>
            <Text h1 my={0}>
              {icon.name}
            </Text>
            <NextLink
              href={{ pathname: '/', query: { category: icon.category } }}
              className={styles.category}
            >
              {icon.category}
            </NextLink>
          </div>
          {icon.keywords && (
            <p className={styles.keywords}>Also: {icon.keywords}</p>
          )}

          <div className={styles.layout}>
            <div>
              <div
                className={styles.preview}
                style={{
                  color: style.color ?? theme.palette.foreground,
                  fontSize: style.size * PREVIEW_SCALE
                }}
              >
                <Component strokeWidth={style.strokeWidth} aria-hidden />
              </div>
              <div className={styles.actions}>
                <Button
                  auto
                  scale={0.75}
                  rounded
                  type="secondary"
                  onClick={() => copy(buildJsx(icon.name, style), 'JSX')}
                >
                  Copy JSX
                </Button>
                <Button
                  auto
                  scale={0.75}
                  rounded
                  onClick={() => copy(iconToSvg(icon, style), 'SVG')}
                >
                  Copy SVG
                </Button>
                <Button auto scale={0.75} rounded onClick={downloadSvg}>
                  Download SVG
                </Button>
                <Button auto scale={0.75} rounded onClick={downloadPng}>
                  Download PNG
                </Button>
                <Button
                  auto
                  scale={0.75}
                  rounded
                  icon={<Star fill={favorite ? 'currentColor' : 'none'} />}
                  aria-pressed={favorite}
                  onClick={() => toggleFavorite(icon.name)}
                >
                  {favorite ? 'Favorited' : 'Favorite'}
                </Button>
              </div>
            </div>

            <div className={styles.stack}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Customize</h2>
                <CustomizePanel />
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Install</h2>
                <PackageManagerTabs />
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Use</h2>
                <Snippet
                  text={imports.normal}
                  toastText="Import copied!"
                  toastType="secondary"
                  width="100%"
                  rounded
                />
                <Snippet
                  text={imports.single}
                  toastText="Import copied!"
                  toastType="secondary"
                  width="100%"
                  rounded
                />
                <Snippet
                  text={buildJsx(icon.name, style)}
                  toastText="JSX copied!"
                  toastType="secondary"
                  width="100%"
                  rounded
                />
                <Snippet
                  symbol=""
                  text={buildComponentSource(icon.name, style).split('\n')}
                  toastText="Component copied!"
                  toastType="secondary"
                  width="100%"
                  rounded
                />
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className={styles.related}>
              <h2 className={styles.sectionTitle}>More in {icon.category}</h2>
              <div className={styles.relatedGrid}>
                {related.map((item) => {
                  const Related = item.component
                  return (
                    <NextLink
                      key={item.name}
                      href={`/icons/${item.slug}`}
                      className={styles.relatedItem}
                    >
                      <Related fontSize={24} aria-hidden />
                      {item.name}
                    </NextLink>
                  )
                })}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </Base>
  )
}

export default IconDetail
