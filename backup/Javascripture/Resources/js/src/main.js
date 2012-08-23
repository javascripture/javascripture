/*require({
		baseUrl: "/media/js/src"
},
["length_count"], function(length_count) {
	console.log();
    $('.length-count').live('initializeContent', function() {
		$(this).length_count();
	});
});
*/

require({
	baseUrl: 'js/src'
},
["jquery-1.4.4","jquery-ui","length_count"], function ($) {
	$(function () {
		console.log('h');
	});
});