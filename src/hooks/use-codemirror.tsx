import { useEffect, useState, useRef, MutableRefObject } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { history, historyKeymap } from '@codemirror/history'
import { indentOnInput } from '@codemirror/language'
import { bracketMatching } from '@codemirror/matchbrackets'
import { highlightActiveLineGutter } from '@codemirror/gutter'
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags,
} from '@codemirror/highlight'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { oneDark } from '@codemirror/theme-one-dark'

const syntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontWeight: '500',
  },
  {
    tag: tags.heading2,
    fontWeight: '500',
  },
  {
    tag: tags.heading3,
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
      parent: refContainer.current,
    })

    setEditorView(view)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refContainer, onChange])

  return [refContainer, editorView]
}

export default useCodeMirror
