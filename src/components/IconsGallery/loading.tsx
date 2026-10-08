import React from 'react'
import { Search } from '@bolio-ui/icons'
import { Card, Input, Skeleton } from '@bolio-ui/core'
import styles from './IconsGallery.module.css'

const PLACEHOLDER_CELLS = 24
const PLACEHOLDER_CHIPS = 15
// Input height={1.5} renders at 2.25 * 1.5 layout units (16px each)
const INPUT_HEIGHT = 'calc(2.25 * 1.5 * 16px)'

// Same classes and structure as the loaded gallery, so nothing moves when it
// replaces this placeholder.
const LoadingIconsGallery: React.FC = () => {
  return (
    <div>
      <div className={styles.toolbar} style={{ position: 'static' }}>
        <div className={styles.search} style={{ position: 'relative' }}>
          {/* hidden real Input keeps the exact size of the loaded one */}
          <div
            style={{ display: 'contents', visibility: 'hidden' }}
            aria-hidden
          >
            <Input
              icon={<Search />}
              width="100%"
              height={1.5}
              rounded
              disabled
            />
          </div>
          <Skeleton
            height={INPUT_HEIGHT}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: INPUT_HEIGHT,
              overflow: 'hidden',
              borderRadius: 25
            }}
          />
        </div>
        <div className={styles.carousel}>
          <div className={styles.track} style={{ overflow: 'hidden' }}>
            {Array.from({ length: PLACEHOLDER_CHIPS }, (_, index) => (
              <Skeleton
                key={index}
                width="72px"
                height="32px"
                style={{ borderRadius: 16, overflow: 'hidden' }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.meta}>
        <Skeleton width="96px" height="14px" />
      </div>
      <div className={styles.grid}>
        {Array.from({ length: PLACEHOLDER_CELLS }, (_, index) => (
          <Card key={index} h="100px" w="100%">
            <Card.Content
              style={{
                height: '100%',
                boxSizing: 'border-box',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12
              }}
            >
              <Skeleton width="28px" height="28px" />
              <Skeleton width="64px" height="12px" />
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LoadingIconsGallery
