import React, { ReactNode } from 'react'
import { unified } from 'unified'
import gfm from 'remark-gfm'
import parse from 'remark-parse'
import rehypeReact from 'rehype-react'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import { Container } from './styles'
import RemarkCode from '../remark-code'

import 'github-markdown-css/github-markdown-dark.css'

// allow className attr inside code element
const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className'],
  },
}

type Props = {
  doc: string
}

export default function MdRenderer({ doc }: Props) {
  const md = unified()
    .use(parse)
    .use(gfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, schema)
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        code: RemarkCode,
      },
    })
    .processSync(doc).result as ReactNode

  return (
    <Container className='markdown-body' data-testid='renderer'>
      {md}
    </Container>
  )
}
