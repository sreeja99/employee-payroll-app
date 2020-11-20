let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.querySelector("#name");
  const textError = document.querySelector(".text-error");
  name.addEventListener("input", function() {
    if (name.value.length == 0) {
        textError.textContent = "";
        return;
    }
    try {
        new EmployeePayroll().name = name.value;
        textError.textContent = "";
    } catch (e) {
        textError.textContent = e;
    }
});
const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
salary.addEventListener("input", function () {
    output.textContent = salary.value;
  });
  checkForUpdate();
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
const resetForm = () => {
  setValue('#name', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setValue('#notes', '');
  setValue('#day', '1');
  setValue('#month', 'Jan');
  setValue('#year', '2020');
}
const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      item.checked = false;
  });
}
const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
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
  employeePayrollData.id = createNewEmployeeId();
  employeePayrollData.profilePic =getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary =getInputValueById('#salary');
  employeePayrollData.note =getInputValueById('#notes');
  let date= getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
  console.log(date);
  employeePayrollData.startDate = new Date(date);
  alert(employeePayrollData.toString());
  return employeePayrollData;
}

const createNewEmployeeId = () => {
  let empID = localStorage.getItem("EmployeeID");
  empID = !empID ? 1 : (parseInt(empID) + 1).toString();
  localStorage.setItem("EmployeeID", empID);
  return empID;
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
const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem("editEmp");
  isUpdate = employeePayrollJson ? true : false;
  if (!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
};
const setForm = () => {
  setValue("#name", employeePayrollObj._name);
  setSelectedValues("[name=profile]", employeePayrollObj._profilePic);
  setSelectedValues("[name=gender]", employeePayrollObj._gender);
  setSelectedValues("[name=department]", employeePayrollObj._department);
  setValue("#salary", employeePayrollObj._salary);
  setTextValue(".salary-output", employeePayrollObj._salary);
  setValue("#notes", employeePayrollObj._note);
  let date = employeePayrollObj._startDate.split("-");
  setValue("#day", parseInt(date[2].substring(0, 2)));
  setValue("#month", date[1]);
  setValue("#year", date[0]);
};
const setSelectedValues = (propertyValue, value) => {
  document.querySelectorAll(propertyValue).forEach((item) => {
      if (Array.isArray(value)) {
          if (value.includes(item.value)) {
              item.checked = true;
          }
      } else if (item.value === value) item.checked = true;
  });
};
const setTextValue = (id, value) => {
  document.querySelector(id).textContent = value;
};
const setTextValue = (id, value) => {
  document.querySelector(id).textContent = value;
};

