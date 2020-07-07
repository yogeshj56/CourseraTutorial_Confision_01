import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import '../App.css';
import { COMMENTS } from '../shared/comments';
import { DISHES } from '../shared/dishesh';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetailComponent from './DishDetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';

class Main extends Component
{
    constructor(props){
      super(props);

      this.state = {
        dishes:DISHES,
        comments:COMMENTS,
        promotions:PROMOTIONS,
        leaders:LEADERS
      }
    }
 
    render(){

        const HomePage = () => {
            return(
                <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                     promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                     leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            )
        }

        const DishWithId =({match}) => {
                return(
                    <DishDetailComponent dish={this.state.dishes.filter((dish) => dish.id===parseInt(match.params.dishId,10))[0]} 
                        comments = {this.state.comments.filter((comment) => comment.dishId===parseInt(match.params.dishId,10))}
                    />
                )
        }

        return (
            <div>

            <Header />
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes} /> } />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/contactus" component={Contact} />
                <Route path = "/aboutus" component={()=> <About leaders={this.state.leaders}/>} />
                <Redirect to="/home" />
            </Switch>
            <Footer />
            </div>
         );
    }
}

export default Main;
