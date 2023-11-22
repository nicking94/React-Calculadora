import React, { useState } from "react";
import * as math from "mathjs";
import "./App.css";

function App() {
  const [pantalla, setPantalla] = useState("0");
  const [ultimaOperacion, setUltimaOperacion] = useState(null);
  const [resetPantalla, setResetPantalla] = useState(false);

  const agregarDigito = (digito) => {
    if (pantalla === "0" && digito === "0") {
      return;
    }

    if (resetPantalla) {
      setPantalla(digito);
      setResetPantalla(false);
    } else {
      setPantalla((prevPantalla) =>
        prevPantalla === "0" ? digito : prevPantalla + digito
      );
    }
  };
  const agregarOperador = (operador) => {
    if (ultimaOperacion === "=") {
      setUltimaOperacion(null);
    }

    const lastChar = pantalla.charAt(pantalla.length - 1);
    const isOperator = ["+", "-", "*", "/"].includes(lastChar);

    if (!isOperator || (isOperator && operador === "-" && lastChar !== "-")) {
      setPantalla((prevPantalla) => prevPantalla + operador);
      setUltimaOperacion(operador);
      setResetPantalla(false);
    } else if (isOperator && operador !== "-" && lastChar !== "-") {
      // Remove the previous operator and replace it with the new operator
      setPantalla((prevPantalla) => prevPantalla.slice(0, -1) + operador);
      setUltimaOperacion(operador);
      setResetPantalla(false);
    }
  };

  const limpiarPantalla = () => {
    setPantalla("0");
    setUltimaOperacion(null);
    setResetPantalla(false);
  };

  const calcular = () => {
    let expresion = pantalla;
    let resultado;

    expresion = expresion.replace(/--/g, "+");
    expresion = expresion.replace(/-/g, "+-");

    try {
      resultado = math.evaluate(expresion);
    } catch (error) {
      resultado = "Error";
    }
    setPantalla(resultado.toString());
    setUltimaOperacion("=");
    setResetPantalla(true);
  };

  return (
    <div className="App">
      <div className="calculadora">
        <div id="display">{pantalla}</div>
        <div className="numeros">
          <button id="zero" onClick={() => agregarDigito("0")}>
            0
          </button>
          <button id="one" onClick={() => agregarDigito("1")}>
            1
          </button>
          <button id="two" onClick={() => agregarDigito("2")}>
            2
          </button>
          <button id="three" onClick={() => agregarDigito("3")}>
            3
          </button>
          <button id="four" onClick={() => agregarDigito("4")}>
            4
          </button>
          <button id="five" onClick={() => agregarDigito("5")}>
            5
          </button>
          <button id="six" onClick={() => agregarDigito("6")}>
            6
          </button>
          <button id="seven" onClick={() => agregarDigito("7")}>
            7
          </button>
          <button id="eight" onClick={() => agregarDigito("8")}>
            8
          </button>
          <button id="nine" onClick={() => agregarDigito("9")}>
            9
          </button>
          <button id="decimal" onClick={() => agregarDigito(".")}>
            .
          </button>
          <button id="clear" onClick={limpiarPantalla}>
            Limpiar
          </button>
        </div>

        <div className="operadores">
          <button id="add" onClick={() => agregarOperador("+")}>
            +
          </button>
          <button id="subtract" onClick={() => agregarOperador("-")}>
            -
          </button>
          <button id="multiply" onClick={() => agregarOperador("*")}>
            *
          </button>
          <button id="divide" onClick={() => agregarOperador("/")}>
            /
          </button>
          <button id="equals" onClick={calcular}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
