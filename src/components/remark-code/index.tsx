import React, { useEffect, useState, HTMLAttributes } from 'react'
import runmode, { getLanguage } from '../../helpers/runmode'

type Token = {
  text: string
  style: string | null
}

type Props = HTMLAttributes<HTMLElement>

function RemarkCode({ className, children }: Props) {
  const [spans, setSpans] = useState<Token[]>([])
  const langName = (className || '').substring(9)

  useEffect(() => {
    getLanguage(langName).then((language) => {
      if (language) {
        const body = Array.isArray(children) ? children[0] : null

        const tokens: Token[] = []

        runmode(
          body as string,
          language,
          (text: string, style: string | null) => {
            tokens.push({ text, style })
          }
        )
        setSpans(tokens)
      }
    })
  }, [children, langName])

  if (spans.length > 0) {
    return (
      <code>
        {spans.map((span, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={i} className={span.style || ''}>
            {span.text}
          </span>
        ))}
      </code>
    )
  }
  return <code>{children}</code>
}

export default RemarkCode
