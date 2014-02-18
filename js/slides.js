(function ($) {

   var KEY_CODES = {
     LEFT_ARROW: 37,
     RIGHT_ARROW: 39
   },
   ANIMATION_SPEED = 1200;
   
   function _showSlide($slide) {
     if ($slide.hasClass("active")) {
       return;
     }
     
     $slide.css("opacity", 0)
       .addClass("active")
       .animate({"opacity": 1}, ANIMATION_SPEED)
       .siblings().removeClass("active");
   }
   
   function _getNormalizedSlideIndex(delta) {
     var slideIndex = this.data("currentSlide") + delta,
         slidesCount = this.find(".slide").length;
     
     if (slideIndex < 0) {
       slideIndex = 0;
     }
     
     if (slideIndex >= slidesCount) {
       slideIndex = slidesCount - 1;
     }

     return slideIndex;
   }

   var methods = {
     init: function () {
       if (this.data("slidesBound")) {
         return this;
       }

       return this.each(
         function () {
           var $this = $(this);
           $this.data("slidesBound", true);
   
           //Show first slide
           var $first = $this.find(".slide").first();
           $this.data("currentSlide", $first.index());
           
           _showSlide($first);

           //Bind event handlers
           $(document).on(
             "keydown", 
             function(evt) {
               var pressedKey = evt.keyCode;
               if (pressedKey === KEY_CODES.LEFT_ARROW) {
                 methods.prev.apply($this);
               } else if (pressedKey === KEY_CODES.RIGHT_ARROW) {
                 methods.next.apply($this);
               }
             });
           
         });
     },
     next: function () {
       var slideIndex = _getNormalizedSlideIndex.call(this, 1);
       var $slide = this.find(".slide").eq(slideIndex);
       _showSlide($slide);
       
       return this;
     },
     prev: function () {
       var slideIndex = _getNormalizedSlideIndex.call(this, -1);
       var $slide = this.find(".slide").eq(slideIndex);
       _showSlide($slide);

       return this;
     }
   }; 

   $.fn.slides = function (methodName) {
     var method = (methodName && methods[methodName]) || methods["init"];

     //console.log(method);
     
     return method.apply(this);
   };
   
 }(jQuery));