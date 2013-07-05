/*global require, $, debug*/
var start = new Date();
var scrollDeferred;

require.config({
	paths: {
		'jquery': 'external/jquery-2.0.0.min',
		'jquery-mobile': 'external/jquery.mobile-1.3.1.min',
		'multiview': 'external/multiview',
		'backbone': 'external/backbone',
		'underscore': 'external/lodash',
		'pageparams': 'external/jquery.mobile.page.params',
		'order': 'external/order-1.0.0',
		'ba-debug': 'external/ba-debug',
		'bible': '../data/bible',
		'english-ot': '../data/kjv-ot',
		'english-nt': '../data/kjv-nt',
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
		'wordInterface': 'src/wordInterface',
		'crossReferences': 'src/crossReferences'
	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim: {
		"backbone": {
			"deps": [ "underscore", "jquery" ],
			"exports": "Backbone"  //attaches "Backbone" to the window object
		}
	}, // end Shim Configuration

	waitSeconds: 20000
});

// Includes File Dependencies


require( [ "jquery-mobile" ], function() {
	require( [ 'ba-debug', 'src/bookControl', 'external/jquery.scrollTo' ], function() {
		debug.debug('Jquery mobile loading time: ' + (new Date() - start) + ' miliseconds');
		setTimeout(function () { //to give the framework a chance to load
			$.mobile.showPageLoadingMsg('a', 'Loading data');
			console.log('jqm');
			//This is just to give more specific loading messages
			require(['bible'], function (){
				$.mobile.showPageLoadingMsg('a', 'Loading English');
				require(['english-ot', 'english-nt'], function (){
					console.log('english');
					$.mobile.showPageLoadingMsg('a', 'Loading Hebrew');
					require(['hebrew'], function (){
						console.log('hebrew');
						$.mobile.showPageLoadingMsg('a', 'Loading Greek');
						require(['greek'], function (){
							$.mobile.showPageLoadingMsg('a', 'Loading Strongs Numbers');
							require(['strongsDictionary'], function (){
								$.mobile.showPageLoadingMsg('a', 'Loading families');
								require(['strongsObjectWithFamilies'], function (){
									$.mobile.showPageLoadingMsg('a', 'Loading modules');
									require( {
										baseUrl: 'js',
									}, [ "jquery", "backbone", "routers/mobileRouter" ], function( $, Backbone, Mobile ) {
								
										$( document ).on( "mobileinit",
									
											// Set up the "mobileinit" handler before requiring jQuery Mobile's module
											function() {
												// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
												$.mobile.linkBindingEnabled = false;
									
												// Disabling this will prevent jQuery Mobile from handling hash changes
												$.mobile.hashListeningEnabled = false;
												
												console.log('mobile init');
									
											}
										);
									
										$( document ).trigger( "mobileinit" ); //shouldn't this happen automattically?
										
									
										require([
											//'src/router',
					//						'src/chapter',
											'src/focusFirstInput',
											'src/keyboardShortcuts',
					//						'src/reference',
											//'src/stickyPanel',
											//'order!src/word',
											'src/wayPoint',
											'src/wordDetails',
											'src/wordInterface',
											'src/crossReferences'
										], function () { //now build the menu and show the first reference
											debug.debug('Total loading time: ' + (new Date() - start) + ' miliseconds');
					
											// Instantiates a new Backbone.js Mobile Router
											this.router = new Mobile();
					
											//fix popups
											$('[data-rel=popup]').on('click', function ( event ) {
												event.preventDefault();
												$($(this).attr('href')).popup('open');
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
} );