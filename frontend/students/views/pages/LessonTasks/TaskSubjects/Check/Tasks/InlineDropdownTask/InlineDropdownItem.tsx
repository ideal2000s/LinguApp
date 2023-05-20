import React, { FC, Fragment, CSSProperties } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import SelectWordDropdownButton from 'students/views/shared/components/SelectWordDropdownButton';
import { IInlineDropdownItem } from 'students/models';

export interface ISelectAnswerPayload {
  value: string;
  wordIndex: number;
  itemId: number;
}

interface IProps {
  item: IInlineDropdownItem;
  onSelectAnswer: ({ value, wordIndex, itemId }: ISelectAnswerPayload) => void;
  value?: string[];
  className?: string;
}

const InlineDropdownItem: FC<IProps> = ({ item, onSelectAnswer, className, value }) => {
  const { statement, answers: options } = item;
  const blocks = statement.split('**');

  const handleSelectAnswer = ({ index, value }: { index: number; value: string }) => {
    onSelectAnswer({ value, wordIndex: index, itemId: item.id });
  };

  return (
    <SInlineDropdownItem className={cn(className)}>
      <div className="text-justify">
        {blocks.map((block: string, index: number) => (
          <Fragment key={index}>
            {block}

            {index < options.length && (
              <SelectWordDropdownButton
                key={index}
                index={index}
                onSelectAnswer={handleSelectAnswer}
                options={options[index]}
                statusStyles={BUTTON_STATUS_STYLES}
                value={value?.[index]}
                dropdownArrow
              />
            )}
          </Fragment>
        ))}
      </div>
    </SInlineDropdownItem>
  );
};

export default InlineDropdownItem;

const SInlineDropdownItem = styled.div`
  font-weight: 400;
  font-size: 1rem;
  line-height: 2.5rem;
  margin: 16px 0 0;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.375rem;
    line-height: 3.125rem;
    max-width: 670px;
  }
`;

const BUTTON_STATUS_STYLES: {
  init: CSSProperties;
  selected: CSSProperties;
  opened: CSSProperties;
} = {
  init: {
    color: '#808080',
    background: 'linear-gradient(180deg, #E6E6F0 0%, #F5F5FA 100%)',
    boxShadow: '0px 2px 0px #D6D6F1, inset 0px 2px 0px #F5F5F9',
    textAlign: 'left'
  },
  selected: {
    background: '#e6e6f0',
    color: '#2d2d3a',
    textAlign: 'left',
    border: '1px solid #e6e6f0'
  },
  opened: {
    background: 'linear-gradient(180deg, #E6E6F0 0%, #F5F5FA 100%), #E6E6F0',
    border: '2px solid #0094C5',
    margin: 0,
    textAlign: 'left'
  }
};
