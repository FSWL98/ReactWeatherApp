import React from 'react'

export default class WeatherBlockInfo extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {data} = this.props
        return (
            <ul>
                <li>Скорость ветра: <span>{data.wind} м/с</span></li>
                <li>Облачность: <span>{data.cloudiness}</span></li>
                <li>Влажность: <span>{data.humidity} %</span></li>
                <li>Двление: <span>{data.pressure} hpa</span></li>
                <li>Координаты: <span>[{data.lat}, {data.lon}]</span></li>
            </ul>
        );
    }
}