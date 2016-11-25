// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Search = React.createClass( {
	render() {
		return (
			<form className="search">
				<ul>
					<li>
						<label htmlFor="word" className="has-placeholder">Word</label>
						<input type="text" name="word" id="word" placeholder="Word" />
					</li>
					<li className="advanced">
						<label htmlFor="lemma" className="has-placeholder">Strongs number</label>
						<input type="text" name="lemma" id="lemma" placeholder="Strongs number" />
					</li>
					<li className="advanced">
						<label htmlFor="morph" className="has-placeholder">Morphology</label>
						<input type="text" name="morph" id="morph" placeholder="Morphology" />
					</li>
					<li className="advanced">
						<label htmlFor="language">Language:</label>
						<select name="language" id="language">
							<option selected>kjv</option>
							<option>hebrew</option>
							<option>greek</option>
							<option>web</option>
						</select>
					</li>
					<li className="advanced sentence">
						<label htmlFor="clusivity">Look for</label>
						<select name="clusivity" id="clusivity">
							<option value="exclusive" selected>All</option>
							<option value="inclusive">Any</option>
						</select>
						<label htmlFor="range">terms in a</label>
						<select name="range" id="range">
							<option>word</option>
							<option selected>verse</option>
							<option>chapter</option>
						</select>
					</li>
					<li className="advanced">
						<label>Strict search</label>
						<input type="checkbox" name="strict" id="strict" />
					</li>
					<li className="advanced">
						<input type="submit" value="Search" />
					</li>
				</ul>
			</form>
		);
	}
} );

Search.propTypes = {};

export default withStyles( styles )( Search );
