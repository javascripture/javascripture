// External
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal
import Chapter from '../../containers/chapter';
import styles from './styles.scss';

class SingleReference extends React.Component{
	render() {
		const tranlatedBook = bible.getTranslatedBookName( this.props.book, this.props.reference[ this.props.index ].version );

		return (
			<div>
				<div className={ styles.chapter }>
					<Chapter
						book={ this.props.book }
						chapter={ this.props.chapter }
						index={ this.props.index }
					/>
				</div>
			</div>
		);
	}
}

export default withStyles( styles )( SingleReference );
