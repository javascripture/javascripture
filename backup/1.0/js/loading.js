var loadedScripts = 0;
var totalScripts = 9;

$.getScript("js/json2.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("data/bible.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("data/strongs-dictionary.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("data/kjvdwyer2.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("data/strongsObjectRoots.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("js/jquery.hoverIntent.min.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("js/jquery.ba-bbq.min.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("js/colorpicker.js", function(){ 
	loadedScripts++;
	readyToGo(loadedScripts);
});
$.getScript("js/functionalScripts.js", function(){ 
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