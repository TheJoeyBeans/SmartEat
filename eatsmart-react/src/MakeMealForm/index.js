import React, { Component } from 'react';
import { Form, Button, Label, Modal } from 'semantic-ui-react';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
const apiKey = 'dc1e6e6904af11f3792ca4dad0a5495b';
const apiId = '230690a4';

class MakeMealForm extends Component {
	constructor(){
		super();

		this.state = {
			meal_type: '',
			food: [],
			query: ''
		}
	}
	// addFood = (e) =>{
	// 	this.setState(state => {
	// 		const food = state.food.concat({
				
	// 		})
	// 	})
	// }
	handleChange = (e) => {
		this.setState({
			query: e.currentTarget.value
		})
	}
	fetchSearchResults = (query) => {
		const searchUrl = `https://api.edamam.com/api/food-database/parser?ingr=${this.state.query}&app_id=${apiId}&app_key=${apiKey}`;
		axios.get(searchUrl, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function (res) {console.log(res)})
	}
	render(){
		return(
			<Modal open={this.props.open}>
				<Modal.Content>
					<Form>
						<Label>Which meal is this?</Label>
							<select class="ui dropdown">
								<option value="breakfast">Breakfast</option>
								<option value="lunch">Lunch</option>
								<option value="dinner">Dinner</option>
								<option value="snack">Snack</option>
							</select>
						<Label>What are you eating?</Label>
							<Searchbar name='input' onChange={this.handleChange} placeholder='Search'/>
							<Button onClick={this.fetchSearchResults}>Search Food</Button>
							<Button onClick={this.addFood}>Add Food</Button>
						<Button type='Submit' onClick={this.props.closeAndEdit}>Complete Meal</Button>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default MakeMealForm