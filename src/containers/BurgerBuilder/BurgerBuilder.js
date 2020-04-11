import React from "react";
import Auxillary from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 1,
            cheese: 1,
            meat: 1,
        },
    };
    render() {
        return (
            <Auxillary>
                <Burger ingredients={this.state.ingredients} />
                <div className="">Build Cntrol</div>    
            </Auxillary>
        );
    }
}
export default BurgerBuilder;
