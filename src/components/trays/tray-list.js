// External
import mousetrap from 'mousetrap';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import styles from './styles.scss';
import WordTray from './word';
import GotoTray from './goto';
import SearchTray from './search';
import BookmarksTray from './bookmarks';
import SettingsTray from './settings';

// Component variables
let lastTimeStamp = 0;

function getComponent( componentString ) {
	switch ( componentString ) {
		case 'WordTray':
			return <WordTray />

		case 'GotoTray':
			return <GotoTray />

		case 'SearchTray':
			return <SearchTray />

		case 'BookmarksTray':
			return <BookmarksTray />

		case 'SettingsTray':
			return <SettingsTray />
	}
}

class TrayList extends React.Component{
	goToNextCurrentVerse() {
		if ( this.props.nextReference ) {
			this.props.goToReference( this.props.nextReference );
			this.props.markNextCurrentReference();
		}
	}

	goToPreviousCurrentVerse() {
		if ( this.props.previousReference ) {
			this.props.goToReference( this.props.previousReference );
			this.props.markPreviousCurrentReference();
		}
	}

	goToChapter( event, combo ) {
		const currentTimeStamp = Math.floor( event.timeStamp ),
			currentReference = javascripture.modules.reference.getReferenceFromHash(),
			bookId = bible.getBookId( currentReference.book );

		let chapterToGoTo = combo;
		if ( currentTimeStamp - lastTimeStamp < 750) {
			chapterToGoTo = currentReference.chapter + combo;
		}

		if ( bible.Data.verses[bookId - 1][ chapterToGoTo - 1] ) {
			var newReference = currentReference;
			newReference.chapter = chapterToGoTo;
			window.location.hash = javascripture.modules.reference.createReferenceLink( newReference );
		}

		lastTimeStamp = currentTimeStamp;
	}

	goToReference() {
		$( '#goToReference' ).val( '' ).focus();
	}

	componentDidMount() {
		mousetrap.bind( [ '=' ], () => this.goToNextCurrentVerse( false ) );
		mousetrap.bind( [ '-' ], () => this.goToPreviousCurrentVerse( false ) );
		mousetrap.bind( [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ], this.goToChapter );
		mousetrap.bind( [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ], this.goToReference );
	}

	componentWillUnmount() {
		mousetrap.unbind( [ '=' ], () => this.goToNextCurrentVerse( false ) );
		mousetrap.unbind( [ '-' ], () => this.goToPreviousCurrentVerse( false ) );
		mousetrap.unbind( [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ], this.goToReference );

	}

	render() {
		const { trays, filter, onTrayClick } = this.props;

		return (
			<div>
				{ trays.map( tray =>
					<div
						key={ tray.id }
						className={ tray.visible ? styles.visible : styles.hidden }
					>
						{ getComponent( tray.component ) }
					</div>
				) }
			</div>
		);
	}
};

TrayList.propTypes = {
	trays: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		visible: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired
	}).isRequired).isRequired
};

export default withStyles( styles )( TrayList );
