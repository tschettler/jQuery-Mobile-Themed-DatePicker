/*
* jQuery Mobile Framework : temporary extension to port jQuery UI's datepicker for mobile
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
* This is heavily modified from the original:
* http://jquerymobile.com/demos/1.0a4.1/experiments/ui-datepicker/
*/
(function ($, undefined) {

	//cache previous _updateDatepicker method
	var func = $.datepicker._updateDatepicker;
	$.datepicker._updateDatepicker = function(a) {
		func.apply($.datepicker, arguments);
		updateDatepicker(a.dpDiv);
	};
	
	function updateDatepicker(dp) {
		var theme = $.mobile.getInheritedTheme(dp, $.mobile.page.prototype.options.theme);
		$('.ui-datepicker-header', dp).addClass('ui-body-' + theme + ' ui-corner-top').removeClass('ui-corner-all');
		var nav = $('.ui-datepicker-prev, .ui-datepicker-next', dp);
		nav.not('.ui-state-disabled').attr('href', '#');
		nav.filter('.ui-state-disabled').addClass('ui-disabled');
		$('.ui-datepicker-prev', dp).buttonMarkup({ iconpos: 'notext', icon: 'arrow-l', shadow: true, corners: true });
		$('.ui-datepicker-next', dp).buttonMarkup({ iconpos: 'notext', icon: 'arrow-r', shadow: true, corners: true });
		$('.ui-datepicker-calendar th', dp).addClass('ui-bar-' + theme);
		$('.ui-datepicker-calendar td', dp).addClass('ui-body-' + theme);
		$('.ui-datepicker-calendar a', dp).buttonMarkup({ corners: false, shadow: false });
		$('.ui-datepicker-calendar a.ui-state-active', dp).addClass('ui-btn-active'); // selected date
		$('.ui-datepicker-calendar a.ui-state-highlight', dp).addClass('ui-btn-up-' + theme); // today's date

		// jquery mobile friendly selects
		var selects = $('select.ui-datepicker-month, select.ui-datepicker-year', dp);
		selects.attr('data-mini', true);
		if (!selects.closest('fieldset').length) {
			var ctrlgroup = $('<fieldset data-role="controlgroup" data-type="horizontal">');
			selects.wrapAll(ctrlgroup);
			$('fieldset', dp).controlgroup().trigger('create');
		}

		$('.ui-datepicker-calendar .ui-btn', dp).each(function () {
			var el = $(this);

			// remove extra button markup - necessary for date value to be interpreted correctly
			var tmp = el.find('.ui-btn-text');
			if (tmp.length) {
				el.html(tmp.text());
			}
		});
	};
})(jQuery);