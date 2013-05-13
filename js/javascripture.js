/*global require, $, debug*/
var start = new Date();
require.config({
	paths: {
		'jquery': 'external/jquery-2.0.0.min',
		'jquery-mobile': 'external/jquery.mobile-1.3.1.min',
		'multiview': 'external/multiview',
		'backbone': 'external/backbone',
		'underscore': 'external/lodash',
		'pageparams': 'external/jquery.mobile.page.params',
//		'jquery-router': 'external/jquery.mobile.router.min',
		'order': 'external/order-1.0.0',
		'ba-debug': 'external/ba-debug',
		'bible': '../data/bible',
		'english': '../data/kjvdwyer6',
		'hebrew': '../data/hebrew5',
		'greek': '../data/greek4',
		'search': 'src/search',
		'strongsDictionary': '../data/strongsDictionary',
		'strongsObjectWithFamilies': '../data/strongsObjectWithFamilies', //can probably replace the line above
		'strongsFamilies': '../data/strongsFamilies', //can probably replace the line above
		'morphologyDictionary': '../data/morphology',
		'morphology': 'src/morphology',
		'literalTranslation': '../data/literalTranslation',
		'translateLiterally': 'src/translateLiterally',
		'wordFamilies': 'src/wordFamilies',
		'wordInterface': 'src/wordInterface'
	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim: {
		"backbone": {
			"deps": [ "underscore", "jquery" ],
			"exports": "Backbone"  //attaches "Backbone" to the window object
		}
	}, // end Shim Configuration

	//priority: ['jquery'],
	waitSeconds: 20000
});


// Includes File Dependencies
require({
	baseUrl: 'js',
}, [ "jquery", "backbone", "routers/mobileRouter" ], function( $, Backbone, Mobile ) {

	$( document ).on( "mobileinit",
		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function() {
			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;
		}
	)

	require( [ "jquery-mobile" ], function() {
		require( [ 'ba-debug', 'src/bookControl', 'external/jquery.scrollTo' ], function() {
			debug.debug('Jquery mobile loading time: ' + (new Date() - start) + ' miliseconds');
			setTimeout(function () { //to give the framework a chance to load
				$.mobile.showPageLoadingMsg('a', 'Loading data');
				//This is just to give more specific loading messages
				require(['bible'], function (){
					$.mobile.showPageLoadingMsg('a', 'Loading English');
					require(['english'], function (){
						$.mobile.showPageLoadingMsg('a', 'Loading Hebrew');
						require(['hebrew'], function (){
							$.mobile.showPageLoadingMsg('a', 'Loading Greek');
							require(['greek'], function (){
								$.mobile.showPageLoadingMsg('a', 'Loading Strongs Numbers');
								require(['strongsDictionary'], function (){
									require(['strongsObjectWithFamilies'], function (){
										$.mobile.showPageLoadingMsg('a', 'Data loaded');
									});
								});
							});
						});
					});
				});
				require(['bible', 'english', 'hebrew', 'greek', 'strongsDictionary', 'strongsObjectWithFamilies'], function (bible) {
					$.mobile.showPageLoadingMsg('a', 'Loading modules');
					require([
	//					'src/router',
						'src/chapter',
						'src/focusFirstInput',
						'src/keyboardShortcuts',
						'src/reference',
						'src/stickyPanel',
		//				'order!src/word',
						'src/wordDetails',
						'src/wordInterface'
					], function () { //now build the menu and show the first reference
						debug.debug('Total loading time: ' + (new Date() - start) + ' miliseconds');
						// Instantiates a new Backbone.js Mobile Router
						this.router = new Mobile();
						//var reference = router.getParams(window.location.hash),
						/*var bookNumber,
							chapterNumber,
							numberOfVerses,
							verseNumber;
						if (!reference || reference === undefined || reference.book === null) {
							reference = {};
							bookNumber = Math.floor(Math.random() * bible.Data.books.length);
							chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length);
							numberOfVerses = bible.Data.verses[bookNumber][chapterNumber];
							verseNumber = Math.floor(Math.random() * numberOfVerses);
							reference.book = bible.Data.books[bookNumber][0];
							reference.chapter = chapterNumber + 1;
							reference.verse = verseNumber + 1;
						}
						$('#reference-panel').reference(reference);*/
					});
				});
			});
		});
	});
} );
/*require({
	baseUrl: 'js',
	urlArgs: "bust=" +  (new Date()).getTime()
}, [
	'jquery',
	'ba-debug',
	'order!jquery-router',
	'order!jquery-mobile',
	'order!src/bookControl',
	'order!external/jquery.scrollTo'
], function () { //first get the useful libraries
	"use strict";
	debug.debug('Jquery mobile loading time: ' + (new Date() - start) + ' miliseconds');
	setTimeout(function () { //to give the framework a chance to load
		$.mobile.showPageLoadingMsg('a', 'Loading data');
		//This is just to give more specific loading messages
		require(['bible'], function (){
			$.mobile.showPageLoadingMsg('a', 'Loading English');
			require(['english'], function (){
				$.mobile.showPageLoadingMsg('a', 'Loading Hebrew');
				require(['hebrew'], function (){
					$.mobile.showPageLoadingMsg('a', 'Loading Greek');
					require(['greek'], function (){
						$.mobile.showPageLoadingMsg('a', 'Loading Strongs Numbers');
						require(['strongsDictionary'], function (){
							require(['strongsObjectWithFamilies'], function (){
								$.mobile.showPageLoadingMsg('a', 'Data loaded');
							});
						});
					});
				});
			});
		});
		require(['bible', 'english', 'hebrew', 'greek', 'strongsDictionary', 'strongsObjectWithFamilies'], function (bible) {
			$.mobile.showPageLoadingMsg('a', 'Loading modules');
			require([
				'src/router',
				'order!src/chapter',
				'order!src/focusFirstInput',
				'order!src/keyboardShortcuts',
				'order!src/reference',
				'order!src/stickyPanel',
//				'order!src/word',
				'order!src/wordDetails',
				'order!src/wordInterface'
			], function (router) { //now build the menu and show the first reference
				debug.debug('Total loading time: ' + (new Date() - start) + ' miliseconds');
				var reference = router.getParams(window.location.hash),
					bookNumber,
					chapterNumber,
					numberOfVerses,
					verseNumber;
				if (!reference || reference === undefined || reference.book === null) {
					reference = {};
					bookNumber = Math.floor(Math.random() * bible.Data.books.length);
					chapterNumber = Math.floor(Math.random() * bible.Data.verses[bookNumber].length);
					numberOfVerses = bible.Data.verses[bookNumber][chapterNumber];
					verseNumber = Math.floor(Math.random() * numberOfVerses);
					reference.book = bible.Data.books[bookNumber][0];
					reference.chapter = chapterNumber + 1;
					reference.verse = verseNumber + 1;
				}
				$('#reference-panel').reference(reference);
			});
		});
	});
});
*/