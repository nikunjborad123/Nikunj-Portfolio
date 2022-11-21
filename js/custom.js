$(document).ready(function(){

    // Custom Cursor
    function customCursor(options) {
        let settings = $.extend({
            targetClass: 'custom-cursor', // create element with this class
            wrapper: $('body'), // jQuery
            speed: .1,
            movingDelay: 300, // fire event onStop after delay
            hasHover: false, // has hover events
            hoverTarget: $('a[href], button'),
            touchDevices: false, // show on touch devices
            onMove: function(data) {}
          }, options),
          data = {},
          checkTouch = !settings.touchDevices && "undefined" !== typeof document.documentElement.ontouchstart,
          timer = null;
      
        // exit
        if (checkTouch || !settings.wrapper.length) return;
      
        // append the ball
        settings.wrapper.append(`<div class="${settings.targetClass}"></div>`);
      
        let $cursor = $('.' + settings.targetClass),
          position = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
          },
          mouse = {
            x: position.x,
            y: position.y
          },
          setX = gsap.quickSetter($cursor, "x", "px"),
          setY = gsap.quickSetter($cursor, "y", "px");
      
        // up<a href="https://www.jqueryscript.net/time-clock/">date</a> data
        data.cursor = $cursor;
      
        // on mouse move
        window.addEventListener("mousemove", init);
      
        function init() {
          // remove default mousemove event
          window.removeEventListener("mousemove", init);
      
          // add new custom event
          window.addEventListener("mousemove", e => {
            mouse.x = e.x;
            mouse.y = e.y;
      
            // update data and trigger event
            data.isMoving = true;
            settings.onMove(data);
      
            timer = setTimeout(function() {
              // update data and trigger event
              data.isMoving = false;
              settings.onMove(data);
            }, settings.movingDelay);
          });
      
          // fade out cursor
          document.addEventListener("mouseleave", e => {
            // update data and trigger event
            data.isInViewport = false;
            settings.onMove(data);
          });
      
          // update cursor's position
          document.addEventListener("mouseenter", e => {
            mouse.x = position.x = e.x;
            mouse.y = position.y = e.y;
      
            // update data and trigger event
            data.isInViewport = true;
            settings.onMove(data);
          });
      
          gsap.ticker.add((time, deltaTime) => {
            let fpms = 60 / 1000,
              delta = deltaTime * fpms,
              dt = 1 - Math.pow(1 - settings.speed, delta);
            position.x += (mouse.x - position.x) * dt;
            position.y += (mouse.y - position.y) * dt;
            setX(position.x);
            setY(position.y);
          });
      
          data.isInViewport = true;
        }
      
        // on hover
        if (settings.hasHover && settings.hoverTarget.length) {
          setTimeout(function() {
            settings.hoverTarget.hover(function() {
              data.hoverTarget = $(this);
              data.isHover = true;
              settings.onMove(data);
            }, function() {
              data.hoverTarget = $(this);
              data.isHover = false;
              settings.onMove(data);
            });
          }, 100);
        }
      }
      
      // big ball
      customCursor({
        hasHover: true,
        onMove: function(data) {
          if (data.isInViewport) {
            // in viewport
            if (data.isMoving) {
              if (data.isHover) {
                gsap.to(data.cursor, {
                  opacity: 1,
                  scale: 1.5
                });
              } else {
                gsap.to(data.cursor, {
                  opacity: .5,
                  scale: .8
                });
              }
            } else {
              if (data.isHover) {
                gsap.to(data.cursor, {
                  opacity: 1,
                  scale: 1.5
                });
              } else {
                gsap.to(data.cursor, {
                  opacity: .5,
                  scale: 1
                });
              }
            }
          } else {
            // out viewport
            gsap.to(data.cursor, {
              opacity: 0,
              scale: 0
            });
          }
        },
      });
      
      // dot inside
      customCursor({
        targetClass: 'custom-cursor-dot',
        speed: .5,
        onMove: function(data) {
          if (data.isInViewport) {
            gsap.to(data.cursor, {
              opacity: 1
            });
          } else {
            gsap.to(data.cursor, {
              opacity: 0
            });
          }
        },
      });


    // loader...........


    setTimeout(function(){
        $('#loader').fadeOut()
    },500)


    // ******** active links **********
    activelink();

    function activelink(){
        $('.main-menu li a , .mob-main-menu li a').click(function(){
            $('li').removeClass('active');
            $(this).closest('li').addClass('active')
        })
    }

  
    // ********************** Header Fixed **********************
    $('.top-bar').hide()
    
    $(window).scroll(function(){
        var scroll = $(window).scrollTop()
        // alert(scroll)

        if(scroll > 100){
            $('.header-area').addClass('fixed');
            $('.top-bar').fadeIn()
        }
        else{
            $('.header-area').removeClass('fixed')
            $('.top-bar').fadeOut()
        }


    })

    $('.top-bar').click(function(){
        $('html,body').animate({'scrollTop':0},100)
    })




// mob menu close and open

$('.menu-bar').click(function(){
    $('.mob-menu').toggleClass('open close')
});
$('.close-btn').click(function(){
    $('.mob-menu').toggleClass('close')
})




// slider

$('#slider-1').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    smartSpeed: 500,
    // fluidSpeed: 6,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})



    // *********************** Form Validation ***********************

    $('#frm_validate').submit(function(){

        // alert('hello')
        var user = $('#user_name').val()
        var phoneno = $('#phone_number').val()
        var pattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
        var email = $('#email_id').val()
        var mail_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var subject = $('#subject').val()
        var message = $('#contact-message').val()

        $('#error').css('padding', '10px 0');

//For username
if (user == '') 
{
    $('#error').html('* Name can not be empty!');
    return false
}
else{
    $('#error').html()
}

//For phone nmuber
if (phoneno == '')
{
    $('#error').html('* Phone number can not be empty!');
    return false
}
else{
    $('#error').html()
}

if(pattern.test(phoneno) == false)
{
    $('#error').html('* Please put a valid phone number!');
    return false
}
else{
 $('#error').html()
}

//For Email adrress
if (email == '')
{
    $('#error').html('* Email can not be empty!');
    return false
}
else{
    $('#error').html()
}

if(mail_pattern.test(email) == false)
{
    $('#error').html('* Please put a valid email address!');
    return false
}
else{
 $('#error').html()
}

//For subject
if (subject == '') 
{
    $('#error').html('* Subject can not be empty!');
    return false
}
else{
    $('#error').html()
}

//For Message
if (message == '') 
{
    $('#error').html('* Message can not be empty!');
    return false
}
else{
    $('#error').html()
}


});


// resume area

    $('.nav-item').click(function(){
        $('button').removeClass('active');
        $(this).children('button').addClass('active')
    });

    $('#professional-skills').hide()
    $('#experiance').hide()
    $('#interview').hide()
    

    $('.ctm-nav-list .nav-item #btn-1').click(function(){
        $('#experiance').fadeOut()
        $('#professional-skills').fadeOut()
        $('#interview').fadeOut()
        $('#education').fadeIn()
    })

    $('.ctm-nav-list .nav-item #btn-2').click(function(){
        $('#education').fadeOut()
        $('#experiance').fadeOut()
        $('#interview').fadeOut()
        $('#professional-skills').fadeIn()
    })

     $('.ctm-nav-list .nav-item #btn-3').click(function(){
        $('#education').fadeOut()
        $('#professional-skills').fadeOut()
        $('#interview').fadeOut()
        $('#experiance').fadeIn()
    })

      $('.ctm-nav-list .nav-item #btn-4').click(function(){
        $('#education').hide()
        $('#professional-skills').hide()
        $('#experiance').hide()
        $('#interview').fadeIn()

    })

//  Fancy box---

    $("a.group").fancybox({
            'transitionIn'  :   'elastic',
            'transitionOut' :   'elastic',
            'speedIn'       :   600, 
            'speedOut'      :   200, 
            'overlayShow'   :   false
        });




});

		// Wow JS

        wow = new WOW(
            {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         true        // default
          }
          )
          wow.init();

// Js Typewriter
          var typed = new Typed("#typed", {
            stringsElement: '#typed-strings',
            typeSpeed: 200,
            backSpeed: 200,
            backDelay: 300,
            startDelay: 500,
            loop: true,
            onBegin: function(self) { prettyLog('onBegin ' + self) },
            onComplete: function(self) { prettyLog('onCmplete ' + self) },
            preStringTyped: function(pos, self) { prettyLog('preStringTyped ' + pos + ' ' + self); },
            onStringTyped: function(pos, self) { prettyLog('onStringTyped ' + pos + ' ' + self) },
            onLastStringBackspaced: function(self) { prettyLog('onLastStringBackspaced ' + self) },
            onTypingPaused: function(pos, self) { prettyLog('onTypingPaused ' + pos + ' ' + self) },
            onTypingResumed: function(pos, self) { prettyLog('onTypingResumed ' + pos + ' ' + self) },
            onReset: function(self) { prettyLog('onReset ' + self) },
            onStop: function(pos, self) { prettyLog('onStop ' + pos + ' ' + self) },
            onStart: function(pos, self) { prettyLog('onStart ' + pos + ' ' + self) },
            onDestroy: function(self) { prettyLog('onDestroy ' + self) }
          });

