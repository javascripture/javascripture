(function($) {
	$.fn.hitch = function(ev, fn, scope) {
		return this.bind(ev, function() {
			return fn.apply(scope || this, Array.prototype.slice.call(arguments));
		});
	};
})(jQuery);

$(function() {
	console.log('study startup');

	function getHash() {
		var hash = {};
		var hashString = window.location.hash.toString().replace('#', ''); ;
		var hashArray = hashString.split('|');

		for (var i = 0; i < hashArray.length; i++) {
			var vals = hashArray[i].split('=');

			hash[vals[0]] = decodeURI(vals[1]);
		}


		return hash;
	}

	function createCookie(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		}
		else var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	function eraseCookie(name) {
		createCookie(name, "", -1);
	}


	function parseBibleRel(rel) {
		if (typeof (rel) == 'undefined') {
			return null;
		}
		if (rel.substring(0, 1) == 'c' && rel.length == 7) {
			return new bible.Reference(
				parseInt(rel.substring(1, 4), 10),
				parseInt(rel.substring(4, 7), 10)
				);
		} else if (rel.substring(0, 1) == 'v' && rel.length == 10) {

			return new bible.Reference(
				parseInt(rel.substring(1, 4), 10),
				parseInt(rel.substring(4, 7), 10),
				parseInt(rel.substring(7, 10), 10)
				);
		} else {
			return null;
		}
	}

	bible.utility.parseBibleRel = parseBibleRel;

	var docManager = {
		pageX: 0,
		pageY: 0,
		docs: [],
		focusedDoc: null,
		addDocument: function(doc) {
			doc.manager = this;
			this.docs.push(doc);
		},
		sync: function(callerDoc, vCode) {
			if (!callerDoc.hasFocus)
				return;

			var reference = parseBibleRel(vCode);

			// calculate verse offset from top
			var vMatch = callerDoc.wrapper.find('span.verse[rel=' + vCode + ']');
			if (vMatch.length == 0)
				return;

			var verseTop = vMatch.offset().top;
			var paneTop = callerDoc.scrollPane.position().top;
			var offset = paneTop - verseTop;

			for (var i = 0; i < this.docs.length; i++) {
				var doc = this.docs[i];
				//console.log('doc check', vCode, doc.id, doc.hasFocus, callerDoc.id, callerDoc.hasFocus, offset);
				if (doc.id != callerDoc.id) {
					console.log(callerDoc.id, 'sync with', doc.id, reference.toString());
					doc.gotoRef(reference.toString(), offset);
				}
			}
		},
		setFocus: function(doc) {
			for (var i = 0; i < this.docs.length; i++) {
				this.docs[i].hasFocus = false;
			}

			doc.hasFocus = true;
			this.focusedDoc = doc;

			console.log(doc.id, 'now focused');
		},
		mouseMoveHandler: function(e) {
			this.pageX = e.pageX;
			this.pageY = e.pageY;
		},
		setHash: function() {
			var hash = {};

			// (1) ref
			var ref = this.focusedDoc.referenceInput.val();
			hash['ref'] = encodeURI(ref);

			// (2) versions
			var versions = [];
			for (var i = 0; i < this.docs.length; i++) {
				versions.push(this.docs[i].version.val());
			}
			hash['ver'] = encodeURI(versions.join(','));

			// create
			var hashArray = [];
			for (key in hash) {
				hashArray.push(key + '=' + hash[key]);
			}

			window.location.href = window.location.href.split('#')[0] + '#' + hashArray.join('|');
		}
	}

	bible.document = function(container) {

		this.id = container.attr('id');
		this.hasFocus = false;
		this.isLoading = false;
		this.container = container;
		this.referenceInput = container.find('input[type=text]');
		this.version = container.find('select');
		this.goButton = container.find('input[type=button]');
		this.scrollPane = container.find('.text-content');
		this.wrapper = container.find('.text-wrapper');
		this.footer = container.find('.text-footer');
		this.ignoreScrollEvent = false;
		var doc = this;

		this.gotoRef = function(refString, offset) {
			var tempRef = refString || this.referenceInput.val();
			if (tempRef == '') return;

			var reference = new bible.Reference(tempRef);
			if (typeof refString != 'undefined')
				this.referenceInput.val(reference.toString());

			var verseNode = doc.wrapper.find('span.verse[rel=' + reference.toVerseCode() + ']');
			//console.log('found', verseNode);
			if (verseNode.length > 0) {

				// scroll to this one
				this.scrollToVerse(verseNode, (offset || 0));

			} else {
				var refCode = reference.toChapterCode();
				this.loadRef(refCode, 'text');
			}
		}

		this.scrollToVerse = function(node, offset) {
			//console.log(doc.id, 'scrollToVerse', node);

			// calculate node position
			var paneTop = doc.scrollPane.position().top;
			var scrollTop = doc.scrollPane.scrollTop();
			var nodeTop = node.offset().top;
			var nodeTopAdjusted = nodeTop - paneTop + scrollTop;
			
			console.log('scrollToVerse:' +this.id, nodeTop);

			// go to it
			this.ignoreScrollEvent = true;
			this.scrollPane.scrollTop(nodeTopAdjusted + (offset || 0));
			this.ignoreScrollEvent = false;
		}

		this.loadRef = function(refCode, action) {

			if (refCode == '' || this.isLoading) return;
			//if (action != 'text') return;

			console.log(this.id, action, refCode);

			// figure out chapter.html URL
			var reference = parseBibleRel(refCode);
			var v = doc.version.val();

			// quit on first or last
			console.log(action, reference.toString(), reference.isFirstChapter(), reference.isLastChapter());

			if (action == 'next') {
				if (reference.isLastChapter())
					return;
				refCode = reference.nextChapter().toChapterCode();
			} else if (action == 'prev') {
				if (reference.isFirstChapter())
					return;
				refCode = reference.prevChapter().toChapterCode();
			}
			
			// do we need to change the version?
			var vData = bible.versions[v];
			console.log('GET', vData, reference);
			
			if (vData.lang == 'el' && reference.bookID <= 39) {
				v = vData.error;
				// switch
				this.setVersion(v);
				
			} else if (vData.lang == 'he' && reference.bookID >= 40) {
				v = vData.error;
				
				this.setVersion(v);
			}
			
			

			var dataUrl = '/assets/bib/' + v + '/' + refCode + '.html';

			//var chapterMatch = $('div[rel=' + refCode + ']', doc.wrapper);
			var chapterMatch = this.wrapper.children('article[rel=' + refCode + ']'); //, doc.wrapper);

			if (chapterMatch.length > 0) {
				console.log(doc.id, 'cancel', refCode);
				return;
			} else {
				console.log(doc.id, 'loading', refCode, chapterMatch);
			}

			this.isLoading = true;


			/// manual ajax call
			$.ajax(
				{

					url: dataUrl,
					type: 'GET',
					dataType: 'html',
					error: function(request, textStatus, errorThrown) {

						console.log('error', this.url);
						doc.isLoading = false;

						var currentVersion = bible.versions[doc.version.val()];

						if (typeof (currentVersion.error) != 'undefined') {

							//console.log('changing to error version', currentVersion.error);

							doc.setVersion(currentVersion.error);
							doc.gotoRef();
						}
					},
					complete: function() {
						doc.isLoading = false;
					},
					success: function(data, textStatus) {
						doc.isLoading = false;

						switch (action) {
							default:
							case 'text':
								doc.ignoreScrollEvent = true;

								doc.wrapper.html(data);

								var reference = new bible.Reference(doc.referenceInput.val());
								var vCode = reference.toVerseCode();

								if (reference.verse > 1) {
									doc.scrollToVerse(doc.scrollPane.find('span.verse[rel=' + vCode + ']'), 0);
								} else {
									doc.scrollPane.scrollTop(0);
								}
								doc.checkScrollPosition();
								doc.ignoreScrollEvent = false;

								doc.manager.sync(doc, vCode);
								break;
							case 'next':
								var newNode = $(data);
								if (doc.wrapper.find('article.chapter[rel=' + newNode.attr('rel') + ']').length > 0)
									break;

								doc.wrapper.append($(data));
								break;
							case 'prev':
								var newNode = $(data);

								if (doc.wrapper.find('article.chapter[rel=' + newNode.attr('rel') + ']').length > 0)
									break;

								var oldScroll = doc.scrollPane.scrollTop();
								var oldWrapperHeight = doc.wrapper.outerHeight(true);


								doc.wrapper.prepend(newNode);
								try {
									var newWrapperHeight = doc.wrapper.outerHeight(true);
									var newScroll = oldScroll + (newWrapperHeight - oldWrapperHeight);
									doc.scrollPane.scrollTop(newScroll);
								} catch (e) {
									console.log('error', 'Cant fix scroll');
								}
								break;
						}




						// LIMIT: only all a certain number of nodes
						// This is way, way too complicated. Boo!
						var chapterNodes = doc.wrapper.find('article.chapter');

						if (chapterNodes.length > 5) {

							// find the one where the top of the chapter is not past the bottom of the scroll pane
							var mostVisibleIndex = 0;
							chapterNodes.each(function(index) {
								var c = $(this);

								if (c.position().top > doc.scrollPane.height()) {
									mostVisibleIndex = index - 1;

									return false;
								}
							});

							if (mostVisibleIndex <= 2) {
								// remove from the bottom
								var bottomNode = $(chapterNodes.get(chapterNodes.length - 1));
								bottomNode.remove();
							} else {
								// remove from the top
								var topNode = $(chapterNodes.get(0));

								var topHeight = topNode.outerHeight(true);
								var oldScroll = doc.scrollPane.scrollTop();

								var newScroll = oldScroll - topHeight;

								topNode.remove();
								doc.scrollPane.scrollTop(newScroll);
							}

						}

						doc.updateLiveReference();
					}
				});

		}

		this.refKeyUpHandler = function(e) {
			if (e.keyCode == 13) {
				e.preventDefault();
				this.manager.setFocus(this);

				this.manager.setHash();

				this.gotoRef();
			}
		}

		this.goClickHandler = function(e) {
			this.manager.setFocus(this);
			this.gotoRef();
		}

		this.versionChangeHandler = function(e) {
			this.manager.setFocus(this);
			// clear out
			this.ignoreScrollEvent = true;
			this.wrapper.html('');
			this.ignoreScrollEvent = true;

			this.updateCopyright();

			this.manager.setHash();

			// reset
			this.gotoRef();
		}

		this.setVersion = function(v) {
			var vlist = this.version.get(0);
			for (var i = 0; i < vlist.options.length; i++) {
				if (vlist.options[i].value == v) {
					vlist.options.selectedIndex = i;
					break;
				}
			}
			this.updateCopyright();
		}

		this.updateCopyright = function() {
			console.log(this.version.val());
			this.footer.html(bible.versions[this.version.val()].copyright);
		}

		this.updateLiveReference = function() {

			// find top verse
			var paneTop = this.scrollPane.position().top;
			var mInfo = null;
			
			console.log('updateLiveReference:' + this.id, paneTop, this.scrollPane.find('span.verse:first-child').position().top, this.scrollPane.find('span.verse:first-child').offset().top);
			
			// look through all the markers and find the first one that is full visible
			this.scrollPane.find('span.verse').each(function(e) {
				var m = $(this);
				if (m.offset().top - paneTop > -2) {
					// pass the marker id (using 'rel') and offset
					mInfo = {
						id: m.attr('rel'),
						offset: m.offset().top - paneTop,
						marker: m
					};
					return false;
				}
			});


			// found a verse
			if (mInfo != null) {
				if (mInfo.id.length == 10) {
					var ref = parseBibleRel(mInfo.id);
					this.referenceInput.val(ref.toString());


					if (this.hasFocus) {
						document.title = ref.toString() + /*" | " + this.version.val()+ */" | BibleWebApp.com";
					}
				}

				// sync other panes
				this.manager.sync(this, mInfo.id);

			}


		}


		// START: infinite scroll
		this.scrollTimeout = null;
		this.scrollHandler = function(e) {
			this.updateLiveReference();

			console.log(this.id, 'scroll', this.ignoreScrollEvent);

			if (this.ignoreScrollEvent)
				return;

			if (this.scrollTimeout != null) {
				clearTimeout(this.scrollTimeout);
				delete this.scrollTimeout;
			}
			this.scrollTimeout = setTimeout(function() {
				doc.checkScrollPosition(e);
			}, 50);
		}

		this.checkScrollPosition = function(e) {
			var newFocus = false;

			// detect if it was a user initiated scroll
			// by checking if the mouse is within this container
			if (typeof (e) != 'undefined' && !this.hasFocus) {
				var position = doc.container.position();
				var w = doc.container.outerWidth(true);
				var h = doc.container.outerWidth(true);

				if (this.manager.pageX >= position.left && this.manager.pageX <= position.left + w &&
					this.manager.pageY >= position.top && this.manager.pageY <= position.top + h) {
					console.log(this.id, 'detected focus');
					this.manager.setFocus(this);
					newFocus = true;
				}
			}

			var chapters = doc.scrollPane.find("article.chapter");
			var totalHeight = 0;
			chapters.each(function(e) {
				totalHeight += $(this).height();
			});

			var paneHeight = doc.scrollPane.height();
			var distFromTop = doc.scrollPane.scrollTop();
			var distFromBottom = totalHeight - paneHeight - distFromTop; ;

			if (distFromTop < 500) {
				console.log(doc.id, 'load prev');

				var chapterID = $(chapters.get(0)).attr("rel");

				this.loadRef(chapterID, 'prev');

			} else if (distFromBottom < 750) {
				console.log(doc.id, 'load next');

				var chapterID = $(chapters.get(chapters.length - 1)).attr("rel");
				this.loadRef(chapterID, 'next');
			}

			if (newFocus)
				this.manager.sync(this, new bible.Reference(this.referenceInput.val()).toVerseCode());
		}

		this.focusHandler = function() {
			console.log('FOCUS', this.id);

			this.manager.setFocus(this);
		}


		// attach events
		this.goButton.hitch('click', this.goClickHandler, this);
		this.version.hitch('change', this.versionChangeHandler, this);
		this.referenceInput.hitch('keyup', this.refKeyUpHandler, this);
		this.scrollPane.hitch('scroll', this.scrollHandler, this);
		this.container.hitch('focus', this.focusHandler, this);
		this.container.hitch('click', this.focusHandler, this);		
		this.container.hitch('mouseover', this.focusHandler, this);
		// END: infinite scroll		

		return this;
	};

	// STARTUP
	// load versions
	var versionOptions = '';
	var pastlang = '';
	for (var code in bible.versions) {
		var v = bible.versions[code];
		if (v.lang != pastlang) {
			if (pastlang != '')
				versionOptions += '</optgroup>';

			versionOptions += '<optgroup label="' + bible.versionLang[v.lang].name + '">';
			pastlang = v.lang;
		}
		versionOptions += '<option value="' + code + '">' + v.name + '</option>';
	}
	versionOptions += '</optgroup>';
	console.log(versionOptions);


	var doc1 = new bible.document($('#text01'));
	var doc2 = new bible.document($('#text02'));
	//var doc3 = new bible.document($('#text03'));
	doc1.version.append($(versionOptions));
	doc1.setVersion('el_tisch');
	doc2.version.append($(versionOptions));

	//doc2.version.get(0).options.selectedIndex = 4;

	docManager.addDocument(doc1);
	docManager.addDocument(doc2);
	//docManager.addDocument(doc3);
	$().hitch('mousemove', docManager.mouseMoveHandler, docManager);
	docManager.setFocus(doc1);

	//if (doc1.referenceInput.val() == '')
	//	doc1.referenceInput.val('Romans 1:1');

	var hash = getHash();

	// try to set reference based on (1) exiting, (2) url, (3) cookie, (4) default
	//if (doc1.referenceInput.val() == '') {
	// check for value in address bar

	var addressRef = hash['ref'];

	if (typeof (addressRef) != 'undefined' && addressRef != '') {
		doc1.referenceInput.val(addressRef);
	} else {
		var cRef = readCookie('ref');
		if (cRef != null) {
			doc1.referenceInput.val(cRef);
		} else {
			doc1.referenceInput.val('Romans 1:1');
		}
	}
	//}

	var versions = hash['ver'];
	if (typeof (versions) != 'undefined' && versions != '') {

		var vv = versions.split(',');
		for (var i = 0; i < docManager.docs.length && i < vv.length; i++) {
			docManager.docs[i].setVersion(vv[i]);
		}

	} else {
		doc1.setVersion('el_tisch');
		doc2.setVersion('en_nasb');
	}



	doc1.gotoRef();

	//if ($('#ref02').val() == '')
	//	$('#ref02').val('Romans 1:1');
	//doc2.gotoRef();

	// END: UI Functions



	// START: height
	function doResize() {

		//docs.forEach(function(doc) {
		for (var i = 0; i < docManager.docs.length; i++) {
			var doc = docManager.docs[i];
			var portHeight = $(window).height();
			var footerHeight = $('#footer').outerHeight(true);

			doc.container.height(portHeight - doc.container.position().top - 10 - footerHeight);

			doc.scrollPane.height(portHeight - doc.scrollPane.position().top
				- (doc.scrollPane.outerHeight(true) - doc.scrollPane.height())
				- doc.container.find('footer.text-footer').outerHeight(true) - 10
				- footerHeight
			);
		}
		//});
	}
	$(window).resize(doResize);
	doResize();
	// END: height




	// popover
	var p = $('#popover');

	bible.utility.loadUsage = function(sn) {

		p.find('header').find('input').val(sn);

		$.ajax(
		{
			url: '/assets/usage/en_nasb/' + sn + '.html',
			type: 'GET',
			dataType: 'html',
			error: function(request, textStatus, errorThrown) {
			},
			complete: function() {
			},
			success: function(data, textStatus) {
				p.find('section').html(data);
				p.show();
				p.css({ top: 100, left: $(window).width() / 2 - p.outerWidth(true) / 2 });

				p.find('section').find('mark[lang*=' + sn + ']').addClass('usage-highlight');

				p.find('footer').html( p.find('section .verse').length + ' occurances');
			}

		});
	}
	p.find('header').find('input').change(function() {
		bible.utility.loadUsage($(this).val());
	});
	p.find('header').find('input').keydown(function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			bible.utility.loadUsage($(this).val());
		}
	});
	p.find('header').find('.close').click(function() {
		p.hide();
	});



});