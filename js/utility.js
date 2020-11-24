const stringifyDate = (date) => {
    let startDate = new Date(date);
    const options = {
        year: 'numeric', month: 'short', day: 'numeric'
    }; 
    const empDate = !startDate ? "undefined" : startDate.toLocaleDateString("en-IN", options);
    return empDate;
}