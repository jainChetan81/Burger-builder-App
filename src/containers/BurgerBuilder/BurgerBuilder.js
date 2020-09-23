import React from "react";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends React.Component {
    state = {
        purchasing: false,
    };
    componentWillMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        // this.props.onInitPurchase();
        this.setState({
            purchasing: !this.state.purchasing,
        });
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0); //TODO:represents total amount of ingedients
        return sum > 0;
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    };

    purchaseContinueHandler = () => {
        //todo:queryParams link url handler
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(
        //         encodeURIComponent(i) +
        //             "=" +
        //             encodeURIComponent(this.props.ings[i])
        //     );
        // }
        // queryParams.push("price=" + this.props.price);
        // const queryString = queryParams.join("&");
        // this.props.history.push({
        this.props.onPurchaseInit();
        this.props.history.push("/checkout");
        // search: "?" + queryString,
        // });
    };

    render() {
        const disableInfo = {
            ...this.props.ings,
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Auxillary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {this.props.loading ? (
                        <Spinner />
                    ) : !this.props.ings ? (
                        <p>Ingredients can't be loaded</p>
                    ) : (
                        <OrderSummary
                            ingredients={this.props.ings}
                            purchaseCanceled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            price={this.props.price}
                        />
                    )}
                </Modal>
                {this.props.error ? (
                    <p>Ingredients can't be loaded</p>
                ) : this.props.ings ? (
                    <Auxillary>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdd}
                            ingredientRemoved={this.props.onIngredientRemove}
                            disabled={disableInfo}
                            purchasable={this.updatePurchaseState(
                                this.props.ings
                            )}
                            price={this.props.price}
                            ordered={this.purchaseHandler}
                        />
                    </Auxillary>
                ) : (
                    <Spinner />
                )}
            </Auxillary>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        loading: state.order.loading,
        purchased: state.order.purchased,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName) =>
            dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredient()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios)); //custom error handler
