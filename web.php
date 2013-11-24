<?php
$db = mysql_connect( 'localhost', 'root', 'root' );
$web = mysql_select_db('web',$db);
	
//get number of chapters
$all_chapters = mysql_fetch_array(mysql_query('SELECT MAX(chapter) FROM gen'))[0] + 1;

for($chapter=1;$chapter<$all_chapters;$chapter++) {
	echo ( $chapter > 1 ) ? ", \r\n":"";
	echo "[\r\n";
	$all_verses = mysql_fetch_array(mysql_query( 'SELECT MAX(verse) FROM gen WHERE chapter = ' . $chapter ) )[0] + 1;
	for($verse=1;$verse<$all_verses;$verse++) {
		echo ( $verse > 1 ) ? ", \r\n":"";
		echo "[";
		$query = 'SELECT * FROM gen WHERE chapter = ' . $chapter . ' AND verse = ' . $verse . ' ORDER BY WordSeqNumber';

		$result = mysql_query( $query );
		$word = 1;
		while( $words = mysql_fetch_array( $result ) ) {
			echo ( $word > 1 ) ? ",":"";
			echo "[";
			echo "'" . addslashes( $words['pre'] . $words['word'] . $words['post'] ) . "'";
			if ( $words['OrigWordLanguage'] == 'G' && $words['DictEntryNumber'] != 0 ) {
				echo ",'" . $words['OrigWordLanguage'] . $words['DictEntryNumber'] . "'";
			}
			echo "]";
			$word++;
		}
		echo "]";
	}
	echo "\r\n]";
}
