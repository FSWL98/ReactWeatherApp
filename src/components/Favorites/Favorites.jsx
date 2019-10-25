import  React from 'react'
import './Favorites.css'
import {connect} from 'react-redux'
import FavoritesItem from "./FavoritesItem";
import {addFavoriteCity, removeFavoriteCity} from "../../store/Favorites/actions";
import {bindActionCreators} from "redux";

class Favorites extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {addCity} = this.props
        function addNewCity (ev) {
            ev.preventDefault()
            const name = document.getElementById('city').value
            addCity(name)
            document.getElementById('city').value = ''
        }
        const favs = this.props.favorites.map((fav) =>
            <FavoritesItem item={fav} buttonRemove={this.props.removeCity} key = {fav.name} />
        )
        return (
            <section className='favorites'>
                <div className='favorites--head'>
                <h3>Избранное</h3>
                <form onSubmit={addNewCity}>
                    <input type='text' placeholder='Навзвание города' name='city' id='city'/>
                    <button type='submit' className='btn small'>Добавить</button>
                </form>
                </div>
                <div className='favorites--items'>
                {favs}
                </div>
            </section>
        );
    }
}
const mapStateToProps = state => ({
    favorites: state.favorites.favorites
})

const mapDispatchToProps = dispatch => ({
    addCity: bindActionCreators(addFavoriteCity, dispatch),
    removeCity: bindActionCreators(removeFavoriteCity, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)

