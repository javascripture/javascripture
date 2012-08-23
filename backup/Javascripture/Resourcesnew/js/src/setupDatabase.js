define(['../lib/persistence','../lib/persistence.store.sql','../lib/persistence.store.websql',],function(){
  function greekTable(bookName) {
    //set up greek table
if(typeof(greekObject[bookName]) != "undefined") {
  $.each(greekObject[bookName], /*function(bookName, bookContent) {
    $.each(bookContent,*/ function(chapterNumber, chapterContent) {
      var book = bookName;
      var chapverpos = chapterContent[1].split(':');
      var verpos = chapverpos[1].split('.');
      var chapter = chapverpos[0];
      var verse = verpos[0];
      var position = verpos[1];
      persistence.add(new greek({
        book: book,
        chapter: chapter,
        verse: verse,
        position: position,
        word: chapterContent[3],
        strongs: 'G'+chapterContent[6],
        morphology: chapterContent[5]
      }));
    //});    
  });
      persistence.transaction(function(tx) {
        persistence.flush(tx, function() {
        alert('double done');
        });
      });
}
}


function greekTableSlow(bookName, chapterNumber, bookNameSave) {
  if(typeof(greekObject[bookName][chapterNumber]) != "undefined") {
    var book = bookName;
    var chapterContent = greekObject[bookName][chapterNumber]
    var chapverpos = chapterContent[1].split(':');
    var verpos = chapverpos[1].split('.');
    var chapter = chapverpos[0];
    var verse = verpos[0];
    var position = verpos[1];
    persistence.add(new greek({
      book: bookNameSave,
      chapter: chapter,
      verse: verse,
      position: position,
      word: chapterContent[3],
      strongs: 'G'+chapterContent[6],
      morphology: chapterContent[5]
    }));
    persistence.transaction(function(tx) {
      persistence.flush(tx, function() {
      console.log(book+chapter+verse+position);
      setTimeout(function() {
        greekTableSlow(bookName, chapterNumber+1, bookNameSave);
      },10);
      });
    });
  }
}

if (window.openDatabase) {
  persistence.store.websql.config(persistence, 'JSP', 'Javascripture database', 5000 * 1024 * 1024);
} else {
  persistence.store.memory.config(persistence);
}
  var books = persistence.define('book', {
    name: "TEXT",
    chapters: "INTEGER"
  });
  books.index(['name'],{unique:true});
  var textSchema = {
    book: "TEXT", //link to id
    chapter: "INTEGER",
    verse: "INTEGER",
    position: "INTEGER",
    word: "TEXT",
    strongs: "TEXT",
    morphology: "TEXT"
  };
  
  var kjv = persistence.define('kjv', textSchema);
  var hebrew = persistence.define('hebrew', textSchema);
  var greek = persistence.define('greek', textSchema);
  
  //need to define relationships? kjv.hasMany('books', Task, 'category');

  persistence.schemaSync();

  //set up books table
  $.each(bibleObject, function(index, value) {
      persistence.add(new books({
        name: index,
        chapters: value.length
      }));
    });


   /* persistence.load(greekDump, function() {
      alert('Dump restored!');
    });*/

    persistence.transaction(function(tx) {
      persistence.flush(tx, function() {
        alert('Done flushing!');
      /*var allBooks = books.all();    
      allBooks.list(null, function (results) {
          results.forEach(function (r) {
        greekTable(r.name);
          });
          alert('setup');
          //save
      persistence.transaction(function(tx) {
        persistence.flush(tx, function() {
        alert('double done');
        });
      });

    });*/

      });
    });

});