import { combineReducers } from 'redux';
import profileReducer from './profile';
import preferencesReducer from './preferences';
import userSelectors from './selectors';
export * from './preferences';
export * from './profile';

const userReducer = combineReducers({
  profile: profileReducer,
  preferences: preferencesReducer
});

export default userReducer;

export { userSelectors };
