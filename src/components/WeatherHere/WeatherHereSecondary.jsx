import React from 'react'

export default class WeatherHereSecondary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props
        return (
            <section className="weather-here--secondary">
                <ul>
                    <li>Скорость ветра: <span>{data.wind} м/с</span></li>
                    <li>Облачность: <span>{data.cloudiness}</span></li>
                    <li>Влажность: <span>{data.humidity} %</span></li>
                    <li>Двление: <span>{data.pressure} hpa</span></li>
                    <li>Координаты: <span>[{data.lon}, {data.lat}]</span></li>
                </ul>
            </section>
        );
    }
}