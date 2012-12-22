/*global define, require, debug*/
define(['jquery', 'jquery-mobile', 'ba-debug', 'external/jquery.waypoints'], function ($, timer) {
	"use strict";
	var moduleName = 'stickyPanel';
	$.widget("javascripture." + moduleName, {
		options: {
			topSpace: 0,
			bottomSpace: 0,
			elementHeight: '', //a starting height for the object if it is empty when this is initialised
			width: null, //only to be used if set
			topcallback: null, //only to be used if set
			bottomcallback: null //only to be used if set
		},
		_create: function () {
			this.options.leftPosition = this.element.position().left; //calculate this only the first time, otherwise it gets confused
			var self = this;
			this.element.addClass('initialized');
			$.waypoints.settings.scrollThrottle = 30;
			this.options.topWayPoint.waypoint(function (event, direction) {
				debug.debug('top');
				if (direction === 'down') {
					self.fixElement();
				} else {
					self.resetElement();
				}
				event.stopPropagation();
			}, {
				offset: this.topWayPointOffset()
			});
			if (this.options.bottomWaypoint !== undefined) {
				$(this.options.bottomWaypoint).waypoint(function (event, direction) {
					debug.debug('bottom');
					if (direction === 'down') {
						self.stickToBottom();
					} else {
						self.fixElement();
					}
				}, {
					offset: this.bottomWayPointOffset()
				});
			}
			this.checkWayPoints();
		},
		fixElement: function () {
			var $this = this.element,
				left = 'auto',
				width = $this.width(),
				topcallback = this.options.topcallback;
			$this.css({
				position: 'fixed',
				top: this.options.topSpace,
				left: left,
				bottom: 'auto',
				width: width
			}).addClass('stuck');
			if (topcallback) {
				$(document).trigger(topcallback);
			}
		},
		resetElement: function () {
			var bottomcallback = this.options.bottomcallback;
			this.element.attr('style', '').removeClass('stuck');
			if (bottomcallback) {
				$(document).trigger(bottomcallback);
			}
		},
		stickToBottom: function () {
			this.element.css({
				position: 'absolute',
				top: 'auto',
				bottom: 0,
				width: $(this).width()
			});
		},
		topWayPointOffset: function () {
			return this.options.topSpace;
		},
		bottomWayPointOffset: function () {
			var elementHeight = this.element.outerHeight();
			return -$(this.options.bottomWaypoint).outerHeight() + elementHeight + this.options.topSpace;
		},
		checkWayPoints: function () {
			var topWayPointOffset = this.options.topWayPoint.offset().top - this.topWayPointOffset(),
				bottomWayPointOffset,
				windowOffsetTop = $(document).scrollTop(); //does this work in IE?
			if (this.options.bottomWayPoint !== undefined) {
				bottomWayPointOffset = this.options.bottomWayPoint.offset().top - this.bottomWayPointOffset();
			}
			this.resetElement();
			if (bottomWayPointOffset !== undefined && windowOffsetTop > bottomWayPointOffset) {
				this.stickToBottom();
			} else if (windowOffsetTop > topWayPointOffset) {
				this.fixElement();
			}
		},
		destroy: function () {
			this.options.topWayPoint.waypoint('destroy');
			if (this.options.bottomWaypoint !== undefined) {
				$(this.options.bottomWaypoint).waypoint('destroy');
			}
		}
	});
	$(document).bind('createWidgets', function () {
		$('.stickyPanel').each(function () {
			var $this = $(this),
				options = $this.data();
			if ($this.hasClass('initialized')) { //there must be a better way to tell if this has already beem initailized
				$this.stickyPanel('destroy');
			}
			if ($this.attr('data-top-waypoint') !== undefined) {
				options.topWayPoint = $($this.attr('data-top-waypoint'));
			} else {
				options.topWayPoint = $this.parent();
			}
			//$this.stickyPanel(options);
		});
		//$('.stickyPanel').stickyPanel('checkWayPoints');
	});
	$(document).bind('windowResize', function () {
		$('.stickyPanel').stickyPanel('checkWayPoints');
	});
});