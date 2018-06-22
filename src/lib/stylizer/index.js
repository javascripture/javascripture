import { Children, Component } from 'react';
import PropTypes from 'prop-types';

class Stylizer extends Component {
	static propTypes = {
		children: PropTypes.element.isRequired,
		onInsertCss: PropTypes.func.isRequired
	};

	static childContextTypes = {
		insertCss: PropTypes.func.isRequired
	};

	getChildContext() {
		return { insertCss: this.props.onInsertCss };
	}

	render() {
		return Children.only( this.props.children );
	}
}

export default Stylizer;

export function addCss( css, styles ) {
	css.push( styles._getCss() );
}

export function insertCss( styles ) {
	return styles._insertCss();
}
