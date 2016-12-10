// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import CancelSvg from '../svg/cancel.js';
import SearchBlock from '../../containers/search-block';
import styles from './styles.scss';

const Search = React.createClass( {
	getInitialState() {
		return {
			word: '',
			lemma: '',
			morph: '',
			language: 'kjv',
			clusivity: 'exclusive',
			range: 'verse',
			strict: false
		};
	},

	change( event ) {
		let newState = {};
		newState[ event.target.name ] = event.target.value.trim();
		this.setState( newState );
	},

	submit( event ) {
		event.preventDefault();

		this.props.addSearch( this.state );
	},

	termTitle( { clusivity, language, lemma, morph, range, strict, word } ) {
		return 'word: ' + word + '\nstrongs number: ' + lemma + '\nmorphology: ' + morph + '\nlanguage: ' + language + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nstrict: ' + strict;
	},

	toggleDetails( terms ) {
		this.props.toggleSearch( terms );
	},

	removeWord( terms ) {
		this.props.removeSearch( terms );
	},

	results() {
		return this.props.searchTerms.map( ( searchTerm, index ) => {
			return (
				<div key={ index }>
					<h2 className={ styles.header } onClick={ () => this.toggleDetails( searchTerm.terms ) } title={ this.termTitle( searchTerm.terms ) }>
						{ searchTerm.terms.word + ' ' + searchTerm.terms.lemma + ' ' + searchTerm.terms.morph }
						<a className={ styles.remove } onClick={ () => this.removeWord( searchTerm.terms ) }>
							<CancelSvg fill="#fff" />
						</a>
					</h2>

					<SearchBlock { ...searchTerm } />
				</div>
			);
		} );
	},

	render() {
		return (
			<div>
				<form className="search" onSubmit={ this.submit }>
					<ul>
						<li>
							<label htmlFor="word" className="has-placeholder">Word</label>
							<input type="text" name="word" id="word" placeholder="Word" onChange={ this.change } />
						</li>
						<li className="advanced">
							<label htmlFor="lemma" className="has-placeholder">Strongs number</label>
							<input type="text" name="lemma" id="lemma" placeholder="Strongs number" onChange={ this.change } />
						</li>
						<li className="advanced">
							<label htmlFor="morph" className="has-placeholder">Morphology</label>
							<input type="text" name="morph" id="morph" placeholder="Morphology" onChange={ this.change } />
						</li>
						<li className="advanced">
							<label htmlFor="language">Language:</label>
							<select name="language" id="language" onChange={ this.change } defaultValue="kjv">
								<option>kjv</option>
								<option>hebrew</option>
								<option>greek</option>
								<option>web</option>
							</select>
						</li>
						<li className="advanced sentence">
							<label htmlFor="clusivity">Look for</label>
							<select name="clusivity" id="clusivity" onChange={ this.change } defaultValue="exclusive">
								<option value="exclusive">All</option>
								<option value="inclusive">Any</option>
							</select>
							<label htmlFor="range">terms in a</label>
							<select name="range" id="range" onChange={ this.change } defaultValue="verse">
								<option>word</option>
								<option>verse</option>
								<option>chapter</option>
							</select>
						</li>
						<li className="advanced">
							<label>Strict search</label>
							<input type="checkbox" name="strict" id="strict" onChange={ this.change } />
						</li>
						<li className="advanced">
							<input type="submit" value="Search" />
						</li>
					</ul>
				</form>
				{ this.results() }
			</div>
		);
	}
} );

Search.propTypes = {};

export default withStyles( styles )( Search );
