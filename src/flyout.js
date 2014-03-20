(function($) {

	var validate = function(options) {
		if (!options.activator) {
			throw "Activator Required!"
		}
		if (!options.activator) {
			throw "Content Required!"
		}
	};

	function Flyout(options) {

		validate(options);

		var $body = $(document.body),
			activator = $body.find(options.activator)
			content = $body.find(options.content),
			cContent = content.clone(),
			panel = $('<div class="panel"></div>'),
			toggled = false,
			self = this;

		//hide content from dom
		content.hide();

		//add cloned content to panel
		panel.append(cContent);
		//set top = activators bottom, so we can animate onscreen
		panel.css({
			position : 'absolute',
			top : activator.offset().top + activator.outerHeight() + 'px'
		});

		//add panel to dom
		$body.append(panel);

		//toggle the content when the activator is clicked
		activator.bind('click', function(e) {
			if (self.isToggled()) {
				self.flyout();
			} else {
				self.flyin();
			}
		});

		self.isToggled = function() {
			return toggled;
		};

		self.flyin = function(opts) {
			var o = opts || {};
			var shown = {};

			//reset left position to offscreen
			//shown.left = -(2 * $body.outerWidth()) + 'px';
			//panel.animate(shown,{duration:0});
			//set left = activators left
			shown.left = activator.offset().left + 'px';

			panel.animate(shown, o);
			panel.focus();
			toggled = true;
		};

		self.flyout = function(opts) {
			var o = opts || {};
			var hidden = {};

			hidden.left = -(2 * $body.outerWidth()) + 'px';

			panel.animate(hidden, o);
			toggled = false;
		};

		//since we cloned, just need to show/hide
		self.match = function() {
			content.hide();
		};

		self.unmatch = function() {
			self.flyout({
				duration: 0
			});
			content.show();
		};

		self.destroy = function() {
			//disable everything
			self.disable(true);
			//unbind click handlers and remove from dom
			cContent.empty().remove();
			panel.empty().remove();

			delete cContent;
			delete panel;
		}

		//start out
		self.flyout({
			duration: 0
		});
	}

	(window.adove = window.adove || {}).Flyout = Flyout;

}(jQuery));