import React, { Component } from 'react';
import PlantList from '../PlantList'


class PlantContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			plants: []
		}
	}
	componentDidMount(){
		this.getPlants();
	}
	getPlants = async () => {
		try {
			const plants = await fetch(process.env.REACT_APP_API_URL  + '/api/v1/plants/');
			const parsedPlants = await plants.json();
			console.log(parsedPlants);
			this.setState({
				plants: parsedPlants.data
			})
		} catch(err){
			console.log(err);
		}
	}
	render(){
		return (
			<PlantList plants={this.state.plants} />
		)
	}
}

export default PlantContainer