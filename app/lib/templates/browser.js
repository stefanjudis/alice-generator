( function( document, window ) {
  debugger;

  document.addEventListener( 'DOMContentLoaded', function() {
    document.body.addEventListener( 'click', function( event ) {
      if ( event.target.tagName === 'A' ) {
        var hostName = window.location.hostname;

        if ( /.*?.\.*?\..*?/.test( hostName ) ) {
          hostName = hostName.split( '.' );

          hostName.shift();

          hostName = hostName.join( '.' );
        }

        var regex = new RegExp( hostName );

        if ( ! regex.test( event.target.href ) ) {
          console.log( 'preventing' );
          event.preventDefault();

          window.open( event.target.href );
        }
      }
    } );
  } );
} )( document, window );
