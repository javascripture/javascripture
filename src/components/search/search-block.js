// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import SearchLink from '../../containers/search-link';
import styles from './styles.scss';

class SearchBlock extends React.Component{
	renderDetails() {
		return this.props.results.map( ( reference, index ) => {
			return (
				<SearchLink key={ index } index={ index } reference={ reference } terms={ this.props.terms } />
			)
		} );
	}

	render() {
		if ( ! this.props.results ) {
			return ( <div className={ styles.noResults }>Loading…</div>);
		}

		if ( this.props.results.length === 0 || typeof this.props.results === 'string' ) {
			return ( <div className={ styles.noResults }>No results.</div>);
		}

		return (
			<div className={ this.props.open ? null : styles.hidden }>
				<ol className={ styles.results }>
					{ this.renderDetails() }
				</ol>
			</div>
		);
	}
};

SearchBlock.propTypes = {};

export default withStyles( styles )( SearchBlock );
