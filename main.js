import { generateReturnArray } from "./src/investimentGoals.js";

const form = document.getElementById("investiment-form");
// const calculateButton = document.getElementById("calculate-results");

function renderProgression(evt) {
  evt.preventDefault();

  const startingAmount = Number(form["starting-amount"].value);
  //   const startingAmount = Number(
  //     document.getElementById("starting-amount").value
  //   );
  const additionalContribution = Number(
    document.getElementById("additional-contribution").value
  );
  const timeAmount = document.getElementById("time-amount").value;
  const returnRate = Number(document.getElementById("return-rate").value);
  const taxRate = Number(document.getElementById("tax-rate").value);
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

    console.log(returnsArray);
  } catch (error) {
    alert(error.message);
  }
}

form.addEventListener("submit", renderProgression);
// calculateButton.addEventListener("click", renderProgression);
