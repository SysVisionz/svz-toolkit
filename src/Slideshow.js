import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from './svz-utilities';
import './scss/Slideshow.scss';

class Slideshow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			id: Math.round(Math.random()*1000)
		}
	}

	componentWillUnmount(){
		clearTimeout(this.nextTimer);
	}

	componentDidUpdate(prevProps){
		if (this.props.on !== prevProps.on){
			if(this.props.on) {
				this.next()
			}
			else {
				clearTimeout(this.nextTimer);
				delete this.nextTimer
			}
		}
	}

	componentDidMount(){
		const {on = true} = this.props;
		if (on){
			this.next();
		}
	}

	next = (direction=1) => {
		const {state, resetRange, props} = this;
		const {transitionTime = 400, interval = 5000, slideshow, on = true} = props;
		let index= Number.parseInt(state.index);
		if (this.nextTimer && on){
			clearTimeout(this.nextTimer)
			index = resetRange(state.index, slideshow.length, direction);
			this.setState({index, fading: true});
			setTimeout(() => this.setState({fading: false}), transitionTime);
			this.nextTimer = setTimeout(() => this.next(), transitionTime + interval);
		}
		else{
			this.nextTimer = setTimeout(() => this.next(), transitionTime + interval);
		}
	}

	resetRange = (current, max, direction) => {
		current=Number.parseInt(current);
		current+=direction;
		if (current >= max){
			current = 0;
		}
		else if (current < 0){
			current = max-1;
		}
		return current;
	}

	arrow = direction => {
		const {fading, ready} = this.state;
		const {noArrows, arrowType} = this.props;
		if (noArrows){
			return null;
		}
		let content;
		// should arrow point right, value "point" is true
		const point = direction > 0
		switch(arrowType) {
			case 'fatArrow':
				content= point ? <div>&#8658;</div> : <div>&#8656;</div>;
				break;
			case 'fromBar':
				content=point ? <div>&#8614;</div> : <div>&#8612;</div>;
				break;
			case 'swoop':
				content= point ? <div>&#8618;</div> : <div>&#8617;</div>;
				break; 
			case 'thinArrow':
				content= point ? <div>&#8594;</div> : <div>&#8592;</div>;
				break;
			case 'doublePointer':
				content= point ? <div>&#187;</div> : <div>&#171;</div>;
				break;
			case 'thinPointer':
				content= point ? <div>&#62;</div> : <div>&#60;</div>;
				break;
			default: 
				content = point ? <div>&#8250;</div> : <div>&#8249;</div>;
		}
		return (
			<div 
				className = {"svz-cs-arrow-button" + (!fading && ready ? ' active' : '') + (direction > 0 ? ' right-arrow' : '')}
				onClick={() => this.next(direction)} 
				style={this.props.arrowStyle}
			>
				{content}
			</div>
		)
	}

	render() {
		const {arrow, props, state} = this;
		const {vertical, slideshow} = props;
		const {index, id} = state;
		const show = Array(slideshow.length);
		for (const i in slideshow) {
			const active = Number.parseInt(i) === index;
			show[i] = slideshow[i] ? (
				<div key={'slide'+i+id} className={filterJoin(["svz-cs-slide", ['active', active], ['vertical', vertical]])} >
					{slideshow[i]}
				</div>
			) : null;
		}
		return (
			<div className= "svz-cs-container" style={this.props.style} >
				{arrow(-1)}
				{show}
				{arrow(1)}
			</div>
		)
	}
}

Slideshow.propTypes = {
	slideWidth: PropTypes.number,
	slideHeight: PropTypes.number,
	slideshow: PropTypes.array,
	interval: PropTypes.number,
}

export {Slideshow}
