import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { IInlineDropdownItem } from 'students/models';
import SelectWordDropdownButton from 'students/views/shared/components/SelectWordDropdownButton';
import { withFade2 } from 'students/views/shared/HOCs';
import { usePlayAudioPlayer } from '../../common/hooks';

export interface ISelectAnswerPayload {
  value: string;
  itemId: number;
  wordIndex: number;
  attemptsCount: number;
}

interface IProps {
  item: IInlineDropdownItem;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onItemFinished: () => void;
  className?: string;
}

const FINISH_ITEM_DELAY = 1000;

const InlineDropdownItem: React.FC<IProps> = ({
  item,
  onSelectAnswer,
  onItemFinished,
  className
}) => {
  const { statement, answers: options, solution } = item;
  const [answers, setAnswers] = useState<string[]>([]);
  const attemptsCountRef = useRef<number>(0);
  const { playCorrectSound, playIncorrectSound } = usePlayAudioPlayer();
  const blocks = statement.split('**');

  useEffect(() => {
    attemptsCountRef.current = 0;
  }, [item.id]);

  function handleSelectAnswer({
    index,
    value,
    correct
  }: {
    index: number;
    value: string;
    correct?: boolean;
  }) {
    playCorrectSound();

    answers[index] = correct ? value : '';
    setAnswers([...answers]);

    onSelectAnswer({
      value,
      itemId: item.id,
      wordIndex: index,
      attemptsCount: attemptsCountRef.current
    });

    if (checkItemIsFinished(answers, solution)) {
      setTimeout(onItemFinished, FINISH_ITEM_DELAY);
    }
  }

  function handleSelectWrongAnswer() {
    playIncorrectSound();

    attemptsCountRef.current += 1;
  }

  return (
    <SInlineDropdownItem className={cn(className)}>
      <div className="text-justify">
        {blocks.map((block: string, index: number) => (
          <React.Fragment key={index}>
            {block}
            {index < options.length && (
              <SelectWordDropdownButton
                key={index}
                index={index}
                onSelectAnswer={handleSelectAnswer}
                onSelectWrongAnswer={handleSelectWrongAnswer}
                solution={solution[index]}
                options={options[index]}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </SInlineDropdownItem>
  );
};

export default withFade2<IProps>()(InlineDropdownItem);

const SInlineDropdownItem = styled.div`
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 2.25rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.5rem;
    line-height: 2.75rem;
    max-width: 670px;
  }
`;

function checkItemIsFinished(answers: string[], solutions: string[]) {
  return solutions.every((solution, index) => solution === answers[index]);
}
