;(function( $, window, undefined ) {

  $.MagnifyZoom = function( options, element ) {
    this.$imageContainer = $( element );
    this._init( options );
  };

  $.MagnifyZoom.defaults = {
    width: 300,
    height: 300,
    cornerRounding: '50%',
    fadeSpeed: 100
  };

  $.MagnifyZoom.prototype = {

    _init: function( options ) {
      imageObject = new Image();
      imageObject.src = $( '.small' ).attr( 'src' );
      this.options = $.extend( $.MagnifyZoom.defaults, options );
      this.nativeWidth = imageObject.width;
      this.nativeHeight = imageObject.height;
      this.$glass = $( '.large' );
      this.$smallImage = $( '.small' );
      this._getLocation();
    },

    _getLocation: function() {
      self = this;
      this.$imageContainer.mousemove( function( e ){
        $target = $( this );
        magnifyOffset = $target.offset();
        self.mouseX = e.pageX - magnifyOffset.left;
        self.mouseY = e.pageY - magnifyOffset.top;
        self._zoom( $target );
      });
    },

    _zoom: function( $target ) {
      if( this.mouseX <= $target.width() &&  this.mouseX >= 0 &&  this.mouseY <= $target.height() && this.mouseY >= 0 ) {
        this.$glass.stop().fadeIn( this.options.fadeSpeed );}
        else { this.$glass.stop().fadeOut( this.options.fadeSpeed );}

       if ( this.$glass.is( ':visible' ) ) {
        const backgroundImagePos = ( m, s, n, g ) => Math.round( m / s * n  - g / 2 ) * -1;
        rx = backgroundImagePos( this.mouseX, this.$smallImage.width(), this.nativeWidth, this.$glass.width() );
        ry = backgroundImagePos( this.mouseY, this.$smallImage.height(), this.nativeHeight, this.$glass.height() );
        const mouseOffset = ( pos, area ) => pos - area/2;

        this.$glass.css({
          width: this.options.width,
          height: this.options.height,
          borderRadius: this.options.cornerRounding,
          left: mouseOffset( this.mouseX, this.$glass.width() ),
          top: mouseOffset( this.mouseY, this.$glass.height() ),
          backgroundPosition: rx + "px " + ry + "px"
        });
      };
    }
  }

  $.fn.magnifyZoom = function( options ) { 
      if ( typeof options === 'string' ) {
      } else { 
          this.each( function() {
              var instance = $.data( this, 'magnifyZoom' );
              ( instance ) ? instance._int() : instance = $.data( this, 'magnifyZoom', new $.MagnifyZoom( options, this ) );
          });
      }
      return this;  
  }; 
} )( jQuery, window );