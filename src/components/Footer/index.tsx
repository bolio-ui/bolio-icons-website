import React from 'react'
import { Section, Text, Link, Container, Grid } from '@bolio-ui/core'
import { Heart } from '@bolio-ui/icons'

function Footer() {
  return (
    <Section padding={2}>
      <Container>
        <Grid.Container
          justify="center"
          alignItems="center"
          alignContent="center"
          style={{ textAlign: 'center' }}
        >
          <Grid>
            <Text h6 my={0}>
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
              >
                BRUNO ANDRADE
              </Link>
            </Text>
          </Grid>
        </Grid.Container>
      </Container>
    </Section>
  )
}

export default Footer
