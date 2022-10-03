import React from 'react'
import {
  Text,
  Container,
  Grid,
  Row,
  Col,
  Section,
  Button,
  Link
} from '@bolio-ui/core'

interface Props {
  content: { title: string; description: string }
}

export type HeroProps = Props

function Hero({ content }: Props) {
  return (
    <Section py={4}>
      <Container>
        <Grid.Container justify="center">
          <Row justify="space-around" style={{ textAlign: 'center' }}>
            <Col span={8}>
              <Text h1>{content.title}</Text>
              <Text p font={1.5} mt={0}>
                {content.description}
              </Text>
            </Col>
          </Row>
        </Grid.Container>
        <Grid.Container gap={2} justify="center" alignItems="center">
          <Grid xs={12} sm={6} md={2}>
            <Button type="secondary" width="100%">
              <Link
                href="https://bolio-ui.com/docs/guide/getting-started"
                target="_blank"
              >
                Get Started
              </Link>
            </Button>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Button type="primary" width="100%">
              <Link href="/download/bolio-ui-icons.zip" target="_blank">
                Download Pack
              </Link>
            </Button>
          </Grid>
        </Grid.Container>
      </Container>
    </Section>
  )
}

export default Hero
