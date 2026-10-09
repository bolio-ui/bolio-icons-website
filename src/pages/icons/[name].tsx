import { GetStaticPaths, GetStaticProps } from 'next'
import IconDetail from 'src/templates/IconDetail'
import { allIcons, getIconBySlug, IconEntry } from 'src/lib/icons'

interface Props {
  slug: string
}

export default function IconPage({ slug }: Props) {
  const icon = getIconBySlug(slug) as IconEntry
  return <IconDetail icon={icon} />
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: allIcons.map((icon) => ({ params: { name: icon.slug } })),
  fallback: false
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.name)
  if (!getIconBySlug(slug)) return { notFound: true }
  return { props: { slug } }
}
