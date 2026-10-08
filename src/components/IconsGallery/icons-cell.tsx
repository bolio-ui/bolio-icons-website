import React from 'react'
import { Card, Text, useTheme } from '@bolio-ui/core'
import { getContrastColor } from './contrast'

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
  const color = getContrastColor(theme.palette.secondary)

  return (
    <Card
      key={name}
      onClick={() => onClick(name)}
      h="100px"
      w="100%"
      type="secondary"
      style={{ cursor: 'pointer' }}
    >
      <Card.Content
        style={{
          height: '100%',
          boxSizing: 'border-box',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          textAlign: 'center',
          color
        }}
      >
        <span style={{ display: 'flex', fontSize: 28 }}>
          <Component />
        </span>
        <Text b font="12px" style={{ color }}>
          {name}
        </Text>
      </Card.Content>
    </Card>
  )
}

export default React.memo(IconsCell)
