import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function MealList(props){
	console.log(props.meals, "meal props")

	const meals = props.meals.map((meal) => {

		return (
			<Card key={meal.id}>
				<Card.Content>
					<Card.Header>{meal.meal_type}</Card.Header>
					<Card.Description>
					For {meal.meal_type}, you ate:<br/>
					<ul>
					
					</ul><br/>
					For a total of {meal.calories} calories. 
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Button /*onClick={() => props.openAndEdit(meal)}*/>Edit Meal</Button>
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