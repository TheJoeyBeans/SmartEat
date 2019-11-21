import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function MealList(props){

	const meals = props.meals.map((meal) => {

		return (
			<Card key={meal.id}>
				<Card.Content>
					<Card.Header>{meal.meal_type}</Card.Header>
					<Card.Description>
					For {meal.meal_type}, you ate:<br/>
					<ul>
						{meal.food.map((foods, i) =>
							<li key={i}>
								Food: {foods.foodName}<br/>
								Calories: {foods.foodCalories}
							</li>
						)}
					</ul><br/>
					For a total of {meal.calories} calories. 
					</Card.Description>
				</Card.Content>
			</Card>
		)
	})

	return(
		<Card.Group>
			{ meals }
		</Card.Group>
	)
}

export default MealList