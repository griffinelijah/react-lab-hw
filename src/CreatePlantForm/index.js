import React, { Component } from 'react';
import { Form, Button, Label, Segment} from 'semantic-ui-react'

class CreatePlant extends Component {
	constructor(){
		super()
		this.state = {
			name: '',
			alias: '',
			origin: ''
		}
	}
	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.target.value})
	}
	render(){
		return (
			<Segment>
				<h4>Create a Plant</h4>
				<Form onSubmit={(e) => this.props.addPlant(e, this.state)}>
					<Label>Name:</Label>
					<Form.Input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
					<Label>Alias:</Label>
					<Form.Input type='text' name='alias' value={this.state.alias} onChange={this.handleChange} />
					<Label>Origin:</Label>
					<Form.Input type='text' name='origin' value={this.state.origin} onChange={this.handleChange} />
					<Button type='Submit'>Create Plant</Button>
				</Form>
			</Segment>
		)
	}
}

export default CreatePlant