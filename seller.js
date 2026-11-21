const sellerForm = document.querySelector("form");


function saveSeller() {

    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();

    let company = document.getElementById("bike_company").value;
    let model = document.getElementById("model").value.trim();
    let cc = document.getElementById("cc").value;
    let year = document.getElementById("year").value.trim();
    let mileage = document.getElementById("mileage").value.trim();

    let priceRange = document.getElementById("price_range").value;

    let isValid = true;

    if (fname === "" || lname === "" || address === "" ||
        city === "" || phone === "" || email === "") {
        isValid = false;
    }

    if (company === "" || model === "" || cc === "" ||
        year === "" || mileage === "") {
        isValid = false;
    }

    if (priceRange === "") {
        isValid = false;
    }

    if (isValid === false) {
        return false;
    }

    return true;
}


sellerForm.addEventListener("submit", function (event) {

    if (saveSeller() === false) {
        event.preventDefault();
    }

});
