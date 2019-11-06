import  React from 'react'
import './Favorites.css'
import {connect} from 'react-redux'
import FavoritesItem from "../FavoritesItem/FavoritesItem";
import {addFavoriteCity, removeFavoriteCity} from "../../store/Favorites/actions";
import {bindActionCreators} from "redux";
import AddingForm from "../AddingForm/AddingForm";

class Favorites extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const favs = this.props.favorites.map((fav) =>
            <FavoritesItem name={fav.name} buttonRemove={this.props.removeCity} key = {fav.name} />
        )
        return (
            <section className='favorites'>
                <div className='favorites--head'>
                <h3>Избранное</h3>
                    <AddingForm/>
                </div>
                <div className='favorites--items'>
                {favs}
                </div>
            </section>
        );
    }
}
const mapStateToProps = state => ({
    favorites: state.api.items
})

const mapDispatchToProps = dispatch => ({
    removeCity: bindActionCreators(removeFavoriteCity, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)

