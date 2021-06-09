// External
import React from 'react';

// Internal
import styles from './styles.scss';

const VersionSelect = React.memo( ( { name, value, onChange } ) => {
	return (
		<select className={ styles.sidebarSelect } name={ name } value={ value } onChange={ onChange }>
			{ Object.keys( bible.Data.interfaceLanguages ).map( ( key ) => {
				const versionsForLanguage = Object.keys( bible.Data.supportedVersions ).filter( version => bible.Data.supportedVersions[ version ].language === key );
				const versionOption = versionsForLanguage.map( version => {
					return <option value={ version } key={ version } title={ bible.Data.supportedVersions[ version ].name }>{ version } - { bible.Data.supportedVersions[ version ].name }</option>
				} );
				return <optgroup key={ 'optgroup' + key } label={ bible.Data.interfaceLanguages[ key ] }>{ versionOption }</optgroup>;
			} ) }
		</select>
	);
} );

export default VersionSelect;
