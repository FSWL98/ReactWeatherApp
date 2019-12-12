import React from 'react'
import WeatherBlockInfo from "../WeatherBlock/WeatherBlockInfo";
import {getWeatherByCityName} from "../../store/Favorites/actions";
import {connect} from "react-redux";
import Preloader from "../Preloader/Preloader";

export class FavoritesItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getWeatherByCityName(this.props.name)
    }

    render() {
        const {buttonRemove, response} = this.props;
        if (!response.isLoaded) {
             return <Preloader/>
        }
        if (response.isError) {
            setTimeout(() => buttonRemove(this.props.name), 5000);
            return (
                <div className='favorites--item'>
                    <div className='favorites--item--head'>
                        <h5>Город {this.props.name} не найден</h5>
                        <button className='btn' onClick={() => buttonRemove(this.props.name)}>Х</button>
                    </div>
                </div>
            )
        }

        return (
            <div className='favorites--item'>
                <div className='favorites--item--head'>
                    <h5>{this.props.name}</h5>
                    <img src={'http://openweathermap.org/img/wn/' + response.data.icon + '@2x.png'} alt='icon'/>
                    <span className='favorites--item--temperature'>{response.data.temp}&deg;C</span>
                    <button className='btn delete' onClick={() => buttonRemove(this.props.name)}>Х</button>
                </div>
                <WeatherBlockInfo data={response.data}/>
                <button className='btn update' onClick={() => this.props.getWeatherByCityName(this.props.name)}>Обновить</button>
            </div>
        );
    }
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch) => ({
    getWeatherByCityName: (cityName) => dispatch(getWeatherByCityName(cityName))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesItem)

