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
	closeMakeModal = () =>{
		this.setState({
			showMakeMealModal: false
		})
	}
	render(){
		return(
			<div>
				<MealSearch openAndCreate={this.openAndCreate}/>
				<MakeMealForm open={this.state.showMakeMealModal} close={this.closeMakeModal}/>
			</div>
		)
	}

}

export default MainContainer