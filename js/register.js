const commonFields = ["fullName", "email", "phone", "gender", "dob",
                      "newUsername", "newPassword", "confirmPassword"];

const customerFields = ["licenseNo", "preferredBranch", "budgetRange"];
const sellerFields   = ["sellerNid", "sellerType", "experience", "shift"];
const vendorFields   = ["tradeLicense", "suppliedBrand", "companyName", "warehouseAddress"];


function showTypeFields() {
  let type = getRadioValue("userType");

  document.getElementById("formBody").style.display = (type === "") ? "none" : "block";

  document.getElementById("customerFields").style.display = (type === "Customer") ? "block" : "none";
  document.getElementById("sellerFields").style.display   = (type === "Seller")   ? "block" : "none";
  document.getElementById("vendorFields").style.display   = (type === "Vendor")   ? "block" : "none";

  document.getElementById("typeCardCustomer").className = (type === "Customer") ? "type-option selected" : "type-option";
  document.getElementById("typeCardSeller").className   = (type === "Seller")   ? "type-option selected" : "type-option";
  document.getElementById("typeCardVendor").className   = (type === "Vendor")   ? "type-option selected" : "type-option";

  if (type !== "") {
    document.getElementById("registerButton").value = "Create " + type + " Account";
  }

  clearAllRegisterErrors();
}


function validateRegister() {
  let type = getRadioValue("userType");
  clearAllRegisterErrors();

  if (type === "") {
    showError("userType", "Please choose the type of account.");
    return false;
  }

  let commonOk = validateCommon(type);
  let typeOk;

  switch (type) {
    case "Customer":
      typeOk = validateCustomer();
      break;
    case "Seller":
      typeOk = validateSeller();
      break;
    case "Vendor":
      typeOk = validateVendor();
      break;
  }

  if (!(commonOk && typeOk)) {
    showMessage("registerMessage", "Please fix the fields marked in red.", "error");
    return false;
  }

  let newUser = {
    id: nextId("U", users),
    name: document.getElementById("fullName").value.trim(),
    username: document.getElementById("newUsername").value.trim(),
    password: document.getElementById("newPassword").value,
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    gender: getRadioValue("gender"),
    dob: document.getElementById("dob").value,
    role: type,
    status: "Active"
  };

  if (type === "Customer") {
    newUser.licenseNo = document.getElementById("licenseNo").value.trim().toUpperCase();
    newUser.preferredBranch = document.getElementById("preferredBranch").value;
    newUser.budgetRange = document.getElementById("budgetRange").value;
    newUser.favouriteBikes = getCheckedValues("favouriteBike");
  } else if (type === "Seller") {
    newUser.sellerNid = document.getElementById("sellerNid").value.trim().toUpperCase();
    newUser.sellerType = document.getElementById("sellerType").value;
    newUser.experience = Number(document.getElementById("experience").value);
    newUser.shift = getRadioValue("shift");
    newUser.status = "Pending";
  } else {
    newUser.tradeLicense = document.getElementById("tradeLicense").value.trim().toUpperCase();
    newUser.suppliedBrand = document.getElementById("suppliedBrand").value;
    newUser.companyName = document.getElementById("companyName").value.trim();
    newUser.warehouseAddress = document.getElementById("warehouseAddress").value.trim();
    newUser.supplyTypes = getCheckedValues("supplyType");
    newUser.status = "Pending";
  }

  users.push(newUser);
  console.log("New user:", newUser);

  let text = "Welcome, <strong>" + newUser.name + "</strong>! Your " + type.toLowerCase() +
             " account was created (user id " + newUser.id + "). ";
  if (newUser.status === "Pending") {
    text += "An admin will verify your details; you can log in after approval.";
  } else {
    text += "<a href='login.html'>Log in now</a>.";
  }
  text += "<br><span class='hint'>Frontend version: the account is kept until this page reloads. " +
          "The PHP backend will save it permanently.</span>";
  showMessage("registerMessage", text, "success");

  document.getElementById("registerForm").reset();
  resetRegisterForm();
  return false;
}


function validateCommon(type) {
  let isValid = true;

  let fullName = document.getElementById("fullName").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let dob = document.getElementById("dob").value;
  let username = document.getElementById("newUsername").value.trim();
  let password = document.getElementById("newPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (fullName.length < 3) {
    showError("fullName", "Full name must be at least 3 characters.");
    isValid = false;
  }

  if (isEmpty(email)) {
    showError("email", "Email is required.");
    isValid = false;
  } else if (isValidEmail(email) === false) {
    showError("email", "Please enter a valid email address.");
    isValid = false;
  } else if (isTaken("email", email)) {
    showError("email", "An account with this email already exists.");
    isValid = false;
  }

  if (isDigitsOnly(phone) === false || phone.length !== 11 || phone.slice(0, 2) !== "01") {
    showError("phone", "Phone must be 11 digits and start with 01.");
    isValid = false;
  }

  if (getRadioValue("gender") === "") {
    showError("gender", "Please select an option.");
    isValid = false;
  }

  let minimumAge;
  switch (type) {
    case "Vendor":
      minimumAge = 21;
      break;
    case "Seller":
      minimumAge = 18;
      break;
    default:
      minimumAge = 16;
  }

  if (dob === "") {
    showError("dob", "Date of birth is required.");
    isValid = false;
  } else if (daysBetween(dob, todayString()) / 365 < minimumAge) {
    showError("dob", "A " + type.toLowerCase() + " must be at least " + minimumAge + " years old.");
    isValid = false;
  }

  if (username.length < 4) {
    showError("newUsername", "Username must be at least 4 characters.");
    isValid = false;
  } else if (username.indexOf(" ") !== -1) {
    showError("newUsername", "Username cannot contain spaces.");
    isValid = false;
  } else if (isTaken("username", username)) {
    showError("newUsername", "This username is already taken.");
    isValid = false;
  }

  if (password.length < 8) {
    showError("newPassword", "Password must be at least 8 characters.");
    isValid = false;
  } else if (hasDigit(password) === false) {
    showError("newPassword", "Password must contain at least one digit.");
    isValid = false;
  }

  if (confirmPassword === "" || confirmPassword !== password) {
    showError("confirmPassword", "Password and Confirm Password must match.");
    isValid = false;
  }

  return isValid;
}


function validateCustomer() {
  let isValid = true;
  let licenseNo = document.getElementById("licenseNo").value.trim().toUpperCase();

  if (isValidLicenseNo(licenseNo) === false) {
    showError("licenseNo", "Use the format DL-23-51234.");
    isValid = false;
  } else if (isTaken("licenseNo", licenseNo)) {
    showError("licenseNo", "This driving license number is already registered.");
    isValid = false;
  }

  if (document.getElementById("preferredBranch").value === "") {
    showError("preferredBranch", "Please select your preferred showroom.");
    isValid = false;
  }

  if (document.getElementById("budgetRange").value === "") {
    showError("budgetRange", "Please select your budget range.");
    isValid = false;
  }

  return isValid;
}


function validateSeller() {
  let isValid = true;
  let sellerNid = document.getElementById("sellerNid").value.trim().toUpperCase();
  let experienceText = document.getElementById("experience").value;
  let experience = Number(experienceText);

  let isSlrFormat = (sellerNid.length === 8 && sellerNid.slice(0, 4) === "SLR-" && isDigitsOnly(sellerNid.slice(4)));
  let isNidFormat = (sellerNid.length === 10 && isDigitsOnly(sellerNid));

  if (isSlrFormat === false && isNidFormat === false) {
    showError("sellerNid", "Use the format SLR-1234 or a 10-digit NID.");
    isValid = false;
  } else if (isTaken("sellerNid", sellerNid)) {
    showError("sellerNid", "This Seller ID / NID is already registered.");
    isValid = false;
  }

  if (document.getElementById("sellerType").value === "") {
    showError("sellerType", "Please select your seller category.");
    isValid = false;
  }

  if (experienceText === "" || experience < 0 || experience > 40) {
    showError("experience", "Enter a number from 0 to 40.");
    isValid = false;
  }

  if (getRadioValue("shift") === "") {
    showError("shift", "Please choose a duty shift.");
    isValid = false;
  }

  return isValid;
}


function validateVendor() {
  let isValid = true;
  let tradeLicense = document.getElementById("tradeLicense").value.trim().toUpperCase();
  let companyName = document.getElementById("companyName").value.trim();
  let warehouseAddress = document.getElementById("warehouseAddress").value.trim();

  if (tradeLicense.length < 9 || tradeLicense.slice(0, 5) !== "TRAD-") {
    showError("tradeLicense", "Use the format TRAD-DHK-9001.");
    isValid = false;
  } else if (isTaken("tradeLicense", tradeLicense)) {
    showError("tradeLicense", "This Trade License is already registered.");
    isValid = false;
  }

  if (document.getElementById("suppliedBrand").value === "") {
    showError("suppliedBrand", "Please select the primary motorcycle brand.");
    isValid = false;
  }

  if (companyName.length < 3) {
    showError("companyName", "Please enter your company or agency name.");
    isValid = false;
  }

  if (warehouseAddress.length < 10) {
    showError("warehouseAddress", "Please write the full warehouse address (at least 10 characters).");
    isValid = false;
  } else if (warehouseAddress.length > 200) {
    showError("warehouseAddress", "Address must be 200 characters or less.");
    isValid = false;
  }

  return isValid;
}


function isTaken(property, value) {
  for (const user of users) {
    if (user[property] !== undefined && String(user[property]).toLowerCase() === value.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function isValidLicenseNo(text) {
  if (text.length !== 11 || text.slice(0, 3) !== "DL-" || text[5] !== "-") {
    return false;
  }
  return isDigitsOnly(text.slice(3, 5)) && isDigitsOnly(text.slice(6));
}

function hasDigit(text) {
  let digits = "0123456789";
  for (let i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function getCheckedValues(groupName) {
  let boxes = document.getElementsByName(groupName);
  let selected = [];
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      selected.push(boxes[i].value);
    }
  }
  return selected;
}

function showPasswordStrength() {
  let password = document.getElementById("newPassword").value;
  let text = document.getElementById("strengthText");
  let score = 0;

  if (password.length >= 8) { score++; }
  if (password.length >= 12) { score++; }
  if (hasDigit(password)) { score++; }
  if (password.toLowerCase() !== password) { score++; }

  if (password === "") {
    text.innerHTML = "";
  } else if (score <= 1) {
    text.innerHTML = "Strength: weak";
    text.style.color = "#DC2626";
  } else if (score <= 2) {
    text.innerHTML = "Strength: fair";
    text.style.color = "#D97706";
  } else {
    text.innerHTML = "Strength: strong";
    text.style.color = "#059669";
  }
}

function toggleRegisterButton() {
  document.getElementById("registerButton").disabled = !document.getElementById("terms").checked;
}

function clearAllRegisterErrors() {
  clearError("userType");
  clearErrors(commonFields);
  clearErrors(customerFields);
  clearErrors(sellerFields);
  clearErrors(vendorFields);
}

function resetRegisterForm() {
  clearAllRegisterErrors();
  document.getElementById("formBody").style.display = "none";
  document.getElementById("typeCardCustomer").className = "type-option";
  document.getElementById("typeCardSeller").className   = "type-option";
  document.getElementById("typeCardVendor").className   = "type-option";
  document.getElementById("registerButton").disabled = true;
  document.getElementById("registerButton").value = "Create Account";
  document.getElementById("strengthText").innerHTML = "";
}