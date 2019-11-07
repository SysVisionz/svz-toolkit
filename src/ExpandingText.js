import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Button} from './Button';
import './scss/ExpandingText.scss';

const ExpandingTextNoSubmit = props => {
	const {value, onChange, maxHeight, placeholder} = props;
	return (
		<div className="svz-expanding-text">
			<textarea
				value={value}
				placeholder={placeholder}
				onChange={evt => {
					if (onChange){
						onChange(evt.target.value);
					}
					const texts=evt.target.parentNode.getElementsByTagName('textarea');
					const style = window.getComputedStyle(texts[0]);
					texts[1].style.width = style.width
					if (texts[1].scrollHeight > maxHeight){
						texts[0].style.height=maxHeight+"px";
					}
					else if (texts[0].clientHeight !== texts[1].scrollHeight){
						texts[0].style.height=(texts[1].scrollHeight+Number.parseFloat(style.fontSize))+"px";
					}
				}}
			/>
			<textarea
				value={value}
				readOnly
				className="sizer-text-area"
			/> 
		</div>
	)
}

class ExpandingTextWithSubmit extends Component {
	constructor(props){
		super()
		this.state={
			value: props.value
		}
	}

	handleChange = value => {
		if (this.props.onChange){
			this.props.onChange(value)
		}
		this.setState({value})
	}

	render() {
		const {minHeight, maxHeight, placeholder, onCancel, onSubmit, editButton} = this.props
		return (
		<div>
			<ExpandingTextNoSubmit 
				value={this.state.value} 
				onChange={value => this.handleChange(value)} 
				minHeight={minHeight} 
				maxHeight={maxHeight} 
				placeholder={placeholder}
			/>
			<Button onClick={() => onSubmit(this.state.value)}>{editButton || 'Submit'}</Button>
			{onCancel ? <Button onClick={() => onCancel()}>Cancel</Button> : null}
		</div>
		)
	}
}

// This delineation is to prevent unnecessarily creating a component with a state, which you don't need for the expanding text that doesn't have a submit function.
// While I could make this a stateless element, an expanding text component without a submit function could easily be used for that purpose (as is evident here).
const ExpandingText = props => props.onSubmit ? <ExpandingTextWithSubmit {...props} /> : <ExpandingTextNoSubmit {...props} /> 

ExpandingText.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	placeHolder: PropTypes.string
};

export {ExpandingText};