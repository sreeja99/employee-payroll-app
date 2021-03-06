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
      checkName(name.value);
      setTextValue(".text-error", "");
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
const save =(event) => {
  event.preventDefault();
  event.stopPropagation();
  console.log("submit");
  try{
    setEmployeePayrollObject();
    if(site_properties.use_local_storage.match("true")){
    createAndUpdateStorage();
    resetForm();
    window.location.replace( site_properties.home_page);
    }
    else{
      createOrUpdateEmployeePayroll();
    }
  }catch(e){
    console.log(e);
    return;
  }
}
const createOrUpdateEmployeePayroll = () => {
  let postURL =site_properties.server_url;
  let methodCall ="POST";
  if(isUpdate){
    methodCall ="PUT";
    postURL=postURL +"/"+ employeePayrollObj.id.toString();
    console.log(postURL+"line50");
  }
  makeServicecall(methodCall,postURL,true,employeePayrollObj)
  .then(responseText => {
    resetForm();
    window.location.replace(site_properties.home_page);
  })
  .catch(error => {
    throw error;
  });
}
const setEmployeePayrollObject = () => {
  if (!isUpdate && site_properties.use_local_storage.match("true")) {
    employeePayrollObj.id = new Date().getTime();
}
  employeePayrollObj._name = getInputValueById("#name");
  employeePayrollObj._profilePic = getSelectedValues("[name=profile]").pop();
  employeePayrollObj._gender = getSelectedValues("[name=gender]").pop();
  employeePayrollObj._department = getSelectedValues("[name=department]");
  employeePayrollObj._salary = getInputValueById("#salary");
  employeePayrollObj._note = getInputValueById("#notes");
  employeePayrollObj._startDate = new Date(getInputValueById("#year") + " " + getInputValueById("#month") + " " + getInputValueById("#day"));
}
;

const createAndUpdateStorage = () => {
  console.log("update");
  let employeePayrollList = JSON.parse(
      localStorage.getItem("EmployeePayrollList")
  );
  if (employeePayrollList) {
      let empPayrollData = employeePayrollList.find(
          (employee) => employee.id == employeePayrollObj.id
      );
      if (!empPayrollData) employeePayrollList.push(employeePayrollObj);
      else {
          const index = employeePayrollList
              .map((emp) => emp.id)
              .indexOf(empPayrollData.id);
          employeePayrollList.splice(
              index,
              1,
              employeePayrollObj
          );
      }
  } else {
      employeePayrollList = [employeePayrollObj];
  }
  localStorage.setItem(
      "EmployeePayrollList",
      JSON.stringify(employeePayrollList)
  );
};
const  createEmployeePayrollData = (id) => {
  let employeePayrollData =new EmployeePayroll();
  if(!id) employeePayrollData.id =createNewEmployeeId();
  else employeePayrollData.id =id;
  setEmployeePayrollData(employeePayrollData);
  return employeePayrollData;
}
const setEmployeePayrollData = (employeePayrollData) => {
  try {
      employeePayrollData.name = employeePayrollObj._name;
  } catch (e) {
      setTextValue(".text-error", e);
      throw e
  }
  employeePayrollData.profilePic = employeePayrollObj._profilePic;
  employeePayrollData.gender = employeePayrollObj._gender;
  employeePayrollData.department = employeePayrollObj._department;
  employeePayrollData.salary = employeePayrollObj._salary;
  employeePayrollData.note = employeePayrollObj._note;
  try {
      employeePayrollData.startDate = employeePayrollObj._startDate;
  } catch (e) {
      setTextValue(".date-error", e);
      throw e;
  }
  alert(employeePayrollData.toString());
};
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
  //let date = employeePayrollObj._startDate.split("-");
  //setValue("#day", parseInt(date[2].substring(0, 2)));
  //setValue("#month", date[1]);
  //setValue("#year", date[0]);
  let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
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


