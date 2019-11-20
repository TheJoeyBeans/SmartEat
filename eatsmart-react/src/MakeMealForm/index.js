import React, { Component } from 'react';
import { Form, Button, Label, Modal } from 'semantic-ui-react';

class MakeMealForm extends Component {
	constructor(){
		super();

		this.state = {
			meal_type: '',
			food: []
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
			food: [{
				[e.currentTarget.name] : e.currentTarget.value
			}]
		})
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
							<Form.Input type='text' name='name' value={this.state.food.name} onChange={this.handleChange}/>
							<Form.Input type='text' name='calories' value={this.state.food.calories} onChange={this.handleChange}/>
							// <Button onClick={this.addFood}>Add Food</Button>
						<Button type='Submit' onClick={this.props.closeAndEdit}>Complete Meal</Button>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}

export default MakeMealForm