// External dependencies
import React, { useState, Fragment } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { createReferenceLink } from '../../lib/reference';
import ReferenceText from '../reference-text';
import styles from './styles.scss';

const getMonthName = ( monthNumber ) => {
	const month = new Date( 1970, monthNumber, 1 );
	return month.toLocaleString( 'default', { month: 'long' } );
}

const getMonths = () => {
	let monthNumber = 0;
	const months = [];
	while( monthNumber < 12 ) {
		months[ monthNumber ] = ( <option value={ monthNumber }>{ getMonthName( monthNumber ) }</option> );
		monthNumber++;
	}
	return months;
}

const getDaysInMonth = ( month ) => {
    return new Date( 1970, month, 0 ).getDate();
}

function getDaysIntoYear(date){
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

const DailyReadings = React.memo( () => {
	const [ selectedMonth, setSelectedMonth ] = useState( new Date().getMonth() );
	const [ selectedDay, setSelectedDay ] = useState( new Date().getDate() );

	const getDays = () => {
		const daysInMonth = getDaysInMonth( parseInt( selectedMonth ) + 1 );
		let day = 1;
		const days = [];
		while( day <= daysInMonth ) {
			days[ day ] = <option key={ day }>{ day }</option>;
			day++;
		}
		return days;
	}

	const selectedDate = new Date( 1970, selectedMonth, selectedDay );
	const daysIntoYear = getDaysIntoYear( selectedDate );

	const getReferenceLink = ( oneRef ) => {
		let chapter = 1;
		if ( oneRef.Chapter ) {
			chapter = oneRef.Chapter;
		}

		let referenceString = oneRef.Book + ' ' + chapter;
		const reference = { book: oneRef.Book, chapter };

		if ( oneRef.Verses ) {
			reference.verse = oneRef.Verses.split('-')[0];
			referenceString += ':' + oneRef.Verses;
		}

		return (
			<a href={ '/#' + createReferenceLink( reference ) } onClick={ ( event ) => event.stopPropagation() }>
				{ referenceString }
			</a>
		);
	}

	const dailyReadingsList = javascripture.data.dailyReadings[ daysIntoYear - 1 ].Readings.map( reading => {
		return (
			<li>
				{ reading.Refs.map( oneRef => {
					return ( <Fragment>{ getReferenceLink( oneRef ) }<br /></Fragment> );
				} ) }
			</li>
		);
	} );

	return (
		<div className={ styles.dailyReadings }>
			<select value={ selectedMonth } onChange={ ( event ) => { setSelectedMonth( event.target.value ) } } >
				{ getMonths() }
			</select>
			<select className={ styles.day } value={ selectedDay } onChange={ ( event ) => { setSelectedDay( event.target.value ) } } >
				{ getDays() }
			</select>
			<ol>
				{ dailyReadingsList }
			</ol>
		</div>
	)
} );

export default withStyles( styles )( DailyReadings );
