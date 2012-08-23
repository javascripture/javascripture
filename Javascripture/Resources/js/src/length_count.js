define(function() {
	$.widget("ui.length_count", {
		_create: function () {
			this.element.closest('li').find("#" + this.element.attr("id") + "-help").append($('<span class="length_count_display"></span>'));
			this.element.keyup(function() {
				$(this).closest('li').find('.length_count_display').html($(this).val().length.toString());
			});
		}
	});
});