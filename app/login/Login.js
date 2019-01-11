import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { SingUp } from "./singUp/singUp";
import { SingIn } from "./singIn/singIn";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { state: true };
  }
  toggleState = () => {
    this.setState(previousState => {
      return { state: !previousState.state };
    });
  };

  render() {
    return (
      <div className="component-login">
        <div className="links-menu">
          <Button style={{ margin: 10 }} onClick={this.toggleState}>
            Faça o Cadastro
          </Button>
          <Button style={{ margin: 10 }} onClick={this.toggleState}>
            Entre com email e senha
          </Button>

          {this.state.state ? <SingIn /> : <SingUp />}
        </div>
      </div>
    );
  }
}
