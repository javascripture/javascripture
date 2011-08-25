
/*$(function(){ initDatabase();

 	// Button and link actions
	$('#clear').click(function(){ dropTables(); });
 	$('#update').click(function(){ updateSetting(); });

});*/
	
function initDatabase() {
	try {
	    if (!window.openDatabase) {
	        alert('Local Databases are not supported by your browser. Please use a Webkit browser for this demo');
	    } else {
	        var shortName = 'JS';
	        var version = '1.0';
	        var displayName = 'Javascripture';
	        var maxSize = 100000000000000000; // in bytes
	        JSC = openDatabase(shortName, version, displayName, maxSize);
			createTables();
			//selectAll();
	    }
	} catch(e) {
	    if (e == 2) {
	        // Version mismatch.
	        console.log("Invalid database version.");
	    } else {
	        console.log("Unknown error "+ e +".");
	    }
	    return;
	} 
}



/***
**** CREATE TABLE ** 
***/
function createTables(){
	JSC.transaction(
        function (transaction) {
        	transaction.executeSql('CREATE TABLE IF NOT EXISTS book(id INTEGER NOT NULL PRIMARY KEY,name TEXT NOT NULL, chapters INTEGER);', [], nullDataHandler, errorHandler);
        	transaction.executeSql('CREATE TABLE IF NOT EXISTS kjv(id INTEGER NOT NULL PRIMARY KEY, book INTEGER NOT NULL, chapter INTEGER NOT NULL, verse INTEGER NOT NULL, position INTEGER NOT NULL, word TEXT, strongs TEXT, morphology TEXT);', [], nullDataHandler, errorHandler);
        	transaction.executeSql('CREATE TABLE IF NOT EXISTS hebrew(id INTEGER NOT NULL PRIMARY KEY, book INTEGER NOT NULL, chapter INTEGER NOT NULL, verse INTEGER NOT NULL, position INTEGER NOT NULL, word TEXT, strongs TEXT, morphology TEXT);', [], nullDataHandler, errorHandler);
        	transaction.executeSql('CREATE TABLE IF NOT EXISTS greek(id INTEGER NOT NULL PRIMARY KEY, book INTEGER NOT NULL, chapter INTEGER NOT NULL, verse INTEGER NOT NULL, position INTEGER NOT NULL, word TEXT, strongs TEXT, morphology TEXT);', [], nullDataHandler, errorHandler);
        }
    );
	prePopulate();
}


/***
**** INSERT INTO TABLE ** 
***/
function prePopulate(){
	JSC.transaction(
	    function (transaction) {
			//create book table
			var index = 1;
			$.each(bibleObject, function(bookName, bookContent) {
				transaction.executeSql("INSERT INTO book(id, name, chapters) VALUES (?, ?, ?)", [index, bookName, bookContent.length]);
				index++;
			});
			//create kjv table
			var index = 1;
			$.each(bibleObject, function(bookName, bookContent) {
				$.each(bookContent, function(chapterNumber, chapterContent) {
					$.each(chapterContent, function(verseNumber, verseContent) {
						transaction.executeSql("INSERT INTO kjv(id, book, chapter, verse, position, word, strongs, morphology) VALUES (?, '1', ?, ?, '1', ?, '1', '1')",[index, chapterNumber, verseNumber, verseContent]);
						index++;
					});
				});
			});
	    }
	);
	JSC.transaction(function (transaction) {
		transaction.executeSql("SELECT id FROM book WHERE name = ?", ['Matthew'], function(transaction, results){console.log(results.rows)}, errorHandler);
	});
	JSC.transaction(function (transaction) {
		//create greek table
		var index = 1;
		$.each(greekObject, function(bookName, bookContent) {
			$.each(bookContent, function(chapterNumber, chapterContent) {
				var book = 'h';
				var chapverpos = chapterContent[1].split(':');
				var verpos = chapverpos[1].split('.');
				var chapter = chapverpos[0];
				var verse = verpos[0];
				var position = verpos[1];
				transaction.executeSql("INSERT INTO greek(id, book, chapter, verse, position, word, strongs, morphology) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",[index, book, chapter, verse, position, chapterContent[3], 'G'+chapterContent[6], chapterContent[5]]);
				index++;
			});
		});
	});
}

/***
**** UPDATE TABLE ** 
***/
function updateSetting(){
	JSC.transaction(
	    function (transaction) {
	    	if($('#fname').val() != '') {
	    		var fname = $('#fname').val();
	    	} else {
	    		var fname = 'none';
	    	}
			
			var bg    = $('#bg_color').val();
			var font  = $('#font_selection').val();
			var car   = $('#fav_car').val();
			
	    	
	    	transaction.executeSql("UPDATE page_settings SET fname=?, bgcolor=?, font=?, favcar=? WHERE id = 1", [fname, bg, font, car]);
	    }
	);	
		selectAll();
}
function selectAll(){ 
	JSC.transaction(
	    function (transaction) {

	        transaction.executeSql("SELECT * FROM page_settings;", [], dataSelectHandler, errorHandler);
	        
	    }
	);	
}

function dataSelectHandler(transaction, results){
	// Handle the results
    for (var i=0; i<results.rows.length; i++) {
        
    	var row = results.rows.item(i);
    	console.log(row.id);
/*    	
        var newFeature = new Object();
    	
    	newFeature.fname   = row['fname'];
        newFeature.bgcolor = row['bgcolor'];
        newFeature.font    = row['font'];
        newFeature.favcar  = row['favcar'];
        
        $('body').css('background-color',newFeature.bgcolor);
        $('body').css('font-family',newFeature.font);
        $('#content').html('<h4 id="your_car">Your Favorite Car is a '+ newFeature.favcar +'</h4>');
        
        if(newFeature.fname != 'none') {
       		$('#greeting').html('Howdy-ho, '+ newFeature.fname+'!');
       		$('#fname').val(newFeature.fname);
        } 
        
       $('select#font_selection').find('option[value='+newFeature.font+']').attr('selected','selected');
       $('select#bg_color').find('option[value='+newFeature.bgcolor+']').attr('selected','selected');  
       $('select#fav_car').find('option[value='+newFeature.favcar+']').attr('selected','selected');
*/
       
    }

}





/***
**** Save 'default' data into DB table **
***/

function saveAll(){
		prePopulate(1);
}


function errorHandler(transaction, error){
 	if (error.code==1){
 		// DB Table already exists
 		console.log('Table already exists');
 	} else {
    	// Error is a human-readable string.
	    console.log('Oops.  Error was '+error.message+' (Code '+error.code+')');
 	}
    return false;
}


function nullDataHandler(){
	console.log("SQL Query Succeeded");
}

/***
**** SELECT DATA **
***/
function selectAll(){ 
	JSC.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * FROM page_settings;", [], dataSelectHandler, errorHandler);
	    }
	);	
}

/***
**** DELETE DB TABLE ** 
***/
function dropTable(tableName){
	JSC.transaction(
	    function (transaction) {
	    	transaction.executeSql("DROP TABLE ?;", [tableName], nullDataHandler, errorHandler);
	    }
	);
	console.log("Table 'page_settings' has been dropped.");
	location.reload();
}

initDatabase();

	