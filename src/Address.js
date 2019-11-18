import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Input, Button} from './Input';
import {filterJoin} from './svz-utilities';

const AddressWithEdit = props => {
	const [ name, setName ] = useState(props.name);
	const [ street1, setStreet1] = useState(props.street1)
	const [ street2, setStreet2] = useState(props.street2)
	const [ city, setCity ] = useState(props.city)
	const [ state, setState ] = useState(props.state)
	const [ zip, setZip ] = useState(props.zip)
	const [ number, setNumber ] = useState(props.number)
	return (
		<div className="address-container">
			<Input value={name || ""} placeholder="Street Line 1" onSubmit={name => setName(name)}/> <br />
			<Input value={street1 || ""} placeholder="Street Line 1" onSubmit={street1 => setStreet1(street1)}/> <br />
			<Input value={street2 || ""} placeholder="Street Line 2" onSubmit={street2 => setStreet2(street2)}/> <br />
			<Input value={city || "" } placeholder="City" onSubmit={city => setCity(city)}/> <br />
			<Input value={state || ""} placeholder="State" onSubmit={state => setState(state)}/> <br />
			<Input value={zip || ""} placeholder="00000" onSubmit={zip => setZip(zip)}/> <br />
			<Input value={number || ""} placeholder="Phone #" onSubmit={number => setNumber(number)}/> <br />
			<Button onClick={() => props.onSubmit(name, street1, street2, city, state, zip, number)}>Submit Changes</Button>
		</div>
	)
}

const AddressNoEdit = props => {
	const {name, street1, street2, city, state, zip, number, onSubmit} = props
	return (
		<div className="address-container">
			<p>
				<span>{name}</span>
				<span>{street1}</span>
				{street2 ? <span>{street2}</span> : null }
				{city || state || zip ? <span>{filterJoin([city, [', ' + state, state], [', ' + zip, zip]])}</span> : null}
				{props.number ? <span>{props.number}</span> : null}
			</p>
		</div>
	)
}

const Address = props => props.onSubmit ? <AddressWithEdit {...props} /> : <AddressNoEdit {...props} />

Address.propTypes = {
	name: PropTypes.string,
	street1: PropTypes.string,
	street2: PropTypes.string,
	city: PropTypes.string,
	state: PropTypes.string,
	zip: PropTypes.string,
	onSubmit: PropTypes.func
}

export {Address}