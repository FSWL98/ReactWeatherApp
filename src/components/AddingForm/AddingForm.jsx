import React from 'react'
import {bindActionCreators} from "redux";
import {addFavoriteCity} from "../../store/Favorites/actions";
import {connect} from 'react-redux'

 class AddingForm extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {addCity} = this.props
        function addNewCity (ev) {
            ev.preventDefault()
            const name = document.getElementById('city').value
            addCity(name)
            document.getElementById('city').value = ''
        }
        return(
            <form onSubmit={addNewCity}>
                <input type='text' placeholder='Навзвание города' name='city' id='city'/>
                <button type='submit' className='btn small'>Добавить</button>
            </form>
        );
    }
 }
const mapStateToProps = () => ({

})
const mapDispatchToProps = dispatch => ({
    addCity: bindActionCreators(addFavoriteCity, dispatch),
})
export default connect (mapStateToProps, mapDispatchToProps)(AddingForm)