import React from 'react'
import PropTypes from 'prop-types';
import {alterClass} from './svz-utilities'

class ScreenManager extends React.Component  {

	constructor(props){
		super()
		this.state = {
			offset: props.offset ? {x: props.offset.x || 0, y: props.offset.y || 0} : {x: 0, y: 0},
			resizeListeners: [],
			scrollListeners: [],
			smoothed: false,
			scrolling: {x: false, y: false},
		}
		window.addEventListener('scroll', evt => this.triggerCallbacks('scroll', evt))
		window.addEventListener('resize', evt => this.triggerCallbacks('resize', evt))
		this.scrollTimer = {}
	}

	triggerCallbacks = (type, evt) => {
		let listeners;
		switch(type){
			case 'scroll':
				listeners = this.state.scrollListeners;
				break;
			case 'resize':
				listeners = this.state.resizeListeners;
				break;
		}
		for (const i in listeners){
			listeners[i](evt);
		}
	}

	trigger = (type, evt) => {
		let delay;
		let setDelay;
		let inDelay;
		switch(type){
			case 'scroll':
				delay = this.props.scrollCallbackDelay || 10;
				setDelay = val => this.setState({inScrollDelay: val});
				inDelay = this.state.inScrollDelay;
				break;
			case 'resize':
				delay = this.props.resizeCallbackDelay || 10
				setDelay = val => this.setState({inResizeDelay: val});
				inDelay = this.state.inResizeDelay;
				break;
		}
		if (!inDelay){
			this.triggerCallbacks(type, evt);
			setDelay(true);
			setTimeout(() => {
				setDelay(false);
				this.triggerCallbacks(type, evt);
			}, delay)
		}
	}

	endScroll = (all=true, isY = true) => {
		const {scrolling} = this.state;
		if (isY && !all){
			clearTimeout(this.scrollTimer.y);
			this.setState({scrolling: {...scrolling, y: false}});
		}
		else if (all){
			this.setState({scrolling: {x: false, y: false}}) ;
			clearTimeout(this.scrollTimer.y);
			clearTimeout(this.scrollTimer.x);
		}
		else {
			clearTimeout(this.scrollTimer.x);
		}
		clearTimeout(this.clickStop);
		if (!scrolling.x && !scrolling.y){
			window.removeEventListener('wheel', this.endScroll)
			document.removeEventListener('keydown', this.checkScrollKey)
			document.removeEventListener('click', this.endScroll)
		}
	}

	checkScrollKey = e => {
		if (e.keyCode > 36 && e.keyCode < 41){
			this.endScroll();
		}
	}

	handleWheel = e => {
		e.preventDefault();
		const direction = {x: Number.isPositive(e.deltaX), y: Number.isPositive(e.deltaY)};
		this.scrollBy(direction);
	}

	smooth = val => {
		if (val) {
			if (!this.state.smoothed){
				document.addEventListener('wheel', this.handleWheel, {passive: false})
				this.setState({smoothed : true})
			}
		}
		else {
			document.removeEventListener('wheel', this.handleWheel)
		}
	}

	addListener = (type, callback) => {
		let listeners;
		let delay;
		switch(type){
			case 'resize':
				listeners = this.state.resizeListeners;
				delay = this.state.inResizeDelay;
			case 'scroll':
				listeners = this.state.scrollListeners;
				delay = this.state.inScrollDelay;
		}
		if (!listeners.includes(callback)){
			this.setState(() => {
				switch(type){
					case 'resize':
						return {resizeListeners: listeners.concat(callback)}
					case 'scroll':
						return {scrollListeners: listeners.concat(callback)};
				}
			});
		}
	}

	removeListener = (type, callback) => {
		switch(type){
			case 'resize':
				listeners = resizeListeners;
			case 'scroll':
				listeners = scrollListeners;
		}
		for (const i in listeners){
			if (listeners[i] === callback){
				listeners.splice(i, 1);
			}
		}
		this.setState(() => {
			switch(type){
				case 'resize':
					return {resizeListeners: listeners}
				case 'scroll': 
					return {scrollListeners: listeners}
			}
		})
	}

	componentDidMount(){
		this.scrollTarget= {x: window.pageXOffset, y: window.pageYOffset}
	}

	setScrollTo = (vals) => {
		const max = {x: Number.confine(document.body.scrollWidth - window.innerWidth, null, 0), y: Number.confine(document.body.scrollHeight - window.innerHeight, null, 0)}
		this.scrollTarget= {x: Number.confine(vals.x, max.x, 0), y: Number.confine(vals.y, max.y, 0)}
	}

	scrollBy = vals => {
		vals.x = Number.isPositive(vals.x)*100;
		vals.y = Number.isPositive(vals.y)*100;
		const {x = window.scrollX, y = window.scrollY} = this.scrollTarget
		this.setScrollTo({x: x + vals.x, y: y + vals.y})
		this.scrollTowards();
		this.scrollTowards(false);
	}

	scrollTowards = (isY = true) => {
		const target = isY ? this.scrollTarget.y : this.scrollTarget.x;
		const distance = target - (isY ? window.scrollY : window.scrollX);
		const toScroll = Number.confine(Number.calcAdditive(distance), 40)*Number.isPositive(distance);
		window.scrollBy((isY ? 0 : toScroll), (isY ? toScroll : 0))
		if (Math.abs(toScroll) > 3){
			clearTimeout(this.scrollTimer[isY ? 'y' : 'x'])
			this.scrollTimer[isY ? 'y' : 'x'] = setTimeout(() => this.scrollTowards(isY), 10);
		}
		else {
			this.endScroll(false, isY ? true : false)
		}
	}

	location = value => {
		document.addEventListener('keydown', this.checkScrollKey);
		window.addEventListener('wheel', this.endScroll);
		this.clickStop = setTimeout(() => document.addEventListener('click', this.endScroll), 500)
		let targ;
		if (typeof value === 'object'){
			if (value.getBoundingClientRect){
				const x = document.body.scrollWidth === window.scrollX + document.body.clientWidth ? 0 : value.getBoundingClientRect().left + value.clientWidth / 2 - window.innerWidth + this.state.offset.x;
				const y = value.getBoundingClientRect().top + window.scrollY + this.state.offset.y;
				targ = {y, x}
			}
			else {
				targ = {y: (value.y ? value.y : value[0]), x: (value.x ? value.x : value[1])};
			}
		}
		else {
			targ = {y: value + this.state.offset.y, x: window.pageXOffset};
		}
		const xdiff = Math.abs(window.pageXOffset - targ.x)
		const ydiff = Math.abs(window.pageYOffset - targ.y);
		if (Number.calcAdditive(xdiff) > 3 || Number.calcAdditive(ydiff) > 3){
			this.scrolling = {x: true, y: true};
			this.gentleScroll(targ.y, targ.x);
		}
	}

	gentleScroll(y, x = window.scrollX) {
		this.setScrollTo({y, x});
		this.scrollTowards()
		this.scrollTowards(false);
	}

	reset = () => {
		const {x, y} = this.state.lockedTo;
		window.scrollTo(x, y)
	}

	lock = (value) =>  {
		if (!value){
			this.setState({lockedTo: {x: false, y: false}})
			document.removeEventListener('scroll', this.resetter);
			alterClass(document.body, 'svz-locked', true)
		}
		else{
			setTimeout(() => {
				this.setState({lockedTo: {x: window.pageXOffset, y: window.pageYOffset}})
				document.addEventListener('scroll', this.resetter);
				alterClass(document.body, 'svz-locked');
			},50);
		}
		this.setState({locked: value});
	}

	render(){
		const props = {smoothed: this.state.smoothed, screenLock: this.lock, scrollToward: this.location, smoothScrolling: this.smooth, addListener: this.addListener, screenLocked: this.state.locked}
		return React.cloneElement(this.props.children, {...props})
	}
}

export {ScreenManager};