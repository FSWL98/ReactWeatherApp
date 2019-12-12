import React from 'react'
import {bindActionCreators} from "redux";
import {addFavoriteCity} from "../../store/Favorites/actions";
import {connect} from 'react-redux'

export class AddingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addNewCity = this.addNewCity.bind(this);
    }
    handleChange = e => {
        const value = e.currentTarget.value;
        this.setState({
            cityName: value
        })
    };
    addNewCity = (ev) => {
        ev.preventDefault();
        this.props.addCity(this.state.cityName);
        this.setState({
            cityName: ''
        });
    };


    render() {
        return(
            <form onSubmit={this.addNewCity}>
                <input type='text' placeholder='Навзвание города' name='city' id='city' onChange={this.handleChange}
                value={this.state.cityName}/>
                <button type='submit' className='btn small'>Добавить</button>
            </form>
        );
    }
 }
const mapStateToProps = () => ({

});
const mapDispatchToProps = dispatch => ({
    addCity: bindActionCreators(addFavoriteCity, dispatch),
});
export default connect (mapStateToProps, mapDispatchToProps)(AddingForm)