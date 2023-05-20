import { FC } from 'react';
import { StyledComponent } from 'styled-components';
import {
  IArrangeWordsTaskSession,
  IInlineDropdownTask,
  IInlineDropdownTaskSession,
  IPlayArrangeWordsTask,
  tPlayTaskType,
  IFillSentenceGapTask,
  IFillSentenceGapTaskSession,
  IMarkWordTask,
  IMarkWordTaskSession,
  IMarkWordAudioTask,
  IMarkWordAudioTaskSession,
  IPlayImageObjectTask,
  IImageObjectTaskSession,
  IPlayAuditionTask,
  IAuditionTaskSession,
  IMinimalPairsTask,
  IMinimalPairsTaskSession,
  IPlayImageHotspotTask,
  IImageHotspotTaskSession,
  IWordGamesTask,
  IWordGamesTaskSession,
  tAnswer,
  tLessonPhrases,
  IDictationTask,
  IDictationTaskSession
} from 'students/models';

import PlayArrangeWordsTask from './ArrangeWordsTask';
import PlayFillSentenceGapTask from './FillSentenceGap';
import PlayInlineDropdownTask from './InlineDropdownTask';
import PlayMarkWordTask from './MarkWordTask';
import PlayMarkWordAudioTask from './MarkWordAudioTask';
import PlayImageObjectTask from './ImageObjectTask';
import PlayAuditionTask from './AuditionTask';
import PlayMinimalPairsTask from './MinimalPairsTask';
import PlayImageHotspotTask from './ImageHotspotTask';
import PlayWordGames from 'students/views/pages/LessonTasks/TaskSubjects/Play/Tasks/WordGamesTask';
import PlayDictationTask from './DictationTask';

export interface IPlayTaskProps<T, TS> {
  task: T;
  taskSession?: TS;
  lessonPhrases?: tLessonPhrases;
  isCompleting: boolean;
  className?: string;
  onFinish?: (results: tAnswer) => void;
  onNext?: () => void;
  onExit?: () => void;
  onSkip?: () => void;
}

export type tPlayComponentType =
  | tPlayTaskComponentType<
      IPlayTaskProps<IPlayArrangeWordsTask, IArrangeWordsTaskSession>
    >
  | tPlayTaskComponentType<
      IPlayTaskProps<IInlineDropdownTask, IInlineDropdownTaskSession>
    >
  | tPlayTaskComponentType<
      IPlayTaskProps<IFillSentenceGapTask, IFillSentenceGapTaskSession>
    >
  | tPlayTaskComponentType<IPlayTaskProps<IMarkWordTask, IMarkWordTaskSession>>
  | tPlayTaskComponentType<IPlayTaskProps<IMarkWordAudioTask, IMarkWordAudioTaskSession>>
  | tPlayTaskComponentType<IPlayTaskProps<IMinimalPairsTask, IMinimalPairsTaskSession>>
  | tPlayTaskComponentType<IPlayTaskProps<IPlayImageObjectTask, IImageObjectTaskSession>>
  | tPlayTaskComponentType<
      IPlayTaskProps<IPlayImageHotspotTask, IImageHotspotTaskSession>
    >
  | tPlayTaskComponentType<IPlayTaskProps<IPlayAuditionTask, IAuditionTaskSession>>
  | tPlayTaskComponentType<IPlayTaskProps<IWordGamesTask, IWordGamesTaskSession>>
  | tPlayTaskComponentType<IPlayTaskProps<IDictationTask, IDictationTaskSession>>;

export type tPlayTaskComponentType<T> = FC<T> & {
  backgroundComponent?: StyledComponent<'div', any, Record<string, unknown>, never>;
};
export const playTaskMap = new Map<tPlayTaskType['type'], tPlayComponentType>([
  ['Tasks::ArrangeWords', PlayArrangeWordsTask],
  ['Tasks::Audition', PlayAuditionTask],
  ['Tasks::Dictation', PlayDictationTask],
  ['Tasks::InlineDropdown', PlayInlineDropdownTask],
  ['Tasks::FillGap', PlayFillSentenceGapTask],
  ['Tasks::MarkWord', PlayMarkWordTask],
  ['Tasks::MarkWordAudio', PlayMarkWordAudioTask],
  ['Tasks::SelectVideo', PlayMinimalPairsTask],
  ['Tasks::ImageObject', PlayImageObjectTask],
  ['Tasks::ImageHotspot', PlayImageHotspotTask],
  ['Tasks::WordGames', PlayWordGames]
]);
