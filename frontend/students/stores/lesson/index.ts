import { combineReducers } from 'redux';
import lessonDataReducer from './data';
import lessonSessionReducer from './session';
import phrasesReducer from './phrases';
import gameplaysReducer from './gameplays';
import lessonSessionResultsReducer from './sessionResults';

import lessonSelectors from './selectors';
export { lessonSelectors };
export * from './data';
export * from './session';
export * from './phrases';
export * from './gameplays';
export * from './sessionResults';

const lessonReducer = combineReducers({
  data: lessonDataReducer,
  session: lessonSessionReducer,
  phrases: phrasesReducer,
  gameplays: gameplaysReducer,
  sessionResults: lessonSessionResultsReducer
});

export default lessonReducer;
