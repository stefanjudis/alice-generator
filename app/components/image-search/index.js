import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './style.module.css';
import { ipcRenderer } from 'electron';
import Dropzone from 'react-dropzone';


export default class ImageSearch extends Component {
  constructor() {
    super();

    this.state = {
      files : []
    };

  }

  componentDidMount() {
    ipcRenderer.on( 'image-set', function( event, src ) {
      this.state.files = [ {
        preview : src
      } ];

      this.setState( this.state );
    }.bind( this ) );
  }


  handleClick() {
    ipcRenderer.send( 'image-search', this.props.term );
  }

  handleDrop( files ) {
    this.setState( {
      files : files
    } );
  }

  render() {
    return (
      <div>
        <button type="button" onClick={ this.handleClick.bind( this ) }>Search the web</button>
        <Dropzone onDrop={ this.handleDrop.bind( this ) } multiple={ false } className={ styles.dropZone } activeClassName={ styles.activeDropZone }>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        {
          this.state.files.length > 0 ?
          <div>{this.state.files.map((file, index ) => <img key={ index } src={file.preview} /> )}</div> :
          null
        }

        { JSON.stringify( this.state.files ) }
      </div>
    );
  }
}
