import React from 'react'
import { Text, Grid, Link, useTheme } from '@bolio-ui/core'
import { Heart } from '@bolio-ui/icons'
import iconsPackage from '@bolio-ui/icons/package.json'
import styles from './FooterMeta.module.css'

function FooterMeta() {
  const theme = useTheme()
  const year = new Date().getFullYear()

  return (
    <Grid.Container alignItems="center">
      <Grid xs={12} md={4}>
        <Text
          font={0.75}
          my={0}
          style={{
            fontFamily: theme.font.mono,
            color: theme.palette.accents_5
          }}
        >
          © {year} Bolio Icons
        </Text>
      </Grid>
      <Grid xs={12} md={4} className={styles.center}>
        <Link
          href="https://github.com/bolio-ui/bolio-icons/releases"
          target="_blank"
          rel="noopener"
          style={{
            fontFamily: theme.font.mono,
            fontSize: '0.75rem',
            color: theme.palette.accents_5
          }}
        >
          v{iconsPackage.version} · changelog
        </Link>
      </Grid>
      <Grid xs={12} md={4} className={styles.right}>
        <Text
          font={0.75}
          b
          my={0}
          style={{
            fontFamily: theme.font.mono,
            color: theme.palette.accents_6
          }}
        >
          MADE & DESIGNED WITH
          <Heart
            fill="red"
            stroke="red"
            height={12}
            width={12}
            style={{ marginLeft: 3, marginRight: 3 }}
          />
          BY{' '}
          <Link
            href="https://brunnoandrade.com.br/"
            target="_blank"
            rel="noopener"
            underline
            aria-label="Link to Bruno Andrade website"
          >
            BRUNO ANDRADE
          </Link>
        </Text>
      </Grid>
    </Grid.Container>
  )
}

export default FooterMeta
