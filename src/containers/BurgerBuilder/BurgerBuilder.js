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
import * as actionType from "../../store/actions";
// import { withRouter } from "react-router-dom";

class BurgerBuilder extends React.Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        // axios
        //     .get("https://burger-builder-2f6a1.firebaseio.com/ingredients.json")
        //     .then((res) => {
        //         console.log("res: ", res);
        //          this.setState({
        //              ingredients: res.data,
        //          });
        //     })
        //     .catch((err) => {
        //         this.setState({ error: true });
        //     });
    }

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
                    {this.state.loading ? (
                        <Spinner />
                    ) : (
                        <OrderSummary
                            ingredients={this.props.ings}
                            purchaseCanceled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            price={this.props.price}
                        />
                    )}
                </Modal>
                {this.props.ings ? (
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
                ) : this.state.error ? (
                    <p>Ingredients can't be loaded</p>
                ) : (
                    <Spinner />
                )}
            </Auxillary>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingName) =>
            dispatch({
                type: actionType.ADD_INGREDIENTS,
                ingredientName: ingName,
            }),
        onIngredientRemove: (ingName) =>
            dispatch({
                type: actionType.REMOVE_INGREDIENTS,
                ingredientName: ingName,
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios)); //custom error handler
