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
      <nav className="menu_wrapper">
        <Container fluid>
          <div className="menu_sticky">
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
                <div className="controls">
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
      <style jsx>{`
        .menu_wrapper {
          height: 60px;
          position: relative;
          overflow: hidden;
          z-index: 99;
        }
        .menu_sticky {
          position: fixed;
          z-index: 1100;
          top: 0;
          right: 0;
          left: 0;
          background-color: ${theme.palette.background};
          border-bottom: 1px solid ${theme.palette.border};
          padding-left: 15px;
          padding-right: 15px;
        }
        .menu_wrapper :global(.theme-button) {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          padding: 0;
        }

        .logo {
          padding: 0 ${theme.layout.gap};
          margin-bottom: 3px;
        }
        .tabs {
          padding: 0 ${theme.layout.gap};
          margin-bottom: 3px;
        }
        .tabs :global(.content) {
          display: none;
        }
        @media only screen and (max-width: ${theme.breakpoints.md.max}) {
          .tabs {
            display: none;
          }
        }

        /* On phones the name of the logo stays, so the accent button keeps
           only its icon to leave room for it */
        @media only screen and (max-width: 600px) {
          .controls :global(.accent-label) {
            display: none;
          }
          .controls :global(.accent-button) {
            min-width: 0 !important;
            padding: 0 10px !important;
          }
        }

        @media only screen and (max-width: 400px) {
          .controls {
            gap: 4px;
          }
          .controls :global(.brand-button) {
            min-width: 0 !important;
            padding: 0 8px !important;
          }
        }

        .controls {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          height: 50px;
        }
        .controls :global(.menu-toggle) {
          display: flex;
          align-items: center;
          height: 50px;
        }
      `}</style>
    </>
  )
}

export default Navigation
