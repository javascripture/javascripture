// External
import React from 'react';
import { browserHistory } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import styles from './styles.scss';

const BookControl = React.createClass( {
	getInitialState: function() {
		return {
			chapter: 1
		};
	},
	goToReference: function() {
		// hide the trays
		//if ( window.innerWidth < 900 ) {
			//this.props.onChangeDisplayState();
		//}

		// load the reference
		window.location.hash = '/' + this.props.name + '/' + this.state.chapter + '/1/'
		//browserHistory.push( '/' + this.props.name + '/' + this.state.chapter + '/' );
	},
	handleMouseMove: function( event ) {
		this.setChapter( event.clientX );
	},
	handleTouchMove: function( event ) {
		if ( event.touches ) {
			this.setState( {
				touchChapter: true
			} );
			this.setChapter( event.touches[ 0 ].clientX );
		}
	},
	handleTouchStart: function() {
		this.setState( {
			touched: true
		} );
	},
	handleTouchEnd: function( event ) {
		this.setState( {
			touchChapter: false
		} );

		this.goToReference()
	},
	setChapter: function( clientX ) {
		var width = this.referenceSelector.offsetWidth - 40,
			spacing = width / this.props.chapters,
			chapter = Math.ceil( clientX / spacing );

		if ( chapter < 1 ) {
			chapter = 1;
		}

		if ( chapter > this.props.chapters ) {
			chapter = this.props.chapters;
		}

		this.setState( {
			chapter: chapter
		} );
	},
	render: function() {
		var buttonText = this.state.touchChapter ? this.state.chapter : '';

		return (
			<div
				className={ styles.bookControl }
				onClick={ this.goToReference }
				onTouchStart={ this.handleTouchStart }
				onMouseMove={ this.handleMouseMove }
				onTouchMove={ this.handleTouchMove }
				onTouchEnd={ this.handleTouchEnd }
				ref={ ( ref ) => this.referenceSelector = ref }>
				{ this.props.name } <span onTouchEnd={ this.goToReference } className="chapter-number">{ this.state.chapter }</span>
				<span className={ styles.go }>
					{ buttonText }
				</span>
			</div>
		);
	}
} );

export default withStyles( styles )( BookControl );
