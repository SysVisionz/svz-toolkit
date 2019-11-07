import React, {Component} from 'react'
import PropTypes from 'prop-types';
import './scss/Modal.scss';

class Modal extends Component {

	closeFunction = evt => {
		const {closeOnEsc = true} = this.props;
		if ((!evt || evt.keyCode === 27) && closeOnEsc){
			this.props.closeFunction();
		}
	}

	componentDidUpdate(prevProps){
		const {active, onToggle, superModal, noLock} = this.props;
		if (active !== prevProps.active){
			if (active !== this.props.locked && !superModal && !noLock){
				this.props.screenLock(active);
			}
			if (onToggle){
				onToggle(active);
			}
		}
	}

	componentDidMount(){
		window.addEventListener('keydown', this.closeFunction)
	}

	componentWillUnmount(){
		window.removeEventListener('keydown', this.closeFunction);
	}

	render() {
		const {closeFunction} = this;
		const {
			closeButton = true, 
			children, 
			active,
			className,
			superModal
		} = this.props;
		const classNamer = 'modal-container' + (active ? ' active' : '') + ( superModal ? ' super' : '') + (className ? ' ' + className : '')
		return (
			<div 
				className={classNamer} 
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
}

Modal.propTypes = {
	active: PropTypes.bool,
	className: PropTypes.string, 
	closeButton: PropTypes.element, 
	children: PropTypes.element,
	closeFunc: PropTypes.func,
	onToggle: PropTypes.func,
	backgroundColor: PropTypes.string,
}

export {Modal};
