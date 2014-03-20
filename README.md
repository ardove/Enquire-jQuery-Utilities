These utilities helped me in progessively enhancing a fixed width desktop site so I thought I'd share them for other users encountering the same issues.

Prerequisites:
	- Enquire.js
	- jQuery

Description: 
	
	A couple of reusable utilities using Enquire and jQuery. The basic idea of each one is to clone the HTML of an existing element, insert the clone back into the DOM, and then hide the original when the media query matches (so we can show the original html when it unmatches and show the clone when it matches again). 

	Each one will seek to emulate the functions required for an Enquire handler (registered to a media query) -- setup => constructor function, match => match function, unmatch => unmatch function, destroy => destroy function.
	
	- Flyout: A flyout panel which takes an activator and a piece of content which will be flown in/out when the activator is toggled.
	
	- Collapsible: A collapsible content area which takes an activator and a piece of content which will be expanded/collapsed when the activator is toggled.

Inspiration: I've recently been working on projects which have had a predefined desktop template and money spent to implement it, so they didn't want to redesign the whole thing from the ground up with a mobile-first approach. 

Also, I couldn't go the route of including a library like jQuery mobile because it was a bit too heavy (each utility will aim to be under 10k). 

Details:
	Flyout

		By default, this utility will create a flyout panel which will fly in and fly out from the left. It will assume the activator is shown/hidden correctly by Media Queries and CSS. It will then clone the content (and position it) and hide the original.

		Note, for simplicity, the default position of the cloned content is beneath the activator.

		Also, the CSS selector for both the activator and content should match exactly 1 element (or there is undefined behavior).

		Constructor Options
			- activator -- required 
				- css locator/jquery-fied element which will activate the flyin/flyout
			- content -- required 
				- css locator/jquery-fied element which will flyin/flyout
			- TODO: direction -- optional -- default = 'left'
				- direction the panel should fly in from
				- accepted values: left, right, top, bottom

		Example usage:

			var flyout = null,
			mediaQuery = "screen and (max-width:480px)", 
			mediaQueryHandler = {
				deferSetup : true,
				setup : function(){
					flyout = new Flyout({ 
						activator:'#flyoutActivator',
						content:'#flyoutContent'
					});
				},
				match : function(){
					flyout.match();
				},
				unmatch : function(){
					flyout.unmatch();
				},
				destroy : function(){
					flyout.destroy();
				}
			};

	Collapsible

		By default, this utility will create a collapsible content area which will slide down (expanded) and up (collapsed). It will clone both the activator and content, and then place the cloned content after the originals.

		Also, the CSS selector for both the activator and content should match exactly 1 element (or there is undefined behavior).

		Constructor Options
			- activator -- required 
				- css locator/jquery-fied element which will activate the collapse/expand
			- content -- required 
				- css locator/jquery-fied element which will expand/collapse

		Example usage:

			var collapsible = null,
			mediaQuery = "screen and (max-width:480px)", 
			mediaQueryHandler = {
				deferSetup : true,
				setup : function(){
					collapsible = new collapsible({ 
						activator:'#collapsibleActivator',
						content:'#collapsibleContent'
					});
				},
				match : function(){
					collapsible.match();
				},
				unmatch : function(){
					collapsible.unmatch();
				},
				destroy : function(){
					collapsible.destroy();
				}
			};