import React, { Component } from 'react';
import { Searchbar } from 'react-native-paper';

class MealSearch extends Component{
	constructor(props){
		super(props);

		this.state={
			input: ''
		}
	}
	render(){
		return(
			<Searchbar placeholder='Search'/>
		)
	}
}

export default MealSearch