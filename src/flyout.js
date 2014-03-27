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
			toggled = false,
			self = this;

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

			content.slideDown(o);
			toggled = true;
		};

		self.flyout = function(opts) {
			var o = opts || {};

			content.slideUp(o)
			toggled = false;
		};

		//since we cloned, just need to show/hide
		self.match = function() {
			if(!toggled){content.hide();}
		};

		self.unmatch = function() {
			content.show();
		};

		self.destroy = function() {
			//clean up if needed!
		}

		//start out
		self.flyout({ duration: 0 });
	}

	(window.adove = window.adove || {}).Flyout = Flyout;

}(jQuery));