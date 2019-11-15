import React from 'react';
import  { Form, Button, Label, Header, Modal } from 'semantic-ui-react'

function EditPlantModal(props){
	return(
		<Modal open={props.open} closeIcon onClose={props.closeModal}>
			<Header>Edit Plant</Header>
			<Modal.Content>
				<Form onSubmit={props.updatePlant}>
					<Label>Name: </Label>
					<Form.Input
						type='text'
						name='name'
						value={props.plantToEdit.name}
						onChange={props.handleEditChange}
					/>
					<Label>Alias: </Label>
					<Form.Input
						type='text'
						name='alias'
						value={props.plantToEdit.alias}
						onChange={props.handleEditChange}
					/>
					<Label>Origin: </Label>
					<Form.Input
						type='text'
						name='origin'
						value={props.plantToEdit.origin}
						onChange={props.handleEditChange}
					/>
					<Modal.Actions>
					<Button color='green' type='submit'> Update Plant</Button>
					</Modal.Actions>
				</Form>
			</Modal.Content>
		</Modal>
	)
}

export default EditPlantModal