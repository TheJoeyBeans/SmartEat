import React, { Component } from 'react';
import MealSearch from '../MealSearch';

class MainContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			meals: []
		}
	}

	render(){
		return(
			<MealSearch />
		)
	}

}

export default MainContainer