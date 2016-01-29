import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ImageSearch from '../image-search/index';
import { Link, router } from 'react-router';
import styles from './style.module.css';
import transitions from './transitions.module.css';
import tmp from 'tmp';


let Packager = require( '../../lib/packager' );

export default class GeneratorForm extends Component {
  constructor() {
    super();

    this.state = {
      fields : [
        {
          type : 'text',
          name : 'appName'
        },
        {
          type : 'url',
          name : 'appUrl'
        }
      ],
      values : {
        appName : 'CodePen',
        appUrl  : 'http://google.com'
      }
    };
  }


  handleFieldChange( event ) {
    this.state.values[ event.target.name ] = event.target.value;

    this.setState( this.state );
  }


  handleSubmit( event ) {
    event.preventDefault();

    this.props.onSubmit();

    tmp.dir( { unsafeCleanup : true }, function( error, tmpPath, cleanupCallback ) {
      let onProgress = this.props.onProgress;

      Packager.init( tmpPath, {
        name          : this.state.values.appName,
        url           : this.state.values.appUrl,
        icon          : this.state.values.appLogo,
        out           : 'dist',
        onProgress    : onProgress
      } ).then( function( app ) {
        onProgress( `App created + ${ app }` );
      } ).catch( function( error ) {
        alert( error );
      } );
    }.bind( this ) );
  }


  renderField( field ) {
    return (
      <li key={ field.name }>
        <input name={ field.name } type={ field.type } onChange={ this.handleFieldChange.bind( this ) } value={ this.state.values[ field.name ] }></input>
      </li>
    );
  }


  render() {
    return (
      <div>
        <form id="form" action="#"  onSubmit={ this.handleSubmit.bind( this ) }>
          <fieldset>
            <ul>
              { this.state.fields.map( this.renderField, this ) }
            </ul>
            <ImageSearch term={ this.state.values.appName }></ImageSearch>
            <button>Generate</button>
          </fieldset>
        </form>
        { JSON.stringify( this.state.values ) }
      </div>
    );
  }
}
