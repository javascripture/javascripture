// External dependencies
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import CancelSvg from '../svg/cancel.js';
import PickerSvg from '../svg/picker.js';
import SearchBlock from '../../containers/search-block';
import styles from './styles.scss';

class Search extends React.Component{
	change = ( event ) => {
		this.props.updateSearchForm( event.target.name, event.target.value );
	};

	selectChange = ( event ) => {
		this.change( event );
		this.props.fetchData( event.target.value );
	};

	toggle = ( event ) => {
		this.props.updateSearchForm( event.target.name, event.target.checked );
	};

	reset = ( event ) => {
		event.preventDefault();
		this.props.clearSearchForm();
	};

	submit = ( event ) => {
		event.preventDefault();
		this.props.addSearch( this.props.searchForm );
	};

	showAdvanced = () => {
		if ( this.props.searchAdvanced ) {
			this.props.closeAdvancedSearch();
		} else {
			this.props.openAdvancedSearch();
		}
	};

	changeExpandedResultsSetting = () => {
		if ( this.props.settings.expandedSearchResults ) {
			this.props.collapseSearchResults();
		} else {
			this.props.expandSearchResults();
		}
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

	searchButtonText = () => {
		if ( this.isSubmitButtonDisabled() ) {
			return 'Loading ' + this.props.searchForm.version + '...';
		}

		return 'Search';
	};

	isSubmitButtonDisabled = () => {
		const data = this.props.data[ this.props.searchForm.version ];
		return ! data || Object.keys( data ).length === 0;
	};

	pickerButton( field ) {
		return (
			<button
				className={ styles.pickerButton }
				type="button" onClick={ this.props.activateSearchSelect.bind( this, field ) }
				title="Use this to select the term you want to search for.">
				<PickerSvg />
			</button>
		);
	}

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

	renderAdvanced() {
		const text = this.props.searchAdvanced ? 'Hide advanced' : 'Show advanced';
		return (
			<fieldset className={ styles.advanced }><a onClick={ this.showAdvanced }>{ text }</a></fieldset>
		);
	}

	render() {
		return (
			<div>
				<form className={ styles.search } onSubmit={ this.submit }>
					<fieldset>
						<label htmlFor="word" className="has-placeholder">Word</label>
						<input type="text" name="word" placeholder="Word" onChange={ this.change } value={ this.props.searchForm.word } />
						{ this.pickerButton( 'word' ) }
					</fieldset>
					{ this.props.searchAdvanced && (
						<div>
							<fieldset>
								<label htmlFor="lemma" className="has-placeholder">Strongs number</label>
								<input type="text" name="lemma" placeholder="Strongs number" onChange={ this.change } value={ this.props.searchForm.lemma } />
								{ this.pickerButton( 'lemma' ) }
							</fieldset>
							<fieldset>
								<label htmlFor="morph" className="has-placeholder">Morphology</label>
								<input type="text" name="morph" placeholder="Morphology" onChange={ this.change } value={ this.props.searchForm.morph } />
								{ this.pickerButton( 'morph' ) }
							</fieldset>
							<fieldset>
								<label htmlFor="version">Language:</label> <select name="version" onChange={ this.selectChange } value={ this.props.searchForm.version }>
									{ Object.keys( this.props.versions ).map( ( version, index ) => (
										<option value={ version } key={ index }>{ version }</option>
									) ) }
								</select>
							</fieldset>
							<fieldset>
								<label htmlFor="clusivity">Look for</label> <select name="clusivity" onChange={ this.change } value={ this.props.searchForm.clusivity }>
									<option value="exclusive">all</option>
									<option value="inclusive">any</option>
								</select> <label htmlFor="range">terms in a</label> <select name="range" onChange={ this.change } value={ this.props.searchForm.range }>
									<option>word</option>
									<option>verse</option>
									<option>chapter</option>
								</select>
							</fieldset>
							<fieldset>
								<label>Match whole word?</label> <input type="checkbox" name="strict" onChange={ this.toggle } value={ this.props.searchForm.strict } />
							</fieldset>
							<fieldset>
								<label>Show the verse for context:</label> <input type="checkbox" name="expandedSearchResults" checked={ this.props.settings.expandedSearchResults } onChange={ this.changeExpandedResultsSetting } />
							</fieldset>
						</div>
					) }
					{ this.renderAdvanced() }
					<fieldset>
						<input type="submit" value={ this.searchButtonText() } disabled={ this.isSubmitButtonDisabled() } />
						<input type="reset" value="Reset" onClick={ this.reset } />
					</fieldset>
				</form>
				{ this.results() }
			</div>
		);
	}
}

Search.propTypes = {};

export default withStyles( styles )( Search );
