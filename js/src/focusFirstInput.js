/*global define, require, debug*/
define(['jquery', 'ba-debug'], function ($) {
	"use strict";
	$("body").bind({
		popupafteropen: function (event, ui) {
			$(event.target).find('input').select();
		}
	});
});