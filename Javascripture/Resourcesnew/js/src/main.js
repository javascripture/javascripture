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
["../lib/jquery","../lib/jquery-ui","setupDatabase"], function ($) {
	$(function () {
		console.log('h');
	});
});