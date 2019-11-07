import React from 'react'
import {filterJoin} from './svz-utilities'
import './scss/base-vars.scss';

export const Button = props => <div id = {props.id} className={filterJoin(["button", props.className])} onClick={props.onClick}>{props.children}</div>
