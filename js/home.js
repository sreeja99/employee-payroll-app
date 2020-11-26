let empPayrollList = [];
window.addEventListener("DOMContentLoaded", (event) => {
   if(site_properties.use_local_storage.match("true")){
       getEmpDetailsFromLocalStorage();
   }
   else getEmpDetailsFromServer();
});

const getEmpDetailsFromLocalStorage = () => {
    return localStorage.getItem("EmployeePayrollList") ?
        JSON.parse(localStorage.getItem("EmployeePayrollList")) :
        [];
        processEmployeePayrollDataResponse();
};
const processEmployeePayrollDataResponse =() => {
    document.querySelector(".emp-count").textContent =empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}
const getEmpDetailsFromServer = () => {
    console.log("service");
    makeServicecall("GET",site_properties.server_url,true)
    .then(responseText =>{
        empPayrollList =JSON.parse(responseText);
        processEmployeePayrollDataResponse();
    })
    .catch(error => {
        console.log("GET Error Status:"+JSON.stringify(error));
        empPayrollList =[];
        processEmployeePayrollDataResponse();
    });
}
const createInnerHtml = () => {
    const headerHtml =
        "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Day</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    for (let emp of empPayrollList) {
        console.log(emp._profilePic);
        innerHtml = `${innerHtml}  
            <tr>
            <td>
               <img src="${emp._profilePic}" alt="P" class="profile">
            </td>
            <td>${emp._name}</td>
            <td>${emp._gender}</td>
            <td>${getDeptHtml(emp._department)}</td>
            <td>${emp._salary}</td>
            <td>${stringifyDate(emp._startDate)}</td>
            <td>
            <img id="${
                emp.id
              }" onclick="remove(this)" src="../assets/delete-black-18dp.svg" alt="Delete">
              <img id="${
                emp.id
              }" onclick="update(this)" src="../assets/create-black-18dp.svg" alt="Edit">
            </td>
            </tr>
            `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
};


const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [{
            _name: "Arjun Gupta",
            _profilePic: "../assets/Ellipse -8.png",
            _gender: "Male",
            _department: ["Others"],
            _salary: "40000",
            _note: "",
            _startDate: "16 Sep 2020",
        },
        {
            _name: "Random 2",
            _profilePic: "../assets/Ellipse -2.png",
            _gender: "Male",
            _department: ["HR", "Others"],
            _salary: "100000",
            _note: "I'm groot.",
            _startDate: "01 Jan 2018",
        },
        {
            _name: "Random 3",
            _profilePic: "../assets/Ellipse -3.png",
            _gender: "Male",
            _department: ["Others"],
            _salary: "40000",
            _note: "",
            _startDate: "02 Aug 2019",
        },
    ];
    return employeePayrollListLocal;
};

const getDeptHtml = (deptList) => {
    let deptHtml = "";
    for (const dept of deptList)
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
    return deptHtml;
};

const remove = (node) => {
    console.log(node.id);
    let empData = empPayrollList.find((emp) => emp.id == node.id);
    if (!empData) return;
    const index = empPayrollList
        .map((emp) => emp.id)
        .indexOf(empData.id);
    empPayrollList.splice(index, 1);
    if(site_properties.use_local_storage.match("true")){
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    }
    else{
        const deleteURL = site_properties.server_url +"/"+empData.id.toString();
        makeServicecall("DELETE",deleteURL,false)
        .then(responseText => {
            createInnerHtml();
        })
        .catch(error => {
            console.log("DElETE ERROR STATUS:"+JSON.stringify(error));
        });
    }

}
const update = (node) => {
    console.log(node.id);
    let empData = empPayrollList.find((emp) => emp.id == node.id);
    if (!empData) return;
    localStorage.setItem("editEmp", JSON.stringify(empData));
    window.location.href = site_properties.add_emp_payroll_page;
};

