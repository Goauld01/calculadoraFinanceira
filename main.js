import { generateReturnArray } from "./src/investimentGoals.js";
import { Chart } from "chart.js/auto";
import { createTable } from "./src/table.js";

//todo Elememtos de gráficos
const finalMoneyChart = document.getElementById("final-money-distribution");
const progessionChart = document.getElementById("progession");

//todo elementos de formulario
const form = document.getElementById("investiment-form");
const clearButton = document.getElementById("clear-form");
// const calculateButton = document.getElementById("calculate-results");

//todo Variáveis globais
let doughnutChatrReference = {};
let progessionChartReference = {};

const columnsArray = [
  { columnsLabel: "Total investido", accessor: "investedAmount" },
  { columnsLabel: "Rendimento mensal", accessor: "interestReturns" },
  { columnsLabel: "Rendimento total", accessor: "totalInterestReturns" },
  { columnsLabel: "Mês", accessor: "month" },
  { columnsLabel: "Quantia Total", accessor: "totalAmount" },
];

//todo FUnção para formatar valores
function formatCurrency(value) {
  return value.toFixed(2);
}

//todo Função para calcular e exibiar os gráficos
function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
  resetCharts();
  const startingAmount = Number(
    form["starting-amount"].value.replace(",", ".")
  );
  //   const startingAmount = Number(
  //     document.getElementById("starting-amount").value
  //   );
  const additionalContribution = Number(
    document.getElementById("additional-contribution").value.replace(",", ".")
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const timeAmountPeriodSelect =
    document.getElementById("time-amount-period").value;

  try {
    const returnsArray = generateReturnArray(
      startingAmount,
      timeAmount,
      additionalContribution,
      timeAmountPeriodSelect,
      returnRate,
      returnRatePeriod
    );

    const finalInvestimentObject = returnsArray[returnsArray.length - 1];

    //todo Criação dos gráficos
    // doughnutChatrReference = new Chart(finalMoneyChart, {
    //   type: "doughnut",
    //   data: {
    //     labels: ["Total investido", "Rendimento", "Imposto"],
    //     datasets: [
    //       {
    //         label: "Total",
    //         data: [
    //           formatCurrency(finalInvestimentObject.investedAmount),
    //           formatCurrency(
    //             finalInvestimentObject.totalInterestReturns *
    //               (1 - taxRate / 100)
    //           ),
    //           formatCurrency(
    //             finalInvestimentObject.totalInterestReturns * (taxRate / 100)
    //           ),
    //         ],
    //         backgroundColor: [
    //           "rgb(255, 99, 132)",
    //           "rgb(54, 162, 235)",
    //           "rgb(255, 205, 86)",
    //         ],
    //         hoverOffset: 4,
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //   },
    // });

    // progessionChartReference = new Chart(progessionChart, {
    //   type: "bar",
    //   data: {
    //     labels: returnsArray.map((investmentObject) => investmentObject.month),
    //     datasets: [
    //       {
    //         label: "Total Investido",
    //         data: returnsArray.map((investmentObject) =>
    //           formatCurrency(investmentObject.investedAmount)
    //         ),
    //         backgroundColor: "rgb(255, 99, 132)",
    //       },
    //       {
    //         label: "Retorno do Investimento",
    //         data: returnsArray.map((investmentObject) =>
    //           formatCurrency(investmentObject.interestReturns)
    //         ),
    //         backgroundColor: "rgb(54, 162, 235)",
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //     scales: {
    //       x: { stacked: true },
    //       y: { stacked: true },
    //     },
    //   },
    // });

    //todo Criação da tabela com os dados
    createTable(columnsArray, returnsArray, "results-table");
  } catch (error) {
    alert(error.message);
  }
}

//todo Função para limpar os gráficos
function isObjectEmpyt(obj) {
  return Object.keys(obj).length === 0;
}
function resetCharts() {
  if (
    !isObjectEmpyt(doughnutChatrReference) &&
    !isObjectEmpyt(progessionChartReference)
  ) {
    doughnutChatrReference.destroy();
    progessionChartReference.destroy();
  }
}

//todo Função para limpar o formulário

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";
  resetCharts();

  const errorInputContainers = document.querySelectorAll(".error");

  for (const errorInputContainer of errorInputContainers) {
    errorInputContainer.classList.remove("error");
    errorInputContainer.parentElement.querySelector("p").remove();
  }
}

//todo Função para validar os Inputs
function validateInput(evt) {
  if (evt.target.value === "") {
    return;
  }

  const { parentElement } = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");
  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    // <p class="text-red-500">Insira um valor numérico e maior que zero</p>
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-500");
    errorTextElement.innerText = "Insira um valor numérico e maior que zero";

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name"))
    formElement.addEventListener("blur", validateInput);
}

//todo Eventos de escuta
form.addEventListener("submit", renderProgression);
clearButton.addEventListener("click", clearForm);
// calculateButton.addEventListener("click", renderProgression);
