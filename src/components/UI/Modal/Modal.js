import React from "react";
import classes from "./Modal.css";
import Auxillary from "../../../hoc/Auxillary";
import BackDrop from "../Backdrop/BackDrop";

export default function modal(props) {
    console.log("props in modal ", props);
    return (
        <Auxillary>
            <BackDrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show
                        ? "translateY(0)"
                        : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0",
                }}>
                {props.children}
            </div>
        </Auxillary>
    );
}
