import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import '../App.css';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetailComponent from './DishDetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }        
}

class Main extends Component
{
 
    render(){

        const HomePage = () => {
            return(
                <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                     promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                     leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            )
        }

        const DishWithId =({match}) => {
                return(
                    <DishDetailComponent dish={this.props.dishes.filter((dish) => dish.id===parseInt(match.params.dishId,10))[0]} 
                        comments = {this.props.comments.filter((comment) => comment.dishId===parseInt(match.params.dishId,10))}
                    />
                )
        }

        return (
            <div>

            <Header />
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} /> } />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/contactus" component={Contact} />
                <Route path = "/aboutus" component={()=> <About leaders={this.props.leaders}/>} />
                <Redirect to="/home" />
            </Switch>
            <Footer />
            </div>
         );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
