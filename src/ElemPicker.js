import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {filterJoin, callbacker} from './svz-utilities'
import './scss/ElemPicker.scss';

class ElemPicker extends Component {
	constructor(props){
		super(props);
		this.id="svz-ep-" + Math.round(Math.random(1000));
		this.state = {
			selection: props.index || 0
		}
		this.contentRef = React.createRef();
		this.contentContainerRef = React.createRef();
	}

	selectNew = index => {
		this.setState({selection: index});
		if (this.props.onChange){
			this.props.onChange(index);
		}
		this.props.scrollToward(this.contentRef.current);
	}

	componentDidUpdate(prevProps){
		if (this.props.selection !== prevProps.selection){
			this.setState({selection: this.props.selection})
		}
		if (this.state.containHeight !== this.contentContainerRef.current.innerHeight){
			this.setState({containHeight: this.contentContainerRef.current.innerHeight})
		}
		if (this.state.containWidth !== this.contentContainerRef.current.innerWidth){
			this.setState({containWidth: this.contentContainerRef.current.innerWidth})
		}
	}

	makeRow = (elems, index) => {
		const pickers = [];
		const {selection} = this.state;
		const {rowLength = 3 } = this.props;
		for (const i in elems){
			const date = elems[i].date ? elems[i].date.toLocaleString('en-us', { month: 'long' }) + ', ' + elems[i].date.getFullYear() : null;
			pickers.push (
				<div 
					key={ (index+i) + "-svz-ep-picker"}
					onClick = {() => this.selectNew(index*rowLength+Number.parseInt(i))}
					className="svz-ep-picker"
				>
					<img alt="picker" className="full-img" src={elems[i].icon} />
					<div className={filterJoin(["svz-ep-picker-overlay", ['active', index*rowLength+Number.parseInt(i) === selection]])}>
						{elems[i].type ? <h4>{elems[i].type}</h4> : null}
						<h3>{elems[i].label}</h3>
						{date ? <h4>{date}</h4> : null}
					</div>
				</div>
			)
		}
		return <div className="svz-ep-picker-row" key={index+"-svz-ep-picker-row"}>{pickers}</div>
	}

	render() {
		const {selection, containHeight, containWidth} =  this.state;
		const {elems, rowLength = 3} = this.props;
		const content=[];
		for (const i in elems){
			content.push(
				<div key={i + "svz-picker-content"} className={filterJoin(["svz-ep-picker-content", ['inactive', Number.parseInt(i) !== selection]])}>
					{elems[i].content}
				</div>
			)
		}
		const pickers = [];
		callbacker(elems, (chosen, index) => pickers.push(this.makeRow(chosen, index)), rowLength)
		return (
			<div className="svz-ep-container" >
				<div className = "svz-ep-selection-container" style={{height: containHeight+"px", width: containWidth+"px"}} ref={this.contentContainerRef}><div className="selection-content" ref={this.contentRef}>{content}</div></div>
				<div className = "svz-ep-picker-container">{pickers}</div>
			</div>
		)
	}
}

ElemPicker.propTypes = {
	elems: PropTypes.array,
	transitionTime: PropTypes.number,
	perRow: PropTypes.number
}

export {ElemPicker};