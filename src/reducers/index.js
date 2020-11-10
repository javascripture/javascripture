import { connectRouter } from 'connected-react-router'

import crossReferences from './cross-references';
import currentReference from './current-reference';
import data from './data';
import list from './list';
import reference from './reference';
import referenceSelectorMobile from './reference-selector-mobile';
import scrollChapter from './scroll-chapter';
import searchAdvanced from './search-advanced';
import searchForm from './search-form';
import searchResults from './search-results';
import searchSelect from './search-select';
import searchTerms from './search-terms';
import settings from './settings';
import trays from './trays';
import wordDetails from './word-details';
import version from './version';
import versions from './versions';
import sidebar from './sidebar';
import similarReferences from './similar-references';
import referenceInfo from './reference-info';

export default (history) => { return {
	router: connectRouter( history ),
	crossReferences,
	currentReference,
	data,
	list,
	reference,
	referenceInfo,
	referenceSelectorMobile,
	scrollChapter,
	searchAdvanced,
	searchForm,
	searchResults,
	searchSelect,
	searchTerms,
	settings,
	sidebar,
	trays,
	version,
	versions,
	wordDetails,
	similarReferences,
} };
