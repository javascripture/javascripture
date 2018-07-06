// External
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import Chapter from '../../containers/chapter';
import styles from './styles.scss';

class SingleReference extends React.Component{
	render() {
		return (
			<div>
				<h1 id={ this.props.book + '_' + this.props.chapter } className={ styles.heading }>{ this.props.book } { this.props.chapter }</h1>
				<div className="chapter">
					<Chapter
						book={ this.props.book }
						chapter={ this.props.chapter }
						highlightWord={ this.props.highlightWord }
					/>
				</div>
			</div>
		);
	}
}

export default withStyles( styles )( SingleReference );
