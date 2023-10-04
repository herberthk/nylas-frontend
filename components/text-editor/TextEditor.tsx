// import '@mantine/tiptap/styles.css';

import { Box, Group } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { FC } from 'react';
import React from 'react';

type Props = {
  setEditorState: React.Dispatch<React.SetStateAction<string | undefined>>;
  setEditorPlainTextState: React.Dispatch<React.SetStateAction<string | undefined>>;
  content: string;
};
const TextEditor: FC<Props> = ({
  setEditorState,
  content,
  setEditorPlainTextState,
}): React.JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate: () => {
      setEditorState(editor?.getHTML());
      setEditorPlainTextState(editor?.getText());
    },
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
      <Box ml="md">
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <Group>
            <RichTextEditor.ControlsGroup>
              <Group>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </Group>
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <Group>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </Group>
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <Group>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </Group>
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <Group>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </Group>
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <Group>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </Group>
            </RichTextEditor.ControlsGroup>
          </Group>
        </RichTextEditor.Toolbar>
      </Box>
    </RichTextEditor>
  );
};

export default TextEditor;
