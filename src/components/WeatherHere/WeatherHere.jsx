import React from 'react'
import './WeatherHere.css'
import WeatherHereMain from './WeatherHereMain'
import WeatherBlockInfo from "../WeatherBlock/WeatherBlockInfo";
import Preloader from "../Preloader/Preloader";

export default class WeatherHere extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: null,
            cityName: 'Moscow'
        };
        this.requestGeo = this.requestGeo.bind(this)
        this.makeRequest = this.makeRequest.bind(this)
    }

    parseData = data => ({
        lon: data.coord.lon,
        lat: data.coord.lat,
        icon: data.weather[0].icon,
        cloudiness: data.weather[0].description,
        temp: Math.round(data.main.temp - 273.15),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        pressure: data.main.pressure,
        name: data.name
    });

    requestGeo() {
        if (navigator.geolocation) {
            const pos = navigator.geolocation.getCurrentPosition(position => {
                this.makeRequest(position.coords.longitude, position.coords.latitude)
            }, err => {
                this.makeRequest()
            })
        }
        else {
            this.makeRequest()
        }
    }

    makeRequest(lon = null, lat = null) {
        this.setState({
            isLoaded: false
        });
            let url = 'https://api.openweathermap.org/data/2.5/weather?'
            if(lon && lat) {
                url += 'lat=' + lat + '&lon=' + lon
            }
            else {
                url += 'q=' + this.state.cityName
            }
            url += '&appid=b88ae6b1211078df478d7544a65d22f9'
            fetch(url).then(response => response.json(), err => alert('city not found'))
                .then(json => {
                    this.state.data = this.parseData(json)
                    this.setState({
                        isLoaded: true
                    })
                })

    }
    componentDidMount() {
        this.requestGeo()
    }

    render() {
        if (!this.state.isLoaded) {
            return <Preloader/>
        }

        return (
            <section className='weather-here'>
                <h3>Погода здесь</h3>
                <button className='waves-effect btn waves-light' onClick={() => this.requestGeo()}>
                    Обновить геолокацию<i className="material-icons">update</i>
                </button>
                <div className='flexbox'>
                    <WeatherHereMain data={this.state.data}/>
                    <section><WeatherBlockInfo data={this.state.data}/></section>
                </div>
            </section>
        );
    }

}