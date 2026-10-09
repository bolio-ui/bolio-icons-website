import React from 'react'
import { SegmentedControl, Snippet } from '@bolio-ui/core'
import { useIconSettings } from 'src/context/IconSettings'
import { installCommands, PackageManager } from 'src/lib/icons'

const managers = Object.keys(installCommands) as PackageManager[]

// Install command with a yarn / npm / pnpm switch. The choice is remembered
// and shared with every other place that shows it.
const PackageManagerTabs: React.FC = () => {
  const { packageManager, setPackageManager } = useIconSettings()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SegmentedControl
        value={packageManager}
        onChange={(value) => setPackageManager(value as PackageManager)}
        aria-label="Package manager"
      >
        {managers.map((manager) => (
          <SegmentedControl.Item key={manager} value={manager}>
            {manager}
          </SegmentedControl.Item>
        ))}
      </SegmentedControl>
      <Snippet
        text={installCommands[packageManager]}
        toastText="Command copied!"
        toastType="secondary"
        width="100%"
        rounded
      />
    </div>
  )
}

export default PackageManagerTabs
