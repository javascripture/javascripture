import React from 'react';

class Search extends React.Component{
	handleClick: function() {
		this.props.onChangeDisplayState( this.props.target );
	},

	render: function() {
		var className = this.props.open ? 'open' : '';
		return (
			<button onClick={ this.handleClick } className={ className }>
				<span className="text">{ this.props.text }</span>
				<span className="icon"><img src={ this.props.icon } /></span>
			</button>
		);
	}
}

export default Search;
