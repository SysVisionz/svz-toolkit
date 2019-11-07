import React, {Component, useState} from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from './svz-utilities';
import './scss/Parallax.scss';
export class Parallax extends Component {

// props: 
// lockToScreen, bound, boundToBottom, offsetTop, offsetLeft, offsetY, offsetX, slow
// image
// style, imageStyle, contentStyle
// className, contentClass, id
	
	constructor(props) {
		super(props)
		this.ref={container: React.createRef(), image: React.createRef()}
		this.pageTop=0;
		if (this.props.smoothScrolling) {this.props.smoothScrolling(true) };
	}

	ifPercent = (value, toChange) => {
		if (Number.parseFloat(value)){
			if (typeof value == 'string' && value.charAt(value.length-1) === "%") {
				return Number.parseFloat(value)/100*toChange
			}
			return Number.parseFloat(value);
		}
		return 0;
	}

	computeOffset= (offset, shrink, elementVal, elementOffset, screenVal, screenDimension, lockToScreen) => {
		const {ifPercent, computeDimension} = this;
		screenDimension = computeDimension(offset, shrink, screenDimension)
		elementOffset = ifPercent(offset, screenDimension)+ ifPercent(shrink, screenDimension)-elementOffset;
		if (lockToScreen){
			return screenVal;
		}
		if (screenDimension < elementVal) {
			return screenVal+elementOffset+(screenDimension-elementVal)/2;
		}
		return screenVal+elementOffset
	}

	componentDidUpdate(){
		if (window.pageYOffset !== this.pageTop && this.ref.container.current && this.ref.image.current ){
			this.updateVals();
		}
	}

	computeDimension = (offset, shrink, screenDimension) => {
		const {ifPercent} = this;
		return screenDimension - ifPercent(offset, screenDimension) -  ifPercent(shrink, screenDimension) * 2
	}

	updateCheck = () => {
		if (window.pageYOffset !== this.pageTop && this.ref.container.current && this.ref.image.current){
			this.updateVals();
		}
	}

	componentDidMount(){
		window.addEventListener('scroll', this.updateCheck);
		this.updateVals();
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.updateCheck);
	}

	updateVals = () => {
		const {computeOffset, ref} = this;
		const {offsetTop, offsetLeft, offsetY, offsetX, lockToScreen, bound, boundToBottom, slow} = this.props;
		const container = ref.container.current;
		const image = ref.image.current;
		let top;
		let marginLeft;
		image.height = slow ? container.height * 1.5 : container.height;
		if (container && image){
			top = computeOffset(
				offsetTop, 
				offsetY, 
				image.height, 
				container.offsetTop,
				slow ? window.pageYOffset * .75 : window.pageYOffset, 
				offsetX, 
				lockToScreen
			);
			marginLeft = -computeOffset(
				offsetLeft, 
				offsetX, 
				container.offsetLeft,
				window.pageXOffset, 
				0, 
				lockToScreen
			)
			const bottomOfMarker = container.offsetTop+container.clientHeight-window.innerHeight;
			if (bound){
				if (top < container.offsetTop){
					top = container.offsetTop;
				}
				else if (bottomOfMarker < top+image.height && boundToBottom){
					top += bottomOfMarker-top;
				}
			}
			image.style.top = top + "px";
			image.style.marginLeft = marginLeft + "px"; 
			this.pageTop = window.pageYOffset;
		}
	}

	render() {
		const {
			contentStyle, 
			img,
			imgStyle,
			className,
			contentClass, 
			children,
			slow
		} = this.props;
		return (
			<div 
				className={filterJoin(['svz-background-slice', slow, className])} 
				ref={this.ref.container} 
				style={this.props.style}
			><div 
					className="bs-container"
					ref={this.ref.image}
				>
					<img 
					alt="svz-background-slice-background"
					src={img}
					className="full-img"
					/>
				</div>
				<div className={filterJoin(["content", contentClass])} style={contentStyle}>{children}</div>
			</div>
		)
	}
}