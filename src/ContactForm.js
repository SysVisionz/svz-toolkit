import React from 'react'
import PropTypes from 'prop-types';
import {Input} from './Input';
import {filterJoin} from './svz-utilities';
import {ExpandingText} from './ExpandingText';
import {Selector} from './Selector';
import './scss/ContactForm.scss';


const ContactForm = props => {
	const {
		name, 
		business, 
		email, 
		message, 
		onSubmit, 
		onChange, 
		isOrder, 
		budget, 
		error, 
		errorActive,
		street1, 
		street2, 
		city, 
		zip, 
		state,
		types,
	} = props;
	const submitFunc = evt => {
		evt.preventDefault();
		const propsvals = {...props};
		Object.filter(propsvals, elem => typeof elem === 'string' || typeof elem === 'boolean');
		if (onSubmit){
			onSubmit(propsvals);
		}
	}
	return (
		<form onSubmit={submitFunc} className="svz-contact-form">
			<div className="contact-form-content" >
				<div>
					{name !== undefined ? <Input value={name} placeholder="Name*" onChange={name => onChange({name})} name="full-name" /> : null }
					{email !== undefined ? <Input value={email} placeholder="Email*" onChange={email => onChange({email})} name="email" /> : null }
					{business !== undefined ? <Input value={business} placeholder="Business" onChange={business => onChange({business})} name="organization" /> : null }
					{street1 !== undefined ? (
						<div>
							<Input value={street1 ? street1 : ''} placeholder="Address Line 1*" onChange={street1 => onChange({street1})} name="address-line1"/>
							<Input value={street2 ? street2 : ''} placeholder="Line 2*" onChange={street2 => onChange({street2})} name="address-line2"/>
							<Input value={city ? city : ''} placeholder="City*" onChange={city => onChange({city})} name="frmCityS"/>
							{state !== null ? <Input value={state ? state : ''} placeholder="State" onChange={state => onChange({state})} name="frmStateS" /> : null}
							<Input value={zip ? zip : ''} placeholder="Zip*" onChange={zip => onChange({zip})} name="frmZipS" />
						</div>
					) : null }
					{isOrder ? (
							<div>
								{ types !== undefined
									? <Selector 
										options={types} 
										onChange={currentType => onChange({currentType})} 
										label = {'Type of Job'}
									/>
									: null
								}
								<Input 
									value={budget} 
									placeholder={"Your target budget"} 
									onChange={budget => onChange({budget})} 
									name="budget" 
								/>
							</div>
						)
						: null
					}
				</div>
				<div className="contact-message-container" >
					<ExpandingText placeholder={isOrder ? "Project details*" : "Your message for us*" } value={message} onChange={message => onChange({message})} minHeight={100} maxHeight={600} />
					<input type="submit" value="Send"/>
					<div className={filterJoin(["error-box", ['active', errorActive]])}>{error}</div>
				</div>
			</div>
		</form>
	)
}

ContactForm.propTypes = {
	name: PropTypes.string,
	business: PropTypes.string,
	address: PropTypes.object,
	email: PropTypes.string,
	message: PropTypes.string,
	onSubmit: PropTypes.func,
	onChange: PropTypes.func
};

export {ContactForm};