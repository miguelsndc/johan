import React, { ReactNode, useEffect, useState } from 'react'
import { unified } from 'unified'
import gfm from 'remark-gfm'
import parse from 'remark-parse'
import rehypeReact from 'rehype-react'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import { Container } from './styles'
import RemarkCode from '../remark-code'

import 'github-markdown-css/github-markdown-dark.css'
import useDebouncedValue from '../../hooks/use-debounced-value'

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
  fullHeight?: boolean
  editMode?: boolean
  disableDebounce?: boolean
}

export default function MdRenderer({
  doc,
  fullHeight,
  editMode,
  disableDebounce,
}: Props) {
  const [md, setMd] = useState<ReactNode>()
  const debouncedDoc = useDebouncedValue(doc, 500, disableDebounce)

  useEffect(() => {
    const parsed = unified()
      .use(parse)
      .use(remarkBreaks)
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
      .processSync(debouncedDoc).result as ReactNode

    setMd(parsed)
  }, [debouncedDoc])

  return (
    <Container
      className='markdown-body'
      data-testid='renderer'
      fullHeight={fullHeight}
      editMode={editMode}
      fitted={editMode && !fullHeight}
    >
      {md}
    </Container>
  )
}
