import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        alert("You continue!");
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal visible={this.state.purchasing}
                 modalClosed={this.purchasingCancelHandler}> 
                    <OrderSummary ingredients={this.state.ingredients} 
                        purchaseCanceled={this.purchasingCancelHandler}
                        purchaseContinued={this.purchasingContinueHandler}
                        totalPrice={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    disabled={disabledInfo}
                    ordered={this.purchasingHandler}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;