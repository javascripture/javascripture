// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import SearchLink from './search-link';
import styles from './styles.scss';

class SearchBlock extends React.Component{
	renderDetails() {
		return this.props.results.map( ( reference, index ) => {
			return (
				<SearchLink key={ index } index={ index } activeReference={ this.props.activeReference } reference={ reference } setCurrentVerse={ this.props.setCurrentVerse } />
			)
		} );
	}

	render() {
		if ( ! this.props.open ) {
			return null;
		}

		if ( ! this.props.results ) {
			return ( <div>Loading…</div>);
		}

		if ( this.props.results.length === 0 || typeof this.props.results === 'string' ) {
			return ( <div>No results.</div>);
		}

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
