import React from 'react';
import { Card, Button, } from 'semantic-ui-react';

function PlantList(props){
	const plants = props.plants.map((plant) => {
		return (
		    <Card key={plant.id}>
	          <Card.Content>
	            <Card.Header>{plant.name}</Card.Header>
	            <Card.Meta>
	            	<span className='alias'>{plant.alias}</span>
	            </Card.Meta>
	            <Card.Description>{plant.origin}</Card.Description>
	          </Card.Content>
	          <Card.Content extra>
	            <Button>Delete Plant</Button>
	            <Button>Edit Plant</Button>
	          </Card.Content>
	        </Card>
			)
	})

	return (
		<Card.Group>
			{ plants }
		</Card.Group>
		)
}

export default PlantList

