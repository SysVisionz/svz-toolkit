import React from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from './svz-utilities';
import './scss/OverlayBox.scss';

const OverlayBox = props => {
	const {content, children, className, onClick} = props;
	return (
		<div className={filterJoin(['overlay-box', className]) } onClick ={onClick}>
			<div className="svz-ob-overlay-content">
				{content}
			</div>
			<div className="svz-ob-content">
				{children}
			</div>
		</div>
	)
}

OverlayBox.propTypes = {
	content: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};

export {OverlayBox};