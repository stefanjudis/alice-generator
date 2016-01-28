import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/home/index';
import * as PackagerStateActions from '../actions/packagerState';

function mapStateToProps( state ) {
  return {
    counter       : state.counter,
    packagerState : state.packagerState
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( PackagerStateActions, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Home );
