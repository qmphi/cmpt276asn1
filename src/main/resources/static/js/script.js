//current row counter
var curRow = 1;
// AddRow Button
document.getElementById('AddRow').addEventListener('click', addTableRow);

// AddRow Function
function addTableRow() {
    // accessing gradestable
    var table = document.getElementById('gradesTable');
    curRow++;
    // creating new row and cells
    var newRow = document.createElement('tr');
    var nameCell = document.createElement('td');
    var snameCell = document.createElement('td');
    var weightCell = document.createElement('td');
    var gradeCell = document.createElement('td');
    var percentCell = document.createElement('td');

    // Setting the value of each cell
    nameCell.textContent = 'Activity ' + curRow;
    snameCell.textContent = 'A' + curRow;
    weightCell.innerHTML = '<input type="text" id="weight' + curRow + '">';
    gradeCell.innerHTML = '<input type="text" id="grade' + curRow + '" onkeyup="gradeUpdate(this)"> / ' + '<input type="text" id="total' + curRow +'" onkeyup="totalUpdate(this)">';
    percentCell.setAttribute('id', 'percent' + curRow);
    percentCell.textContent = '';

    // Appending cells to row and row to table
    newRow.appendChild(nameCell);
    newRow.appendChild(snameCell);
    newRow.appendChild(weightCell);
    newRow.appendChild(gradeCell);
    newRow.appendChild(percentCell);
    table.appendChild(newRow);
}

// Calculating Percentage 

// Updating grade and calculate new percentage
function gradeUpdate(newgrade){
    // Accessing the grade and total 
    var grade = parseFloat(newgrade.value);
    var total = parseFloat(newgrade.parentElement.children[1].value);

    //Checking if it's a number
    if (!isNaN(grade) && !isNaN(total) && total > 0){
        //Calculate and display percent of that row
        newgrade.parentElement.parentElement.children[4].innerHTML = ((grade / total) * 100).toFixed(2) + "%"; 
    }
    else {
        newgrade.parentElement.parentElement.children[4].innerHTML = '';
    }
}

// Updating total and calculate new percentage
function totalUpdate(newtotal){
    //Accessing the total 
    var grade = parseFloat(newtotal.parentElement.children[0].value);
    var total = parseFloat(newtotal.value); 

    //Calculate and display percent of that row and check if it's a number
    if (!isNaN(grade) && !isNaN(total) && total > 0){
        newtotal.parentElement.parentElement.children[4].innerHTML = ((grade/total)*100).toFixed(2) + "%"; 
    }
    else {
        newtotal.parentElement.parentElement.children[4].innerHTML = '';
    }
}

// Calculating mean grade button
document.getElementById('meangrade').addEventListener('click', CalculateMean);

// Calculating mean grade function
function CalculateMean(){
    var sum = 0;
    for (var i = 1; i <= curRow; i++){
        var grade = parseFloat(document.getElementById('grade' + i).value);
        var total = parseFloat(document.getElementById('total' + i).value);

        // Check if number and add to sum
        if (!isNaN(grade) && !isNaN(total) && total > 0){
            sum += grade / total;
        }
    }
    var mean = sum / curRow;
    document.getElementById("result").innerHTML = "Mean Grade: " + mean*100 + "%";
}


// Calculating weighted grade button
document.getElementById('weightedgrade').addEventListener('click', CalculateWeighted);

// Calculating weighted grade function
function CalculateWeighted(){
    var sum = 0;
    var totalweight = 0;
    for (var i = 1; i <= curRow; i++){
        var grade = parseFloat(document.getElementById('grade'+i).value);
        var total = parseFloat(document.getElementById('total'+i).value);
        var weight = parseFloat(document.getElementById('weight'+i).value);
        
        // Check if it's number
        if (!isNaN(grade) && !isNaN(total) && !isNaN(weight) && total > 0){
            // sum up total weighted grades and sum of total weight
            sum += (grade / total)*weight;
            totalweight += weight;
        }
    }
    var weighted = sum / totalweight;
    if (totalweight == 0){
        document.getElementById("result").innerHTML = "Weighted Grade: 0%";
    }
    else{
        document.getElementById("result").innerHTML = "Weighted Grade: " + weighted*100 + "%";
    }
    
}