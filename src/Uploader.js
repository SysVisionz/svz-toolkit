import React from 'react'
import PropTypes from 'prop-types';

const Uploader = props => {
	const {onSubmit, submitButton} = props;
	const selectFunc = evt => {
		const file=evt.target.value;
		return file;
	}
	return (
		<form onSubmit={onSubmit} className="svz-uploader" >
			<input type="file" onChange={selectFunc} />
			<input className = {submitButton ? '' : "hidden" } type="submit" />
		</form>
	)
}

Uploader.propTypes = {
	onSubmit: PropTypes.func,
	onChange: PropTypes.func,
	submitButton: PropTypes.bool
}

export {Uploader}