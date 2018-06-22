// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import WordBlock from '../../containers/word-block';

class WordDetails extends React.Component{
	render() {
		if ( this.props.words.length ) {
			return (
				<div>
					{ this.props.words.map( ( wordDetails, index ) => {
						return (
							<WordBlock { ...wordDetails } key={ index } />
						);
					} ) }
					<a className={ styles.clearAll } onClick={ this.props.clearAll }>Clear all</a>
				</div>
			);
		}

		return ( <div className={ styles.wordBlock }>Select a word to show more details about it here.</div> );
	}
}

WordDetails.propTypes = {};

export default withStyles( styles )( WordDetails );
