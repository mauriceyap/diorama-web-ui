import { combineReducers } from 'redux';

import theme from './theme/reducer';
import programs from './programs/reducer';

const reducers = {
  theme,
  programs,
};

export default combineReducers(reducers);
