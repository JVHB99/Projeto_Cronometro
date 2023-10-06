const express = require("express");

const app = express();

let minutos = 0;
let segundos = 0;
let ligado = false;
let setIntervalDisparado = false;

function startCronometro() {
  ligado = true;
  if (!setIntervalDisparado) {
    setInterval(() => {
      if (ligado) {
        if (segundos === 59) {
          segundos = 0;
          minutos++;
        } else {
          segundos++;
        }
      }
    }, 1000);

    setIntervalDisparado = true;
  }
}
app.get("/", (req, res) => {
  return res.send(
    `Tempo atual do cronômetro ${minutos
      .toString()
      .padStart(2, "0")} minutos ${segundos
      .toString()
      .padStart(2, "0")} segundos`
  );
});

app.get("/iniciar", (req, res) => {
  startCronometro();
  return res.send("Cronômetro iniciado");
});

app.get("/pausar", (req, res) => {
  ligado = false;
  return res.send("Cronometro pausado");
});

app.get("/continuar", (req, res) => {
  ligado = true;
  return res.send("Cronometro reiniciado");
});

app.get("/zerar", (req, res) => {
  minutos = 0;
  segundos = 0;
  return res.send("Cronometro zerado");
});
app.listen(8000, () => {
  console.log("Servidor inicializado na porta 8000");
});
