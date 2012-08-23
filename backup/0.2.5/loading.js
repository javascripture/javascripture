var loadedScripts = 0;
var totalScripts = 4
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
$.getScript("strongsObject.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
function readyToGo(loadedScripts) {
	if(loadedScripts === totalScripts){
		$('#loading').html('Done! <a href="bible.html">Start</a>');
	} else {
		$('#loading').html('Loaded ' + loadedScripts + ' out of ' + totalScripts + ' files...');
	}
}