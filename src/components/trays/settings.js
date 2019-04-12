// External dependencies
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { settingsChange } from '../../actions';
import styles from './styles.scss';

class SettingsTray extends React.Component{
	changeSetting = ( event ) => {
		this.props.settingsChange( event.target.name, event.target.value );
		event.target.blur();
	};

	changeCheckboxSetting = ( event ) => {
		this.props.settingsChange( event.target.name, event.target.checked );
		event.target.blur();
	};

	render() {
		return (
			<div className={ styles.tray }>
				<div id="helpPanel" className={ styles.helpPanel }>
					<div className="content">
						<div className="content-padding">
							<h2>Help</h2>
							<p><a href="/help">Get help here</a></p>
							<br />
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
										<select value={ this.props.settings.fontFamily } name="fontFamily" onChange={ this.changeSetting }>
											<option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica</option>
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
										<select value={ this.props.settings.fontSize } name="fontSize" onChange={ this.changeSetting }>
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
										<select value={ this.props.settings.subdue } name="subdue" onChange={ this.changeSetting }>
											<option value="90%">Very Bright</option>
											<option value="75%">Bright</option>
											<option value="50%">Normal</option>
											<option value="30%">Dark</option>
											<option value="20%">Very Dark</option>
										</select>
									</li>
									<li className={ styles.settingsLi }>
										<label>Highlight words with:</label>
										<select value={ this.props.settings.highlightWordsWith } id="highlightWordsWith" name="highlightWordsWith" onChange={ this.changeSetting } >
											<option value="same">Same Strong's number</option>
											<option value="family">Same family</option>
										</select>
									</li>
									<li className={ styles.settingsLi }>
										<label>
											<input type="checkbox" name="inSync" checked={ this.props.settings.inSync } onChange={ this.changeCheckboxSetting } /> Keep references in sync
										</label>
									</li>
									<li className={ styles.settingsLi }>
										<label>
											<input type="checkbox" name="expandedSearchResults" checked={ this.props.settings.expandedSearchResults } onChange={ this.changeCheckboxSetting } /> Show expanded search results
										</label>
									</li>
									<li className={ styles.settingsLi }>
										<label>
											<input type="checkbox" name="highlightSearchResults" checked={ this.props.settings.highlightSearchResults } onChange={ this.changeCheckboxSetting } /> Highlight all words in a verse when hovering the search results
										</label>
									</li>

								</ul>
							</form>
						</div>
					</div>
					<br />
					<br />
					<p>Built in Firefox. Tested in Chrome.</p>
					<p>
						Greek text: Tischendorf<br />
						<a href="https://github.com/openscriptures/morphhb">Hebrew text source</a><br />
						<a href="https://github.com/javascripture/javascripture/blob/gh-pages/data/literalConsistent.js">Literal: A work in progress</a><br />
						ESV: The Holy Bible, English Standard Version ©2011 Crossway Bibles, a division of Good News Publishers. All rights reserved.<br />
					</p>
					<p><br />Version: { typeof( javascripture.sw ) !== 'undefined' ? javascripture.sw : null }</p>
				</div>
			</div>
		);
	}
}




SettingsTray.propTypes = {};

const SettingsTrayWithStyles = withStyles( styles )( SettingsTray );

// set up global - to be deleted
javascripture.state = {};

const mapStateToProps = ( state, ownProps ) => {
 	// remove this line
	javascripture.state.settings = state.settings;

	return {
		bookmarks: state.bookmarks,
		settings: state.settings
	};
};

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		settingsChange: ( settingName, settingValue ) => {
			dispatch( settingsChange( settingName, settingValue ) )
		}
	}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( SettingsTrayWithStyles );
