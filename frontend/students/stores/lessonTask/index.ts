import { combineReducers } from 'redux';
import lessonTaskDataReducer, { dataActions } from './data';
import lessonTaskSessionReducer, { sessionActions } from './session';

import lessonTaskSelectors from './selectors';
export { lessonTaskSelectors };
export const lessonTaskActions = {
  ...dataActions,
  ...sessionActions
};

const lessonTaskReducer = combineReducers({
  data: lessonTaskDataReducer,
  session: lessonTaskSessionReducer
});

export default lessonTaskReducer;
