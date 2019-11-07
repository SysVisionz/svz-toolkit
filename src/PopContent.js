import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from './svz-utilities';
import './scss/PopContent.scss';

class PopContent extends Component{
	constructor(){
		super();
		this.state = {
			open: false
		};
		this.id = Math.round(Math.random() * 10000);
		this.detailsContent = React.createRef();
	}

	componentDidUpdate(prevProps, prevState){
		const {open, horizontal} = this.props;
		if (prevProps.open !== open){
			this.setState({open})
		}
		if (this.props.children !== prevProps.children || this.state.open !== prevState.open){
			this.setState({
				dimensions: {
					width: (this.state.open || !horizontal) && this.detailsContent.current ? this.detailsContent.current.scrollWidth : 0, 
					height: (this.state.open || horizontal) && this.detailsContent.current ? this.detailsContent.current.scrollHeight : 0
				}
			})
		}
	}

	clickedOutside = () => {
		this.onTimeout = setTimeout(() => {
			if (this.clickedContent){
				this.clickedContent = false;
			}
			else {
				this.openChange(false);
			}
		})
	}

	openChange = open => {
		const {onChange, onOpen, onClose, keepOpen} = this.props;
		if (this.state.open !== open){
			if (onChange){
				onChange(open);
			}
			if (open){
				if (onOpen) {
					onOpen();
				}
				if (!keepOpen){
					document.addEventListener('click', this.clickedOutside)
				}
			}
			else {
				if (onClose){
					onClose();
				}
				if (!keepOpen){
					document.removeEventListener('click', this.clickedOutside)
				}
			}
			this.setState({open})
		}
	}

	render() {
		const {className, children, label, icon, id = this.id, horizontal} = this.props;
		const {open} = this.state;
		return (
			<div ref={this.props.elemRef} className={filterJoin(["svz-pc-container",['active', open], className,])}>
				<div className = "svz-pc-title-container" id={id} onClick={() => this.openChange(!open)}>
					{label.map ? label.map((content, index) => <div className="svz-pc-title" key = {id + index} >{content}</div>) : <div className ="svz-pc-title">{label}</div>}
					<div className="svz-pc-icon">{icon ? (open ? icon.open : icon.closed) : (open ? <>⯅</> : <>⯆</>)}</div>
				</div>
				<div className={filterJoin(["svz-pc-details-container", ['horizontal', horizontal]])} onClick={() => this.clickedContent = true } 
					style={this.state.dimensions}
				>
					<div className="svz-pc-details" ref={this.detailsContent}>
						{children}
					</div>
				</div>
			</div>
		)
	}

}

PopContent.propTypes = {
	open: PropTypes.bool,
	onChange: PropTypes.func,
	label: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.string,
		PropTypes.element,
	]),
	icon: PropTypes.object,
	horizontal: PropTypes.bool,
	children: PropTypes.element
}

export {PopContent};