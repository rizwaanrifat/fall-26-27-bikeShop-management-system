
/* 1. MOTORCYCLE DATA */
var bikes = [
    {
        id: "BKE-101",
        brand: "Yamaha",
        model: "YZF-R15 V4",
        year: 2024,
        engineCC: 155,
        price: 4800,
        oldPrice: 5300,
        stock: 6,
        power: "18.4 HP",
        torque: "14.2 Nm",
        topSpeed: "140 km/h",
        mileage: "45 km/l",
        description: "Lightweight sport bike with VVA engine, traction control, and dual-channel ABS."
    },
    {
        id: "BKE-102",
        brand: "Kawasaki",
        model: "Ninja 400 ABS",
        year: 2023,
        engineCC: 399,
        price: 5600,
        oldPrice: 5600,
        stock: 4,
        power: "45 HP",
        torque: "38.0 Nm",
        topSpeed: "190 km/h",
        mileage: "26 km/l",
        description: "Balanced parallel-twin sport bike built for smooth city and highway riding."
    },
    {
        id: "BKE-103",
        brand: "BMW",
        model: "S 1000 RR",
        year: 2024,
        engineCC: 999,
        price: 19800,
        oldPrice: 21500,
        stock: 2,
        power: "205 HP",
        torque: "113.0 Nm",
        topSpeed: "303 km/h",
        mileage: "15 km/l",
        description: "High-performance superbike with ShiftCam technology and selectable riding modes."
    },
    {
        id: "BKE-104",
        brand: "Honda",
        model: "CBR650R",
        year: 2024,
        engineCC: 649,
        price: 9800,
        oldPrice: 10200,
        stock: 5,
        power: "94 HP",
        torque: "63.0 Nm",
        topSpeed: "240 km/h",
        mileage: "20 km/l",
        description: "Four-cylinder middleweight sport bike offering smooth power and daily comfort."
    },
    {
        id: "BKE-105",
        brand: "Suzuki",
        model: "GSX-R750",
        year: 2023,
        engineCC: 750,
        price: 11400,
        oldPrice: 11400,
        stock: 3,
        power: "148 HP",
        torque: "86.3 Nm",
        topSpeed: "280 km/h",
        mileage: "18 km/l",
        description: "Agile 750cc supersport combining lightweight handling with strong mid-range torque."
    },
    {
        id: "BKE-106",
        brand: "Royal Enfield",
        model: "Continental GT 650",
        year: 2024,
        engineCC: 648,
        price: 6400,
        oldPrice: 6400,
        stock: 8,
        power: "47 HP",
        torque: "52.0 Nm",
        topSpeed: "170 km/h",
        mileage: "25 km/l",
        description: "Classic twin-cylinder cafe racer with timeless design and reliable performance."
    }
];

/* 2. DEFAULT DATA & LOCALSTORAGE */
var defaultWishlist = [
    { bikeId: "BKE-101", previousPrice: 5300 },
    { bikeId: "BKE-103", previousPrice: 21500 }
];

var defaultAlerts = [
    {
        id: "ALT-501",
        bikeId: "BKE-101",
        email: "asifur.rahman@example.com",
        targetPrice: 4900,
        notify: true
    }
];

var defaultBookings = [
    {
        id: "TR-9021",
        bikeId: "BKE-103",
        bikeName: "BMW S 1000 RR",
        date: "2026-11-25",
        time: "Morning (10:00 AM - 12:00 PM)",
        name: "Asifur Rahman",
        phone: "01711-000000",
        email: "asifur.rahman@example.com",
        status: "Approved"
    },
    {
        id: "TR-9022",
        bikeId: "BKE-101",
        bikeName: "Yamaha YZF-R15 V4",
        date: "2026-11-28",
        time: "Afternoon (02:00 PM - 04:00 PM)",
        name: "Asifur Rahman",
        phone: "01711-000000",
        email: "asifur.rahman@example.com",
        status: "Pending"
    }
];

var wishlist = loadData("moto_wishlist", defaultWishlist);
var priceAlerts = loadData("moto_alerts", defaultAlerts);
var bookings = loadData("moto_bookings", defaultBookings);
var comparedIds = ["BKE-101", "BKE-102", "BKE-103"];

function loadData(key, fallback) {
    var saved = localStorage.getItem(key);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return fallback.slice();
        }
    }
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback.slice();
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/* 3. SIMPLE HELPER FUNCTIONS */
function findBikeById(bikeId) {
    for (var i = 0; i < bikes.length; i++) {
        if (bikes[i].id === bikeId) {
            return bikes[i];
        }
    }
    return null;
}

function isInWishlist(bikeId) {
    for (var i = 0; i < wishlist.length; i++) {
        if (wishlist[i].bikeId === bikeId) {
            return true;
        }
    }
    return false;
}

function textContains(text, keyword) {
    return String(text).toLowerCase().indexOf(String(keyword).trim().toLowerCase()) !== -1;
}

function isValidEmail(email) {
    var value = email.trim();
    var atPos = value.indexOf("@");
    var dotPos = value.lastIndexOf(".");
    return atPos > 0 && dotPos > atPos + 1 && dotPos < value.length - 1;
}

function countDigits(text) {
    var count = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] >= "0" && text[i] <= "9") {
            count++;
        }
    }
    return count;
}

function getTodayDate() {
    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    return y + "-" + m + "-" + d;
}

function getNextId(list, prefix, startNum) {
    var maxNum = startNum - 1;
    for (var i = 0; i < list.length; i++) {
        var parts = list[i].id.split("-");
        var num = parseInt(parts[1], 10);
        if (!isNaN(num) && num > maxNum) {
            maxNum = num;
        }
    }
    return prefix + "-" + (maxNum + 1);
}

function showStatusMessage(elementId, text, isError) {
    var el = document.getElementById(elementId);
    el.textContent = text;
    if (isError) {
        el.className = "status-msg error";
    } else {
        el.className = "status-msg";
    }
}

/* 4. PRICE-DROP NOTICE BANNER */
function updatePriceDropNotice() {
    var messages = [];

    for (var i = 0; i < wishlist.length; i++) {
        var bike = findBikeById(wishlist[i].bikeId);
        if (bike && wishlist[i].previousPrice > bike.price) {
            var drop = wishlist[i].previousPrice - bike.price;
            messages.push(bike.brand + " " + bike.model + " dropped by $" + drop);
        }
    }

    for (var j = 0; j < priceAlerts.length; j++) {
        var alertBike = findBikeById(priceAlerts[j].bikeId);
        if (alertBike && priceAlerts[j].notify && alertBike.price <= priceAlerts[j].targetPrice) {
            messages.push("Target price met for " + alertBike.brand + " " + alertBike.model + " ($" + alertBike.price + ")");
        }
    }

    var notice = document.getElementById("priceDropNotice");
    if (messages.length > 0) {
        notice.textContent = "Price-Drop Alert: " + messages.join(" | ");
        notice.className = "notice";
    } else {
        notice.className = "notice hidden";
    }
}

/* 5. POPULATE DROPDOWNS */
function populateDropdowns() {
    var alertSelect = document.getElementById("alertBike");
    var rideSelect = document.getElementById("rideBike");

    alertSelect.innerHTML = '<option value="">Select a Bike</option>';
    rideSelect.innerHTML = '<option value="">Select a Motorcycle</option>';

    for (var i = 0; i < bikes.length; i++) {
        var text = bikes[i].brand + " " + bikes[i].model + " ($" + bikes[i].price + ")";

        var opt1 = document.createElement("option");
        opt1.value = bikes[i].id;
        opt1.textContent = text;
        alertSelect.appendChild(opt1);

        var opt2 = document.createElement("option");
        opt2.value = bikes[i].id;
        opt2.textContent = text;
        rideSelect.appendChild(opt2);
    }
}

/* 6. FEATURE 1: BROWSE, DETAILS & COMPARE */
function renderBikes() {
    var keyword = document.getElementById("searchBike").value.trim();
    var brand = document.getElementById("brandFilter").value;
    var ccRange = document.getElementById("ccFilter").value;
    var year = document.getElementById("yearFilter").value;
    var maxPrice = document.getElementById("maxPrice").value.trim();
    var sortBy = document.getElementById("sortBy").value;

    document.getElementById("maxPriceError").textContent = "";
    if (maxPrice !== "" && Number(maxPrice) < 0) {
        document.getElementById("maxPriceError").textContent = "Price cannot be negative.";
        return;
    }

    var filtered = [];
    for (var i = 0; i < bikes.length; i++) {
        var b = bikes[i];

        var matchKeyword =
            keyword === "" ||
            textContains(b.id, keyword) ||
            textContains(b.brand, keyword) ||
            textContains(b.model, keyword) ||
            textContains(b.year, keyword) ||
            textContains(b.engineCC, keyword) ||
            textContains(b.price, keyword);

        var matchBrand = (brand === "ALL" || b.brand === brand);
        var matchYear = (year === "ALL" || String(b.year) === year);
        var matchPrice = (maxPrice === "" || b.price <= Number(maxPrice));

        var matchCC = true;
        if (ccRange === "100-160") matchCC = (b.engineCC >= 100 && b.engineCC <= 160);
        else if (ccRange === "161-350") matchCC = (b.engineCC >= 161 && b.engineCC <= 350);
        else if (ccRange === "351-650") matchCC = (b.engineCC >= 351 && b.engineCC <= 650);
        else if (ccRange === "651+") matchCC = (b.engineCC >= 651);

        if (matchKeyword && matchBrand && matchYear && matchCC && matchPrice) {
            filtered.push(b);
        }
    }

    if (sortBy === "price-asc") {
        filtered.sort(function (a, b) { return a.price - b.price; });
    } else if (sortBy === "price-desc") {
        filtered.sort(function (a, b) { return b.price - a.price; });
    } else if (sortBy === "cc-desc") {
        filtered.sort(function (a, b) { return b.engineCC - a.engineCC; });
    } else if (sortBy === "year-desc") {
        filtered.sort(function (a, b) { return b.year - a.year; });
    } else if (sortBy === "drop-desc") {
        filtered.sort(function (a, b) { return (b.oldPrice - b.price) - (a.oldPrice - a.price); });
    }

    var tbody = document.getElementById("bikeTableBody");
    var html = "";

    for (var j = 0; j < filtered.length; j++) {
        var bike = filtered[j];
        var saved = isInWishlist(bike.id);
        var checked = comparedIds.indexOf(bike.id) !== -1 ? "checked" : "";
        var drop = bike.oldPrice - bike.price;
        var priceText = "$" + bike.price;
        if (drop > 0) {
            priceText += ' <span class="badge badge-green">Save $' + drop + "</span>";
        }

        html +=
            "<tr>" +
            "<td>" + bike.id + "</td>" +
            "<td>" + bike.brand + "</td>" +
            "<td>" + bike.model + "</td>" +
            "<td>" + bike.year + "</td>" +
            "<td>" + bike.engineCC + " CC</td>" +
            "<td>" + priceText + "</td>" +
            "<td>" + bike.stock + "</td>" +
            '<td><input type="checkbox" name="compareItem" value="' + bike.id + '" ' + checked + "></td>" +
            '<td><div class="action-btns">' +
            '<button type="button" class="btn btn-light btn-sm" onclick="viewBikeDetails(\'' + bike.id + '\')">Details</button>' +
            '<button type="button" class="btn btn-primary btn-sm" onclick="toggleWishlist(\'' + bike.id + '\')">' + (saved ? "Saved" : "Wishlist") + "</button>" +
            "</div></td>" +
            "</tr>";
    }

    if (filtered.length === 0) {
        html = '<tr><td colspan="9" class="empty-row">No motorcycles found.</td></tr>';
    }

    tbody.innerHTML = html;
}

function viewBikeDetails(bikeId) {
    var bike = findBikeById(bikeId);
    if (!bike) return;

    document.getElementById("detailTitle").textContent = bike.brand + " " + bike.model + " (" + bike.id + ")";
    document.getElementById("detailDesc").textContent = bike.description;

    var specsHtml =
        '<div class="detail-item"><strong>Year:</strong> ' + bike.year + "</div>" +
        '<div class="detail-item"><strong>Engine:</strong> ' + bike.engineCC + " CC</div>" +
        '<div class="detail-item"><strong>Power:</strong> ' + bike.power + "</div>" +
        '<div class="detail-item"><strong>Torque:</strong> ' + bike.torque + "</div>" +
        '<div class="detail-item"><strong>Top Speed:</strong> ' + bike.topSpeed + "</div>" +
        '<div class="detail-item"><strong>Mileage:</strong> ' + bike.mileage + "</div>" +
        '<div class="detail-item"><strong>Price:</strong> $' + bike.price + "</div>" +
        '<div class="detail-item"><strong>Stock:</strong> ' + bike.stock + " units</div>";

    document.getElementById("detailSpecs").innerHTML = specsHtml;
    document.getElementById("bikeDetailBox").className = "detail-box";
}

function renderComparison() {
    var table = document.getElementById("comparisonTable");
    var selected = [];

    for (var i = 0; i < comparedIds.length; i++) {
        var b = findBikeById(comparedIds[i]);
        if (b) selected.push(b);
    }

    if (selected.length < 2) {
        table.innerHTML = '<tbody><tr><td class="empty-row">Select at least 2 motorcycles above and click Compare Selected Bikes.</td></tr></tbody>';
        return;
    }

    var html = "<thead><tr><th>Specification</th>";
    for (var j = 0; j < selected.length; j++) {
        html += "<th>" + selected[j].brand + " " + selected[j].model + "</th>";
    }
    html += "</tr></thead><tbody>";

    var fields = [
        { label: "Model Year", key: "year" },
        { label: "Engine CC", key: "engineCC", suffix: " CC" },
        { label: "Power", key: "power" },
        { label: "Torque", key: "torque" },
        { label: "Top Speed", key: "topSpeed" },
        { label: "Mileage", key: "mileage" },
        { label: "Price", key: "price", prefix: "$" },
        { label: "Available Stock", key: "stock" }
    ];

    for (var r = 0; r < fields.length; r++) {
        html += "<tr><td><strong>" + fields[r].label + "</strong></td>";
        for (var c = 0; c < selected.length; c++) {
            var val = selected[c][fields[r].key];
            if (fields[r].prefix) val = fields[r].prefix + val;
            if (fields[r].suffix) val = val + fields[r].suffix;
            html += "<td>" + val + "</td>";
        }
        html += "</tr>";
    }

    html += "</tbody>";
    table.innerHTML = html;
}

/* 7. FEATURE 2: WISHLIST & PRICE-DROP ALERTS */
function toggleWishlist(bikeId) {
    var bike = findBikeById(bikeId);
    if (!bike) return;

    var foundIndex = -1;
    for (var i = 0; i < wishlist.length; i++) {
        if (wishlist[i].bikeId === bikeId) {
            foundIndex = i;
            break;
        }
    }

    if (foundIndex !== -1) {
        wishlist.splice(foundIndex, 1);
    } else {
        wishlist.push({ bikeId: bike.id, previousPrice: bike.oldPrice });
    }

    saveData("moto_wishlist", wishlist);
    renderBikes();
    renderWishlist();
    updatePriceDropNotice();
}

function renderWishlist() {
    var search = document.getElementById("wishlistSearch").value.trim();
    var tbody = document.getElementById("wishlistTableBody");
    var html = "";
    var count = 0;

    for (var i = 0; i < wishlist.length; i++) {
        var bike = findBikeById(wishlist[i].bikeId);
        if (!bike) continue;

        if (search !== "" && !textContains(bike.id + " " + bike.brand + " " + bike.model, search)) {
            continue;
        }

        var drop = wishlist[i].previousPrice - bike.price;
        var dropText = drop > 0
            ? '<span class="badge badge-green">-$' + drop + "</span>"
            : '<span class="badge badge-gray">No change</span>';

        html +=
            "<tr>" +
            "<td>" + bike.id + "</td>" +
            "<td>" + bike.brand + "</td>" +
            "<td>" + bike.model + "</td>" +
            "<td>$" + wishlist[i].previousPrice + "</td>" +
            "<td>$" + bike.price + "</td>" +
            "<td>" + dropText + "</td>" +
            '<td><button type="button" class="btn btn-danger btn-sm" onclick="toggleWishlist(\'' + bike.id + '\')">Remove</button></td>' +
            "</tr>";
        count++;
    }

    if (count === 0) {
        html = '<tr><td colspan="7" class="empty-row">Your wishlist is empty.</td></tr>';
    }

    tbody.innerHTML = html;
}

function resetAlertForm() {
    document.getElementById("editAlertId").value = "";
    document.getElementById("alertForm").reset();
    document.getElementById("alertEmail").value = "asifur.rahman@example.com";
    document.getElementById("notifyPriceDrop").checked = true;
    document.getElementById("alertFormTitle").textContent = "Set Price-Drop Alert";
    document.getElementById("alertSubmitBtn").textContent = "Save Price Alert";
    document.getElementById("alertBikeError").textContent = "";
    document.getElementById("alertEmailError").textContent = "";
    document.getElementById("targetPriceError").textContent = "";
}

function editAlert(alertId) {
    for (var i = 0; i < priceAlerts.length; i++) {
        if (priceAlerts[i].id === alertId) {
            document.getElementById("editAlertId").value = priceAlerts[i].id;
            document.getElementById("alertBike").value = priceAlerts[i].bikeId;
            document.getElementById("alertEmail").value = priceAlerts[i].email;
            document.getElementById("targetPrice").value = priceAlerts[i].targetPrice;
            document.getElementById("notifyPriceDrop").checked = priceAlerts[i].notify;
            document.getElementById("alertFormTitle").textContent = "Edit Price-Drop Alert (" + alertId + ")";
            document.getElementById("alertSubmitBtn").textContent = "Update Price Alert";
            showStatusMessage("alertMessage", "Editing alert " + alertId, false);
            return;
        }
    }
}

function deleteAlert(alertId) {
    for (var i = 0; i < priceAlerts.length; i++) {
        if (priceAlerts[i].id === alertId) {
            priceAlerts.splice(i, 1);
            break;
        }
    }
    if (document.getElementById("editAlertId").value === alertId) {
        resetAlertForm();
    }
    saveData("moto_alerts", priceAlerts);
    renderAlerts();
    updatePriceDropNotice();
    showStatusMessage("alertMessage", "Alert " + alertId + " deleted.", false);
}

function renderAlerts() {
    var search = document.getElementById("alertSearch").value.trim();
    var tbody = document.getElementById("alertsTableBody");
    var html = "";
    var count = 0;

    for (var i = 0; i < priceAlerts.length; i++) {
        var a = priceAlerts[i];
        var bike = findBikeById(a.bikeId);
        if (!bike) continue;

        if (search !== "" && !textContains(a.id + " " + bike.brand + " " + bike.model + " " + a.email, search)) {
            continue;
        }

        var statusHtml = "";
        if (!a.notify) {
            statusHtml = '<span class="badge badge-gray">Paused</span>';
        } else if (bike.price <= a.targetPrice) {
            statusHtml = '<span class="badge badge-green">Target Met</span>';
        } else {
            statusHtml = '<span class="badge badge-blue">Monitoring</span>';
        }

        html +=
            "<tr>" +
            "<td>" + a.id + "</td>" +
            "<td>" + bike.brand + " " + bike.model + "</td>" +
            "<td>" + a.email + "</td>" +
            "<td>$" + bike.price + "</td>" +
            "<td>$" + a.targetPrice + "</td>" +
            "<td>" + statusHtml + "</td>" +
            '<td><div class="action-btns">' +
            '<button type="button" class="btn btn-light btn-sm" onclick="editAlert(\'' + a.id + '\')">Edit</button>' +
            '<button type="button" class="btn btn-danger btn-sm" onclick="deleteAlert(\'' + a.id + '\')">Delete</button>' +
            "</div></td>" +
            "</tr>";
        count++;
    }

    if (count === 0) {
        html = '<tr><td colspan="7" class="empty-row">No price alerts found.</td></tr>';
    }

    tbody.innerHTML = html;
}

/* 8. FEATURE 3: TEST RIDE BOOKINGS */
function resetBookingForm() {
    document.getElementById("editBookingId").value = "";
    document.getElementById("bookingForm").reset();
    document.getElementById("customerName").value = "Asifur Rahman";
    document.getElementById("customerPhone").value = "01711-000000";
    document.getElementById("customerEmail").value = "asifur.rahman@example.com";
    document.getElementById("rideDate").min = getTodayDate();
    document.getElementById("bookingFormTitle").textContent = "Schedule Test Ride";
    document.getElementById("bookingSubmitBtn").textContent = "Submit Reservation";

    document.getElementById("customerNameError").textContent = "";
    document.getElementById("customerPhoneError").textContent = "";
    document.getElementById("customerEmailError").textContent = "";
    document.getElementById("rideBikeError").textContent = "";
    document.getElementById("rideDateError").textContent = "";
    document.getElementById("rideTimeError").textContent = "";
}

function editBooking(bookingId) {
    for (var i = 0; i < bookings.length; i++) {
        if (bookings[i].id === bookingId && bookings[i].status === "Pending") {
            document.getElementById("editBookingId").value = bookings[i].id;
            document.getElementById("customerName").value = bookings[i].name;
            document.getElementById("customerPhone").value = bookings[i].phone;
            document.getElementById("customerEmail").value = bookings[i].email;
            document.getElementById("rideBike").value = bookings[i].bikeId;
            document.getElementById("rideDate").value = bookings[i].date;
            document.getElementById("rideTime").value = bookings[i].time;
            document.getElementById("bookingFormTitle").textContent = "Reschedule Booking (" + bookingId + ")";
            document.getElementById("bookingSubmitBtn").textContent = "Update Reservation";
            showStatusMessage("bookingMessage", "Rescheduling pending booking " + bookingId, false);
            return;
        }
    }
}

function cancelBooking(bookingId) {
    for (var i = 0; i < bookings.length; i++) {
        if (bookings[i].id === bookingId && bookings[i].status === "Pending") {
            bookings[i].status = "Cancelled";
            break;
        }
    }
    if (document.getElementById("editBookingId").value === bookingId) {
        resetBookingForm();
    }
    saveData("moto_bookings", bookings);
    renderBookings();
    showStatusMessage("bookingMessage", "Booking " + bookingId + " cancelled.", false);
}

function deleteBooking(bookingId) {
    for (var i = 0; i < bookings.length; i++) {
        if (bookings[i].id === bookingId && (bookings[i].status === "Cancelled" || bookings[i].status === "Rejected")) {
            bookings.splice(i, 1);
            break;
        }
    }
    saveData("moto_bookings", bookings);
    renderBookings();
    showStatusMessage("bookingMessage", "Booking " + bookingId + " removed from history.", false);
}

function getStatusBadge(status) {
    if (status === "Pending") return '<span class="badge badge-yellow">Pending</span>';
    if (status === "Approved") return '<span class="badge badge-green">Approved</span>';
    if (status === "Rejected") return '<span class="badge badge-red">Rejected</span>';
    if (status === "Completed") return '<span class="badge badge-blue">Completed</span>';
    return '<span class="badge badge-gray">Cancelled</span>';
}

function renderBookings() {
    var search = document.getElementById("bookingSearch").value.trim();
    var statusFilter = document.getElementById("bookingStatusFilter").value;
    var tbody = document.getElementById("bookingTableBody");
    var html = "";
    var count = 0;

    for (var i = 0; i < bookings.length; i++) {
        var b = bookings[i];
        var matchStatus = (statusFilter === "ALL" || b.status === statusFilter);
        var matchSearch = (search === "" || textContains(b.id + " " + b.bikeName + " " + b.date + " " + b.time, search));

        if (!matchStatus || !matchSearch) continue;

        var actionHtml = "Locked";
        if (b.status === "Pending") {
            actionHtml =
                '<div class="action-btns">' +
                '<button type="button" class="btn btn-light btn-sm" onclick="editBooking(\'' + b.id + '\')">Reschedule</button>' +
                '<button type="button" class="btn btn-danger btn-sm" onclick="cancelBooking(\'' + b.id + '\')">Cancel</button>' +
                "</div>";
        } else if (b.status === "Cancelled" || b.status === "Rejected") {
            actionHtml = '<button type="button" class="btn btn-light btn-sm" onclick="deleteBooking(\'' + b.id + '\')">Delete</button>';
        }

        html +=
            "<tr>" +
            "<td>" + b.id + "</td>" +
            "<td>" + b.bikeName + "</td>" +
            "<td>" + b.date + "</td>" +
            "<td>" + b.time + "</td>" +
            "<td>" + b.name + "</td>" +
            "<td>" + getStatusBadge(b.status) + "</td>" +
            "<td>" + actionHtml + "</td>" +
            "</tr>";
        count++;
    }

    if (count === 0) {
        html = '<tr><td colspan="7" class="empty-row">No bookings found.</td></tr>';
    }

    tbody.innerHTML = html;
}

/* 9. EVENT LISTENERS */
document.getElementById("filterForm").addEventListener("submit", function (e) {
    e.preventDefault();
    renderBikes();
});

document.getElementById("searchBike").addEventListener("input", renderBikes);
document.getElementById("brandFilter").addEventListener("change", renderBikes);
document.getElementById("ccFilter").addEventListener("change", renderBikes);
document.getElementById("yearFilter").addEventListener("change", renderBikes);
document.getElementById("maxPrice").addEventListener("input", renderBikes);
document.getElementById("sortBy").addEventListener("change", renderBikes);

document.getElementById("resetFilterBtn").addEventListener("click", function () {
    document.getElementById("searchBike").value = "";
    document.getElementById("brandFilter").value = "ALL";
    document.getElementById("ccFilter").value = "ALL";
    document.getElementById("yearFilter").value = "ALL";
    document.getElementById("maxPrice").value = "25000";
    document.getElementById("sortBy").value = "default";
    document.getElementById("maxPriceError").textContent = "";
    renderBikes();
});

document.getElementById("compareBtn").addEventListener("click", function () {
    var boxes = document.getElementsByName("compareItem");
    var chosen = [];
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            chosen.push(boxes[i].value);
        }
    }
    if (chosen.length < 2) {
        showStatusMessage("compareMessage", "Please select at least 2 motorcycles to compare.", true);
        return;
    }
    comparedIds = chosen;
    renderComparison();
    showStatusMessage("compareMessage", "Comparing " + chosen.length + " motorcycles.", false);
});

document.getElementById("clearCompareBtn").addEventListener("click", function () {
    comparedIds = [];
    renderBikes();
    renderComparison();
    showStatusMessage("compareMessage", "", false);
});

document.getElementById("closeDetailBtn").addEventListener("click", function () {
    document.getElementById("bikeDetailBox").className = "detail-box hidden";
});

document.getElementById("wishlistSearch").addEventListener("input", renderWishlist);
document.getElementById("alertSearch").addEventListener("input", renderAlerts);
document.getElementById("alertResetBtn").addEventListener("click", function () {
    resetAlertForm();
    showStatusMessage("alertMessage", "", false);
});

document.getElementById("alertForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var editId = document.getElementById("editAlertId").value;
    var bikeId = document.getElementById("alertBike").value;
    var email = document.getElementById("alertEmail").value.trim();
    var targetPrice = document.getElementById("targetPrice").value.trim();
    var notify = document.getElementById("notifyPriceDrop").checked;

    var valid = true;
    document.getElementById("alertBikeError").textContent = "";
    document.getElementById("alertEmailError").textContent = "";
    document.getElementById("targetPriceError").textContent = "";

    if (bikeId === "") {
        document.getElementById("alertBikeError").textContent = "Please select a bike.";
        valid = false;
    }
    if (!isValidEmail(email)) {
        document.getElementById("alertEmailError").textContent = "Please enter a valid email.";
        valid = false;
    }
    if (targetPrice === "" || Number(targetPrice) <= 0) {
        document.getElementById("targetPriceError").textContent = "Please enter a valid target price.";
        valid = false;
    }
    if (!valid) return;

    if (editId !== "") {
        for (var i = 0; i < priceAlerts.length; i++) {
            if (priceAlerts[i].id === editId) {
                priceAlerts[i].bikeId = bikeId;
                priceAlerts[i].email = email;
                priceAlerts[i].targetPrice = Number(targetPrice);
                priceAlerts[i].notify = notify;
                break;
            }
        }
        saveData("moto_alerts", priceAlerts);
        renderAlerts();
        updatePriceDropNotice();
        resetAlertForm();
        showStatusMessage("alertMessage", "Price alert " + editId + " updated.", false);
        return;
    }

    var newId = getNextId(priceAlerts, "ALT", 501);
    priceAlerts.push({
        id: newId,
        bikeId: bikeId,
        email: email,
        targetPrice: Number(targetPrice),
        notify: notify
    });

    saveData("moto_alerts", priceAlerts);
    renderAlerts();
    updatePriceDropNotice();
    resetAlertForm();
    showStatusMessage("alertMessage", "Price alert " + newId + " saved.", false);
});

document.getElementById("bookingSearch").addEventListener("input", renderBookings);
document.getElementById("bookingStatusFilter").addEventListener("change", renderBookings);
document.getElementById("bookingResetBtn").addEventListener("click", function () {
    resetBookingForm();
    showStatusMessage("bookingMessage", "", false);
});

document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var editId = document.getElementById("editBookingId").value;
    var name = document.getElementById("customerName").value.trim();
    var phone = document.getElementById("customerPhone").value.trim();
    var email = document.getElementById("customerEmail").value.trim();
    var bikeId = document.getElementById("rideBike").value;
    var date = document.getElementById("rideDate").value;
    var time = document.getElementById("rideTime").value;

    var valid = true;
    document.getElementById("customerNameError").textContent = "";
    document.getElementById("customerPhoneError").textContent = "";
    document.getElementById("customerEmailError").textContent = "";
    document.getElementById("rideBikeError").textContent = "";
    document.getElementById("rideDateError").textContent = "";
    document.getElementById("rideTimeError").textContent = "";

    if (name.length < 2) {
        document.getElementById("customerNameError").textContent = "Please enter your full name.";
        valid = false;
    }
    if (countDigits(phone) < 7) {
        document.getElementById("customerPhoneError").textContent = "Please enter a valid phone number.";
        valid = false;
    }
    if (!isValidEmail(email)) {
        document.getElementById("customerEmailError").textContent = "Please enter a valid email.";
        valid = false;
    }
    if (bikeId === "") {
        document.getElementById("rideBikeError").textContent = "Please select a motorcycle.";
        valid = false;
    }
    if (date === "" || date < getTodayDate()) {
        document.getElementById("rideDateError").textContent = "Please choose today or a future date.";
        valid = false;
    }
    if (time === "") {
        document.getElementById("rideTimeError").textContent = "Please select a time slot.";
        valid = false;
    }
    if (!valid) return;

    for (var i = 0; i < bookings.length; i++) {
        if (
            bookings[i].id !== editId &&
            (bookings[i].status === "Pending" || bookings[i].status === "Approved") &&
            bookings[i].bikeId === bikeId &&
            bookings[i].date === date &&
            bookings[i].time === time
        ) {
            document.getElementById("rideTimeError").textContent = "This bike is already booked for that date and time.";
            return;
        }
    }

    var bike = findBikeById(bikeId);
    var bikeName = bike ? (bike.brand + " " + bike.model) : bikeId;

    if (editId !== "") {
        for (var j = 0; j < bookings.length; j++) {
            if (bookings[j].id === editId && bookings[j].status === "Pending") {
                bookings[j].bikeId = bikeId;
                bookings[j].bikeName = bikeName;
                bookings[j].date = date;
                bookings[j].time = time;
                bookings[j].name = name;
                bookings[j].phone = phone;
                bookings[j].email = email;
                break;
            }
        }
        saveData("moto_bookings", bookings);
        renderBookings();
        resetBookingForm();
        showStatusMessage("bookingMessage", "Booking " + editId + " updated.", false);
        return;
    }

    var newBookingId = getNextId(bookings, "TR", 9021);
    bookings.push({
        id: newBookingId,
        bikeId: bikeId,
        bikeName: bikeName,
        date: date,
        time: time,
        name: name,
        phone: phone,
        email: email,
        status: "Pending"
    });

    saveData("moto_bookings", bookings);
    renderBookings();
    resetBookingForm();
    showStatusMessage("bookingMessage", "Test ride booked! Booking ID: " + newBookingId, false);
});

/* 10. INITIAL LOAD */
populateDropdowns();
resetAlertForm();
resetBookingForm();
renderBikes();
renderComparison();
renderWishlist();
renderAlerts();
renderBookings();
updatePriceDropNotice();
