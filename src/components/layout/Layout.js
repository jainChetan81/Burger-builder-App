import React from "react";
import Aux from "../../hoc/Aux";

export default layout = (props) => (
    <Aux>
        <div className="">Toolbar,Sidebar,Backdrop </div>
        <main>{props.children}</main>
    </Aux>
);
