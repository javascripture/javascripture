var loadedScripts = 0;
var totalScripts = 11;
$.getScript("json2.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("functionalScripts.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("bibleObject.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("strongsObjectRoots.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("jquery.hoverIntent.min.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("jquery.ba-bbq.min.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("js/colorpicker.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("data/bible.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("data/strongs-greek-dictionary.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("data/strongs-hebrew-dictionary.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("js/jquery.qtip-1.0.0-rc3.min.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
function readyToGo(loadedScripts) {
	if(loadedScripts === totalScripts){
		$('#loading').html('Done! <a href="bible.html">Start</a>');
	} else {
		$('#loading').css('background','none').html('Loaded ' + loadedScripts + ' out of ' + totalScripts + ' files...');
	}
}