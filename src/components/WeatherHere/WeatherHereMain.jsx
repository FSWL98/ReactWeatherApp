import React from 'react'

export default class WeatherHereMain extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        const {data} = this.props;

        return (
            <section className="weather-here--main">
                <h4 className="weather-here--city-name">{data.name}</h4>
                <div>
                    <img src={'http://openweathermap.org/img/wn/' + data.icon + '@2x.png'} alt='icon'/>
                    <span className="weather-here--temperature">{data.temp}&deg;C</span>
                </div>
            </section>
        );
    }
}