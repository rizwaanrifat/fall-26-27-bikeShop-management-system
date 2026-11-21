function showSection(sectionId) {
  for (let i = 0; i < sections.length; i++) {
    let section = document.getElementById(sections[i]);
    let navButton = document.getElementById("nav-" + sections[i]);

    if (sections[i] === sectionId) {
      section.style.display = "block";
      navButton.className = "active";
    } else {
      section.style.display = "none";
      navButton.className = "";
    }
  }
}



function showError(fieldId, message) {
  document.getElementById(fieldId + "Error").innerHTML = message;

  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "2px solid red";
  }
}

function clearError(fieldId) {
  document.getElementById(fieldId + "Error").innerHTML = "";

  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "";  
  }
}


function clearErrors(fieldIds) {
  for (let i = 0; i < fieldIds.length; i++) {
    clearError(fieldIds[i]);
  }
}



function showMessage(boxId, text, type) {
  let box = document.getElementById(boxId);
  box.innerHTML = text;
  box.className = "message " + type;
  box.style.display = "block";
}

function hideMessage(boxId) {
  document.getElementById(boxId).style.display = "none";
}





function isEmpty(value) {
  return value.trim() === "";
}


function isValidEmail(email) {
  let atPosition = email.indexOf("@");
  let dotPosition = email.indexOf(".", atPosition);

  if (atPosition < 1) {
    return false;                      
  }
  if (dotPosition < atPosition + 2) {
    return false;                      
  }
  if (dotPosition === email.length - 1) {
    return false;                      
  }
  return true;
}


function isDigitsOnly(text) {
  if (text.length === 0) {
    return false;
  }
  let digits = "0123456789";
  for (let i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) === -1) {
      return false;
    }
  }
  return true;
}


function getRadioValue(groupName) {
  let radios = document.getElementsByName(groupName);
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return "";
}


function setRadioValue(groupName, value) {
  let radios = document.getElementsByName(groupName);
  for (let i = 0; i < radios.length; i++) {
    radios[i].checked = (radios[i].value === value);
  }
}



function containsText(text, keyword) {
  return String(text).toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
}





function findIndexById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return i;
    }
  }
  return -1;
}


function removeAt(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}


function nextId(prefix, list) {
  let biggest = 0;
  let digits = 3;
  for (let i = 0; i < list.length; i++) {
    let numberText = list[i].id.slice(prefix.length + 1);  
    digits = numberText.length;
    if (Number(numberText) > biggest) {
      biggest = Number(numberText);
    }
  }


  let newNumber = String(biggest + 1);
  while (newNumber.length < digits) {
    newNumber = "0" + newNumber;
  }
  return prefix + "-" + newNumber;
}


function todayString() {
  let now = new Date();
  let month = now.getMonth() + 1;      
  let day = now.getDate();
  if (month < 10) { month = "0" + month; }
  if (day < 10) { day = "0" + day; }
  return now.getFullYear() + "-" + month + "-" + day;
}


function addDays(dateText, days) {
  let date = new Date(dateText + "T00:00");  
  date.setDate(date.getDate() + days);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) { month = "0" + month; }
  if (day < 10) { day = "0" + day; }
  return date.getFullYear() + "-" + month + "-" + day;
}


function daysBetween(firstDate, secondDate) {
  let oneDay = 1000 * 60 * 60 * 24;          
  let difference = new Date(secondDate + "T00:00") - new Date(firstDate + "T00:00");
  return Math.round(difference / oneDay);
}


function nowString() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  return todayString() + " " + hours + ":" + minutes;
}



function renderCatalog() {
  let keyword = document.getElementById("catalogSearch").value;
  let category = document.getElementById("catalogCategory").value;

  let cards = "";
  let shown = 0;

  for (const bike of bikes) {
    let matchesKeyword = containsText(bike.brand, keyword) ||
                         containsText(bike.model, keyword) ||
                         containsText(bike.cc, keyword) ||
                         containsText(bike.id, keyword);
    let matchesCategory = (category === "All" || bike.category === category);

    if (matchesKeyword && matchesCategory) {
      let status;
      if (bike.stock > showroomRules.lowStockLimit) {
        status = "<span class='badge green'>" + bike.stock + " in stock</span>";
      } else if (bike.stock > 0) {
        status = "<span class='badge orange'>Low stock (" + bike.stock + ")</span>";
      } else {
        status = "<span class='badge red'>Out of stock</span>";
      }

      cards += "<div class='bike-card'>" +
                 "<div class='bike-img-box'>" +
                   "<img src='" + bike.image + "' alt='" + bike.brand + " " + bike.model + "'>" +
                   "<div class='bike-status-tag'>" + status + "</div>" +
                 "</div>" +
                 "<div class='bike-card-body'>" +
                   "<div class='bike-meta'>" +
                     "<span class='bike-id'>" + bike.id + "</span>" +
                     "<span class='bike-cat'>" + bike.category + "</span>" +
                   "</div>" +
                   "<h3 class='bike-title'>" + bike.brand + " " + bike.model + "</h3>" +
                   "<p class='bike-specs'>" + bike.cc + " CC &middot; " + bike.mileage + " &middot; " + bike.braking + "</p>" +
                   "<div class='bike-footer'>" +
                     "<span class='bike-price'>" + bike.price.toLocaleString() + " Tk</span>" +
                     "<a href='auth/login.html' class='btn btn-small'>Details</a>" +
                   "</div>" +
                 "</div>" +
               "</div>";
      shown++;
    }
  }

  if (shown === 0) {
    cards = "<p class='empty-row' style='grid-column: 1 / -1;'>No motorcycles match your search.</p>";
  }

  document.getElementById("catalogBody").innerHTML = cards;
  document.getElementById("catalogCount").innerHTML = shown + " motorcycle(s) found";
}