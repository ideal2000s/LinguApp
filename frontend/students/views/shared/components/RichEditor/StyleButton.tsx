import React from 'react';
import cn from 'classnames';

type tProps = {
  active: boolean;
  label: string | JSX.Element;
  style: string;
  onToggle: (e: string) => any;
};

export const StyleButton: React.FunctionComponent<tProps> = ({
  active,
  style,
  label,
  onToggle
}) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <span
      className={cn('RichEditor-styleButton', { 'RichEditor-activeButton': active })}
      onMouseDown={handleToggle}
      role="button"
      tabIndex={0}
    >
      {label}
    </span>
  );
};
