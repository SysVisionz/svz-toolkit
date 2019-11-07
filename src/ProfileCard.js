import React from 'react'
import PropTypes from 'prop-types';
import './scss/ProfileCard.scss';

function getAge(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor( (utc2 - utc1) / 31556952000 );
}

const ProfileCard = props => {
	const {birthdate, title, details, picture, name} = props;
	const age = birthdate ? getAge(birthdate, new Date()) : null;
	return (
		<div className="profile-card">
			<div className="profile-picture">
				<img alt={name + "-picture"} src={picture} className="full-img" />
			</div>
			<div className="profile-text">
				<h2>{name}</h2>
				<div className="profile-stats-div">
					{title || age 
						? <><div>
							{title ? <h3>Position:</h3> : null}
							{age ? <h3>Age:</h3> : null}
						</div>
						<div>
							{title ? <h3>{title}</h3> : null }
							{age ? <h3>{age}</h3> : null}
						</div></>
						: 	null
					}
				</div>
				<p>{details}</p>
			</div>
		</div>
	)
}

ProfileCard.propTypes = {
	birthdate: PropTypes.object,
	details: PropTypes.string,
	name: PropTypes.string,

};

export {ProfileCard};