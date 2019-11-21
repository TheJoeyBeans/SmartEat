import React, { Component } from 'react';
import MealSearch from '../MealSearch';
import MakeMealForm from '../MakeMealForm';
import MealList from '../MealList';

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
		console.log(meal, "This is meal")
		const mealKind = meal.meal_type;
		console.log(mealKind, "This is mealKind")
		let mealList = meal.food;
		console.log(mealList, "This is mealList")
		let totalCal = 0;
		for(let i = 0; i < meal.food.length; i++){
			totalCal += meal.food[i].foodCalories
		}

		const mealBody = {
			'meal_type' : mealKind,
			'food' : mealList,
			'calories' : totalCal
		}
		console.log(mealBody, "This is the meal body")
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
				<MealList meals={this.state.meals} />
			</div>
		)
	}

}

export default MainContainer