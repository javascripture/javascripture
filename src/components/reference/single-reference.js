// External
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { union } from 'lodash';

// Internal
import Chapter from '../../containers/chapter';
import styles from './styles.scss';

class SingleReference extends React.Component{
	render() {
		const { book, reference, index } = this.props;
		const tranlatedBook = bible.getTranslatedBookName( book, reference[ index ].version );

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
