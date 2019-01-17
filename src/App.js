import React, { Component } from "react";
import "./App.css";
// import firebase from "firebase";

import posed from "react-pose";
import styled from "styled-components";
import Zoom from "@material-ui/core/Zoom";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";

import Tabela from "./components/tabela";
import Form from "./components/form";
import firebase from "firebase";
const minions = [
  {
    key: 1,
    link:
      "https://mlstaticquic-a.akamaihd.net/D_Q_NP_923015-MLB25895761131_082017-Q.jpg",
    preco: "45",
    descricao: "Guitarrista"
  },
  {
    key: 2,

    link: "https://www.1999.co.jp/itbig55/10551803.jpg",
    preco: "35",
    descricao: "Prisioneiro"
  },
  {
    key: 3,
    link:
      "https://m.media-amazon.com/images/S/aplus-media/mg/dbf4301f-af40-46f2-9a87-a99deddcd9a2._SL300__.jpg",
    preco: "42",
    descricao: "Amigavel"
  },
  {
    key: 4,
    link: "https://images-na.ssl-images-amazon.com/images/I/51hBpqGIkyL.jpg",
    preco: "39",
    descricao: "Nerd"
  },
  {
    key: 5,
    link:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbgTeUpNVMzF14DCjI8ykJrIPaGELzWGFSn3lGOiPYAwJ8DfhqTQ",
    preco: "40",
    descricao: "Fofo"
  },
  {
    key: 6,
    link:
      "https://vignette.wikia.nocookie.net/mycun-the-movie/images/1/1d/Kevin_minions.png/revision/latest?cb=20170520162545",
    preco: "32",
    descricao: "Confiante"
  }
];
const Container = styled.div`
  height: 25vh;
  display: flex;
  margin-top: 4%;
  margin-left: 23%;
`;

const Square = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.5 }
});

const StyledSquare = styled(Square)`
  width: 100px;
  height: 100px;
`;

class App extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      hovering: false,
      counter: 0,
      selecionados: [],
      carroselOuForm: false,
      escolhaOuTabela: false
    };
  }

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDYpmh_SdGs9FdVgWklkyRpHyqztkqO5Ls",
      authDomain: "inventos-a8181.firebaseapp.com",
      databaseURL: "https://inventos-a8181.firebaseio.com",
      projectId: "inventos-a8181",
      storageBucket: "inventos-a8181.appspot.com",
      messagingSenderId: "948934102483"
    };
    firebase.initializeApp(config);

    this.context.store.subscribe(() => {
      this.setState({
        carroselOuForm: this.context.store.getState().checkState.form,
        escolhaOuTabela: this.context.store.getState().statusState
      });
      console.log(this.context.store.getState().checkState.foto);
    });
  }
  descriçao(x, y) {
    if (x === true) {
      return (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <span style={{ fontSize: 14, textAlign: "center" }}>
            {y.descricao}
          </span>
          <span style={{ fontSize: 14, textAlign: "center" }}>
            R$: {y.preco},00
          </span>
        </div>
      );
    }
  }

  click(id) {
    // this.context.store.dispatch({
    //   type: "FOTO",
    //   foto: id,
    //   form: true
    // });
    if (this.state.selecionados.indexOf(id) > -1) {
      //In the array!

      this.state.selecionados.splice(this.state.selecionados.indexOf(id), 1);
    } else {
      //Not in the array
      this.state.selecionados.push(id);
    }
    this.setState({ selecionados: this.state.selecionados });
    console.log("this.state.selecionados");
    console.log(this.state.selecionados);
  }
  colorBorder(id) {
    if (this.state.selecionados.indexOf(id) > -1) {
      return true;
    } else {
      return false;
    }
  }
  render2fotos(link, link2) {
    return (
      <div>
        <div style={{ marginLeft: 60 }}>
          <Container>
            <StyledSquare
              pose={this.state[link.link] ? "hovered" : "idle"}
              onMouseEnter={() => this.setState({ [link.link]: true })}
              onMouseLeave={() => this.setState({ [link.link]: false })}
            >
              <img
                src={link.link}
                width="100"
                height="100"
                onClick={() => this.click(link)}
                style={{
                  border: "3px solid",
                  borderRadius: 10,
                  borderColor: this.colorBorder(link) ? "lightgreen" : "black",
                  cursor: "pointer"
                }}
              />

              {this.descriçao(this.state[link.link], link)}
            </StyledSquare>
          </Container>
        </div>
        <div style={{ marginLeft: 60 }}>
          <Container>
            <StyledSquare
              pose={this.state[link2.link] ? "hovered" : "idle"}
              onMouseEnter={() => this.setState({ [link2.link]: true })}
              onMouseLeave={() => this.setState({ [link2.link]: false })}
            >
              <img
                src={link2.link}
                width="100"
                height="100"
                onClick={() => this.click(link2)}
                style={{
                  border: "3px solid",
                  borderRadius: 10,
                  borderColor: this.colorBorder(link2) ? "lightgreen" : "black",
                  cursor: "pointer"
                }}
              />

              {this.descriçao(this.state[link2.link], link2)}
            </StyledSquare>
          </Container>
        </div>
      </div>
    );
  }

  irForm() {
    console.log(this.state.selecionados.length);
    if (this.state.selecionados.length > 0) {
      this.context.store.dispatch({
        type: "FOTO",
        foto: this.state.selecionados,
        form: true
      });
    } else {
      alert("Escolha uma opção");
    }
  }
  renderCarroselOuForm(qual) {
    if (qual === false) {
      return (
        <div>
          <div class="titulo">
            <span>Escolha seu(s) minion(s)</span>
          </div>
          {/* <div class="carrossel"> */}
          {/* <SimpleSlider /> */}

          <div style={{ display: "flex", flexDirection: "row" }}>
            {this.render2fotos(minions[0], minions[1])}
            {/* {this.render3fotos("https://www.1999.co.jp/itbig55/10551803.jpg")} */}
            {this.render2fotos(minions[2], minions[3])}
            {this.render2fotos(minions[4], minions[5])}
          </div>
          <div style={{ marginLeft: 80 }}>
            <Badge
              badgeContent={this.state.selecionados.length}
              color="primary"
            >
              <img
                src={require("../src/Imagens/cart.svg")}
                width="50"
                height="50"
              />
            </Badge>
            <button
              style={{
                width: 200,
                height: 50,
                color: "white",
                backgroundColor: "black",
                borderRadius: 20,
                marginLeft: 70
              }}
              onClick={() => {
                this.irForm();
              }}
            >
              <span style={{ fontSize: 20 }}>CONFIRMAR</span>
            </button>
          </div>
        </div>
      );
    } else {
      return <Form selecionados={this.state.selecionados} />;
    }
  }

  renderEscolhaOuTabela(EscolhaOuTabela) {
    if (EscolhaOuTabela === false) {
      return (
        <Zoom in={true} timeout={1000} mountOnEnter unmountOnExit>
          <div class="container">
            {this.renderCarroselOuForm(this.state.carroselOuForm)}
          </div>
        </Zoom>
      );
    } else {
      return (
        <Slide
          direction="right"
          in={EscolhaOuTabela}
          mountOnEnter
          unmountOnExit
        >
          <div class="container2" style={{ backgroundColor: "#FFC32B" }}>
            <Tabela minions={minions} />
          </div>
        </Slide>
      );
    }
  }
  render() {
    return <div>{this.renderEscolhaOuTabela(this.state.escolhaOuTabela)}</div>;
  }
}

export default App;
