import React from 'react'
import PropTypes from 'prop-types';
import './scss/Attention.scss';

export const Attention = (props) => {
	return (
		<div className="attention-wrapper">
			<div>{props.children}</div>
			<div className="jumper-container">
				<div hidden={!props.on} className="attention-jumper">!</div>
			</div>
		</div>
	)
}