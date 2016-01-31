import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ImageStateActions from '../../actions/image';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Canvas extends Component {
  static propTypes = {
    setImage : PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  componentDidMount() {
    var context = ReactDOM.findDOMNode( this ).getContext( '2d' );

    context.clearRect(0, 0, 200, 200);

    this.paint( context );
  }

  componentDidUpdate() {
    var context = ReactDOM.findDOMNode( this ).getContext( '2d' );
    context.clearRect( 0, 0, 200, 200 );
    this.paint( context );
  }

  paint( context ) {
    context.save();

    let image = new Image();

    image.src = this.props.src;

    image.onload = function() {
      context.drawImage(image, 0, 0);

      this.props.setImage(
        ReactDOM.findDOMNode( this ).toDataURL( 'image/png' )
      );
    }.bind( this );
  }

  render() {
    return (
      <canvas width={ 200 } height={ 200 }></canvas>
    );
  }
}


function mapStateToProps( state ) {
  return {};
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( ImageStateActions, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Canvas );
