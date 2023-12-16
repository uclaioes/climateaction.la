$(document).ready(function() {

	
	/*
	 *
	 * Rotating BG images
	 *
	*/
	
	window.bg_slideshow = function() { 
	
		var timer = 6000,
			timerAdd = 500, // add to timer each round so the slideshow gets slower over time
			transitionTime = 1500,
			imageCount = 4,
			bgSelector = '.homepage__bg-image',
			classSlug = 'homepage__bg-image--',
			i = false,
			old_i;

		//////////////////////////////////////


		function prepareNextImage() {
			// Prepare new image for next round
			old_i = i;
			i++;
			if (i > imageCount - 1) i = 0;

			$(bgSelector).first().addClass(classSlug + i);	
		}

		function switchBG() {

			if (i === false) {
				// First time only
				i = 0;
				$(bgSelector).last().addClass(classSlug + i);	

				prepareNextImage();

				setTimeout(function(){ 
					switchBG();
				}, timer);		

			} else {
				// Unhide new image
				$(bgSelector).first().show();

				// Fade out old image
				$(bgSelector).last().fadeOut(transitionTime, function(){	
					// move this bg before the other one 
					console.log(classSlug + old_i);
					$(bgSelector).last()
						.removeClass(classSlug + old_i)
						.insertBefore( $(bgSelector).first() );

					prepareNextImage();

					setTimeout(function(){ 
						switchBG();
					}, timer);		

				});				
			}	
			
			timer = timer + timerAdd;

		}

		// When page loads
		switchBG();
	
	}
	
});