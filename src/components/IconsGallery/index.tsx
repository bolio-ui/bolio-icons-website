import dynamic from 'next/dynamic'
import LoadingIconsGallery from './loading'

const IconsGallery = dynamic(() => import('./icons-gallery'), {
  ssr: false,
  loading: () => <LoadingIconsGallery />
})

export default IconsGallery
