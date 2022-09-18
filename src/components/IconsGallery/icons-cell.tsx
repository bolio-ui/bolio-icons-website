import React from 'react'
import { Card, Grid, Row, useTheme } from '@bolio-ui/core'

export const getFileName = (name: string): string => {
  return name.replace(/^(.)/, (g) => g.toLowerCase())
}

export const getImportString = (name: string) => {
  const fileName = getFileName(name)
  const single = `import ${name} from '@bolio-ui/icons/${fileName}'`
  const normal = `import { ${name} } from '@bolio-ui/icons'`
  return {
    single,
    normal
  }
}

interface Props {
  component: React.ComponentType<unknown>
  name: string
  onClick: (name: string) => void
}

const IconsCell: React.FC<Props> = ({
  component: Component,
  name,
  onClick
}) => {
  const theme = useTheme()
  return (
    <Grid xs={6} sm={4} md={2}>
      <Card
        key={name}
        onClick={() => onClick(name)}
        height="7"
        width="100%"
        shadow
        style={{ margin: 15, cursor: 'pointer' }}
      >
        <Row
          justify="center"
          style={{ textAlign: 'center', fontSize: 28, marginTop: 24 }}
        >
          <Component />
        </Row>
      </Card>
      <style jsx>{`
        .card-wrapper {
          width: 100%;
          cursor: pointer;
          margin: 15px;
          text-align: center;
        }
        .card-wrapper :global(.card-box):hover {
          box-shadow: ${theme.type === 'dark'
            ? `0 0 0 1px ${theme.palette.foreground}`
            : '0px 4px 8px rgba(0,0,0,0.12)'};
        }
      `}</style>
    </Grid>
  )
}

export default React.memo(IconsCell)
