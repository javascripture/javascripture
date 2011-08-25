var loadedScripts = 0;
var totalScripts = 6
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
function readyToGo(loadedScripts) {
	if(loadedScripts === totalScripts){
		$('#loading').html('Done! <a href="bible.html">Start</a>');
	} else {
		$('#loading').css('background','none').html('Loaded ' + loadedScripts + ' out of ' + totalScripts + ' files...');
	}
}