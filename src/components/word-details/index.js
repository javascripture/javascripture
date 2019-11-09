// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

// Internal dependencies
import { addWord, clearAll, removeWord } from '../../actions'
import styles from './styles.scss';
import WordBlock from './word-block';

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
				</div>
			);
		}

		return ( <div className={ styles.wordBlock }>Select a word to show more details about it here.</div> );
	}
}

WordDetails.propTypes = {};

const mapStateToProps = ( state, ownProps ) => {
	return {
		words: state.wordDetails
	}
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		addWord: ( lemma, open, morphology, version ) => {
			dispatch( addWord( { lemma, open, morphology, version } ) );
		},

		removeWord: ( lemma ) => {
			dispatch( removeWord( lemma ) );
		},
	}
};

const WordDetailsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( WordDetails )

export default withStyles( styles )( WordDetailsContainer );
