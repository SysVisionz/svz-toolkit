import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Button} from './Button';
import {filterJoin} from './svz-utilities';
import './scss/TagsPicker.scss';

const TagsPicker = props => {
	const {list, active, onSubmit, onChange} = props;
	const [tags, editTags] = useState( active || [])
	const toggleTag = tag => {
		const editing = {...tags};
		if (editing.contains(tag)){
			editing.splice(editing.indexOf(tag), 1);
		}
		else {
			editing.push(tag);
		}
		if (onChange){
			onChange(editing)
		}
		editTags(editing);
	}
	return (
		<div className={filterJoin(["svz-tags-picker", props.className])}>
			<div>
				{list.map( tag =><Button 
					className={filterJoin(['tag', ['active', tags.contains(tag)]])} 
					onClick={tag => toggleTag(tag)}
				>
					{tag}
				</Button>)}
			</div>
			<div>
				{onSubmit ? <Button onClick={onSubmit(tags)}>Submit Tags</Button> : null}
			</div>
		</div>
	)
}

TagsPicker.propTypes = {
	list: PropTypes.array,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func
};

export {TagsPicker};