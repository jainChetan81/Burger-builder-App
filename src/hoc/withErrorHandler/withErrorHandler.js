import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxillary from "../Auxillary/Auxillary";

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(
                (res) => res,
                (error) => {
                    this.setState({
                        error: error,
                    });
                }
            );
        }

        // doing this to prevent memory leaks
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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
