import React from "react";
import Auxillary from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const ingredientPrices = {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.3,
    cheese: 0.4,
};
class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: !this.state.purchasing,
        });
    };
    updatePurchaseState = (ingredients) => {
        console.log("before doing stuff with ingredients: ", ingredients);
        const sum = Object.keys(ingredients)
            .map((igKey) => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0); //todo:represents total amount of ingedients
        console.log(" after doing stuff with ingredients: ", sum);
        this.setState({ purchasable: sum > 0 });
    };
    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = ingredientPrices[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurchaseState(updatedIngredients);
    };
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = ingredientPrices[type];
        const newPrice = this.state.totalPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurchaseState(updatedIngredients);
    };
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    };
    purchaseContinueHandler = () => {
        alert("You Continue");
    };
    render() {
        const disableInfo = {
            ...this.state.ingredients,
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Auxillary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                />
            </Auxillary>
        );
    }
}
export default BurgerBuilder;
