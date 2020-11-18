window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.querySelector("#name");
  const textError = document.querySelector(".text-error");
  name.addEventListener("input", function () {
    const nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
    if (nameRegex.test(name.value)) {
      textError.textContent="";
    }
    else 
    textError.textContent="Wrong name";
  });
const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
output.textContent = salary.value;
salary.addEventListener("input", function () {
    output.textContent = salary.value;
  });
});
const save =() => {
  console.log("submit");
  try{
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
  }catch(e){
    return;
  }
}
function createAndUpdateStorage(employeePayrollData) {
  let empList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (empList != undefined) {
      empList.push(employeePayrollData);
  } else {
      empList = [employeePayrollData];
  }
  localStorage.setItem("EmployeePayrollList", JSON.stringify(empList));
  alert(localStorage.getItem("EmployeePayrollList"));
}

const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayroll();
  try{
    employeePayrollData.name = getInputValueById('#name');
  }catch(e){
    setTextValue('.text-error',e);
    throw e;
  }
  employeePayrollData.profilePic =getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary =getInputValueById('#salary');
  employeePayrollData.note =getInputValueById('#notes');
  let date= getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
  employeePayrollData.date = Date.parse(date);
  alert(employeePayrollData.toString());
  return employeePayrollData;
}
const getSelectedValues =(propertyValue) =>{
  let allItems =document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item =>{
    if(item.checked) selItems.push(item.value);
  });
  return selItems;
}
const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}
const getInputElementValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
}

