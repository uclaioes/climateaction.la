/**

############################
ACCORDION
=========
Contents:
1. ACCORDION FUNCTIONALITY
2. AUTO-OPENING VIA #HASH IN URL
############################
**/


(function ($) {
$(document).ready(function(){

	/* 
	************************
	* 1.
	* ACCORDION FUNCTIONALITY
	* =======================
	*/

	/* INIT */
	window.accordion_init = function(selector){
		$js_accordion = $(selector + ' .js-accordion');
		
		// Enable accordions
		$js_accordion.addClass('accordion-enabled');
		$js_accordion.removeClass('accordion-disabled');
	
		// Default: Closed
		$js_accordion.not('.js-accordion-default-open')
			.addClass('accordion-closed')
			.children('.js-accordion-payload').hide();
		
		// Default: Open
		$js_accordion.filter('.js-accordion-default-open')
			.addClass('accordion-open')
			.children('.js-accordion-payload').show();

		auto_open_via_hash_tag(selector);
	}
	// Initialize all on load
	accordion_init('body');
	
	
	/* DESTROY */
	window.accordion_destroy = function(selector){
		$js_accordion = $(selector + ' .js-accordion');
		$js_accordion.addClass('accordion-disabled');
		$js_accordion.removeClass('accordion-enabled');

		$js_accordion.removeClass('accordion-closed');
		$js_accordion.removeClass('accordion-open');


		$js_accordion.children('.js-accordion-payload').css('display', '');
	}
	
	
	/* CLICK FUNCTION */
	$('.js-accordion-trigger').click(function(e) {
		if ( ! $(this).parent('.js-accordion').hasClass('accordion-disabled') ) {
			// Don't follow (a possible) link when the accordion is activated
			e.preventDefault();
		}
		
		_data_hash = $(this).parent().attr('data-hash');
		if (_data_hash) {
			_hash = '#' + _data_hash.replace(/^.*[\\\/]/, ''); //get filename only
			_url = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
		}
	
		if ( $(this).parent().hasClass('accordion-enabled') ) {
			if ( $(this).parent().hasClass('accordion-closed') ) {
				// Open
				$(this).parent()
					.removeClass('accordion-closed')
					.addClass('accordion-open');
				$(this).next('.js-accordion-payload').slideDown(300);
				
				if (_data_hash) {
					_newurl = _url + _hash;
					history.replaceState(null, null, _newurl); // change the url without a page refresh and NO history entry.
				}
				
			} else {
				// Close
				$(this).parent()
					.removeClass('accordion-open')
					.addClass('accordion-closed');
				$(this).next('.js-accordion-payload').slideUp(300);
	
				if (_data_hash) {
					_newurl = _url + '#';
					history.replaceState(null, null, _newurl); // change the url without a page refresh and NO history entry.
				}
	
			}
		}
	});


	/* 
	************************
	* 2.
	* AUTO-OPENING VIA #HASH IN URL
	* Open one of the accordions based on hash tag in url
	* =============================
	* Important: add   data-hash='hashname'   to <article> tag
	*/
	function auto_open_via_hash_tag(selector) {
		var hash = window.location.hash.substring(1);
		var hash_selector = selector + ' [data-hash="' + hash + '"]';
		if (hash) {
			// open accordion if accordions are enabled
			if ($(hash_selector).hasClass('accordion-enabled')) {
				$(hash_selector)
					.removeClass('accordion-closed')
					.addClass('accordion-open')
			}
			// scroll window to proper location
			$(hash_selector)
				.children('div').first()
					.slideDown(function() {
						$('html, body').animate({scrollTop: $(hash_selector).offset().top}, 1000); 
			
					})
				;
		}
	}

	/* Monitor hash value in URL so that the auto_open_via_hash_tag() function can be called on change */
	if ("onhashchange" in window) { // event supported?
		window.onhashchange = function () {
			auto_open_via_hash_tag('body');
		}
	}
	else { // event not supported:
		var storedHash = window.location.hash;
		window.setInterval(function () {
			if (window.location.hash != storedHash) {
				auto_open_via_hash_tag('body');
			}
		}, 100);
	}
	


} );
})(jQuery);