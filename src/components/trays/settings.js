// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const SettingsTray = () => (
	<div className={ styles.tray }>
		<div id="helpPanel">
			<div className="content">
				<div className="content-padding">
					<h2>Help</h2>
					<p><a href="http://scruffian.wordpress.com/contact/">Having problems? Email for help!</a></p>

					<ul>
						<li>To find out about a word, click on it</li>
						<li>To search for a word, double click it</li>
					</ul>
					<p>Keyboard shortcuts</p>
					<ul>
						<li>Go to a reference: just start typing</li>
						<li>Next reference: =</li>
						<li>Previous reference: -</li>
						<li>Jump to chapter: just type in a number!</li>
					</ul>
					<p>Built in Chrome. Tested in FireFox.</p>
				</div>
			</div>
		</div>

		<div id="settingsPanel">
			<div className="content">
				<div className="content-padding">
					<h2>Settings</h2>
					<form>
						<ul>
							<li>
								<label>Fonts:</label>
								<select name="bodyFontFamily" className="changeStyle">
									<option selected="selected" value="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">Helvetica</option>
									<option value="font-family: 'Bookman Old Style' !important;">Bookman</option>
									<option value="font-family: 'Courier New', Courier !important;">Courier</option>
									<option value="font-family: Georgia !important;">Georgia</option>
									<option value="font-family: 'Lucida Sans Unicode', 'Lucida Grande' !important;">Lucida</option>
									<option value="font-family: 'Times New Roman', Times !important;">Times</option>
									<option value="font-family: Verdana, Geneva !important;">Verdana</option>
								</select>
							</li>
							<li>
								<label>Font size:</label>
								<select name="bodyFontSize" className="changeStyle">
									<option value="font-size: 80%;">80%</option>
									<option value="font-size: 90%;">90%</option>
									<option selected="selected" value="font-size: 100%;">100%</option>
									<option value="font-size: 110%;">110%</option>
									<option value="font-size: 120%;">120%</option>
									<option value="font-size: 130%;">130%</option>
									<option value="font-size: 140%;">140%</option>
									<option value="font-size: 150%;">150%</option>
									<option value="font-size: 160%;">160%</option>
									<option value="font-size: 170%;">170%</option>
									<option value="font-size: 180%;">180%</option>
									<option value="font-size: 190%;">190%</option>
									<option value="font-size: 200%;">200%</option>
								</select>
							</li>
							<li>
								<label>Colours:</label>
								<select id="subdueColorBy">
									<option value=".9">Very Bright</option>
									<option value=".75">Bright</option>
									<option value=".5" selected="selected">Normal</option>
									<option value=".3">Dark</option>
									<option value=".2">Very Dark</option>
								</select>
							</li>
							<li>
								<label>Reference picker:</label>
								<select id="referencePicker">
									<option value="input">Typing</option>
									<option value="select">Drop down menu</option>
								</select>
							</li>
							<li>
								<label>Highlight words with:</label>
								<select id="highlightWordsWith">
									<option value="same">Same Strong's number</option>
									<option value="family">Same family</option>
								</select>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</div>

	</div>
);

SettingsTray.propTypes = {};

export default withStyles( styles )( SettingsTray );
