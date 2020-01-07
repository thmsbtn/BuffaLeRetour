import React, { Component } from 'react';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import User from './components/User';
import TableFooter from "@material-ui/core/TableFooter";
import Restaurant from './components/Restaurant';
import IconButton from '@material-ui/core/IconButton';


class App extends Component {
  constructor(props) {

    super(props);

    

    this.state = {
      page : 1,
      restaurants: ['tennis', 'foot'],
       
    }
  }

  addRestaurant() {
    let oldRestaurants = this.state.restaurants;
    this.setState({
      restaurants: oldRestaurants.concat(this.input.value)
    });

    this.input.value = "";
  }

  getDataFromServer() {
    console.log("--- GETTING DATA ---");
    fetch('http://localhost:8080/api/restaurants')
      .then(response => {
        console.log(response);
        return response.json(); // transforme le json texte en objet js
      })
      .then(data => { // data c'est le texte json de response ci-dessus
        let newRestaurant = [];
        data.data.forEach((el) => {
          newRestaurant.push(el);
        });

        this.setState({
          restaurants: newRestaurant
        });
        console.log(this.state.restaurants);

      }).catch(err => {
        console.log("erreur dans le get : " + err)
      });

  }

  removeRestaurant(restaurant) {
    fetch('http://localhost:8080/api/restaurants/' + restaurant._id, {
      method: 'delete'
    })
      .then(() => { // data c'est le texte json de response ci-dessus
        this.getDataFromServer()
      })
      .catch(err => {
      });
    const oldRestaurants = this.state.restaurants.filter(
      (elem, index) => {
        return (elem !== restaurant) ? elem : null;
      }
    );

    this.setState({
      restaurants: oldRestaurants
    });
  }

  componentWillMount() {
    console.log("Component will mount");
    // on va chercher des donnees sur le Web avec fetch, comme
    // on a fait avec VueJS
    this.getDataFromServer();
  }

  nextPage(){
    this.setState.page = this.state.page + 1;
  }

  previousPage(){
    if(this.state.page < 1){
      this.setState.page = 1;
    }else{
      this.setState.page = this.state.page - 1;
    }
    this.render;
  }


  render() {
    console.log("render");
    let list = this.state.restaurants.map(
      (el) => {
        return <li onClick={() => this.removeRestaurant(el)} key={el}>{el}</li>
      }
    );





    let listAvecComponent =
      this.state.restaurants.map((el, index) => {
        return <Restaurant
          name={el}
          key={index}
          removeRestaurant={this.removeRestaurant.bind(this)}
        />
      }
      );


      
    

    return (
      <div className="App">
        <h3>Liste des Restaurants :</h3>
        <input
          type="text"
          ref={(input) => this.input = input}

        />
        <button onClick={() => this.addRestaurant()}>Add Restaurant</button>
        <center>
          <TableContainer component={Paper}>
            <Table stickyHeader class=".table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Cuisine</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listAvecComponent}
              </TableBody>
              <TableFooter>
                <TableCell>
                  <IconButton>
                    <ArrowBackRounded />
                  </IconButton>
                </TableCell>
                <TableCell>
                  N° {this.state.page}
                </TableCell>
                <TableCell>
                  <IconButton onClick={this.nextPage()}>
                    <ArrowForwardRounded />
                  </IconButton>
                </TableCell>
              </TableFooter>
            </Table>
          </TableContainer>
          <p>Un composant User ci-dessous:</p>
          <User name="Thomas Beatini" />
        </center>
      </div>
    );
  }
}

export default App;
