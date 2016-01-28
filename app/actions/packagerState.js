export const SET_PACKAGER_STATE = 'SET_STATE';

export function setPackagerState( value ) {
  return {
    type  : SET_PACKAGER_STATE,
    value : value
  };
}
