import { combineReducers } from 'redux';
import packagerState from './packagerState';
import image from './image';

const rootReducer = combineReducers( {
  image,
  packagerState
} );

export default rootReducer;
