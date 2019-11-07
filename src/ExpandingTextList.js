import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Input} from './Input';
import {Button} from './Button';

class ExpandingTextList extends Component {
	
	constructor(props) {
		super(props)
		this.identifier = this.props.name ? this.props.name.replace(/[' ']/g, '-').replace(/[^A-z-]/g, '') : 'svz-text-list' + Math.ceil(Math.random()*1000);
	}

	submitFunc = value => {
		let {items} = this.props;
		if (!items){
			items =[];
		}
		items.push(value);
		this.props.onSubmit(items);
	}

	editFunc = (index, value) => {
		let {items} = this.props;
		items[index] = value;
		this.props.onSubmit(items);
	}

	renderList = () => {
		let {identifier, props} = this;
		let {items, name} = props;
		let retval = [];
	    for (const i in items){
	      const tag = identifier + '-' + i
	      retval.push(
	        <div
	          key={tag}
	        >
	          <Input
		          value={items[i]}
		          onSubmit={value => this.editFunc(i, value)}
		          editButton={"Edit" + (name ? ' ' + name : '')}
	          />
	          <div>
		          {this.props.canDelete ? 
		          	(
		          		<Button onClick={() => {
			          		items.splice(i, 1);
			          		this.props.onSubmit(items);
			        	}}>Delete{name ? ' ' + name : ''}</Button>
			        ) : ''}
	          </div>
	        </div>
	      );
	    }
	    retval.push(
	      <div
	        key={ identifier + '-new'}
	      >
	        <Input
	          value=''
	          editButton={name ? "Add " + name : "Add Entry"}
	          clear
	          onSubmit={this.submitFunc}
	        />
	      </div>
	    );

	    return retval;
	}

	render() {
		return (
			<div>
				<h3>{this.props.label}</h3>
				{this.renderList()}
			</div>
		)
	}
}

ExpandingTextList.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	editFunc: PropTypes.func,
	items: PropTypes.array,

} 	

export {ExpandingTextList};