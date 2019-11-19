import React, { Component } from 'react';
import { Searchbar } from 'react-native-paper';

class MealSearch extends Component{
	constructor(props){
		super(props);

		this.state={
			input: ''
		}
	}
	handleChange = (e) => {
		this.setState({
			input : e.currentTarget.value
		})
	}
	render(){
		return(
			<Searchbar name='input' onChange={this.handleChange} placeholder='Search'/>
		)
	}
}

export default MealSearch