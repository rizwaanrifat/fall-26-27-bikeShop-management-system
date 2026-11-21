const sections = ["usersSection", "profitSection", "restockSection", "discountSection"];

let editUserIndex = -1;


function addLog(type, message) {
  activityLog.push({ time: nowString(), user: "admin", type: type, message: message });
}


function checkRange(fieldId, min, max) {
  let text = document.getElementById(fieldId).value;
  let number = Number(text);

  if (text === "" || number < min || number > max) {
    showError(fieldId, "Enter a number from " + min + " to " + max + ".");
    return false;
  }
  return true;
}


function drawBarChart(chartId, names, counts, total) {
  let html = "";

  for (let i = 0; i < names.length; i++) {
    let percent = 0;
    if (total > 0) {
      percent = Math.round(counts[i] / total * 100);
    }
    html += "<div class='bar-row'>" +
              "<div class='bar-label'>" + names[i] + "</div>" +
              "<div class='bar-track'><div class='bar-fill' style='width:" + percent + "%'></div></div>" +
              "<div class='bar-value'>" + counts[i] + "</div>" +
            "</div>";
  }

  if (names.length === 0) {
    html = "<p class='empty-row'>No data available for chart.</p>";
  }

  document.getElementById(chartId).innerHTML = html;
}




function renderUsers() {
  let keyword = document.getElementById("userSearch").value;
  let roleFilter = document.getElementById("userRoleFilter").value;
  let statusFilter = document.getElementById("userStatusFilter").value;

  let rows = "";
  let shown = 0;

  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    let matchesKeyword = containsText(user.name, keyword) ||
                         containsText(user.username, keyword) ||
                         containsText(user.email, keyword) ||
                         containsText(user.phone, keyword) ||
                         containsText(user.id, keyword);
    let matchesRole = (roleFilter === "All" || user.role === roleFilter);
    let matchesStatus = (statusFilter === "All" || user.status === statusFilter);

    if (matchesKeyword && matchesRole && matchesStatus) {
      let statusColor;
      let approveButton = "";

      switch (user.status) {
        case "Active":
          statusColor = "green";
          break;
        case "Pending":
          statusColor = "orange";
          approveButton = "<button type='button' class='btn btn-small btn-success' onclick='approveUser(" + i + ")'>Approve</button>";
          break;
        default:
          statusColor = "red";
      }

      rows += "<tr>" +
                "<td>" + user.id + "</td>" +
                "<td><strong>" + user.name + "</strong><br><span class='hint'>Username: " + user.username + "</span></td>" +
                "<td>" + user.email + "<br><span class='hint'>" + (user.phone || "N/A") + "</span></td>" +
                "<td><span class='badge " + user.role.toLowerCase() + "'>" + user.role + "</span></td>" +
                "<td><span class='badge " + statusColor + "'>" + user.status + "</span></td>" +
                "<td>" +
                  approveButton +
                  "<button type='button' class='btn btn-small' onclick='editUser(" + i + ")'>Edit</button>" +
                  "<button type='button' class='btn btn-small btn-danger' onclick='deleteUser(" + i + ")'>Delete</button>" +
                "</td>" +
              "</tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='6' class='empty-row'>No user accounts match your search.</td></tr>";
  }

  document.getElementById("userTableBody").innerHTML = rows;
  document.getElementById("userCount").innerHTML = "Showing " + shown + " of " + users.length + " accounts";
}


function saveUser() {
  let name = document.getElementById("userName").value.trim();
  let email = document.getElementById("userEmail").value.trim();
  let phone = document.getElementById("userPhone").value.trim();
  let password = document.getElementById("userPassword").value;
  let role = document.getElementById("userRole").value;
  let status = getRadioValue("userStatus");

  let isValid = true;
  clearErrors(["userName", "userEmail", "userPhone", "userPassword", "userRole"]);

  if (name.length < 3) {
    showError("userName", "Name must be at least 3 characters.");
    isValid = false;
  }

  if (isValidEmail(email) === false) {
    showError("userEmail", "Please enter a valid email address.");
    isValid = false;
  } else if (emailUsedByOther(email)) {
    showError("userEmail", "Another account already uses this email.");
    isValid = false;
  }

  if (isDigitsOnly(phone) === false || phone.length !== 11 || phone.slice(0, 2) !== "01") {
    showError("userPhone", "Phone must be 11 digits starting with 01.");
    isValid = false;
  }

  if (password.length < 6) {
    showError("userPassword", "Password must be at least 6 characters.");
    isValid = false;
  }

  if (role === "") {
    showError("userRole", "Please choose a role.");
    isValid = false;
  }

  if (isValid === false) {
    return false;
  }

  let autoUsername = email.split("@")[0].toLowerCase();

  if (editUserIndex === -1) {
    let newUser = {
      id: nextId("U", users),
      name: name,
      username: autoUsername,
      email: email,
      phone: phone,
      password: password,
      role: role,
      status: status
    };
    users.push(newUser);
    addLog("User", "Created " + role.toLowerCase() + " account for " + name);
    showMessage("userMessage", "Account for <strong>" + name + "</strong> was added with ID " + newUser.id + ".", "success");
  } else {
    let user = users[editUserIndex];
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.password = password;
    user.role = role;
    user.status = status;

    addLog("User", "Updated account " + user.id + " (" + name + ")");
    showMessage("userMessage", "Account for <strong>" + name + "</strong> was updated.", "success");
  }

  resetUserForm();
  renderUsers();
  loadRestockSection();
  return false;
}


function emailUsedByOther(email) {
  for (let i = 0; i < users.length; i++) {
    if (i !== editUserIndex && users[i].email.toLowerCase() === email.toLowerCase()) {
      return true;
    }
  }
  return false;
}


function editUser(index) {
  let user = users[index];
  editUserIndex = index;

  document.getElementById("userName").value = user.name;
  document.getElementById("userEmail").value = user.email;
  document.getElementById("userPhone").value = user.phone || "";
  document.getElementById("userPassword").value = user.password;
  document.getElementById("userRole").value = user.role;
  setRadioValue("userStatus", user.status);

  document.getElementById("userFormTitle").innerHTML = "Edit Account " + user.id;
  document.getElementById("userSaveBtn").value = "Update Account";
  hideMessage("userMessage");
}


function deleteUser(index) {
  let user = users[index];

  if (user.id === "U-001") {
    showMessage("userMessage", "You cannot delete the primary Shop Owner / Admin account.", "error");
    return;
  }

  users = removeAt(users, index);
  addLog("User", "Deleted account " + user.id + " (" + user.name + ")");
  showMessage("userMessage", "Account for <strong>" + user.name + "</strong> was deleted.", "info");

  resetUserForm();
  renderUsers();
}


function approveUser(index) {
  let user = users[index];
  user.status = "Active";
  addLog("User", "Approved " + user.role + " account of " + user.name);
  showMessage("userMessage", "<strong>" + user.name + "</strong> (" + user.role + ") is now Approved and can log in.", "success");
  renderUsers();
  loadRestockSection();
}


function resetUserForm() {
  editUserIndex = -1;
  document.getElementById("userForm").reset();
  clearErrors(["userName", "userEmail", "userPhone", "userPassword", "userRole"]);
  document.getElementById("userFormTitle").innerHTML = "Add / Edit User Account";
  document.getElementById("userSaveBtn").value = "Save Account";
}



function renderProfitAndExpenses() {
  let totalRevenue = 0;
  let totalBikeCost = 0;

  for (const sale of sales) {
    if (sale.status !== "Cancelled") {
      totalRevenue += sale.totalPrice;
      totalBikeCost += (sale.buyCost * sale.quantity);
    }
  }

  let grossProfit = totalRevenue - totalBikeCost;

  let totalExpenses = 0;
  let expRows = "";
  let expCategoryNames = [];
  let expCategoryTotals = [];

  for (let i = 0; i < expenses.length; i++) {
    let exp = expenses[i];
    totalExpenses += exp.amount;

    let catPos = expCategoryNames.indexOf(exp.category);
    if (catPos === -1) {
      expCategoryNames.push(exp.category);
      expCategoryTotals.push(0);
      catPos = expCategoryNames.length - 1;
    }
    expCategoryTotals[catPos] += exp.amount;

    expRows += "<tr>" +
                 "<td>" + exp.id + "</td>" +
                 "<td>" + exp.date + "</td>" +
                 "<td><span class='badge blue'>" + exp.category + "</span></td>" +
                 "<td><strong>" + exp.title + "</strong></td>" +
                 "<td>" + exp.amount + " Tk</td>" +
                 "<td><button type='button' class='btn btn-small btn-danger' onclick='deleteExpense(" + i + ")'>Delete</button></td>" +
               "</tr>";
  }

  if (expenses.length === 0) {
    expRows = "<tr><td colspan='6' class='empty-row'>No showroom expenses recorded yet.</td></tr>";
  }

  let totalStockUnits = 0;
  let brandNames = [];
  let brandStockTotals = [];

  for (const bike of bikes) {
    totalStockUnits += bike.stock;

    let brandPos = brandNames.indexOf(bike.brand);
    if (brandPos === -1) {
      brandNames.push(bike.brand);
      brandStockTotals.push(0);
      brandPos = brandNames.length - 1;
    }
    brandStockTotals[brandPos] += bike.stock;
  }

  let netProfit = grossProfit - totalExpenses;

  document.getElementById("finTotalSales").innerHTML = totalRevenue + " Tk";
  document.getElementById("finBikeCost").innerHTML = totalBikeCost + " Tk";
  document.getElementById("finGrossProfit").innerHTML = grossProfit + " Tk";
  document.getElementById("finTotalExpenses").innerHTML = totalExpenses + " Tk";
  document.getElementById("finNetProfit").innerHTML = netProfit + " Tk";

  if (netProfit < 0) {
    document.getElementById("finNetProfit").style.color = "#DC2626";
  } else {
    document.getElementById("finNetProfit").style.color = "#059669";
  }

  drawBarChart("expenseCategoryChart", expCategoryNames, expCategoryTotals, totalExpenses);
  drawBarChart("brandChart", brandNames, brandStockTotals, totalStockUnits);

  document.getElementById("expenseTableBody").innerHTML = expRows;
}


function addExpense() {
  let title = document.getElementById("expTitle").value.trim();
  let category = document.getElementById("expCategory").value;
  let amountText = document.getElementById("expAmount").value;
  let amount = Number(amountText);
  let date = document.getElementById("expDate").value;

  let isValid = true;
  clearErrors(["expTitle", "expAmount", "expDate"]);

  if (title.length < 3) {
    showError("expTitle", "Please enter an expense title (at least 3 characters).");
    isValid = false;
  }

  if (amountText === "" || amount <= 0) {
    showError("expAmount", "Enter a valid expense amount greater than 0.");
    isValid = false;
  }

  if (date === "") {
    showError("expDate", "Please pick the expense date.");
    isValid = false;
  }

  if (isValid === false) {
    return false;
  }

  let newExp = {
    id: nextId("EXP", expenses),
    title: title,
    category: category,
    amount: amount,
    date: date
  };

  expenses.push(newExp);
  addLog("Settings", "Recorded expense: " + title + " (" + amount + " Tk)");
  showMessage("expenseMessage", "Expense <strong>" + title + "</strong> (" + amount + " Tk) added. Net Profit &amp; Bar Charts updated!", "success");

  document.getElementById("expenseForm").reset();
  document.getElementById("expDate").value = todayString();
  renderProfitAndExpenses();
  return false;
}


function deleteExpense(index) {
  let removed = expenses[index];
  expenses = removeAt(expenses, index);
  showMessage("expenseMessage", "Removed expense <strong>" + removed.title + "</strong>. Net Profit &amp; Bar Charts updated.", "info");
  renderProfitAndExpenses();
}



function loadRestockSection() {
  let lowRows = "";
  let lowCount = 0;

  for (const bike of bikes) {
    if (bike.stock <= showroomRules.lowStockLimit) {
      let badgeHtml;
      if (bike.stock === 0) {
        badgeHtml = "<span class='badge red'>OUT OF STOCK (0)</span>";
      } else {
        badgeHtml = "<span class='badge orange'>LOW STOCK (" + bike.stock + ")</span>";
      }

      lowRows += "<tr>" +
                   "<td>" + bike.id + "</td>" +
                   "<td><strong>" + bike.brand + " " + bike.model + "</strong></td>" +
                   "<td><strong>" + bike.stock + " unit(s)</strong></td>" +
                   "<td>" + badgeHtml + "</td>" +
                   "<td><button type='button' class='btn btn-small' onclick='selectBikeForPo(\"" + bike.id + "\")'>Select for PO</button></td>" +
                 "</tr>";
      lowCount++;
    }
  }

  if (lowCount === 0) {
    lowRows = "<tr><td colspan='5' class='empty-row'>All motorcycles have healthy stock levels.</td></tr>";
  }
  document.getElementById("lowStockTableBody").innerHTML = lowRows;

  let vendorOptions = "";
  for (const user of users) {
    if (user.role === "Vendor" && user.status === "Active") {
      let label = (user.companyName ? user.companyName : user.name) + " (" + (user.suppliedBrand || "Multi-Brand") + ")";
      vendorOptions += "<option value='" + user.id + "'>" + label + "</option>";
    }
  }
  document.getElementById("poVendor").innerHTML = vendorOptions;

  let bikeOptions = "";
  for (const bike of bikes) {
    bikeOptions += "<option value='" + bike.id + "'>" + bike.id + " - " + bike.brand + " " + bike.model + " (Stock: " + bike.stock + ")</option>";
  }
  document.getElementById("poBike").innerHTML = bikeOptions;

  syncPoBikeUnitCost();
  renderPurchaseOrders();
}


function selectBikeForPo(bikeId) {
  document.getElementById("poBike").value = bikeId;
  syncPoBikeUnitCost();
  showMessage("poMessage", "Selected <strong>" + bikeId + "</strong> for restocking. Choose quantity and send the Purchase Order.", "info");
}


function syncPoBikeUnitCost() {
  let bikeId = document.getElementById("poBike").value;
  let index = findIndexById(bikes, bikeId);
  if (index !== -1) {
    document.getElementById("poUnitCost").value = bikes[index].buyPrice;
  }
  previewPoCost();
}


function previewPoCost() {
  let bikeId = document.getElementById("poBike").value;
  let bikeIndex = findIndexById(bikes, bikeId);
  let qty = Number(document.getElementById("poQuantity").value);
  let unitCost = Number(document.getElementById("poUnitCost").value);

  if (bikeIndex === -1 || qty <= 0 || unitCost <= 0) {
    document.getElementById("poLivePreview").innerHTML = "Enter a valid quantity and unit cost to preview the order.";
    return;
  }

  let bike = bikes[bikeIndex];
  let totalOrderCost = qty * unitCost;
  let newStockAfterDelivery = bike.stock + qty;

  document.getElementById("poLivePreview").innerHTML =
    "Ordering <strong>" + qty + " unit(s)</strong> of <strong>" + bike.brand + " " + bike.model + "</strong> " +
    "will cost <strong class='big'>" + totalOrderCost + " Tk</strong>.<br>" +
    "Current stock: <strong>" + bike.stock + "</strong> &rarr; Stock after delivery: <strong>" + newStockAfterDelivery + " units</strong>.";
}


function createPurchaseOrder() {
  clearErrors(["poQuantity", "poUnitCost"]);

  let okQty = checkRange("poQuantity", 1, 50);
  let okCost = checkRange("poUnitCost", 50000, 2000000);

  if (!(okQty && okCost)) {
    showMessage("poMessage", "Please enter a valid quantity (1-50) and unit cost.", "error");
    return false;
  }

  let vendorId = document.getElementById("poVendor").value;
  let vendorIndex = findIndexById(users, vendorId);
  let vendorName = (vendorIndex !== -1 && users[vendorIndex].companyName) ? users[vendorIndex].companyName : "Authorized Vendor";

  let bikeId = document.getElementById("poBike").value;
  let bikeIndex = findIndexById(bikes, bikeId);
  let bike = bikes[bikeIndex];

  let qty = Number(document.getElementById("poQuantity").value);
  let unitCost = Number(document.getElementById("poUnitCost").value);

  let newPo = {
    id: nextId("PO", purchaseOrders),
    vendorId: vendorId,
    vendorName: vendorName,
    bikeId: bike.id,
    model: bike.brand + " " + bike.model,
    quantity: qty,
    unitCost: unitCost,
    totalCost: qty * unitCost,
    orderDate: todayString(),
    status: "Pending"
  };

  purchaseOrders.push(newPo);
  addLog("Supply", "Dispatched Purchase Order " + newPo.id + " for " + qty + "x " + newPo.model);
  showMessage("poMessage", "Purchase Order <strong>" + newPo.id + "</strong> sent to <strong>" + vendorName + "</strong>!", "success");

  renderPurchaseOrders();
  return false;
}


function renderPurchaseOrders() {
  let rows = "";

  for (let i = purchaseOrders.length - 1; i >= 0; i--) {
    let po = purchaseOrders[i];
    let badgeClass = "orange";
    let actionHtml = "";

    if (po.status === "Delivered") {
      badgeClass = "green";
      actionHtml = "<span class='hint'>Stock Added</span>";
    } else if (po.status === "Accepted") {
      badgeClass = "blue";
      actionHtml = "<button type='button' class='btn btn-small btn-success' onclick='receivePoDelivery(" + i + ")'>Mark Delivered (+Stock)</button>";
    } else if (po.status === "Pending") {
      badgeClass = "orange";
      actionHtml = "<button type='button' class='btn btn-small btn-success' onclick='receivePoDelivery(" + i + ")'>Receive Stock</button>";
    } else {
      badgeClass = "red";
      actionHtml = "<span class='hint'>Rejected</span>";
    }

    rows += "<tr>" +
              "<td>" + po.id + "</td>" +
              "<td>" + po.vendorName + "</td>" +
              "<td><strong>" + po.model + "</strong></td>" +
              "<td>" + po.quantity + "</td>" +
              "<td>" + po.unitCost + " Tk</td>" +
              "<td><strong>" + po.totalCost + " Tk</strong></td>" +
              "<td><span class='badge " + badgeClass + "'>" + po.status + "</span></td>" +
              "<td>" + actionHtml + "</td>" +
            "</tr>";
  }

  document.getElementById("poHistoryTableBody").innerHTML = rows;
}


function receivePoDelivery(index) {
  let po = purchaseOrders[index];
  if (po.status === "Delivered") {
    return;
  }

  po.status = "Delivered";
  let bikeIndex = findIndexById(bikes, po.bikeId);
  if (bikeIndex !== -1) {
    bikes[bikeIndex].stock += po.quantity;
  }

  addLog("Supply", "Received delivery for " + po.id + " (+" + po.quantity + " units added to stock)");
  showMessage("poMessage", "Delivery received for <strong>" + po.id + "</strong>! Showroom stock increased by <strong>" + po.quantity + " units</strong>.", "success");

  loadRestockSection();
  loadDiscountSimulator();
  renderProfitAndExpenses();
}



function loadDiscountSimulator() {
  let options = "";
  for (const bike of bikes) {
    options += "<option value='" + bike.id + "'>" + bike.brand + " " + bike.model + " (Buy: " + bike.buyPrice + " Tk | Sell: " + bike.price + " Tk)</option>";
  }
  document.getElementById("simBikeId").innerHTML = options;
  simulateMargin();
}


function simulateMargin() {
  let bikeId = document.getElementById("simBikeId").value;
  let bikeIndex = findIndexById(bikes, bikeId);
  if (bikeIndex === -1) {
    return;
  }

  let bike = bikes[bikeIndex];
  let discountPercent = Number(document.getElementById("simDiscountPercent").value);
  let includeFreeReg = document.getElementById("simFreeReg").checked;

  let discountAmount = Math.round(bike.price * (discountPercent / 100));
  let newSellingPrice = bike.price - discountAmount;
  let freeRegCost = includeFreeReg ? 12000 : 0;

  let profitPerUnit = newSellingPrice - bike.buyPrice - freeRegCost;

  let verdictBadge;
  if (profitPerUnit > 15000) {
    verdictBadge = "<span class='badge green'>HEALTHY MARGIN (+" + profitPerUnit + " Tk / bike)</span>";
  } else if (profitPerUnit >= 0) {
    verdictBadge = "<span class='badge orange'>LOW MARGIN (+" + profitPerUnit + " Tk / bike)</span>";
  } else {
    verdictBadge = "<span class='badge red'>LOSS WARNING (" + profitPerUnit + " Tk loss per bike!)</span>";
  }

  document.getElementById("marginSimulatorOutput").innerHTML =
    "<p><strong>Motorcycle:</strong> " + bike.brand + " " + bike.model + "</p>" +
    "<p><strong>Vendor Purchase Cost (Buy Price):</strong> " + bike.buyPrice + " Tk</p>" +
    "<p><strong>Current Showroom Price:</strong> " + bike.price + " Tk</p>" +
    "<p><strong>Promotional Discount (" + discountPercent + "%):</strong> -" + discountAmount + " Tk</p>" +
    "<p><strong>Free Registration Gift Cost:</strong> -" + freeRegCost + " Tk</p>" +
    "<p><strong>New Promotional Selling Price:</strong> <span class='big'>" + newSellingPrice + " Tk</span></p>" +
    "<p><strong>Profit / Loss Verdict:</strong> " + verdictBadge + "</p>";
}


function applyBikeDiscount() {
  let bikeId = document.getElementById("simBikeId").value;
  let bikeIndex = findIndexById(bikes, bikeId);
  let discountPercent = Number(document.getElementById("simDiscountPercent").value);
  let includeFreeReg = document.getElementById("simFreeReg").checked;

  if (discountPercent < 0 || discountPercent > 40) {
    showMessage("discountMessage", "Discount percentage must be between 0% and 40%.", "error");
    return false;
  }

  let bike = bikes[bikeIndex];
  let discountAmount = Math.round(bike.price * (discountPercent / 100));
  let newSellingPrice = bike.price - discountAmount;
  let freeRegCost = includeFreeReg ? 12000 : 0;
  let profitPerUnit = newSellingPrice - bike.buyPrice - freeRegCost;

  if (profitPerUnit < 0) {
    showMessage("discountMessage", "Cannot apply offer: this discount causes a loss of " + Math.abs(profitPerUnit) + " Tk per bike!", "error");
    return false;
  }

  bike.price = newSellingPrice;
  addLog("Settings", "Applied " + discountPercent + "% promo on " + bike.brand + " " + bike.model + " (New price: " + newSellingPrice + " Tk)");
  showMessage("discountMessage", "Promotional price of <strong>" + newSellingPrice + " Tk</strong> applied to <strong>" + bike.brand + " " + bike.model + "</strong>!", "success");

  loadDiscountSimulator();
  return false;
}



document.getElementById("expDate").value = todayString();
document.getElementById("poBike").addEventListener("change", syncPoBikeUnitCost);

renderUsers();
renderProfitAndExpenses();
loadRestockSection();
loadDiscountSimulator();
showSection("usersSection");

document.getElementById("nav-profitSection").addEventListener("click", renderProfitAndExpenses);
document.getElementById("nav-restockSection").addEventListener("click", loadRestockSection);
document.getElementById("nav-discountSection").addEventListener("click", loadDiscountSimulator);