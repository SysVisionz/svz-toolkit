import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from './svz-utilities'
import './scss/Modal.scss';

const Modal = props => {

	const {
		startActive, 
		onToggle, 
		onOpen, 
		onClose, 
		noEsc, 
		closeButton, 
		children, 
		className, 
		superModal
	} = props;
	const [active, setActive] = useState(startActive);

	const onEsc = evt => {
		const {closeOnEsc = true} = this.props;
		if ((!evt || evt.keyCode === 27)){
			this.props.closeFunction();
		}
	}

	const toggle = (value = !active) => {
		setActive(value)
		if (onToggle){
			onToggle(value)
		}
		if (value){
			if(onOpen){
				onOpen()
			}
			if (!noEsc){
				window.addEventListener('keydown', onEsc)
			}
		}
		else {
			if (onClose){
				onClose()
			}
			window.removeEventListener('keydown', onEsc);
		}
	}

	if (props.active !== active){
		toggle(props.active);
	}

	return (
		<div 
			className={filterJoin(['modal-container', ['active', active], ['super', superModal], className])}
		>
			<div 
				className="modal-background"
				onClick={() => closeFunction()}
			/>
			<div className="modal-window">
				{
					closeButton 
						? (closeButton === true 
							? <div 
								className="modal-close button" 
								onClick={() => closeFunction()}
							>
								X
							</div> 
							: closeButton) 
						: null
				}
				{children}
			</div>
		</div>
	)
}

Modal.propTypes = {
	startActive: PropTypes.bool, 
	onToggle: PropTypes.func, 
	onOpen: PropTypes.func, 
	onClose: PropTypes.func,
	noEsc: PropTypes.bool,
	closeButton: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
		PropTypes.element
	]), 
	className: PropTypes.string,
	superModal: PropTypes.bool
}

export {Modal};
