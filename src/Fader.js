import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';
import './scss/Fader.scss';

class Fader extends Component {
	constructor(props) {
		super(props);
		this.state = {in: false};
	}
	componentWillUnmount() {
		this.setState({in: false});
	}
	componentDidMount() {
		this.setState({in: true});
	}

	componentDidUpdate(prevProps) {
      if (prevProps.isMounted && !this.props.isMounted) {
        setTimeout(
          () => this.setState({ shouldRender: false }),
          this.props.delayTime
        );
      } else if (!prevProps.isMounted && this.props.isMounted) {
        this.setState({ shouldRender: true });
      }
    }

    componentWillLeave (callback) {
    	setTimeout( callback, 600);
    }

	render () {
		return (
			<CSSTransition
				key={this.props.key}
				timeout={{enter: 600, exit: 400}}
				appear
				enter
				exit
				classNames="fade"
				in={this.state.in}
			>
				{this.props.children}
			</CSSTransition>
		)
	}
}

export {Fader};