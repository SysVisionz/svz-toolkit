import React from 'react'
import PropTypes from 'prop-types';
import {Slideshow} from './Slideshow';
import {filterJoin} from './svz-utilities'
import './scss/CompareSlideshow.scss';

const Slide = props => {
	return (
		<div className="svz-slide" style={props.style}>
			<img className="full-img" alt="svz-slide" src={props.src} onLoad={props.onLoad} />
		</div>
	)
}

Slide.propTypes = {
	style: PropTypes.object,
	src: PropTypes.string,
	onLoad: PropTypes.func,
};

const SlidePair = props => {
	const {index, slides, style, onLoad, className} = props;
	return (
		<div className={className} style={style}>
			<Slide src={slides[0]} onLoad = {() => onLoad(index, 0)} />
			<Slide src={slides[1]} onLoad = {() => onLoad(index, 1)} />
		</div>
	)
}

SlidePair.propTypes = {
	index: PropTypes.string,
	slides: PropTypes.array,
	style: PropTypes.object,
};

const Slider = props => {
	if (props.value < props.min){
		props.onChange(props.min);
	}
	if (props.value > props.max){
		props.onChange(props.max);
	}
	const labels = [];
	for (const label of props.labels){
		labels.push(<h4>{label}</h4>)
	}
	return (
		<div className="svz-slider" style={{width: props.width}}>
			<input value={props.value} type="range" list="tickmarks" min={props.min} max={props.max} onChange={evt => props.onChange(evt.target.value)}/>
			<div className="svz-range-labels">
				{labels}
			</div>
		</div>
	)
}

Slider.propTypes = {
	labels: PropTypes.array,
	onChange: PropTypes.func,
	min: PropTypes.number,
	max: PropTypes.number
};

class CompareSlideshow extends Slideshow {
	
	constructor(props) {
		super(props);
		const slides = Array(props.slideshow.length);
		slides[0] = {images: props.slideshow[0], loaded: 2};
		this.state = {
			index: 0,
			slides,
			id: Math.round(Math.random()*1000)
		}
	}

	imageLoad = (index) => {
		const {state, props} = this;
		const {slides} = state;
		const {slideshow} = props;
		slides[index].loaded--;
		if (slides[0].loaded === 0){
			this.setState({ready: true})
			switch (slideshow.length){
				case 1: 
					break;
				case 2:
					if (!slides[1]){
						slides[1] = {images: slideshow[1], loaded: 2}
					}
					break;
				case 3:
					if (!slides[1] || !slides[2]) {
						slides[1] = {images: slideshow[1], loaded: 2}
						slides[2] = {images: slideshow[2], loaded: 2}
					}
					break;
				default:
					if (slides[1] && slides[2] && slides[1].loaded === 0 && slides[2].loaded === 0 && slides.includes(undefined)){
						for (let i = 2; i < slides.length; i++){
							if (!slides[i]){
								slides[i] = {images: slideshow[i], loaded: 2}
							}
						}
					}
					else if (!slides[1] || !slides[2]) {
						slides[1] = {images: slideshow[1], loaded: 2}
						slides[2] = {images: slideshow[2], loaded: 2}
					}
			}
		}
		this.setState({slides});
	}

	render() {
		const {arrow, imageLoad} = this;
		const {vertical} = this.props;
		const {slides,index, id} = this.state;
		const show = Array(slides.length);
		for (const i in slides) {
			const active = Number.parseInt(i) === index;
			show[i] = slides[i].images ? (
				<div key={'slidepair'+i+id} className={filterJoin(['svz-cs-slide', ['active', active], ['vertical', vertical]])}>
					<SlidePair className="svz-cs-slides" onLoad={imageLoad} index={i} slides = {slides[i].images} />
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

CompareSlideshow.propTypes = {
	slideWidth: PropTypes.number,
	slideHeight: PropTypes.number,
	slideshow: PropTypes.array,
	interval: PropTypes.number,
}

export {CompareSlideshow}
