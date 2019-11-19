import React, { Component } from 'react';
import PlantList from '../PlantList'
import CreatePlantForm from '../CreatePlantForm'
import { Grid } from 'semantic-ui-react';
import EditPlantModal from '../EditPlantModal'

class PlantContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			plants: [], 
			editModalOpen: false,
			plantToEdit: {
				name: '',
				alias: '',
				orign: '',
				id: ''
			}
		}
	}
	componentDidMount(){
		this.getPlants();
	}
	getPlants = async () => {
		try {
			const plants = await fetch(process.env.REACT_APP_API_URL  + '/api/v1/plants/' ,
			{
				credentials: 'include'
			});
			const parsedPlants = await plants.json();
			console.log(parsedPlants);
		} catch(err){
			console.log(err);
		}
	}

	addPlant = async (e, plantFromTheForm) => {
		e.preventDefault()
		try{
			const createdPlantRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/plants/', {
				method: 'POST',
				credentials: 'include',
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
		const deletePlantRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/plants/' + id, {method: 'DELETE', credentials: 'include'});
		const deletePlantParsed = await deletePlantRes.json();
		this.setState({plants: this.state.plants.filter((plant) => plant.id !== id)})
		// console.log(deletePlantParsed, 'Response from flask server');
	}

	editPlant = (idOfPlantToEdit) => {
		const plantToEdit = this.state.plants.find(plant => plant.id === idOfPlantToEdit)
		this.setState({
			editModalOpen: true,
			plantToEdit: {
				...plantToEdit
			}
		})
	}
	handleEditChange = (e) => {
		this.setState({
			plantToEdit: {
				...this.state.plantToEdit,
				[e.target.name]: e.target.value
			}
		})
	}
	
	updatePlant = async (e) => {
		e.preventDefault()
		try{
			const url = process.env.REACT_APP_API_URL + '/api/v1/plants/' + this.state.plantToEdit.id
			const updatedRes = await fetch(url, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.plantToEdit),
				headers: {
					'Content-Type': 'application/json'
				}

			})
			const updatedResParsed = await updatedRes.json()
			const newPlantArrWithUpdate = this.state.plants.map((plant) => {
				if(plant.id === updatedResParsed.data.id){
					plant = updatedResParsed.data
				}
				return plant
			})
			this.setState({
				plants: newPlantArrWithUpdate
			})
			this.closeModal()
		} catch (err){
			console.log(err);
		}
	}
	closeModal = () => {
		this.setState({
			editModalOpen: false
		})
	}
	render(){
		return (
			<Grid columns={2} 
		    divided textAlign='center' 
		    style={{ height: '100%' }} 
		    verticalAlign='top' 
		    stackable
		    >
	        <Grid.Row>
	          <Grid.Column >
	            <PlantList 
	            plants={this.state.plants} 
	            deletePlant={this.deletePlant} 
	            editPlant={this.editPlant}
	            />
	          </Grid.Column>
	          <Grid.Column >
	           <CreatePlantForm addPlant={this.addPlant}/>
	          </Grid.Column>
	          	<EditPlantModal
	          	open={this.state.editModalOpen}
	          	updatePlant={this.updatePlant}
	          	plantToEdit={this.state.plantToEdit}
	          	closeModal={this.closeModal}
	          	handleEditChange={this.handleEditChange}
	          	/>
	        </Grid.Row>
        </Grid>
		)
	}
}

export default PlantContainer


// INSERT INTO plant(name, alias, origin, created_at) VALUES('Alocasia Amazonica Polly', 'Amazonian Elephant Ear', 'Amazon Rainforest', 90000);
