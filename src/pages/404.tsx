import React from 'react'
import NextLink from 'next/link'
import { NextSeo } from 'next-seo'
import {
  Section,
  Container,
  Grid,
  Text,
  Row,
  Col,
  Button,
  Link
} from '@bolio-ui/core'
import Base from 'src/templates/Base'

function Home() {
  return (
    <>
      <NextSeo
        title="Page not found"
        description="The page you are looking for might have been removed, had its name changed or is temporarily unavailable."
        noindex
        nofollow
      />
      <Base>
        <Section py={4}>
          <Container>
            <Grid.Container justify="center">
              <Row justify="space-around" style={{ textAlign: 'center' }}>
                <Col span={10}>
                  <Text h1 font={6}>
                    Oops!
                  </Text>
                  <Text h2>404 - PAGE NOT FOUND</Text>
                  <Text p font={1.2}>
                    The page you are looking for might have been removed had its
                    name changed or is temporarily unavailable.
                  </Text>
                </Col>
              </Row>
            </Grid.Container>
            <Grid.Container gap={2} justify="center" alignItems="center">
              <Grid xs={6} sm={6} md={2}>
                <Link
                  href="https://bolio-ui.com/docs/components/icons"
                  target="_blank"
                  width="100%"
                >
                  <Button type="secondary" rounded width="100%">
                    Get Started
                  </Button>
                </Link>
              </Grid>
              <Grid xs={6} sm={6} md={3}>
                <NextLink href="/">
                  <Button rounded width="100%">
                    Go to homepage
                  </Button>
                </NextLink>
              </Grid>
            </Grid.Container>
          </Container>
        </Section>
      </Base>
    </>
  )
}

export default Home
