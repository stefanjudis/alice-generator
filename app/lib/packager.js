'use strict';

let packager      = require( 'electron-packager' );
let template      = require( 'lodash.template' );
let fs            = require( 'fs' );
let patchFs       = require( 'electron-patch-fs' );
let child_process = require( 'child_process' );

const OPTIONS = {
  version  : '0.36.2',
  arch     : process.arch,
  platform : process.platform
};

const appPath = require('electron').remote.app.getAppPath();

const FILES = [
  `${appPath}/app/lib/templates/index.js`,
  `${appPath}/app/lib/templates/browser.js`,
  `${appPath}/app/lib/templates/package.json`,
  `${appPath}/app/lib/templates/storage.js`,
];

function init( tmpPath, options ) {
  options = Object.assign( OPTIONS, options )

  let promise = new Promise( function( resolve, reject ) {
    options.dir     = tmpPath;
    options.out     = `${tmpPath}/dist`;
    options.icon    = `${__dirname}/../../alice.icns`;

    options.onProgress( 'Preparing files' );

    FILES.forEach( ( file ) => {
      try {
        let fileContent = template(
          fs.readFileSync( file, 'utf8' )
        )( {
            url  : options.url,
            name : options.name
          }
        );

        fs.writeFileSync(
          `${ tmpPath }/${ file.split( '/' ).pop() }`,
          fileContent
        );
      } catch( error ) {
        return reject( error );
      }
    } );

    patchFs.patch();

    options.onProgress( 'Running npm install' );

    console.log( 'running npm install' );

    child_process.spawnSync( 'npm', [ 'i' ], { cwd : options.dir } );

    console.log( options.dir );

    options.onProgress( 'Creating app!!!' );

    packager( options, function( error, appPath ) {

      if ( error ) {
        return reject( error );
      }

      resolve( appPath );

      patchFs.unpatch();

      // cleanupCallback();
    } );
  } );

  return promise;
}

module.exports = {
  init : init
};
