let vendorSupplies = [
    { id: "S-001", fname: "Tariq", lname: "Mahmud", comp: "Apex Moto Supply", brand: "Yamaha", model: "MT-15 V2", qty: 10, price: 3200, status: "Pending" },
    { id: "S-002", fname: "Nusrat", lname: "Jahan", comp: "Prime Two-Wheelers", brand: "Honda", model: "CB Hornet 160R", qty: 6, price: 2450, status: "Approved" }
];

let purchaseOrders = [
    { id: "PO-101", brand: "Yamaha", model: "R15 V4", qty: 4, price: 4100, status: "Pending" },
    { id: "PO-102", brand: "Kawasaki", model: "Ninja 400", qty: 2, price: 5800, status: "Accepted" }
];

let supplierInvoices = [
    { id: "INV-201", poId: "PO-102", qty: 2, price: 5800, total: 11600, paymentStatus: "Unpaid" }
];

let editSupplyIndex = -1;

function getSelectedBrand() {
    let radios = document.getElementsByName("bike_brand");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return "";
}

function getSelectedPoAction() {
    let radios = document.getElementsByName("po_action");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return "";
}

function nextVendorId(prefix, list) {
    let maxNum = 0;
    for (let i = 0; i < list.length; i++) {
        let parts = list[i].id.split("-");
        let num = Number(parts[1]);
        if (num > maxNum) {
            maxNum = num;
        }
    }
    let nextNum = maxNum + 1;
    if (nextNum < 10) {
        return prefix + "-00" + nextNum;
    }
    if (nextNum < 100) {
        return prefix + "-0" + nextNum;
    }
    return prefix + "-" + nextNum;
}

function validateVendorForm() {
    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let comp = document.getElementById("comp").value.trim();
    let adrs1 = document.getElementById("adrs1").value.trim();
    let city = document.getElementById("city").value.trim();
    let state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value.trim();
    let country = document.getElementById("country").value;
    let phn = document.getElementById("phn").value.trim();
    let fax = document.getElementById("fax").value.trim();
    let email = document.getElementById("email").value.trim();
    let brand = getSelectedBrand();
    let model = document.getElementById("model_name").value.trim();

    let qtyInput = document.querySelector('input[size="5"]');
    let priceInput = document.querySelector('input[size="8"]');
    let qty = Number(qtyInput ? qtyInput.value.trim() : 0);
    let price = Number(priceInput ? priceInput.value.trim() : 0);

    if (fname.length < 2 || lname.length < 2 || comp.length < 2) {
        alert("Please enter valid first name, last name, and company name.");
        return false;
    }
    if (adrs1.length < 3 || city.length < 2 || zip === "") {
        alert("Please complete address, city, and zip code.");
        return false;
    }
    if (state === "Select a state" || country === "Select a Country") {
        alert("Please select both a state and a country.");
        return false;
    }
    if (phn.length < 6 || fax === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        alert("Please enter valid phone, fax, and email details.");
        return false;
    }
    if (brand === "" || model.length < 2) {
        alert("Please select a bike brand and enter a model name.");
        return false;
    }
    if (isNaN(qty) || qty <= 0 || isNaN(price) || price <= 0) {
        alert("Please enter a positive supply quantity and unit price.");
        return false;
    }
    return true;
}

function saveVendorSubmission() {
    if (!validateVendorForm()) {
        return false;
    }

    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let comp = document.getElementById("comp").value.trim();
    let brand = getSelectedBrand();
    let model = document.getElementById("model_name").value.trim();
    let qty = Number(document.querySelector('input[size="5"]').value.trim());
    let price = Number(document.querySelector('input[size="8"]').value.trim());

    if (editSupplyIndex === -1) {
        vendorSupplies.push({
            id: nextVendorId("S", vendorSupplies),
            fname: fname,
            lname: lname,
            comp: comp,
            brand: brand,
            model: model,
            qty: qty,
            price: price,
            status: "Pending"
        });
    } else {
        let item = vendorSupplies[editSupplyIndex];
        item.fname = fname;
        item.lname = lname;
        item.comp = comp;
        item.brand = brand;
        item.model = model;
        item.qty = qty;
        item.price = price;
        editSupplyIndex = -1;
    }

    let poAction = getSelectedPoAction();
    let poNum = document.getElementById("po_num").value.trim();
    let invNum = document.getElementById("inv_submit").value.trim();

    if (poNum !== "") {
        for (let i = 0; i < purchaseOrders.length; i++) {
            if (purchaseOrders[i].id.toLowerCase() === poNum.toLowerCase()) {
                if (poAction === "accept") {
                    purchaseOrders[i].status = "Accepted";
                } else if (poAction === "reject") {
                    purchaseOrders[i].status = "Rejected";
                }
            }
        }
    }

    if (invNum !== "") {
        supplierInvoices.push({
            id: invNum,
            poId: poNum || "N/A",
            qty: qty,
            price: price,
            total: qty * price,
            paymentStatus: "Unpaid"
        });
    }

    saveVendorLocalStorage();
    renderVendorTables();
    document.querySelector("form").reset();
    return false;
}

function editSupply(index) {
    let item = vendorSupplies[index];
    editSupplyIndex = index;

    document.getElementById("fname").value = item.fname;
    document.getElementById("lname").value = item.lname;
    document.getElementById("comp").value = item.comp;
    document.getElementById("model_name").value = item.model;
    document.querySelector('input[size="5"]').value = item.qty;
    document.querySelector('input[size="8"]').value = item.price;

    let radios = document.getElementsByName("bike_brand");
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = (radios[i].value.toLowerCase() === item.brand.toLowerCase());
    }
}

function deleteSupply(index) {
    if (!confirm("Delete supply record " + vendorSupplies[index].id + "?")) {
        return;
    }
    vendorSupplies.splice(index, 1);
    saveVendorLocalStorage();
    renderVendorTables();
}

function updatePoStatus(index, newStatus) {
    purchaseOrders[index].status = newStatus;
    saveVendorLocalStorage();
    renderVendorTables();
}

function deletePurchaseOrder(index) {
    if (!confirm("Delete purchase order " + purchaseOrders[index].id + "?")) {
        return;
    }
    purchaseOrders.splice(index, 1);
    saveVendorLocalStorage();
    renderVendorTables();
}

function deleteInvoice(index) {
    if (!confirm("Delete invoice " + supplierInvoices[index].id + "?")) {
        return;
    }
    supplierInvoices.splice(index, 1);
    saveVendorLocalStorage();
    renderVendorTables();
}

function saveVendorLocalStorage() {
    localStorage.setItem("motomanage_vendor_supplies", JSON.stringify(vendorSupplies));
    localStorage.setItem("motomanage_purchase_orders", JSON.stringify(purchaseOrders));
    localStorage.setItem("motomanage_supplier_invoices", JSON.stringify(supplierInvoices));
}

function loadVendorLocalStorage() {
    let s = localStorage.getItem("motomanage_vendor_supplies");
    let p = localStorage.getItem("motomanage_purchase_orders");
    let inv = localStorage.getItem("motomanage_supplier_invoices");
    if (s) { vendorSupplies = JSON.parse(s); }
    if (p) { purchaseOrders = JSON.parse(p); }
    if (inv) { supplierInvoices = JSON.parse(inv); }
}

function ensureVendorTables() {
    let form = document.querySelector("form");
    if (!form || document.getElementById("vendorRecordsContainer")) {
        return;
    }
    let container = document.createElement("div");
    container.id = "vendorRecordsContainer";
    container.innerHTML =
        "<hr><h3>Bike Supply Requests</h3>" +
        "<table border='1' width='100%'><thead><tr><th>ID</th><th>Vendor</th><th>Bike</th><th>Qty</th><th>Unit Price</th><th>Status</th><th>Actions</th></tr></thead><tbody id='supplyBody'></tbody></table>" +
        "<br><h3>Purchase Orders</h3>" +
        "<table border='1' width='100%'><thead><tr><th>PO ID</th><th>Bike</th><th>Qty</th><th>Unit Price</th><th>Status</th><th>Actions</th></tr></thead><tbody id='poBody'></tbody></table>" +
        "<br><h3>Supplier Invoices</h3>" +
        "<table border='1' width='100%'><thead><tr><th>Invoice ID</th><th>PO Ref</th><th>Qty</th><th>Unit Price</th><th>Total</th><th>Payment</th><th>Actions</th></tr></thead><tbody id='invoiceBody'></tbody></table>";
    form.parentNode.appendChild(container);
}

function renderVendorTables() {
    ensureVendorTables();

    let supplyHtml = "";
    for (let i = 0; i < vendorSupplies.length; i++) {
        let item = vendorSupplies[i];
        supplyHtml += "<tr>" +
            "<td>" + item.id + "</td>" +
            "<td>" + item.fname + " " + item.lname + " (" + item.comp + ")</td>" +
            "<td>" + item.brand + " " + item.model + "</td>" +
            "<td>" + item.qty + "</td>" +
            "<td>$" + item.price + "</td>" +
            "<td>" + item.status + "</td>" +
            "<td><button type='button' onclick='editSupply(" + i + ")'>Edit</button> " +
            "<button type='button' onclick='deleteSupply(" + i + ")'>Delete</button></td>" +
            "</tr>";
    }
    document.getElementById("supplyBody").innerHTML = supplyHtml || "<tr><td colspan='7'>No supply records.</td></tr>";

    let poHtml = "";
    for (let i = 0; i < purchaseOrders.length; i++) {
        let po = purchaseOrders[i];
        poHtml += "<tr>" +
            "<td>" + po.id + "</td>" +
            "<td>" + po.brand + " " + po.model + "</td>" +
            "<td>" + po.qty + "</td>" +
            "<td>$" + po.price + "</td>" +
            "<td>" + po.status + "</td>" +
            "<td><button type='button' onclick=\"updatePoStatus(" + i + ", 'Accepted')\">Accept</button> " +
            "<button type='button' onclick=\"updatePoStatus(" + i + ", 'Rejected')\">Reject</button> " +
            "<button type='button' onclick=\"updatePoStatus(" + i + ", 'Delivered')\">Delivered</button> " +
            "<button type='button' onclick='deletePurchaseOrder(" + i + ")'>Delete</button></td>" +
            "</tr>";
    }
    document.getElementById("poBody").innerHTML = poHtml || "<tr><td colspan='6'>No purchase orders.</td></tr>";

    let invHtml = "";
    for (let i = 0; i < supplierInvoices.length; i++) {
        let inv = supplierInvoices[i];
        invHtml += "<tr>" +
            "<td>" + inv.id + "</td>" +
            "<td>" + inv.poId + "</td>" +
            "<td>" + inv.qty + "</td>" +
            "<td>$" + inv.price + "</td>" +
            "<td>$" + inv.total + "</td>" +
            "<td>" + inv.paymentStatus + "</td>" +
            "<td><button type='button' onclick='deleteInvoice(" + i + ")'>Delete</button></td>" +
            "</tr>";
    }
    document.getElementById("invoiceBody").innerHTML = invHtml || "<tr><td colspan='7'>No invoices submitted.</td></tr>";
}

loadVendorLocalStorage();
let vendorForm = document.querySelector("form");
if (vendorForm) {
    vendorForm.onsubmit = saveVendorSubmission;
}
renderVendorTables();