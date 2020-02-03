// External
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import ReferenceText from '../reference-text';
import styles from './styles.scss';

class BookControl extends React.Component{
	state = {
		chapter: 1
	};

	goToReference = () => {
		this.props.goToReference( '/#/' + this.props.name + '/' + this.state.chapter + '/1/' );
	};

	handleMouseMove = ( event ) => {
		this.setChapter( event.clientX );
	};

	handleTouchMove = ( event ) => {
		if ( event.touches ) {
			this.setState( {
				touchChapter: true
			} );
			this.setChapter( event.touches[ 0 ].clientX );
		}
	};

	handleTouchStart = () => {
		this.setState( {
			touched: true
		} );
	};

	handleTouchEnd = ( event ) => {
		this.setState( {
			touchChapter: false
		} );

		this.goToReference()
	};

	setChapter( clientX ) {
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
	}

	render() {
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
					<ReferenceText reference={ { book: this.props.name } } /> <span onTouchEnd={ this.goToReference } className="chapter-number">{ this.state.chapter }</span>
					<span className={ styles.go }>
						{ buttonText }
					</span>
			</div>
		);
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		goToReference: ( path ) => {
			dispatch( push( path ) );
		}
	}
};

export default connect(
	null,
	mapDispatchToProps
)( withStyles( styles )( BookControl ) );
