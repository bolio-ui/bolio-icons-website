import React from 'react'
import Head from 'next/head'

interface Props {
  data: Record<string, unknown>
}

// "<" is escaped so no value can close the script tag early
const serialize = (data: Props['data']) =>
  JSON.stringify(data).replace(/</g, '\\u003c')

const JsonLd: React.FC<Props> = ({ data }) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
      key="jsonld"
    />
  </Head>
)

export default JsonLd
