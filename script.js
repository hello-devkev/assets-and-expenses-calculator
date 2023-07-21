//Global Scope Function to allow calcSalary and exportToCSV to access
let selectFilingToCalc;
let currentSingleFederalTax = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37]
let currentMarriedFederalTax = [];
let currentHeadFederalTax = [];

// Main Calculator Function
function calcSalary() {
    let wage = parseFloat(document.getElementById('txt_wage').value);
    let hours = parseFloat(document.getElementById('txt_hours').value);
    let calculate = wage * hours * 52;

    document.getElementById('results').innerHTML = '$ ' + calculate.toFixed(2);

    // Single or Married Filing Separately Tax Calculation
    let calculateSingle;

    if (0 < calculate && calculate <= 10099) {
        calculateSingle = calculate * 0.99;
    } else if (10100 < calculate && calculate <= 23942) {
        calculateSingle = calculate * 0.98;
    } else if (23943 < calculate && calculate <= 52455) {
        calculateSingle = calculate * 0.96;
    } else if (52456 < calculate && calculate <= 66295) {
        calculateSingle = calculate * 0.94;
    } else if (66296 < calculate && calculate <= 92705) {
        calculateSingle = calculate * 0.92;
    } else if (92706 < calculate && calculate <= 118713) {
        calculateSingle = calculate * 0.907;
    } else if (118714 < calculate && calculate <= 150473) {
        calculateSingle = calculate * 0.897;
    } else if (150474 < calculate && calculate <= 194544) {
        calculateSingle = calculate * 0.887;
    } else {
        calculateSingle = calculate * 0.877;
    }

    // Married (Jointly) or Widowed Tax Calculation
    let calculateMarried;

    if (0 < calculate && calculate <= 20198) {
        calculateMarried = calculate * 0.99;
    } else if (20199 < calculate && calculate <= 47884) {
        calculateMarried = calculate * 0.98;
    } else if (47885 < calculate && calculate <= 75576) {
        calculateMarried = calculate * 0.96;
    } else if (75577 < calculate && calculate <= 104910) {
        calculateMarried = calculate * 0.94;
    } else if (104911 < calculate && calculate <= 132590) {
        calculateMarried = calculate * 0.92;
    } else if (132591 < calculate && calculate <= 677278) {
        calculateMarried = calculate * 0.907;
    } else if (677279 < calculate && calculate <= 812728) {
        calculateMarried = calculate * 0.897;
    } else if (812729 < calculate && calculate <= 1354550) {
        calculateMarried = calculate * 0.887;
    } else {
        calculateMarried = calculate * 0.877;
    }

    //Head of Household Tax Calculation

    let calculateHead;

    if (0 < calculate && calculate <= 20212) {
        calculateHead = calculate * 0.99;
    } else if (20213 < calculate && calculate <= 47887) {
        calculateHead = calculate * 0.98;
    } else if (47888 < calculate && calculate <= 61730) {
        calculateHead = calculate * 0.96;
    } else if (61731 < calculate && calculate <= 76397) {
        calculateHead = calculate * 0.94;
    } else if (76398 < calculate && calculate <= 90240) {
        calculateHead = calculate * 0.92;
    } else if (90241 < calculate && calculate <= 460547) {
        calculateHead = calculate * 0.907;
    } else if (460548 < calculate && calculate <= 552658) {
        calculateHead = calculate * 0.897;
    } else if (552659 < calculate && calculate <= 921095) {
        calculateHead = calculate * 0.887;
    } else {
        calculateHead = calculate * 0.877;
    }

    const selectedValue = document.getElementById('select').value;
    switch (selectedValue) {
        case "single":
            selectFilingToCalc = calculateSingle;
            break;
        case "married":
            selectFilingToCalc = calculateMarried;
            break;
        case "head":
            selectFilingToCalc = calculateHead;
            break;
    }

    document.getElementById('adjustedresults').innerHTML = '$ ' + selectFilingToCalc.toFixed(2);
}

function reset() {
    document.getElementById('txt_wage').value = '';
    document.getElementById('txt_hours').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('adjustedresults').innerHTML = '';
    document.getElementById('select').selectedIndex = 0;

    // Call calcSalary() to reset annual salary and adjusted salary
    calcSalary();
}

//Validation
function validateAndCalc() {
    const wageInput = document.getElementById('txt_wage');
    const hoursInput = document.getElementById('txt_hours');
    const selectInput = document.getElementById('select');

    const wageError = document.getElementById('wageError');
    const hoursError = document.getElementById('hoursError');
    const selectError = document.getElementById('selectError');

    let valid = true;

    // Validate wage input
    if (!wageInput.value || parseFloat(wageInput.value) <= 0) {
        wageError.style.display = 'block';
        valid = false;
    } else {
        wageError.style.display = 'none';
    }

    // Validate hours input
    if (!hoursInput.value || parseFloat(hoursInput.value) <= 0) {
        hoursError.style.display = 'block';
        valid = false;
    } else {
        hoursError.style.display = 'none';
    }

    // Validate select input
    if (selectInput.value === 'Select') {
        selectError.style.display = 'block';
        valid = false;
    } else {
        selectError.style.display = 'none';
    }

    if (valid) {
        calcSalary();
    }
}

function resetForm() {
    document.getElementById('txt_wage').value = '';
    document.getElementById('txt_hours').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('adjustedresults').innerHTML = '';
    document.getElementById('select').value = 'Select';
}

// Export to CSV function
function exportToCSV() {
    let wage = parseFloat(document.getElementById('txt_wage').value);
    let hours = parseFloat(document.getElementById('txt_hours').value);
    let calculate = wage * hours * 52;

    const data = [
        { field: 'Hourly Wage', value: wage.toFixed(2) },
        { field: 'Weekly Hours', value: hours.toFixed(2) },
        { field: 'Annual Salary', value: calculate.toFixed(2) },
        { field: 'Adjusted Salary', value: selectFilingToCalc.toFixed(2) }
    ];

    const header = 'Field,Value\n'; // CSV header
    const rows = data.map(item => `${item.field},${item.value}\n`); // Rows with data
    const csvContent = header + rows.join('');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'salary_data.csv';
    a.click();
    URL.revokeObjectURL(url);
}
