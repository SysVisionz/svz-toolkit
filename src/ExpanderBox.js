import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {filterJoin} from './svz-utilities';
import {Button} from './Button';
import './scss/ExpanderBox.scss';

class ExpanderBox extends Component{
	constructor(){
		super()
		this.state={
			selection: null,
		}
	}

	select = selection => {
		const {onClose, onOpen, onChange} = this.props;
		if (!selection && onClose){
			onClose(this.state.selection)
		}
		if (selection && onOpen){
			onOpen(selection)
		}
		if (onChange){
			onChange(selection);
		}
		this.setState({selection});
	}

	render(){
		const {props, state, select} = this;
		const {content, column, closeButton = <div>X</div>, clickIcon} = props;
		const {selection} = state;
		const retval = [];
		for (const i in content){
			retval.push(
				<div 
					className={ filterJoin(["svz-eb-elem", ['all', selection === null], ['inactive', selection !== i]])} 
					key={"svz-eb-content-" + i}
					onClick={() => {
						if (selection !== i)
							{
								select(i)
							}
						}
					} 
				>
					<div className="svz-eb-content">
						{content[i].label ? content[i].elem : content[i]}
					</div>
					<div onClick={() => select(null)} className="svz-eb-close button">
						{closeButton}
					</div>
					{content[i].label ? (
						<div className="svz-eb-overlay-container">
							<div className="svz-eb-elem-overlay" >
								<h2>{content[i].label}</h2>
								{content[i].date ? <h3>{content[i].date}</h3> : null}
							</div>
							{
								clickIcon ? (
									<div className="svz-eb-icon-container">{clickIcon}</div>
								) : null
							}
						</div>
						)
						: null
					}
				</div>
			)
		}
		return (
			<div className={filterJoin(["svz-eb-container", ['column', column]])}>
				{retval}
			</div>
		)
	}
}

ExpanderBox.propTypes = {
	content: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.element])),
	column: PropTypes.bool,
	closeButton: PropTypes.element,
	onChange: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func
};

export {ExpanderBox};