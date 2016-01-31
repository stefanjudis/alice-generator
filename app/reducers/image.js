import { SET_IMAGE } from '../actions/image';
import fs from 'fs';


export default function image( state = null, action) {
  switch ( action.type ) {
    case SET_IMAGE:
      let matches = action.value.match( /^data:([A-Za-z-+\/]+);base64,(.+)$/ );
      let response = {};

      if ( matches.length !== 3 ) {
        console.error( 'Invalid input string' );
        return state;
      }

      state = matches[ 2 ];

      // TODO this should go into state change to actually writing the app later...
      fs.writeFileSync( 'test.png', new Buffer( state, 'base64' ) );

      return state;
    default:
      return state;
  }
}
