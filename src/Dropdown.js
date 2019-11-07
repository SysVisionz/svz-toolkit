import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from './svz-utilities';
import './scss/Dropdown.scss';

class Dropdown extends Component {

	constructor(){
		super();
		this.openButton = React.createRef();
		this.contentDiv = React.createRef();
		this.containerDiv = React.createRef();
		this.state = {open: false, transitioning: false}
		this.id=Math.round(Math.random()*1000);
	}
	
	popStyling = () => {
		const {open} = this.state;
		const {transition = (this.props.slideIn ? 400 : 0), fadeIn, slideIn, drop, pop} = this.props;
		const horizontal = {
			drop: drop === 'left' || drop === 'right',
			pop: pop === 'left' || pop ==='right'
		}
		let style = {
			width: (open || !horizontal.pop) && this.contentDiv.current ? this.contentDiv.current.scrollWidth : 0,
			height: (open || horizontal.pop) && this.contentDiv.current ? this.contentDiv.current.scrollHeight: 0,
		}
		return style;
	}

	toggleMenu = open => {
		const {onToggle, onOpen, onClose, transition = (this.props.slideIn ? 400 : 0) } = this.props;
		if (onToggle){
			onToggle(open);
		}
		if (open){
			document.addEventListener('click', this.clickOutside)
			clearTimeout(this.openDelay)
			if (onOpen){
				onOpen();
			}
		}
		if (!open){
			document.removeEventListener('click', this.clickOutside);
			if(onClose){
				onClose();
			}
		}
		this.setState({open, transitioning: true})
		clearTimeout(this.transitionTimer);
		this.transitionTimer = setTimeout(() => this.setState({transitioning: false}), transition)
	}

	componentDidUpdate = (prevProps, prevState) => {
		const {open = this.state.open} = this.props;
		if (this.state.open !== open){
			this.toggleMenu(open);
		}
	}

	componentDidMount(){
		const {toggleMenu} = this;
		toggleMenu(this.props.open);
	}

	clickOutside = () => {
		setTimeout(() => {
			if (this.clickedMenu){
				this.clickedMenu = false;
			}
			else {
				this.toggleMenu(false);
			}
		}, 5)
	}

	onChange = retval => {
		const {onChange, keepOpen} = this.props;
		if (!keepOpen){
			this.toggleMenu(false);
		}
		return onChange ? onChange(retval) : null;
	}

	buildButton = () => {
		const {props, state, toggleMenu} = this;
		const {children} = props;
		const {open} = state;
		return (<div ref={this.openButton} className={ filterJoin(["svz-dropdown-button", props.buttonClass]) } onClick={() => toggleMenu(!open)}>{children}</div>)
	}

	buildMenu = () => {
		const {props, onChange} = this;
		const {content, reverse} = props;
		const elements = [];
		for (const i in content){
			const elem = <div 
				key= {"svz-dropdown-list-elem-"+this.id +i} 
				onClick={() => onChange(React.isValidElement(content[i]) ? i : content[i])}
				className={'svz-dropdown-list-elem'}
			>
				{content[i]}
			</div>
			reverse ? elements.splice(0, 0, elem) : elements.push(elem);
		}
		return elements;
	}

	menuClass = () => {
		const {open, transitioning} = this.state;
		const {menuClass, drop = 'down', orientation, slideIn, fadeIn, pop = drop} = this.props;
		return filterJoin(["svz-dropdown-menu", 'drop-' + drop, 'pop-' + pop, ['orient-' + orientation, orientation], ['active', open], ['transitioning', transitioning], ['slide-in', slideIn], ['fade-in', fadeIn], menuClass])
	}

	render(){
		const {state, props, buildButton, buildMenu, popStyling} = this;
		const {open} = state;
		const menuStyle = popStyling();
		return (
			<div className={filterJoin(["svz-dropdown-container", props.className, ['active', open]])}>
				<div className="svz-dropdown-sub-container" >
					{buildButton()}
					<div 
						ref={this.containerDiv} 
						style={menuStyle} 
						className={this.menuClass()}
						onClick = {() => this.clickedMenu = props.keepOpen ? true : false} 
					>
						<div 
							className={'menu-content'}
							ref={this.contentDiv} 
						>
							{buildMenu()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dropdown.propTypes={
	onChange: PropTypes.func,
	options: PropTypes.array,
	orientation: PropTypes.string,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	pop: PropTypes.string,
	drop: PropTypes.string,
	fade: PropTypes.bool,
	slide: PropTypes.bool,
}

export {Dropdown}