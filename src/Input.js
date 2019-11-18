import React, {Component} from 'react'
import PropTypes from 'prop-types';
import ReactHTMLParser from 'react-html-parser';
import {filterJoin} from './svz-utilities';
import {Button} from './Button';
import './scss/ExpandingText.scss';

const InputNoSubmit = props => {
	const checkedOrValue = evt => props.onChange ? props.onChange (props.type === 'radio' || props.type === 'checkbox' ? evt.target.checked : evt.target.value) : null
	return (
		<div className={props.className}>
			{props.label}{props.label ? <br/> : null}
			<input 
				type={props.type} 
				checked={props.checked} 
				value={props.value} 
				onChange={checkedOrValue} 
				name={props.name} 
				placeholder={props.placeholder} 
				autoComplete={props.autoComplete}/>
		</div>
	)
}

InputNoSubmit.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	name: PropTypes.string,
	placeholder: PropTypes.string
};

class InputWithSubmit extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			value : props.value,
			active : props.active || false,
		}
		this.ctrlDown = false;
		this.refs = {
			spacer: React.createRef(),
			text: React.createRef()
		}
		this.textID = "svz-input-switcher-text-" + Math.ceil(Math.random()*1000);
	}

	componentDidUpdate(){
		const {prevLength, minHeight, width, value} = this.state;
		const {active} = this.props;
		const spacer = this.refs.spacer ? this.refs.spacer.current : null;
		const text = this.refs.text ? this.refs.text.current : null;
		if (text && spacer){
			if (!minHeight || !width ){
				this.setState({minHeight: text.offsetHeight, width: text.offsetWidth});
			}
			if (text.scrollHeight > text.clientHeight){
				text.style.height = text.scrollHeight + 'px';
			}
			else if(prevLength > value.replace(/\n/g, ".").length){
				if (text.scrollHeight > spacer.scrollHeight){
					text.style.height=spacer.scrollHeight + "px";
				}
			}
			if(prevLength !== value.replace(/\n/g, ".").length){
				this.setState({prevLength: value ? value.replace(/\n/g, '.').length : 0});
			}
		}
		if (this.state.active !== active){
			this.setState({active});
		}
	}

	onChangeVal = evt => {
		this.setState({value: evt.target.value})
		if (this.props.onChange){
			this.props.onChange(evt.target.value);
		}
	}

	handleSubmit = () => {
		const {enterPress, ctrlPress, ctrlUp, props, state} = this;
		const {clear, box, onSubmit, active = false} = props;
		const {value} = state;
		this.setState({active});
		if (onSubmit){
			if (box){
				onSubmit(value.replace(/\n/g, "<br>"));
				if(!active){
					document.removeEventListener('keydown', enterPress);
					document.removeEventListener('keydown', ctrlPress);
					document.removeEventListener('keyup', ctrlUp);
				}
				this.ctrlDown = false;
			}
			else{
				onSubmit(value)
				if(!active){
					document.removeEventListener('keydown', enterPress)
				}
			}

		}
		if (clear) {
			this.setState({value:''});
		}
	}

	ctrlPress = evt => {
		if (evt.keyCode === 17){
			this.ctrlDown = true;
		}
	}

	ctrlUp = evt => {
		if (evt.keyCode === 17){
			this.ctrlDown = false;
		}
	}

	handleEdit = () => {
		const {onEditClick} = this.props;
		this.setState({active: true});
		if (onEditClick){
			onEditClick();
		}
	}

	handleClose = () => {
		this.setState({active: false, value: this.props.clear ? '' : this.props.value});
		if (this.props.close) {
			this.props.close(this.props.value)
		}
	}

	enterPress = evt => {
		if (this.props.box){
			if (evt.keyCode === 13 && this.ctrlDown){
				evt.preventDefault();
				this.handleSubmit();
			}
		}
		else if(evt.keyCode === 13){
			evt.preventDefault();
			this.handleSubmit();
		}
	}

	render() {
		const {handleEdit, props, state, onChangeVal} = this;
		const {id, editButton, clear, label, box, expanding, submitText, className} = props;
		const {value} = state;
		const active = this.props.active !== undefined ? this.props.active : this.state.active;
		const entry = [];
		if (!box){
			entry.push(
				<input
					type='text'
					onFocus={() => {
						document.addEventListener('keydown', this.enterPress);
					}}
					onBlur={() => {
						document.removeEventListener('keydown', this.enterPress);
					}}
					value={value}
					onChange={evt => this.setState({value: evt.target.value})}
				/>
			);
		}
		else {
			entry.push(
				<textarea 
					className={filterJoin([['expanding', expanding]])}
					value={value.replace(/<br>/g, "\n")}
					ref={this.refs.text}
					onFocus={() => {
						document.addEventListener('keydown', this.enterPress);
						document.addEventListener('keydown', this.ctrlPress);
						document.addEventListener('keyup', this.ctrlUp);
					}}
					onBlur={() => {
						document.removeEventListener('keydown', this.enterPress);
						document.removeEventListener('keydown', this.ctrlPress);
						document.removeEventListener('keyup', this.ctrlUp);
					}}
					onChange={onChangeVal}
				/>
			)
			if (expanding){
				entry.push(<textarea
					ref={this.refs.spacer}
					className='expanding-sizer'
					style={{width: this.state.width + 'px'}}
					value={value.replace(/<br>/g, "\n")}
				/>
				)
			}
		}
		if ( active )  {
			return (
				<div id={id} className = {'svz-input-switcher' + (className ? ' ' + className : '')}>
					{entry}
					<div className = "submit-buttons-div">
						<Button
							className={filterJoin([['hidden', box]])}
							onClick ={() => this.handleSubmit()}
						>{submitText || 'Submit'}
						</Button>
						<Button className='svz-x-button' onClick={this.handleClose}>x</Button>
					</div>
				</div>
			)
		}
		else {
			return (
				<div id={id} className={filterJoin(["svz-input-switcher", ['title-type', label], className])}>
					{clear ? '' : (<span>{ReactHTMLParser(value)}</span>)}
					<div className = "submit-buttons-div">
						<Button onClick={() => handleEdit()}>{editButton || 'Edit'}</Button>
					</div>
				</div>
			)
		}
	}
}

InputWithSubmit.propTypes = {
	editButton: PropTypes.string,
	onEditClick: PropTypes.func,
	onSubmit: PropTypes.func,
	clear: PropTypes.bool,
	active: PropTypes.bool,
	id: PropTypes.string,
	value: PropTypes.string,
	close: PropTypes.func,
	label: PropTypes.bool,
}

// This delineation is to prevent unnecessarily creating a component with a state, which you don't need for Inputs that don't have a submit function.
// A stateless Input is far less complicated, to be sure, but the one with a state does take care of a lot of the heavy lifting for you, for its purpose.
// Note that a non-stateless Input is only usable as a text input, as ExpandingText should be used for textareas, and a submit button on other types of inputs
// would be highly redundant.
const Input = props => props.onSubmit ? <InputWithSubmit {...props} /> : <InputNoSubmit {...props} /> 

export {Input};