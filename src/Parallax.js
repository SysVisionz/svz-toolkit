import React, {useState, Component} from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from './svz-utilities';
import './scss/Parallax.scss';

const Parallax = props => props.slow ? <SlowParallax {...props} /> : <BaseParallax {...props} />;

const BaseParallax = props => {
	const [run, setRun] = useState({x: true, y: true})
	if (run.x !== innerWidth < document.body.scrollWidth || run.y !== innerHeight < document.body.scrollHeight){
		run.x = innerWidth < document.body.scrollWidth
		run.y = innerHeight < document.body.scrollHeight
		setRun(run);
	}
	const {
		src,
		className,
		children,
		id,
		refs
	} = props;
	return <div className="svz-parallax-container">
		<div 
				className='svz-parallax' 
			>
				<div 
					className={filterJoin(["plax-container", ['run-x', run.x], ['run-y', run.y]])}
				>
					<img 
						alt="svz-plax-background"
						src={src}
						className="full-img"
					/>
				</div>
			<div 
				className={filterJoin(["content", className])}
				id={id}
			>
				{children}
			</div>
		</div>
	</div>
}

class SlowParallax extends Component{
	constructor(props){
		super();
		this.imageRef = React.createRef();
		this.containerRef = React.createRef();
		props.smoothScrolling(true);
		this.state = {runCheck : {}}
	}

	componentDidMount(){
		window.addEventListener('scroll', this.updateCheck);
		window.addEventListener('resize', this.updateCheck);
		this.updateCheck();
	}

	componentDidUpdate(){
		this.updateCheck();
	}

	updateCheck = () => {
		const {offsetY, offsetX} = this.props;
		const {runCheck} = this.state;
		if (runCheck === {}){
			runCheck.x = innerWidth < document.body.scrollWidth
			runCheck.y = innerHeight < document.body.scrollHeight
		}
		if (runCheck.x !== innerWidth < document.body.scrollWidth || runCheck.y !== innerHeight < document.body.scrollHeight){
			runCheck.x = innerWidth < document.body.scrollWidth
			runCheck.y = innerHeight < document.body.scrollHeight
			this.setState({runCheck});
		}
		else{
			const {clientHeight, clientWidth}= this.imageRef.current;
			const {x, y} = this.containerRef.current.getBoundingClientRect();
			const doX = x < innerWidth && x > -innerWidth && runCheck.x
			const doY = y < innerHeight && y > -innerHeight && runCheck.y
			if (doX || doY){
				const position = {x: x/innerWidth - 1, y: y/innerHeight-1}
				const difference = {
					x: (this.imageRef.current.clientWidth - this.containerRef.current.clientWidth)/2,
					y: (this.imageRef.current.clientHeight - this.containerRef.current.clientHeight)/2
				}
				if (doX){
					this.imageRef.current.style.left = (position.x*difference.x + (offsetX || 0))+'px';
				}
				if (doY){
					this.imageRef.current.style.top = (difference.y*position.y  + (offsetY || 0))+'px';
				}
			}
		}
	}

	render(){
		const {
			src,
			className,
			children,
			slow,
			id,
		} = this.props;
		const {
			runCheck
		} = this.state;
		return <div className="svz-parallax-container">
			<div 
					className='svz-parallax slow' 
					ref = {this.containerRef}
				>
					<div 
						className={filterJoin(["plax-container slow", ['run-x', runCheck && runCheck.x], ['run-y', runCheck && runCheck.y]])}
						ref={this.imageRef}
					>
						<img 
							alt="svz-plax-background"
							src={src}
							className="full-img"
						/>
					</div>
				<div 
					className={filterJoin(["content", className])}
					id={id}
				>
					{children}
				</div>
			</div>
		</div>
	}

}

export {Parallax};