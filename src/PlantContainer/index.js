import React, { Component } from 'react';
import PlantList from '../PlantList'
import CreatePlantForm from '../CreatePlantForm'
import { Grid } from 'semantic-ui-react';

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
	addPlant = async(e, plantFromTheForm) => {
		e.preventDefault()
		try{
			const createdPlantRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/plants/', {
				method: 'POST',
				body: JSON.stringify(plantFromTheForm),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const parsedRes = await createdPlantRes.json()
			this.setState({plants: [...this.state.plants, parsedRes.data]})
		}
		catch(err){
			console.log(err);
		}	
	}
	deletePlant = async (id) => {
		const deletePlantRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/plants/' + id, {method: 'DELETE'});
		const deletePlantParsed = await  deletePlantRes.json();
		this.setState({plants: this.state.plants.filter((plant) => plant.id !== id)})
		console.log(deletePlantParsed, 'Response from flask server');
	}
	render(){
		return (
			<Grid columns={2} divided textAlign='center' style={{ height: '100%' }} verticalAlign='top' stackable>
		        <Grid.Row>
		          <Grid.Column >
		            <PlantList plants={this.state.plants} deletePlant={this.deletePlant} />
		          </Grid.Column>
		          <Grid.Column >
		           <CreatePlantForm addPlant={this.addPlant}/>
		          </Grid.Column>
		        </Grid.Row>
		      </Grid>
		)
	}
}

export default PlantContainer


// INSERT INTO plant(name, alias, origin, created_at) VALUES('Alocasia Amazonica Polly', 'Amazonian Elephant Ear', 'Amazon Rainforest', 90000);
