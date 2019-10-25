import React from 'react'

export default class FavoritesItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: null,
            error: false
        }
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
        pressure: data.main.pressure
    });

    makeRequest() {
        this.setState({
            isLoaded: false
        })
        fetch('https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=' + this.props.item.name +
            '&appid=b88ae6b1211078df478d7544a65d22f9').then(response => response.json(), err => alert('city not found'))
            .then(json => {
                this.state.data = this.parseData(json)
                console.log(this.state.data)
                this.setState({
                    isLoaded: true
                })
            })
            .catch(() => this.setState({
                isLoaded: true,
                error: true
            }))
    }
    componentDidMount() {
        this.makeRequest()
    }

    render() {
        const {buttonRemove} = this.props;

        if (!this.state.isLoaded) {
             return <div className='favorites--item'>
                        <div className="preloader-wrapper active">
                            <div className="spinner-layer spinner-darkcyan-only">
                                <div className="circle-clipper left">
                                <div className="circle"/>
                                </div>
                                <div className="gap-patch">
                                <div className="circle"/>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"/>
                                </div>
                            </div>
                        </div>
                    </div>
        }
        if (this.state.error) {
            return <div className='favorites--item'>
                    <div className='favorites--item--head'>
                        <h5>Ошибка</h5>
                        <button className='btn' onClick={() => buttonRemove(this.props.item.name)}>Х</button>
                    </div>
                </div>
        }

        return (
            <div className='favorites--item'>
                <div className='favorites--item--head'>
                    <h5>{this.props.item.name}</h5>
                    <img src={'http://openweathermap.org/img/wn/' + this.state.data.icon + '@2x.png'} alt='icon'/>
                    <span className='favorites--item--temperature'>{this.state.data.temp}&deg;C</span>
                    <button className='btn' onClick={() => buttonRemove(this.props.item.name)}>Х</button>
                </div>
                <ul>
                    <li>Скорость ветра: <span>{this.state.data.wind} м/с</span></li>
                    <li>Облачность: <span>{this.state.data.cloudiness}</span></li>
                    <li>Влажность: <span>{this.state.data.humidity} %</span></li>
                    <li>Двление: <span>{this.state.data.pressure} hpa</span></li>
                    <li>Координаты: <span>[{this.state.data.lon}, {this.state.data.lat}]</span></li>
                </ul>
                <button className='btn' onClick={this.makeRequest}>Обновить</button>
            </div>
        );
    }
}

