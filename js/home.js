window.addEventListener("DOMContentLoaded", (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml =
        "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Day</th><th>Actions</th></tr>";
    let innerHtml = `${headerHtml}`;
    let empList = createEmployeePayrollJSON();
    for (let emp of empList) {
        innerHtml = `${innerHtml}  
            <tr>
            <td>
              <img src="${emp._profilePic}" alt="P" class="profile">
            </td>
            <td>${emp._name}</td>
            <td>${emp._gender}</td>
            <td>${getDeptHtml(emp._department)}</td>
            <td>${emp._salary}</td>
            <td>${emp._startDate}</td>
            <td>
            <img id="1" onclick="remove(this)" src="../assets/delete-black-18dp.svg" alt="Delete">
            <img id="1" onclick="update(this)" src="../assets/create-black-18dp.svg" alt="Edit">
            </td>
            </tr>
            `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
};

const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [{
            _name: "Sreeja Godishala",
            _profilePic: "../assets/Ellipse -1.png",
            _gender: "Male",
            _department: ["Others"],
            _salary: "40000",
            _note: "",
            _startDate: "16 Sep 2020",
        },
        {
            _name: "Mohit Kumar",
            _profilePic: "../assets/Ellipse -2.png",
            _gender: "Male",
            _department: ["HR", "Others"],
            _salary: "100000",
            _note: "I'm groot.",
            _startDate: "01 Jan 2018",
        },
        {
            _name: "Rahul Gupta",
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
