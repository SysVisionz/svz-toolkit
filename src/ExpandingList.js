import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from './svz-utilities'

class ExpandingList extends Component{
	constructor (props){
		super();
		const {open = false} = props;
		this.state={
			open
		}
		this.containerRef = React.createRef();
		this.contentRef = React.createRef();		
	}

	getFullHeight = targ => targ.clientHeight+Number.parseInt(window.getComputedStyle(targ).marginTop)+Number.parseInt(window.getComputedStyle(targ).marginBottom)

	componentDidUpdate(prevProps, prevState){
		const {contentRef, props, getFullHeight} = this;
		const {open} = props;
		if(prevProps.open !== open && open !== this.state.open){
			this.setState({open})
		}
		if(prevState.open !== this.state.open){
			this.setState({height: this.state.open ? getFullHeight(contentRef.current) + 'px' : 0})
		}
	}

	toggle = open => {
		if (this.props.onToggle){
			this.props.onToggle(open)
		}
		this.setState({open})
	}

	render() {
		const {open, height} = this.state;
		const {label, content} = this.props;
		return (
			<div className="svz-es-full-container">
				<div onClick ={() => this.toggle(!open)} className="svz-es-activate-row">
					{typeof label === 'string' ? <h4>{label}</h4> : label}
				</div>
				<div style={{height}} className={filterJoin(["svz-es-container", ['active', open]])}>
					<div ref={this.contentRef} className="svz-es-content">
						{content.map((elem, index) => <div className="svz-es-element">{elem}</div>)}
					</div>
				</div>
			</div>
		)
	}
}

ExpandingList.propTypes = {
	open: PropTypes.bool,
	content: PropTypes.array
}

export {ExpandingList}