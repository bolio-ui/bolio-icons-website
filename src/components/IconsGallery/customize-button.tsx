import React from 'react'
import { Button } from '@bolio-ui/core'
import { Sliders } from '@bolio-ui/icons'
import styles from './IconsGallery.module.css'

interface Props {
  open?: boolean
  // True when size, stroke or color differ from the defaults
  modified?: boolean
  onClick?: () => void
}

// Sits next to the search so it is seen with it. A dot tells that the icons
// are no longer shown (and copied) with their defaults.
const CustomizeButton: React.FC<Props> = ({
  open = false,
  modified = false,
  onClick
}) => (
  <Button
    auto
    rounded
    h="44px"
    type={open ? 'secondary' : 'default'}
    icon={<Sliders />}
    className={styles.customize}
    aria-expanded={open}
    aria-controls="icon-customize"
    onClick={onClick}
  >
    <span className={styles.customizeLabel}>Customize</span>
    {modified && <span className={styles.dot} aria-label="customized" />}
  </Button>
)

export default CustomizeButton
