import React, { Component } from 'react';
import MealSearch from '../MealSearch';
import MakeMealForm from '../MakeMealForm';
import MealList from '../MealList';
import { Grid } from 'semantic-ui-react';

class MainContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			meals: [],
			foodItems:[],
			mealToEdit: {
				meal_type: '',
				food: '',
				calories: ''
			},
			showMakeMealModal: false,
			showEditMealModal: false
		}
	}
	componentDidMount(){
		this.getMeals();
		this.getFoodItems();
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
			console.log(this.state.meals, "Current Meals in state")
		} catch(err){
			console.log(err);
		}
	}
	getFoodItems = async () => {
		try {
			const foodItems = await fetch(process.env.REACT_APP_API_URL + '/api/v1/foodItems/', {
				credentials: 'include', 
				method: 'GET'
			});
			const parsedFoodItems = await foodItems.json();
			console.log(parsedFoodItems, "look at these foodItems");
			this.setState({
				foodItems: parsedFoodItems.data
			})
			console.log(this.state.foodItems, "Current Food Items in state")
		} catch(err){
			console.log(err);
		}
	}
	openAndCreate = () =>{
		this.setState({
			showMakeMealModal: true
		})
	}
	// openAndEdit = (mealFromTheList) => {
	// 	console.log(mealFromTheList, "This is the meal I'm editing")
	// 	// this.setState({
	// 	// 	showEditMealModal: true
	// 	// })
	// }
	closeModalAndMakeMeal = async (e, meal) =>{
		const mealKind = meal.meal_type;
		let mealList = meal.food;
		let totalCal = 0;
		let mealId = ''
		for(let i = 0; i < meal.food.length; i++){
			totalCal += meal.food[i].foodCalories
		}
		const mealBody = {
			'meal_type' : mealKind,
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
			mealId = parsedResponse.data.id;
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
		this.createFoodItem(mealId, mealList);
	}
	createFoodItem = async (mealId, mealList) => {
		console.log(mealId, "<--mealId");
		console.log(mealList, "<--mealList");

		try {
			for(let i = 0; i < mealList.length; i++){
				const foodBody = {
					'food_name': mealList[i].foodName ,
					'food_calories': mealList[i].foodCalories,
					'meal': mealId
				}
				const createdFoodItemResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/foodItems/', {
					method: 'POST', 
					credentials: 'include',
					body: JSON.stringify(foodBody),
					headers: {
						'Content-Type' : 'application/json'
					}
				});
				const parsedResponse = await createdFoodItemResponse.json();
				if (parsedResponse.status.code === 201) {
					this.setState({foodItems: [...this.state.foodItems, parsedResponse.data]})
				} else {
					alert(parsedResponse.status.message);
				}
			} 
			} catch(err){
				console.log('error')
				console.log(err)
		}

	}
	// closeModalAndEditMeal = async (e, meal) => {
	// 	const mealKind = meal.meal_type;
	// 	let mealList = meal.food;
	// 	let totalCal = 0;
	// 	for(let i = 0; i < meal.food.length; i++){
	// 		totalCal += meal.food[i].foodCalories
	// 	}

	// 	const mealBody = {
	// 		'meal_type' : mealKind,
	// 		'food' : mealList,
	// 		'calories' : totalCal
	// 	}
	// 	e.preventDefault();

	// 	try {
	// 		const createdMealResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/meals/', {
	// 			method: 'POST',
	// 			credentials: 'include',
	// 			body: JSON.stringify(mealBody),
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		});

	// 		const parsedResponse = await createdMealResponse.json();

	// 		if (parsedResponse.status.code === 201) {
	// 			this.setState({meals: [...this.state.meals, parsedResponse.data]})
	// 		} else {
	// 			alert(parsedResponse.status.message);
	// 		}
	// 	} catch(err){
	// 		console.log('error')
	// 		console.log(err)
	// 	}
	// 	this.setState({
	// 		showMakeMealModal: false
	// 	})

	// }
	render(){
		return(
			<div>
				<header>
					<MealSearch openAndCreate={this.openAndCreate}/>
				</header>
				<Grid columns={3}>	
					<Grid.Row>
						<MealList meals={this.state.meals} foodItems={this.state.foodItems}/*openAndEdit={this.openAndEdit}*/ />
					</Grid.Row>
					<MakeMealForm open={this.state.showMakeMealModal} close={this.closeModalAndMakeMeal}/>
				</Grid>
			</div>
		)
	}

}

export default MainContainer
