const stringifyDate = (date) => {
    let startDate = new Date(date);
    const options = {
        year: 'numeric', month: 'short', day: 'numeric'
    }; 
    const empDate = !startDate ? "undefined" : startDate.toLocaleDateString("en-IN", options);
    return empDate;
}
const checkName = (name) => {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}\\s?([A-Z]{1}[a-z]{1,}\\s?){0,2}$");
    if (!nameRegex.test(name)) throw "Given name is in wrong format";
};
const checkStartDate = (startDate) => {
    let now = new Date();
    if (startDate > now) throw 'start date is future date';
    var diff =Math.abs(now.getTime()-startDate.getTime());
    if(diff/(1000*60*60*24)>30)
      throw 'StartDate is beyond 30  days';
};