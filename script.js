function calculate() {
  var months = parseFloat(document.getElementById('months').value);
  document.getElementById('mon').innerHTML = months;
   // Get the current value

  var initial_amount = parseFloat(document.getElementById('initial-amount').value);
 
  var contribution = parseFloat(document.getElementById('contribution').value);
 
  var perfomance = parseFloat(document.getElementById('perfomance').value);
  document.getElementById('hyield').innerHTML = formatNumberWithCommas(perfomance.toFixed(3));
  var administration = parseFloat(document.getElementById('administration').value);
  document.getElementById('hadmin').innerHTML =formatNumberWithCommas(administration.toFixed(3)) ;
  var inflation1 = parseFloat(document.getElementById('inflation').value);
  document.getElementById('hinflation').innerHTML =formatNumberWithCommas(inflation1.toFixed(3) ) ;

 // Add an event listener to the "Initial amount" input field
const initialAmountInput = document.getElementById('initial-amount');
initialAmountInput.addEventListener('focusout', function() {
const inputValue = initialAmountInput.value;
// Check if the input is a valid number
if (!isNaN(inputValue)) {
   // Format the value with two decimal places and add ".00"
   initialAmountInput.value = parseFloat(inputValue).toFixed(2) + '.00';
}
});


  
   // Check if "Yearly" radio buttons are selected, then divide values by 12
   if (document.getElementById('inlineRadio2').checked) { // Yearly performance
       perfomance = perfomance / 12;
   }
   if (document.getElementById('inlineRadio4').checked) { // Yearly administration
       administration = administration / 12;
   }
   if (document.getElementById('inlineRadio6').checked) { // Yearly inflation
       inflation1 = inflation1 / 12;
   }

   // If the checkbox is selected, adjust the contribution for monthly inflation
   var correctContribution = contribution * Math.pow(1 + inflation1 / 100, 1 / 12);


   document.getElementById('hyield').innerHTML =formatNumberWithCommas(perfomance.toFixed(3)) ;
   document.getElementById('hadmin').innerHTML =formatNumberWithCommas(administration.toFixed(3)) ;
   document.getElementById('hinflation').innerHTML =formatNumberWithCommas(inflation1.toFixed(3)) ;



//         // Get the checkbox element by its ID
//  var checkbox = document.getElementById("flexCheckIndeterminate");

// // Check if the checkbox is checked
// if (checkbox.checked) {
//   // Get the value of the checkbox when it's checked
// //   const checkboxValue = checkbox.value;
// //   const inf=  parseFloat(document.getElementById("inflacao").value)
//  if(i<=1){
//       var new_monthly=contribution*(1+0);
//      console.log(new_monthly);
//  }
//  else{
//   var new_monthly=contribution*(1+inflation1);
//  }

// //   alert("Checkbox value: " + checkboxValue);
// } else {
//   // Handle the case when the checkbox is not checked (optional)
//      var new_monthly = parseFloat(document.getElementById("contribution").value.replace(/,/g, ''));
// }

  // Get a reference to the table bodies
  var tableBody = document.querySelector("#result-table tbody");
  var resultsTableBody = document.querySelector("#results-table tbody");

  // Clear the table bodies
  tableBody.innerHTML = "";
  resultsTableBody.innerHTML = "";

  // Initialize the initial amounts for the first month
  var currentAmount = initial_amount;
  var totalYield = 0;
  var totalAdminCost = 0;
  var totalInflation = 0;


  

  // Loop through each month and calculate and display the values
  for (var month = 1; month <= months; month++) {
      var yield =currentAmount * perfomance / 100;
      var adminCost = (currentAmount + yield) * administration / 100;
      var inflation = (currentAmount + yield - adminCost) * inflation1 / 100;
      var finalValue = currentAmount + yield - adminCost - inflation + contribution;

      // Calculate the accumulated totals
      totalYield += yield;
      totalAdminCost += adminCost;
      totalInflation += inflation;

      // Create a new row for the first table
      var newRow = document.createElement("tr");
      // ... (Your code for the first table row)
      // Create a new row for the first table
var newRow = document.createElement("tr");

// Create table cells for each value
var monthCell = document.createElement("td");
monthCell.textContent = month;



var valueCell = document.createElement("td");
valueCell.textContent =formatNumberWithCommas(currentAmount.toFixed(2)) ;

var yieldCell = document.createElement("td");
yieldCell.textContent = formatNumberWithCommas(yield.toFixed(2)) 
var adminCell = document.createElement("td");
adminCell.textContent = formatNumberWithCommas(adminCost.toFixed(2));
var inflationCell = document.createElement("td");
inflationCell.textContent =formatNumberWithCommas(inflation.toFixed(2)) ;

var contributionCell = document.createElement("td");

contributionCell.textContent = formatNumberWithCommas(contribution.toFixed(2));
var finalValueCell = document.createElement("td");
finalValueCell.textContent = formatNumberWithCommas(finalValue.toFixed(2));

// Append the cells to the row
newRow.appendChild(monthCell);
newRow.appendChild(valueCell);
newRow.appendChild(yieldCell);
newRow.appendChild(adminCell);
newRow.appendChild(inflationCell);
newRow.appendChild(contributionCell);
newRow.appendChild(finalValueCell);

// Append the row to the first table's body
tableBody.appendChild(newRow);

// Update the current amount for the next month
currentAmount = finalValue;

      // Append the row to the first table's body
      tableBody.appendChild(newRow);

      // Update the current amount for the next month
      currentAmount = finalValue;
  }

  // Create a row for the second table to show accumulated totals
  var resultsTableRow = document.createElement("tr");
  var resultsTableMonthsCell = document.createElement("td");
  resultsTableMonthsCell.textContent = months;
  var resultsTableYieldCell = document.createElement("td");
  resultsTableYieldCell.textContent =formatNumberWithCommas(totalYield.toFixed(2)) ;
  document.getElementById('totalyield').innerHTML=resultsTableYieldCell.textContent
  var resultsTableAdminCell = document.createElement("td");
  resultsTableAdminCell.textContent =formatNumberWithCommas(totalAdminCost.toFixed(2)) ;
  document.getElementById('totaladmin').innerHTML= resultsTableAdminCell.textContent
  var resultsTableInflationCell = document.createElement("td");
  resultsTableInflationCell.textContent =formatNumberWithCommas(totalInflation.toFixed(2)) ;
  document.getElementById('totalinflation').innerHTML=  resultsTableInflationCell.textContent
  var resultsTableContributionCell = document.createElement("td");
  resultsTableContributionCell.textContent =formatNumberWithCommas((contribution * months).toFixed(2)) ;
  document.getElementById('totalcontribution').innerHTML=  resultsTableContributionCell.textContent
  var resultsTableTotalCell = document.createElement("td");
  resultsTableTotalCell.textContent =formatNumberWithCommas((currentAmount).toFixed(2)) ;
  document.getElementById('totalvalue').innerHTML= resultsTableTotalCell.textContent

  // Append the cells to the second table row
  resultsTableRow.appendChild(resultsTableMonthsCell);
  resultsTableRow.appendChild(resultsTableYieldCell);
  resultsTableRow.appendChild(resultsTableAdminCell);
  resultsTableRow.appendChild(resultsTableInflationCell);
  resultsTableRow.appendChild(resultsTableContributionCell);
  resultsTableRow.appendChild(resultsTableTotalCell);

  // Append the row to the second table's body
  resultsTableBody.appendChild(resultsTableRow);

  // Display the tables
  document.getElementById("result-table").style.display = "table";
  document.getElementById("results-table").style.display = "table";
}

function formatValue() {
 // Get the input element by its ID
 var inputValueElement = document.getElementById("initial-amount");

 // Get the current value
 var value = inputValueElement.value;

 // Remove existing commas and ".00"
 value = value.replace(/,/g, '').replace(/\.00$/, '');

 // Check if the value has four or more digits
 if (/^\d{4,}$/.test(value)) {
   // Add commas as thousands separators
   value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }

 // Add ".00" to the end of the value
 value += ".00";

 // Update the input with the formatted value
 inputValueElement.value = value;
}

function formatNumberWithCommas(number) {
return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}