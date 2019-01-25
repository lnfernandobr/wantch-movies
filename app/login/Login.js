import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { SingUp } from "./singUp/singUp";
import { SingIn } from "./singIn/singIn";

export class Login extends Component {
  state = { state: true };

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
            {this.state.state ? "Entre com email e senha " : "Faça o Cadastro "}
          </Button>
        </div>
        {this.state.state ? <SingUp /> : <SingIn />}

      </div>
    );
  }
}
