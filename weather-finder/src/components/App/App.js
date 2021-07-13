import React from 'react'
import './App.css'

import Title from '../Title/Title.js'
import Form from '../Form/Form.js'
import Weather from '../Weather/Weather.js'

const API_KEY = 'cfde62ce126b272ee757aef0fe9348eb'


class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    getWeather = async (event) => {
        event.preventDefault()

        const city = event.target.elements.city.value
        const country = event.target.elements.country.value

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
        const data = await api_call.json()


        if (city && country) {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ''
            })
        }
        else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: 'Please enter the values.'
            })
        }
    }
    render() {
        return (
            <div>
                <div className='wrapper'>
                    <div className='main'>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-md-5 title-container'>
                                    <Title className='itle-container__title' />
                                </div>
                                <div className='col-md-7 form-container'>
                                    <Form getWeather={this.getWeather} />
                                    <Weather
                                        temperature={this.state.temperature}
                                        country={this.state.country}
                                        city={this.state.city}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App