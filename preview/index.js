( function() {
  document.addEventListener("DOMContentLoaded", function() {
    const ipc  = require( 'electron' ).ipcRenderer;
    var images = document.querySelectorAll( 'img' );

    Array.prototype.forEach.call( images, function( image ){
      image.addEventListener( 'click', function( event ) {
        event.preventDefault();
        event.stopPropagation();

        ipc.send( 'image-click', event.target.src );
      } );
    } );
  } );
} )();
