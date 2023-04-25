function calcSalary() {
    var wage = parseFloat(document.getElementById('txt_wage').value);
    var hours = parseFloat(document.getElementById('txt_hours').value);
    var calculate = wage * hours * 52;

    document.getElementById('results').innerHTML = calculate;
}