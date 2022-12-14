import React from 'react'
import {
  useTheme,
  Section,
  Container,
  Grid,
  Col,
  Text,
  Snippet,
  Button,
  Spacer,
  Card,
  Image,
  Link
} from '@bolio-ui/core'

function SectionDemonstration() {
  const theme = useTheme()
  return (
    <Section
      py={5}
      style={{
        background: 'rgba(194, 95, 255, 0.2) none repeat scroll 0% 0%',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: theme.palette.accents_2
      }}
    >
      <Container>
        <Grid.Container gap={2}>
          <Grid xs={12} md={6} direction="column" justify="center">
            <Text h2 my={0} mb={1}>
              Build even faster with Bolio UI
            </Text>
            <Text font={1.2} mt={0}>
              Build your next website even faster with premade responsive
              components designed and built by Bolio UI.
            </Text>
            <Grid.Container gap={2} xs={12} alignItems="center">
              <Grid xs={12} sm={4}>
                <Link
                  href="https://bolio-ui.com/docs/guide/"
                  target="_blank"
                  width="100%"
                >
                  <Button type="secondary-light" width="100%" rounded>
                    Get Started
                  </Button>
                </Link>
              </Grid>
              <Grid xs={12} sm={8}>
                <Snippet
                  toastText="Code copied!"
                  toastType="secondary"
                  text="yarn add @bolio-ui/core"
                  width="100%"
                  rounded
                />
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid xs={12} md={6}>
            <Grid xs={12} md={12} justify="center">
              <Link
                href="https://bolio-ui.com/docs/components/text/"
                target="_blank"
              >
                <Card
                  style={{
                    background:
                      'rgba(194, 95, 255, 0.2) none repeat scroll 0% 0%'
                  }}
                >
                  <Image src="/img/png/home/typography.png" />
                  <Card.Content>
                    <Text b>Text</Text>
                  </Card.Content>
                </Card>
              </Link>
              <Spacer width={2} />
              <Link
                href="https://bolio-ui.com/docs/components/icons/"
                target="_blank"
              >
                <Card
                  style={{
                    background:
                      'rgba(194, 95, 255, 0.2) none repeat scroll 0% 0%'
                  }}
                >
                  <Image src="/img/png/home/icons.png" />
                  <Card.Content>
                    <Text b>Icons</Text>
                  </Card.Content>
                </Card>
              </Link>
              <Spacer width={2} />
              <Link
                href="https://bolio-ui.com/docs/components/button/"
                target="_blank"
              >
                <Card
                  style={{
                    background:
                      'rgba(194, 95, 255, 0.2) none repeat scroll 0% 0%'
                  }}
                >
                  <Image src="/img/png/home/button.png" draggable={false} />
                  <Card.Content>
                    <Text b>Button</Text>
                  </Card.Content>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center" alignItems="center">
          <Grid mt={2}>
            <Col>
              <Link
                href="https://bolio-ui.com/docs/components/"
                target="_blank"
              >
                <Button type="secondary-light" rounded>
                  Explore more components
                </Button>
              </Link>
            </Col>
          </Grid>
        </Grid.Container>
      </Container>
    </Section>
  )
}

export default SectionDemonstration
