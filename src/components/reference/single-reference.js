// External
import React from 'react';
import Waypoint from 'react-waypoint';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import Chapter from '../../containers/chapter';
import styles from './styles.scss';

const SingleReference = React.createClass( {
	handleWaypointEnter( event ) {
		if ( event.previousPosition === 'above' ) {
			this.props.setScrollChapterPrevious();
		}
	},

	handleWaypointLeave( event ) {
		if ( event.currentPosition === 'above' ) {
			this.props.setScrollChapterNext();
		}
	},

	render() {
		return (
			<div>
				<Waypoint onEnter={ this.handleWaypointEnter } onLeave={ this.handleWaypointLeave } />
				<h1 id={ this.props.book + '_' + this.props.chapter } className={ styles.heading }>{ this.props.book } { this.props.chapter }</h1>
				<div className="chapter">
					<Chapter book={ this.props.book } chapter={ this.props.chapter } />
				</div>
			</div>
		);
	}
} );

export default withStyles( styles )( SingleReference );
