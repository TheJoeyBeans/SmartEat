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
	componentDidMount(){
		this.getMeals();
	}
	getMeals = async () => {
		try {
			const meals = await fetch(process.env.REACT_APP_API_URL + '/api/v1/meals/', {
				credentials: 'include',
				method: 'GET'
			});
			const parsedMeals = await meals.json();
			console.log(parsedMeals, "Look at these parsedMeals");
			this.setState({
				meals: parsedMeals.data
			})
			console.log(this.state.meals)
		} catch(err){
			console.log(err);
		}
	}
	openAndCreate = () =>{
		this.setState({
			showMakeMealModal: true
		})
	}
	closeModalAndMakeMeal = async (e, meal) =>{
		const mealKind = meal.meal_type;
		let mealList = meal.food;
		let totalCal = 0;
		for(let i = 0; i < meal.food.length; i++){
			totalCal += meal.food[i].foodCalories
		}

		const mealBody = {
			'meal_type' : mealKind,
			'food' : mealList,
			'calories' : totalCal
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

			const parsedResponse = await createdMealResponse.json();

			if (parsedResponse.status.code === 201) {
				this.setState({meals: [...this.state.meals, parsedResponse.data]})
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