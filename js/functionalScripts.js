/*Helper Methods*/
function timer(startDate, endDate){
	if ( ! startDate || ! endDate ) {
		return;
	}

	var startTime = startDate.getTime();
	var endTime = endDate.getTime();
	if(typeof(console) !== 'undefined'){
		console.log('time: ' + ( endTime - startTime ) );
	}
}

function loading(jQueryObject) {
	jQueryObject.html('loading');
}
