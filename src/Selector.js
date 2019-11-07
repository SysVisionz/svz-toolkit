import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Button} from './Button';
import {Dropdown} from './Dropdown';

class Selector extends Component{
	constructor (props){
		super()
		this.state = {
			selection: props.label,
		}
	}
	onChange = selection => {
		this.setState({selection})
		if (this.props.onChange){
			this.props.onChange(selection);
		}
	}
	componentDidUpdate(){
		const {selection = this.state.selection, label} = this.props;
		if (selection !== this.state.selection && selection !== label){
			this.setState({selection});
		}
	}
	render(){ 
		return (
			<Dropdown 
				content={this.props.options} 
				onChange={i => this.onChange(i)}
				slideIn
			>
				<Button>{this.state.selection}</Button>
			</Dropdown>
		)
	}
}

export {Selector}
