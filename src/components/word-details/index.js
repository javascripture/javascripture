// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import WordBlock from '../../containers/word-block';

const WordDetails = React.createClass( {
	render() {
		if ( this.props.words.length ) {
			return (
				<div>
					{ this.props.words.map( ( { strongsNumber, open, morphology }, index ) => {
						return (
							<WordBlock strongsNumber={ strongsNumber } open={ open } morphology={ morphology } key={ index } />
						);
					} ) }
					<a className={ styles.clearAll } onClick={ this.props.clearAll }>Clear all</a>
				</div>
			);
		}

		return ( <div className={ styles.wordBlock }>Select a word to show more details about it here.</div> );
	}
} );

WordDetails.propTypes = {};

export default withStyles( styles )( WordDetails );
