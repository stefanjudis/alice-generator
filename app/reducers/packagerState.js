import { SET_PACKAGER_STATE } from '../actions/packagerState';

export default function packagerState(state = 'bob', action) {
  switch ( action.type ) {
    case SET_PACKAGER_STATE:
      return action.value;
    default:
      return state;
  }
}
