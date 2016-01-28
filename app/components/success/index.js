import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import styles from './style.module.css';
// import transitions from './transitions.module.css';
// import GeneratorForm from '../generator-form/index';

export default class Success extends Component {
  static propTypes = {
    setPackagerState : PropTypes.func.isRequired,
    packagerState    : PropTypes.string.isRequired
  };

  render() {
    const { setPackagerState, packagerState } = this.props;
    return (
      <div>
        <br></br><br></br>
        <IndexLink to="/">Go back</IndexLink>
        <br></br><br></br>
        { packagerState }
      </div>
    );
  }
}
