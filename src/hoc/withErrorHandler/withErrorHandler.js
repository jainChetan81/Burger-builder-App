import React from "react";
import { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxillary from "../Auxillary/Auxillary";

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };
        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(
                (res) => null,
                (error) => {
                    this.setState({
                        error: error,
                    });
                }
            );
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors); //todo:to remove interceptors we don't need anymore
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmed = () => {
            this.setState({ error: null });
        };

        render() {
            return (
                <Auxillary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Auxillary>
            );
        }
    };
};

export default withErrorHandler;
