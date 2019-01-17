import React, { Component } from "react";
import firebase from "firebase";

var arrayKeys = ["preco", "email", "endereço", "nome", "telefone"];
class Tabela extends Component {
  constructor() {
    super();
    this.state = {
      arrayTabela: [],
      lucro: 0
    };
  }
  componentWillMount() {
    firebase
      .database()
      .ref("Compras")
      .on("value", snap => {
        var arrayTabela = [];
        snap.forEach(data => {
          arrayTabela.push(data.val());
        });
        // console.log(arrayTabela);
        this.setState({ arrayTabela });
      });

    firebase
      .database()
      .ref("Compras")
      .on("value", snap => {
        var lucro = 0;
        snap.forEach(data => {
          lucro = lucro + data.val().preco;
        });
        this.setState({ lucro });
      });
  }

  checkQuantidadeCada() {
    var quantidadeCada = [0, 0, 0, 0, 0, 0];
    firebase
      .database()
      .ref("Compras")
      .on("value", snap => {
        snap.forEach(data => {
          var selecteds = data.val().comprados;
          selecteds.map(x => {
            if (x === this.props.minions[0].link) {
              quantidadeCada[0]++;
            }
            if (x === this.props.minions[1].link) {
              quantidadeCada[1]++;
            }
            if (x === this.props.minions[2].link) {
              quantidadeCada[2]++;
            }
            if (x === this.props.minions[3].link) {
              quantidadeCada[3]++;
            }
            if (x === this.props.minions[4].link) {
              quantidadeCada[4]++;
            }
            if (x === this.props.minions[5].link) {
              quantidadeCada[5]++;
            }
          });
        });
      });
    return quantidadeCada;
  }

  renderFotosQuantidade() {
    var array = [
      "https://mlstaticquic-a.akamaihd.net/D_Q_NP_923015-MLB25895761131_082017-Q.jpg",
      "https://www.1999.co.jp/itbig55/10551803.jpg",
      "https://m.media-amazon.com/images/S/aplus-media/mg/dbf4301f-af40-46f2-9a87-a99deddcd9a2._SL300__.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51hBpqGIkyL.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbgTeUpNVMzF14DCjI8ykJrIPaGELzWGFSn3lGOiPYAwJ8DfhqTQ",
      "https://vignette.wikia.nocookie.net/mycun-the-movie/images/1/1d/Kevin_minions.png/revision/latest?cb=20170520162545"
    ];
    var arrayIMGs = [];

    array.map((x, index) => {
      var quantidadeCada = this.checkQuantidadeCada();
      arrayIMGs.push(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 20,
            border: "1px solid black",
            borderRadius: 50,
            marginLeft: 10,
            backgroundColor: "white"
          }}
        >
          <img height="75" width="75" src={x} style={{ borderRadius: 50 }} />
          <span style={{ textAlign: "center" }}>{quantidadeCada[index]}</span>
        </div>
      );
    });
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>{arrayIMGs}</div>
    );
  }
  renderImagesTable(x) {
    var array = [];
    x["comprados"].map(y => {
      array.push(<img src={y} height="45" width="45" />);
    });
    return array;
  }

  Table() {
    return (
      <div>
        <font size="2" face="Arial">
          <table
            id="example"
            class="display compact nowrap"
            border="3px"
            table-layout="fixed"
            bordercolor="black"
          >
            <thead>
              <tr>
                <th max-width="1px">
                  <span>Comprados</span>
                </th>
                {arrayKeys.map(x => {
                  //   arrayUtil.push(x.key);
                  return (
                    <th max-width="1px">
                      <span>{x}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {this.state.arrayTabela.map((x, index) => {
                return (
                  <tr>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          backgroundColor: "white"
                        }}
                      >
                        {this.renderImagesTable(x)}
                      </div>
                    </td>
                    {arrayKeys.map(y => {
                      return (
                        <td>
                          <span style={{ textAlign: "center" }}>{x[y]}</span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </font>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Vendas:</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginRight: 40 }}> {this.renderFotosQuantidade()}</div>
          <div>
            <br />
            <span style={{ fontSize: 30 }}>Lucro:R${this.state.lucro},00</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 10
          }}
        >
          {this.Table()}
        </div>
      </div>
    );
  }
}

export default Tabela;
