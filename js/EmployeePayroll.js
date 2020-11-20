class EmployeePayroll {
  get id() {
    return this._id;
  }
  set id(id) {
    if (parseInt(id) > 0) this._id = id;
    else throw "Given id format is incorrect";
  }
  get name() {
    return this._name;
  }
  set name(name) {
    const nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
    if (nameRegex.test(name)) this._name = name;
    else throw "Given name is in wrong format";
  }

  get profilePic() {
    return this._profilePic;
  }
  set profilePic(profilePic) {
    this._profilePic = profilePic;
  }

  get gender() {
    return this._gender;
  }
  set gender(gender) {
    this._gender = gender;
  }
  get department() {
    return this._department;
  }
  set department(department) {
    this._department = department;
  }
  get salary() {
    return this._salary;
  }
  set salary(salary) {
    this._salary = salary;
  }
  get note() {
    return this._note;
  }
  set note(note) {
    this._note = note;
  }
  get startDate() {
    return this._startDate;
  }
  set startDate(startDate) {
    if (startDate.toLocaleDateString <= new Date().toLocaleDateString)
        this._startDate = startDate;
    else throw "Start date is incorrect";
}

  toString() {
    const format = { year: "numeric", month: "long", day: "numeric" };
    const date =
      this.startDate === undefined
        ? "undefined"
        : this.startDate.toLocaleDateString("en-GB", format);
    return `id:${this.id},profilePic:${this.profilePic}, name:${this.name},department:${this.department}, salary:${this.salary}, gender:${this.gender}, startDate:${date}`;
  }
}
