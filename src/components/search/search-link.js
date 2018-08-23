// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router-dom';

// Internal dependencies
import Verse from '../reference/verse';
import styles from './styles.scss';
import { createReferenceLink } from '../../lib/reference.js';

class SearchLink extends React.Component{
	setCurrentVerse() {
		const { index } = this.props;
		this.props.setCurrentVerse( index );
	}

	render() {
		const { reference, index } = this.props,
			className = this.props.isActive ? styles.activeReference : null,
			verseData = javascripture.data.kjv[ reference.book ][ reference.chapter - 1 ][ reference.verse - 1 ];

		return (
			<li className={ className }>
				<Link to={ createReferenceLink( reference ) } onClick={ () => this.setCurrentVerse( false ) }>
					{ index + 1 }. { reference.book } { reference.chapter }:{ reference.verse }
				</Link>
				{ this.props.expandedSearchResults && ( <div className={ styles.verse }>
					<Verse verse={ verseData } index={ null } version={ 'kjv' } />
				</div> ) }
			</li>
		);
	}
}

SearchLink.propTypes = {};

export default withStyles( styles )( SearchLink );
