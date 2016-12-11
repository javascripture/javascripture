// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import SearchLink from './search-link';
import styles from './styles.scss';

class SearchBlock extends React.Component{
	renderDetails() {
		if ( ! this.props.open || ! this.props.results ) {
			return null;
		}

		if ( typeof this.props.results === 'string' ) {
			return ( <li>{ this.props.results }</li> );
		}

		console.log( this.props.activeReference );

		return this.props.results.map( ( reference, index ) => {
			return (
				<SearchLink key={ index } index={ index } activeReference={ this.props.activeReference } reference={ reference } setCurrentVerse={ this.props.setCurrentVerse } />
			)
		} );
	}

	render() {
		console.log( 'reder' );
		console.log( this.props );
		return (
			<div>
				<ol className={ styles.results }>
					{ this.renderDetails() }
				</ol>
			</div>
		);
	}
};

SearchBlock.propTypes = {};

export default withStyles( styles )( SearchBlock );
