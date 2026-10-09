import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Container,
  Grid,
  Button,
  Link,
  useTheme,
  useBodyScroll
} from '@bolio-ui/core'
import Logo from 'src/components/Logo'
import ThemeModeSelect from 'src/components/ThemeModeSelect'
import AccentSelect from 'src/components/AccentSelect'
import styles from './Navigation.module.css'

const Navigation: React.FC = () => {
  const theme = useTheme()
  const router = useRouter()
  const [expanded, setExpanded] = useState<boolean>(false)
  const [, setBodyHidden] = useBodyScroll(null, { delayReset: 300 })

  useEffect(() => {
    setBodyHidden(expanded)
  }, [expanded, setBodyHidden])

  useEffect(() => {
    const handleRouteChange = () => {
      setExpanded(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      <nav className={styles.wrapper}>
        <Container fluid>
          <div
            className={styles.sticky}
            style={
              {
                '--nav-bg': theme.palette.background,
                '--nav-border': theme.palette.border
              } as React.CSSProperties
            }
          >
            <Grid.Container gap={1} justify="center">
              <Grid
                xs={6}
                md={6}
                justify="flex-start"
                style={{ marginTop: '8px' }}
              >
                <Logo name="Bolio Icons" />
              </Grid>
              <Grid xs={6} md={6} justify="flex-end">
                <div className={styles.controls}>
                  <>
                    <ThemeModeSelect />
                    <AccentSelect />
                    <Link href="https://bolio-ui.com/" target="_blank">
                      <Button
                        auto
                        scale={0.75}
                        rounded
                        type="secondary"
                        className="brand-button"
                      >
                        Bolio UI 🥷🏼
                      </Button>
                    </Link>
                  </>
                </div>
              </Grid>
            </Grid.Container>
          </div>
        </Container>
      </nav>
    </>
  )
}

export default Navigation
