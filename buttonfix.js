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

	function init()
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
			
		for (var i = 0, count = buttons.length; i < count; i++)
		{
			var button = buttons[i];
			// We only want submit buttons
			if (button.type != 'submit')
				continue;
			
			button.attachEvent('onclick', handleClick);
		}

		// Also loop through regular submit buttons
		// <button>s should be disabled when submitted via <input>s
		var inputs = document.getElementsByTagName('input');
		for (var i = 0, count = inputs.length; i < count; i++)
		{
			var input = inputs[i];
			if (input.type != 'submit')
				continue;
				
			input.attachEvent('onclick', handleClick);
		}
	}
	
	initTimer = window.setInterval(init, 10);	
})(window.document.documentElement);
