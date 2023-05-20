import React, { useContext } from 'react';
import { EditorState } from 'draft-js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons/faListUl';
import { faListOl } from '@fortawesome/free-solid-svg-icons/faListOl';
import { StyleButton } from './StyleButton';
import { Translate, t, I18nContext } from 'i18n';

type tProps = {
  editorState: EditorState;
  onToggleBlock: (e: string) => any;
  onToggleStyle: (e: string) => any;
};

const BLOCK_TYPES = [
  // { label: 'H1', style: 'header-one' },
  // { label: 'H2', style: 'header-two' },
  {
    label: (
      <strong>
        <Translate str="frontend.old.rich_editor.header" />
      </strong>
    ),
    style: 'header-three'
  },
  // { label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  // { label: 'Blockquote', style: 'blockquote' },
  {
    label: (
      <FontAwesomeIcon
        icon={faListUl}
        title={t('frontend.old.rich_editor.unordered_list')}
      />
    ),
    style: 'unordered-list-item'
  },
  {
    label: (
      <FontAwesomeIcon
        icon={faListOl}
        title={t('frontend.old.rich_editor.ordered_list')}
      />
    ),
    style: 'ordered-list-item'
  }
  // { label: 'Code Block', style: 'code-block' }
];

const INLINE_STYLES = [
  {
    label: (
      <strong>
        <Translate str="frontend.old.rich_editor.bold" />
      </strong>
    ),
    style: 'BOLD'
  },
  {
    label: (
      <i>
        <Translate str="frontend.old.rich_editor.italic" />
      </i>
    ),
    style: 'ITALIC'
  },
  {
    label: (
      <u>
        <Translate str="frontend.old.rich_editor.underline" />
      </u>
    ),
    style: 'UNDERLINE'
  },
  {
    label: (
      <code>
        <Translate str="frontend.old.rich_editor.monospace" />
      </code>
    ),
    style: 'CODE'
  }
];

const StyleControls: React.FunctionComponent<tProps> = ({
  editorState,
  onToggleBlock,
  onToggleStyle
}) => {
  const { locale } = useContext(I18nContext);
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls" lang={locale}>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggleBlock}
          style={type.style}
        />
      ))}
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggleStyle}
          style={type.style}
        />
      ))}
    </div>
  );
};
export default StyleControls;
