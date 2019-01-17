import React, { Component } from "react";

import PropTypes from "prop-types";
import Zoom from "@material-ui/core/Zoom";
import firebase from "firebase";
// const Email = require("email-templates");

var preco = 0;
var first = true;
class Form extends Component {
  static contextTypes = {
    store: PropTypes.object
  };
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      endereço: "",
      telefone: ""
    };
  }

  onChangeText(key, change) {
    this.setState({ [key]: change.target.value });
  }

  check(event) {
    event.preventDefault();

    firebase
      .database()
      .ref()
      .child("Compras/")
      .push(this.state);
    this.setState({ check: true });

    this.context.store.dispatch({
      type: "RENDER_TABLE",
      status: true
    });

    // const email = new Email({
    //   message: {
    //     from: "minionsStore@gmail.com"
    //   },
    //   // uncomment below to send emails in development/test env:
    //   // send: true,
    //   transport: {
    //     jsonTransport: true
    //   }
    // });

    // email
    //   .send({
    //     template: "mars",
    //     message: {
    //       to: "prodrigopcgomes@gmail.com"
    //     },
    //     locals: {
    //       name: "Elon"
    //     }
    //   })
    //   .then(console.log)
    //   .catch(console.error);
  }
  componentWillMount() {
    const array = this.props.selecionados;

    var arrayLinks = [];
    array.map(x => {
      preco = preco + parseInt(x.preco);
      arrayLinks.push(x.link);
      this.setState({ preco });
    });
    this.setState({ comprados: arrayLinks });
  }

  render() {
    const array = this.props.selecionados;

    return (
      <Zoom in={true} timeout={1000}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 20,
              marginLeft: 20
            }}
          >
            <span style={{ fontSize: 30 }}>Minion(s) Escolhido(s):</span>
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
            >
              {array.map(x => {
                return (
                  <div>
                    <img
                      height="80"
                      width="80"
                      style={{
                        border: "1px solid black",
                        borderRadius: 50,
                        marginLeft: 10
                      }}
                      src={x.link}
                    />
                    <span
                      style={{ marginLeft: x.descricao.length > 6 ? 3 : 30 }}
                    >
                      {x.descricao}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <form
            name="myForm"
            onSubmit={event => this.check(event)}
            style={{ marginTop: 30 }}
          >
            <span style={{ fontSize: 30, marginLeft: 30 }}>
              Total: R${preco},00
            </span>
            <div className="div">
              <input
                type="text"
                value={this.state["nome"]}
                className="input_Nome"
                placeholder={"Nome"}
                onChange={change => this.onChangeText("nome", change)}
                required
              />

              <input
                type="text"
                value={this.state["email"]}
                className="input_Email"
                placeholder={"E-mail"}
                onChange={change => this.onChangeText("email", change)}
                required
              />
            </div>
            <div className="div">
              <input
                type="text"
                value={this.state["telefone"]}
                className="input_Telefone"
                placeholder={"Telefone"}
                onChange={change => this.onChangeText("telefone", change)}
                required
              />

              <input
                type="text"
                value={this.state["endereço"]}
                className="input_Endereço"
                placeholder={"Endereço"}
                onChange={change => this.onChangeText("endereço", change)}
                required
              />
            </div>

            <div className="div_Botao">
              <button
                style={{
                  width: 100,
                  borderRadius: 10,
                  color: "white",
                  backgroundColor: "brown",
                  height: 30,
                  width: 130,
                  float: "left",
                  marginLeft: `${5}%`,
                  marginTop: 10
                }}
                onClick={() => {
                  this.context.store.dispatch({
                    type: "FOTO",
                    foto: this.props.selecionados,
                    form: false
                  });
                }}
              >
                Voltar
              </button>
              <button
                className={"botao"}
                type="submit"
                // onClick={() => {
                //   this.check();
                // });
                // }}
                // disabled={isEnabled}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </Zoom>
    );
  }
}
export default Form;
