import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlantContainer from './PlantContainer'
import LoginRegisterForm from './LoginRegisterForm'

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			loggedIn: false,
			loggedInUserEmail: null
		}
	}

	login = async loginInfo => {
		const response = await fetch(
			process.env.REACT_APP_API_URL + '/api/v1/users/login', 
			{
				method: 'POST',
				credentials: "include",
				body: JSON.stringify(loginInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		const parsedLoginRes = await response.json();
		if(parsedLoginRes.status.code === 200){
			this.setState({
				loggedIn: true,
				loggedInUserEmail: parsedLoginRes.data.email
			});
		} else {
			console.log('login failed');
		}
	}

	register = async registerInfo => {
		const response = await fetch(
			process.env.REACT_APP_API_URL + '/api/v1/users/register', 
			{
				method: 'POST',
				credentials: "include",
				body: JSON.stringify(registerInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		const parsedRegisterRes = await response.json()
		if(parsedRegisterRes.status.code === 201) {
			this.setState({
				loggedIn: true,
				loggedInUserEmail: parsedRegisterRes.data.email
			});
		} else {
			console.log('login failed');
		}
	}

	render() {
		return (
			<div className='App'>
				{this.state.loggedIn ? (
					<PlantContainer />
					) : (
						<LoginRegisterForm  login={this.login} register={this.register}/>
					)}
			</div>
		)
	}
  
}






export default App;
