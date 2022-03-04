import { useEffect, useState, useRef, MutableRefObject } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

import { HighlightStyle, tags } from '@codemirror/highlight'

const syntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.6rem',
    fontWeight: '500',
  },
  {
    tag: tags.heading2,
    fontSize: '1.4rem',
    fontWeight: '500',
  },
  {
    tag: tags.heading3,
    fontSize: '1.22rem',
    fontWeight: '500',
  },
])

type Props = {
  initialDoc: string
  onChange: (state: EditorState) => void
}

function useCodeMirror<T extends Element>({
  initialDoc,
  onChange,
}: Props): [MutableRefObject<T | null>, EditorView | undefined] {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()

  useEffect(() => {
    if (!refContainer.current) return

    async function setup() {
      const [
        keymap,
        highlightActiveLine,
        defaultKeymap,
        history,
        historyKeymap,
        indentOnInput,
        bracketMatching,
        highlightActiveLineGutter,
        languages,
        markdownLanguage,
        markdown,
        oneDark,
        defaultHighlightStyle,
      ] = await Promise.all([
        (await import('@codemirror/view')).keymap,
        (await import('@codemirror/view')).highlightActiveLine,
        (await import('@codemirror/commands')).defaultKeymap,
        (await import('@codemirror/history')).history,
        (await import('@codemirror/history')).historyKeymap,
        (await import('@codemirror/language')).indentOnInput,
        (await import('@codemirror/matchbrackets')).bracketMatching,
        (await import('@codemirror/gutter')).highlightActiveLineGutter,
        (await import('@codemirror/language-data')).languages,
        (await import('@codemirror/lang-markdown')).markdownLanguage,
        (await import('@codemirror/lang-markdown')).markdown,
        (await import('@codemirror/theme-one-dark')).oneDark,
        (await import('@codemirror/highlight')).defaultHighlightStyle,
      ])

      const extensions = [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        history(),
        highlightActiveLineGutter(),
        indentOnInput(),
        bracketMatching(),
        defaultHighlightStyle.fallback,
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        syntaxHighlighting,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) onChange(update.state)
        }),
      ]

      const initialState = EditorState.create({
        doc: initialDoc,
        extensions,
      })

      const view = new EditorView({
        state: initialState,
        parent: refContainer.current!,
      })

      setEditorView(view)
    }

    setup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refContainer, onChange])

  return [refContainer, editorView]
}

export default useCodeMirror
