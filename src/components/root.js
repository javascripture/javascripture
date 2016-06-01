// External
import React from 'react';

// Internal
import Footer from './footer'
import Trays from './trays';
import VisibleTrays from '../containers/VisibleTrays';

const CSS = {
	root: {
		fontFamily: 'Helvetica, Arial, sans-seif'
	}
};

export default React.createClass( {
	render() {
		return (
			<div style={ CSS.root }>
				<Trays>
			    	<VisibleTrays />
			    </Trays>

				<div style={{ marginTop: '1.5em' }}>
					{ this.props.children }
				</div>

				<Footer />
			</div>
		);
	}
} );
