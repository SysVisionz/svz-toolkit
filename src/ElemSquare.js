import React from 'react'
import PropTypes from 'prop-types';
import {NumberMan} from './svz-utilities';
import './scss/ElemSquare.scss';

const RowsMaker = props => {
	const {content, rowLength, rowMax} = props;
	const genRow = (row, index) => row.map((x, item) => {
		const number = new NumberMan(index);
		return <div className="svz-es-row-entry" key={"svz-rm-row-entry" + row + number.toDigits(rowLength, false)} >{x}</div>
	})
	const rows = callbacker(content, genRow, rowLength).map((elem, index) => {
		const number = new NumberMan(index)
		return <div className = "svz-rm-row" key={"svz-rm-row" + number.toDigits(rowMax, false)}>{elem}</div>
	})
	return <div className="svz-rm-container">{rows}</div>
}

RowsMaker.propTypes = {
	content: PropTypes.array,
	rowLength: PropTypes.number
}

const ElemSquare = props => {
	const {content, rowMax, rowMin} = props;
	const rowLength = Math.sqrt(content.lenfth) < rowMax
		? Math.sqrt(content.length) > rowMin ? Math.sqrt(content.length) : rowMin
		: rowMax;
	return <RowsMaker content={content} rowLength ={rowLength} rowMax={content/rowLength}/>
}

ElemSquare.propTypes = {
	content: PropTypes.array,
	rowMax: PropTypes.number,
	rowMin: PropTypes.number
};

export {ElemSquare};