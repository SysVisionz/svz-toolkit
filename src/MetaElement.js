import React, {useState} from 'react'
import PropTypes from 'prop-types';
import urlMedata from './url-metadata'

const MetaElement = props => {
	const [url, setUrl] = useState(props.url)
	const [data, setData] = useState({})
	if (url !== props.url){
		setUrl(props.url)
		urlMetadata(url).then( data => {
			const {image=data["og:image"], title=data["og:title"],  description=data["og:description"]} = data;
			setData({
				title,
				image,
				description
			})
		})
	}
	return (
		<div className="svz-meta-element">
			<div className="title-container">
				<h2>{data.title}</h2>
			</div>
			<div>
				{data.image ? <a href={url}><div className="meta-image-container"><img className="full-img" src={data.src} /></div></a> : null}
				<div className="meta-description-container">{data.description}</div>
			</div>
		</div>
	)
}

MetaElement.propTypes = {
	url: propTypes.string
};

export {MetaElement};