import React, { Component } from 'react';
import MealSearch from '../MealSearch';
import MakeMealForm from '../MakeMealForm';

class MainContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			meals: [],
			showMakeMealModal: false
		}
	}
	openAndCreate = () =>{
		this.setState({
			showMakeMealModal: true
		})
	}
	closeModalAndMakeMeal = async (e, meal) =>{
		const mealKind = meal.meal_type;
		const foodText = meal.food[0].foodName;
		const foodCal = meal.food[0].foodCalories;
		const mealBody = {
			'meal_type' : mealKind,
			'food' : foodText,
			'calories' : foodCal
		}
		e.preventDefault();

		try {
			const createdMealResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/meals/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(mealBody),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log(createdMealResponse, 'Meal response')

			const parsedResponse = await createdMealResponse.json();
			console.log(parsedResponse, 'this is response');

			if (parsedResponse.status.code === 201) {
				this.setState({meals: [...this.state.meals, parsedResponse.data]})
				console.log(this.state)
			} else {
				alert(parsedResponse.status.message);
			}
		} catch(err){
			console.log('error')
			console.log(err)
		}
		this.setState({
			showMakeMealModal: false
		})
	}
	render(){
		return(
			<div>
				<MealSearch openAndCreate={this.openAndCreate}/>
				<MakeMealForm open={this.state.showMakeMealModal} close={this.closeModalAndMakeMeal}/>
			</div>
		)
	}

}

export default MainContainer