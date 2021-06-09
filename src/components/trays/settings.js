// External dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Internal dependencies
import { settingsChange } from '../../actions';
import VersionSelect from '../version-select';
import styles from './styles.scss';


// set up global - to be deleted
javascripture.state = {};

const SettingsTray = React.memo( () => {
	const dispatch = useDispatch();
	const settings = useSelector( state => state.settings );

 	// remove this line
	javascripture.state.settings = settings;

	const changeSetting = ( event ) => {
		dispatch( settingsChange( event.target.name, event.target.value ) );
		event.target.blur();
	};

	const changeCheckboxSetting = ( event ) => {
		dispatch( settingsChange( event.target.name, event.target.checked ) );
		event.target.blur();
	};

	const clear = () => {
		localStorage.clear();
		window.location.href="/";
	};

	return (
		<div>
			<div id="helpPanel" className={ styles.helpPanel }>
				<div className="content">
					<div className="content-padding">
						<h2>Help</h2>
						<p><a href="/help">Get help here</a></p>
						<ul>
							<li>To find out about a word, click on it</li>
						</ul>
						<br />
						<h3>Keyboard shortcuts</h3>
						<ul>
							<li><strong>Go to a reference:</strong> just start typing</li>
							<li><strong>Next reference:</strong> =</li>
							<li><strong>Previous reference</strong>: -</li>
							<li><strong>Jump to chapter</strong>: type a number</li>
						</ul>
					</div>
				</div>
			</div>
			<div id="settingsPanel" className={ styles.helpPanel }>
				<div className="content">
					<div className="content-padding">
						<h2>Settings</h2>
						<form>
							<ul>
								<li className={ styles.settingsLi }>
									<label>Fonts:</label>
									<select value={ settings.fontFamily } name="fontFamily" onChange={ changeSetting }>
										<option value='-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", Arial, Helvetica, sans-serif !important;'>System</option>
										<option value="'Bookman Old Style' !important">Bookman</option>
										<option value="'Courier New', Courier !important">Courier</option>
										<option value="Georgia !important">Georgia</option>
										<option value="'Lucida Sans Unicode', 'Lucida Grande' !important">Lucida</option>
										<option value="'Times New Roman', Times !important">Times</option>
										<option value="Verdana, Geneva !important">Verdana</option>
									</select>
								</li>
								<li className={ styles.settingsLi }>
									<label>Font size:</label>
									<select value={ settings.fontSize } name="fontSize" onChange={ changeSetting }>
										<option value="80%">80%</option>
										<option value="90%">90%</option>
										<option value="100%">100%</option>
										<option value="110%">110%</option>
										<option value="120%">120%</option>
										<option value="130%">130%</option>
										<option value="140%">140%</option>
										<option value="150%">150%</option>
										<option value="160%">160%</option>
										<option value="170%">170%</option>
										<option value="180%">180%</option>
										<option value="190%">190%</option>
										<option value="200%">200%</option>
									</select>
								</li>
								<li className={ styles.settingsLi }>
									<label>Colours:</label>
									<select value={ settings.subdue } name="subdue" onChange={ changeSetting }>
										<option value="90%">Very Bright</option>
										<option value="75%">Bright</option>
										<option value="50%">Normal</option>
										<option value="30%">Dark</option>
										<option value="20%">Very Dark</option>
									</select>
								</li>
								<li className={ styles.settingsLi }>
									<label>Highlight words with:</label>
									<select value={ settings.highlightWordsWith } id="highlightWordsWith" name="highlightWordsWith" onChange={ changeSetting } >
										<option value="same">Same Strong's number</option>
										<option value="family">Same family</option>
									</select>
								</li>
								<li className={ styles.settingsLi }>
									<label>
										<input type="checkbox" name="inSync" checked={ settings.inSync } onChange={ changeCheckboxSetting } /> Keep references in sync
									</label>
								</li>
								<li className={ styles.settingsLi }>
									<label>
										<input type="checkbox" name="expandedSearchResults" checked={ settings.expandedSearchResults } onChange={ changeCheckboxSetting } /> Show expanded search results
									</label>
								</li>
								<li className={ styles.settingsLi }>
									<label>
										<input type="checkbox" name="darkMode" checked={ settings.darkMode } onChange={ changeCheckboxSetting } /> Dark Mode
									</label>
								</li>
								<li className={ styles.settingsLi }>
									<label>
										<input type="checkbox" name="highlightSearchResults" checked={ settings.highlightSearchResults } onChange={ changeCheckboxSetting } /> Highlight all words in a verse when hovering the search results
									</label>
								</li>
								<li className={ styles.settingsLi }>
									<label>Interface language:</label>
									<VersionSelect value={ settings.interfaceLanguage } name="interfaceLanguage" onChange={ changeSetting } />
								</li>
							</ul>
						</form>
					</div>
				</div>
				<p>Legacy versions:<br />
				<a href="https://javascripture.net">javascripture.net</a><br />
				<a href="https://javascripture.xyz">javascripture.xyz</a><br />
				</p>
				<br />
				<br />
				<p>Built in Firefox. Tested in Chrome.</p>
				<a href="https://github.com/morphgnt/tischendorf">Greek text: Tischendorf</a><br />
				<a href="https://github.com/openscriptures/morphhb">Hebrew text source</a><br />
				<a href="https://github.com/javascripture/javascripture/blob/gh-pages/data/literalConsistent.js">Literal: A work in progress</a><br />
				ESV: The Holy Bible, English Standard Version ©2011 Crossway Bibles, a division of Good News Publishers. All rights reserved.<br />
				<p><br />Version: { typeof( javascripture.sw ) !== 'undefined' ? javascripture.sw : null }</p>
				<p><a href="#" onClick={ clear }>Clear settings and start over</a></p>
			</div>
		</div>
	);
} );

export default SettingsTray;
