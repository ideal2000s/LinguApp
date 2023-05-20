import React, { useState, useCallback, useEffect } from 'react';
import { EditorState, Editor, RichUtils, ContentBlock } from 'draft-js';
import cn from 'classnames';
import StyleControls from './StyleControls';
import { t } from 'i18n';
import './RichEditor.scss';

export { EditorState };
interface IRichEditorProps {
  onChange: (state: EditorState) => void;
  placeholder?: string;
  placeholderLocaleKey?: string;
}
const initialState: EditorState = EditorState.createEmpty();

const RichEditor: React.FC<IRichEditorProps> = ({
  onChange,
  placeholder,
  placeholderLocaleKey
}) => {
  const [editorState, setEditorState] = useState<EditorState>(() => initialState);
  const targetLocale = 'en';
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // targetLocale = useSelector<AppState, string>(
    //   (state) => state.examination.locale,
    //   shallowEqual
    // );
  } catch (error) {
    console.error(error);
  }

  useEffect(() => {
    onChange(initialState);
  }, [onChange]);

  //HANDLERS START
  const handleChange = useCallback(
    (state: EditorState): void => {
      setEditorState(state);
      onChange(state);
    },
    [onChange, setEditorState]
  );
  const handleKeyCommand = useCallback(
    (command: string) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        handleChange(newState);
        return 'handled';
      } else {
        return 'not-handled';
      }
    },
    [editorState, handleChange]
  );

  const handleBlockType = useCallback(
    (blockType: string) => {
      handleChange(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState, handleChange]
  );
  const handleInlineStyle = useCallback(
    (inlineStyle: string) => {
      handleChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    },
    [editorState, handleChange]
  );
  //HANDLERS END

  const editorPlaceholderLocaleKey =
    placeholderLocaleKey || 'frontend.old.rich_editor.enter_text_msg';
  const editorPlaceholder =
    placeholder || t(editorPlaceholderLocaleKey, { locale: targetLocale });

  return (
    <div className="RichEditor-root">
      <div
        className={cn('RichEditor-editor', {
          'RichEditor-hidePlaceholder': shouldHidePlaceholder(editorState)
        })}
      >
        <StyleControls
          editorState={editorState}
          onToggleBlock={handleBlockType}
          onToggleStyle={handleInlineStyle}
        />
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          ariaLabel={editorPlaceholder}
          placeholder={editorPlaceholder}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

function shouldHidePlaceholder(editorState: EditorState) {
  const contentState = editorState.getCurrentContent();
  return (
    contentState.hasText() || contentState.getBlockMap().first().getType() !== 'unstyled'
  );
}

function getBlockStyle(block: ContentBlock) {
  if (block.getType() === 'blockquote') {
    return 'RichEditor-blockquote';
  } else {
    return '';
  }
}

export default RichEditor;
