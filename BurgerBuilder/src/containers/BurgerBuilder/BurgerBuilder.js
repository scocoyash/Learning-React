import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:1.0,
    meat:1.5,
    bacon:1.2
};
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount () {
        /*
        axios.get( '/ingredients.json' )
            .then( response => {
                this.setState( { ingredients: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
        */
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, et) => {
                return sum + et;
            }, 0);
        this.setState({purchasable:sum > 0});
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type]+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchasable(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) return;
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchasable(updatedIngredients);
    };

    purchasingHandler = () => {
        this.setState({purchasing: true});
    };

    purchasingCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchasingContinueHandler = () => {
        // alert("You continue!");
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name:'Yash',
                address: {
                    street:'Germany',
                    zipCode:402314
                },
                email:'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        // send data via post
        axios.post('/post.json', order)
        .then(response => {console.log(response);
            this.setState({loading: false, purchasing:false});
        })
        .catch(error => {console.log(error)
            this.setState({loading: false, purchasing:false});
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.state.ingredients ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    disabled={disabledInfo}
                    ordered={this.purchasingHandler}
                    price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                purchaseCanceled={this.purchasingCancelHandler}
                purchaseContinued={this.purchasingContinueHandler}
                totalPrice={this.state.totalPrice} />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                 modalClosed={this.purchasingCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default BurgerBuilder;