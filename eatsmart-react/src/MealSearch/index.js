import React, { Component } from 'react';
// import { Searchbar } from 'react-native-paper';
import { Search, Button } from 'semantic-ui-react';

class MealSearch extends Component {
	constructor(){
		super();

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
			<div>
				<Search name='input' onSearchChange={this.handleChange} placeholder='Search'/>
				<Button onClick={this.props.openAndCreate}>Make a Meal</Button>
			</div>
		)
	}
}

export default MealSearch
