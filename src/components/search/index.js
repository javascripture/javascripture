// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import CancelSvg from '../svg/cancel.js';
import SearchBlock from '../../containers/search-block';
import styles from './styles.scss';

class Search extends React.Component{
	state = {
		word: '',
		lemma: '',
		morph: '',
		version: 'kjv',
		clusivity: 'exclusive',
		range: 'verse',
		strict: false
	};

	change = ( event ) => {
		let newState = {};
		newState[ event.target.name ] = event.target.value.trim();
		this.setState( newState );
	};

	submit = ( event ) => {
		event.preventDefault();

		this.props.addSearch( this.state );
	};

	termTitle( { clusivity, version, lemma, morph, range, strict, word } ) {
		return 'word: ' + word + '\nstrongs number: ' + lemma + '\nmorphology: ' + morph + '\nversion: ' + version + '\nclusivity: ' + clusivity + '\nrange: ' + range + '\nstrict: ' + strict;
	}

	toggleDetails = ( terms ) => {
		this.props.toggleSearch( terms );
	};

	removeWord = ( terms ) => {
		this.props.removeSearch( terms );
	};

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

					<a className={ styles.clearAll } onClick={ this.props.clearAllSearch }>Clear all</a>
				</div>
			);
		} );
	}

	render() {
		return (
			<div>
				<form className={ styles.search } onSubmit={ this.submit }>
					<fieldset>
						<label htmlFor="word" className="has-placeholder">Word</label>
						<input type="text" name="word" id="word" placeholder="Word" onChange={ this.change } />
					</fieldset>
					<fieldset>
						<label htmlFor="lemma" className="has-placeholder">Strongs number</label>
						<input type="text" name="lemma" id="lemma" placeholder="Strongs number" onChange={ this.change } />
					</fieldset>
					<fieldset>
						<label htmlFor="morph" className="has-placeholder">Morphology</label>
						<input type="text" name="morph" id="morph" placeholder="Morphology" onChange={ this.change } />
					</fieldset>
					<fieldset>
						<label htmlFor="version">Language:</label>
						<select name="version" id="version" onChange={ this.change } defaultValue="kjv">
							<option>kjv</option>
							<option>hebrew</option>
							<option>greek</option>
							<option>web</option>
						</select>
					</fieldset>
					<fieldset>
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
					</fieldset>
					<fieldset>
						<label>Strict search</label>
						<input type="checkbox" name="strict" id="strict" onChange={ this.change } />
					</fieldset>
					<fieldset>
						<input type="submit" value="Search" />
					</fieldset>
				</form>
				{ this.results() }
			</div>
		);
	}
}

Search.propTypes = {};

export default withStyles( styles )( Search );
