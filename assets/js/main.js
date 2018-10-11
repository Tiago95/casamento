$(document).ready(function() {
   
    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 100});
    
    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){
        
        //store hash
        var target = this.hash;
                
        e.preventDefault();
        
		$('body').scrollTo(target, 800, {offset: -55, 'axis':'y'});
        //Collapse mobile menu after clicking
		if ($('.navbar-collapse').hasClass('show')){
			$('.navbar-collapse').removeClass('show');
		}
		
	}); 
     
    /* ======= jQuery Placeholder ======= */
    /* Ref: https://github.com/mathiasbynens/jquery-placeholder */
    
    $('input, textarea').placeholder();         
    
    /* ======= Countdown ========= */
	// set the date we're counting down to
    var target_date = new Date(2018, 10, 24, 19, 30, 0, 0).getTime();
     
    // variables for time units
    var days, hours, minutes, seconds;
     
    // get tag element
    var countdown =  document.getElementById("countdown-box");
    var days_span = document.createElement("SPAN");
    days_span.className = 'days';
    countdown.appendChild(days_span);
    var hours_span = document.createElement("SPAN");
    hours_span.className = 'hours';
    countdown.appendChild(hours_span);
    var minutes_span = document.createElement("SPAN");
    minutes_span.className = 'minutes';
    countdown.appendChild(minutes_span);
    var secs_span = document.createElement("SPAN");
    secs_span.className = 'secs';
    countdown.appendChild(secs_span);
     
    // update the tag with id "countdown" every 1 second
    setInterval(function () {
     
        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;
     
        // do some time calculations
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
         
        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;
         
        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);
         
        // format countdown string + set tag value.
        days_span.innerHTML = '<span class="number">' + days + '</span>' + '<span class="unit script">Dias</span>';
        hours_span.innerHTML = '<span class="number">' + hours + '</span>' + '<span class="unit script">Horas</span>';
        minutes_span.innerHTML = '<span class="number">' + minutes + '</span>' + '<span class="unit script">Minutos</span>';
        secs_span.innerHTML = '<span class="number">' + seconds + '</span>' + '<span class="unit script">Segundos</span>';
        
      
        //countdown.innerHTML = days + "d, " + hours + "h, "
       // + minutes + "m, " + seconds + "s";  
     
    }, 1000);

    
    /* ===== Packery ===== */
    //Ref: http://packery.metafizzy.co/
    //Ref: http://imagesloaded.desandro.com/

    var $container = $('#photos-wrapper');
    
    // init
    $container.imagesLoaded(function () {
        $container.packery({
            itemSelector: '.item',
            percentPosition: true
        });
    });
    
    
    /* ======= RSVP Form (Dependent form field) ============ */
    $('#cevents').on("change", function(){
        if ($(this).val() === "") {
            $('.guests-group').slideUp(); //hide
        } else if ($(this).val() === 'Não' ) {
            $('.guests-group').slideUp(); //hide
            $('.guestinfo-group').slideUp(); //hide
            $('#cguestinfo').val('Nenhum');
            $('#cguests').val('Nenhum');//Pass data to the field so mailer.php can send the form.

        } else {
            $('.guests-group').slideDown(); //show
            $('#cguestinfo').val('');
            $('#cguests').val('');
        }
    });


    $('#cguests').on("change", function(){
        if ($(this).val() === "") {
            $('.guestinfo-group').slideUp(); //hide
        } else if ($(this).val() === 'Nenhum' ) {
            $('.guestinfo-group').slideUp(); //hide
            $('#cguestinfo').val('Nenhum'); //Pass data to the field so mailer.php can send the form.
        } else {
            $('.guestinfo-group').slideDown(); //show
            $('#cguestinfo').val(''); //Clear data
        }
    });
    
    /* ======= jQuery form validator ======= */ 
    /* Ref: http://jqueryvalidation.org/documentation/ */   
    $(".rsvp-form").validate({
		messages: {
		    name: {
    			required: 'Por favor digite seu nome' //You can customise this message
			},
			events: {
				required: 'Por favor diga se você vai ao evento' //You can customise this message
			},
			guests: {
				required: 'Por favor diga quantas pessoas você vai levar' //You can customise this message
			},
			guestinfo: {
				required: 'Por favor preencha o nome dos acompanhantes que você irá levar' //You can customise this message
			},
		}
	});
  

});