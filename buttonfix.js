/**!
 * <button> fix for IE 6 and 7 - http://dl.vc/buttonfix
 * By Daniel Lo Nigro (Daniel15)
 * Licensed under the MIT license
 *
 * Uses a simple DOMReady implementation for old IE, based off http://javascript.nwbox.com/IEContentLoaded/
 */
;(function(docEl)
{
	var buttons = document.getElementsByTagName('button'),
	    valueEl = document.createElement('input'),
	    initTimer;
	
	// Called when a button is clicked
	// Handles disabling all the buttons so they're not posted to the server, and creates a hidden
	// field containing the value of the clicked button.
	function handleClick()
	{
		var count = buttons.length,
		    clicked = window.event.srcElement,
		    form = clicked.form;
		    
		// Disable all the buttons
		for (var i = 0; i < count; i++)
			buttons[i].disabled = true;
			
		// Set the hidden field to have the details of the clicked button
		valueEl.type = 'hidden';
		valueEl.name = clicked.name;
		valueEl.value = clicked.attributes.getNamedItem('value').nodeValue;
		// Insert it into the form containing the clicked button
		form.appendChild(valueEl);
	
		form.submit();	
		
		// Re-enable all the buttons after the form is submitted
		setTimeout(function()
		{
			for (var i = 0; i < count; i++)
				buttons[i].disabled = false;
		}, 50);
	}
	
	// Attach all the required event listeners
	function attachEvents()
	{
		for (var i = 0, count = buttons.length; i < count; i++)
		{
			var button = buttons[i];
			// We only want submit buttons
			if (button.type != 'submit')
				continue;
			
			button.attachEvent('onclick', handleClick);
		}
		
		// Also loop through regular submit buttons
		var inputs = document.getElementsByTagName('input');
		for (var i = 0, count = inputs.length; i < count; i++)
		{
			var input = inputs[i];
			if (input.type != 'submit')
				continue;
				
			input.attachEvent('onclick', handleClick);
		}
	}
	
	// Keeps polling to check whether the page has fully loaded yet
	function checkIfLoaded()
	{
		// Check if the DOM is ready (credits to Diego Perini - http://javascript.nwbox.com/IEContentLoaded/)
		try
		{
			docEl.doScroll('left');
			// Stop checking
			window.clearInterval(initTimer);
		}
		catch (e)
		{
			return;
		}
		
		// If we reach here, the page has finished loading
		attachEvents();
	}

	function init()
	{
		// The doScroll hack doesn't work inside frames and iframes (see http://javascript.info/tutorial/onload-ondomcontentloaded)
		// Check if we're inside a frame
		if (window.top === window.self)
		{
			// Not inside a frame, so it's safe to use the doScroll technique
			initTimer = window.setInterval(checkIfLoaded, 10);
		}
		else
		{
			// Inside a frame, so just attach to onload
			window.attachEvent('onload', attachEvents);
		}
	}
	
	init();
})(window.document.documentElement);