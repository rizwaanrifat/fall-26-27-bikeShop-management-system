
let users = [
  { id: "U-001", name: "Rizwan Rifat",  username: "admin",    password: "admin1234",   email: "admin@motomanage.com",    phone: "01711000001", role: "Admin",    status: "Active" },

  { id: "U-002", name: "Shahriar",  username: "seller",   password: "seller123",   email: "seller@motomanage.com",   phone: "01711000002", role: "Seller",   status: "Active",
    sellerNid: "SLR-1001", sellerType: "Showroom Sales Executive", experience: 5, shift: "Morning" },
  { id: "U-007", name: "Sabbir Hossain", username: "sabbir",  password: "sabbir123",   email: "sabbir@motomanage.com",   phone: "01711000007", role: "Seller",   status: "Active",
    sellerNid: "SLR-1002", sellerType: "Personal Bike Seller",     experience: 2, shift: "Evening" },
  { id: "U-010", name: "Karim Hossain", username: "karim",    password: "karim1234",   email: "karim@mail.com",          phone: "01711000010", role: "Seller",   status: "Pending",
    sellerNid: "SLR-1003", sellerType: "Personal Bike Seller",     experience: 1, shift: "Morning" },

  { id: "U-003", name: "Asifur Rahman", username: "customer", password: "customer123", email: "customer@motomanage.com", phone: "01711000003", role: "Customer", status: "Active",
    licenseNo: "DL-23-51234", preferredBranch: "Kuril Flagship",  budgetRange: "4,00,000 - 6,00,000 Tk" },
  { id: "U-004", name: "Ashiqur Rahman", username: "ashiq",   password: "ashiq1234",   email: "ashiq@mail.com",          phone: "01711000004", role: "Customer", status: "Active",
    licenseNo: "DL-22-48765", preferredBranch: "Tejgaon Branch",  budgetRange: "2,50,000 - 4,00,000 Tk" },
  { id: "U-005", name: "Nadia Islam",   username: "nadia",    password: "nadia1234",   email: "nadia@mail.com",          phone: "01711000005", role: "Customer", status: "Active",
    licenseNo: "DL-24-55120", preferredBranch: "Uttara Branch",   budgetRange: "Under 2,50,000 Tk" },
  { id: "U-006", name: "jamal Uddin",   username: "jamal",    password: "jamal1234",   email: "jamal@mail.com",          phone: "01711000006", role: "Customer", status: "Blocked",
    licenseNo: "DL-21-44001", preferredBranch: "Mirpur Branch",   budgetRange: "Above 6,00,000 Tk" },

  { id: "U-008", name: "Turjo",  username: "vendor",   password: "vendor123",   email: "vendor@motomanage.com",   phone: "01712345678", role: "Vendor",   status: "Active",
    tradeLicense: "TRAD-DHK-9001", suppliedBrand: "Yamaha", companyName: "ACI Motors Ltd.",          warehouseAddress: "Tejgaon Industrial Area, Dhaka" },
  { id: "U-009", name: "Rafiqul Islam", username: "rafiq",    password: "rafiq1234",   email: "rafiq@hondabd.com",       phone: "01898765432", role: "Vendor",   status: "Active",
    tradeLicense: "TRAD-DHK-9002", suppliedBrand: "Honda",  companyName: "Bangladesh Honda Pvt Ltd", warehouseAddress: "Gazipur Industrial Zone" },
  { id: "U-011", name: "Nazmul Huda",   username: "nazmul",   password: "nazmul123",   email: "nazmul@suzukibd.com",     phone: "01911223344", role: "Vendor",   status: "Pending",
    tradeLicense: "TRAD-DHK-9003", suppliedBrand: "Suzuki", companyName: "Rancon Motorbikes Ltd.",   warehouseAddress: "uttara Sector 12, Dhaka" }
];



let bikes = [
  { id: "BIK-101", brand: "Yamaha",        model: "YZF-R15M Carbon ABS",    category: "Sport",     cc: 155, year: 2026, buyPrice: 565000, price: 610000, stock: 5, mileage: "42 km/L", braking: "Dual Channel ABS",   listedBy: "seller", image: "auth/images/bik-101.jpg" },
  { id: "BIK-102", brand: "Honda",         model: "CBR 150R Tricolor",      category: "Sport",     cc: 150, year: 2026, buyPrice: 520000, price: 565000, stock: 3, mileage: "40 km/L", braking: "Dual Channel ABS",   listedBy: "seller", image: "auth/images/bik-102.jpg" },
  { id: "BIK-103", brand: "Suzuki",        model: "Gixxer SF FI ABS",       category: "Sport",     cc: 155, year: 2025, buyPrice: 318000, price: 349950, stock: 8, mileage: "45 km/L", braking: "Single Channel ABS", listedBy: "seller", image: "auth/images/bik-103.jpg" },
  { id: "BIK-104", brand: "Royal Enfield", model: "Classic 350 Halcyon",    category: "Cruiser",   cc: 349, year: 2026, buyPrice: 390000, price: 435000, stock: 1, mileage: "35 km/L", braking: "Dual Channel ABS",   listedBy: "seller", image: "auth/images/bik-104.jpg" },
  { id: "BIK-105", brand: "KTM",           model: "Duke 125 European",      category: "Naked",     cc: 125, year: 2025, buyPrice: 455000, price: 495000, stock: 4, mileage: "44 km/L", braking: "Dual Channel ABS",   listedBy: "sabbir", image: "auth/images/bik-105.jpg" },
  { id: "BIK-106", brand: "Kawasaki",      model: "Ninja 125 ABS",          category: "Sport",     cc: 125, year: 2025, buyPrice: 480000, price: 520000, stock: 0, mileage: "40 km/L", braking: "Dual Channel ABS",   listedBy: "seller", image: "auth/images/bik-106.jpg" },
  { id: "BIK-107", brand: "Yamaha",        model: "MT-15 Version 2.0",      category: "Naked",     cc: 155, year: 2026, buyPrice: 490000, price: 535000, stock: 6, mileage: "43 km/L", braking: "Dual Channel ABS",   listedBy: "sabbir", image: "auth/images/bik-107.jpg" },
  { id: "BIK-108", brand: "Honda",         model: "X-Blade 160 FI ABS",     category: "Commuter",  cc: 160, year: 2025, buyPrice: 212000, price: 240000, stock: 7, mileage: "48 km/L", braking: "Single Channel ABS", listedBy: "seller", image: "auth/images/bik-108.jpg" },
  { id: "BIK-109", brand: "Suzuki",        model: "V-Strom SX 250",         category: "Adventure", cc: 249, year: 2026, buyPrice: 495000, price: 545000, stock: 2, mileage: "36 km/L", braking: "Dual Channel ABS",   listedBy: "seller", image: "auth/images/bik-109.jpg" },
  { id: "BIK-110", brand: "Yamaha",        model: "FZS V3 Deluxe",          category: "Commuter",  cc: 149, year: 2025, buyPrice: 250000, price: 279000, stock: 9, mileage: "46 km/L", braking: "Single Channel ABS", listedBy: "sabbir", image: "auth/images/bik-110.jpg" }
];


let sales = [
  { id: "SAL-001", bikeId: "BIK-101", model: "Yamaha YZF-R15M Carbon ABS", customerId: "U-003", customerName: "Asifur Rahman",  seller: "seller", saleDate: "2026-10-18", quantity: 1, unitPrice: 610000, buyCost: 565000, discount: 5000,  totalPrice: 605000, status: "Completed" },
  { id: "SAL-002", bikeId: "BIK-102", model: "Honda CBR 150R Tricolor",    customerId: "U-004", customerName: "Ashiqur Rahman", seller: "seller", saleDate: "2026-10-22", quantity: 1, unitPrice: 565000, buyCost: 520000, discount: 0,     totalPrice: 565000, status: "Completed" },
  { id: "SAL-003", bikeId: "BIK-104", model: "Royal Enfield Classic 350",  customerId: "U-003", customerName: "Asifur Rahman",  seller: "sabbir", saleDate: "2026-10-25", quantity: 1, unitPrice: 435000, buyCost: 390000, discount: 5000,  totalPrice: 430000, status: "Confirmed" },
  { id: "SAL-004", bikeId: "BIK-108", model: "Honda X-Blade 160 FI ABS",   customerId: "U-005", customerName: "Nadia Islam",    seller: "seller", saleDate: "2026-10-28", quantity: 1, unitPrice: 240000, buyCost: 212000, discount: 2000,  totalPrice: 238000, status: "Completed" },
  { id: "SAL-005", bikeId: "BIK-103", model: "Suzuki Gixxer SF FI ABS",    customerId: "U-004", customerName: "Ashiqur Rahman", seller: "sabbir", saleDate: "2026-10-30", quantity: 1, unitPrice: 349950, buyCost: 318000, discount: 4950,  totalPrice: 345000, status: "Cancelled" }
];



let showroomRules = {
  regFee: 14500,        
  vatPercent: 5,       
  maxDiscount: 10,      
  lowStockLimit: 2,     
  maxTestRides: 2       
};



let expenses = [
  { id: "EXP-001", title: "October Showroom Rent (Kuril)",   category: "Showroom Rent",        amount: 65000, date: "2026-10-01" },
  { id: "EXP-002", title: "Sales Staff Salaries (2 Staff)",  category: "Staff Salary",         amount: 48000, date: "2026-10-05" },
  { id: "EXP-003", title: "Showroom Electricity & AC Bill",  category: "Electricity & Utility", amount: 14500, date: "2026-10-12" },
  { id: "EXP-004", title: "Hydraulic Ramp & Tool Servicing", category: "Bike Servicing & Tools", amount: 8500,  date: "2026-10-19" }
];



let purchaseOrders = [
  { id: "PO-401", vendorId: "U-008", vendorName: "ACI Motors Ltd.",          bikeId: "BIK-101", model: "Yamaha YZF-R15M Carbon ABS", quantity: 5, unitCost: 565000, totalCost: 2825000, orderDate: "2026-10-10", status: "Delivered" },
  { id: "PO-402", vendorId: "U-009", vendorName: "Bangladesh Honda Pvt Ltd", bikeId: "BIK-102", model: "Honda CBR 150R Tricolor",    quantity: 3, unitCost: 520000, totalCost: 1560000, orderDate: "2026-10-24", status: "Accepted" },
  { id: "PO-403", vendorId: "U-008", vendorName: "ACI Motors Ltd.",          bikeId: "BIK-106", model: "Kawasaki Ninja 125 ABS",     quantity: 4, unitCost: 480000, totalCost: 1920000, orderDate: "2026-10-29", status: "Pending" }
];


let supplyRequests = [
  { id: "SUP-501", vendorId: "U-008", vendorName: "ACI Motors Ltd.",          brand: "Yamaha", model: "Yamaha R3 Dual ABS (2026)", quantity: 4, unitPrice: 680000, date: "2026-10-20", status: "Approved" },
  { id: "SUP-502", vendorId: "U-009", vendorName: "Bangladesh Honda Pvt Ltd", brand: "Honda",  model: "Honda Hornet 2.0 ABS",      quantity: 6, unitPrice: 265000, date: "2026-10-28", status: "Pending" }
];

let supplierInvoices = [
  { id: "SINV-601", poId: "PO-401", vendorId: "U-008", vendorName: "ACI Motors Ltd.",          model: "Yamaha YZF-R15M Carbon ABS", quantity: 5, unitPrice: 565000, totalAmount: 2825000, date: "2026-10-14", paymentStatus: "Paid" },
  { id: "SINV-602", poId: "PO-402", vendorId: "U-009", vendorName: "Bangladesh Honda Pvt Ltd", model: "Honda CBR 150R Tricolor",    quantity: 3, unitPrice: 520000, totalAmount: 1560000, date: "2026-10-26", paymentStatus: "Unpaid" }
];



let inquiries = [
  { id: "INQ-701", customerId: "U-003", customerName: "Asifur Rahman",  phone: "01711000003", bikeId: "BIK-101", model: "Yamaha YZF-R15M Carbon ABS", question: "Is 12-month EMI available with City Bank card?", reply: "Yes! 0% EMI is available for up to 6 months and 6% for 12 months.", status: "Responded", date: "2026-10-21" },
  { id: "INQ-702", customerId: "U-004", customerName: "Ashiqur Rahman", phone: "01711000004", bikeId: "BIK-104", model: "Royal Enfield Classic 350",  question: "Do you have the Halcyon Black color in ready stock?", reply: "", status: "Pending", date: "2026-10-29" },
  { id: "INQ-703", customerId: "U-005", customerName: "Nadia Islam",    phone: "01711000005", bikeId: "BIK-108", model: "Honda X-Blade 160 FI ABS",   question: "Does the price include BRTA registration fee?", reply: "Showroom price is 2,40,000 Tk; BRTA 2-year registration is 14,500 Tk extra.", status: "Closed", date: "2026-10-15" }
];




let testRides = [
  { id: "TR-801", customerId: "U-003", name: "Ahad",  email: "customer@motomanage.com", phone: "01711000003", bikeId: "BIK-101", model: "Yamaha YZF-R15M Carbon ABS", date: "2026-11-04", slot: "Morning (10 AM - 12 PM)",  licenseNo: "DL-23-51234", status: "Approved" },
  { id: "TR-802", customerId: "U-004", name: "Ashiqur Rahman", email: "ashiq@mail.com",          phone: "01711000004", bikeId: "BIK-104", model: "Royal Enfield Classic 350",  date: "2026-11-06", slot: "Afternoon (3 PM - 5 PM)", licenseNo: "DL-22-48765", status: "Pending" },
  { id: "TR-803", customerId: "U-005", name: "Nadia Islam",    email: "nadia@mail.com",          phone: "01711000005", bikeId: "BIK-108", model: "Honda X-Blade 160 FI ABS",   date: "2026-10-20", slot: "Morning (10 AM - 12 PM)",  licenseNo: "DL-24-55120", status: "Completed" }
];



let wishlists = [
  { id: "WSH-901", customerId: "U-003", bikeId: "BIK-103", savedPrice: 365000, addedDate: "2026-10-10" },
  { id: "WSH-902", customerId: "U-003", bikeId: "BIK-104", savedPrice: 435000, addedDate: "2026-10-18" },
  { id: "WSH-903", customerId: "U-004", bikeId: "BIK-101", savedPrice: 610000, addedDate: "2026-10-25" }
];



let activityLog = [
  { time: "2026-10-28 10:15", user: "admin",  type: "User",     message: "Approved Seller account for Tanvir Ahmed (SLR-1001)" },
  { time: "2026-10-28 14:30", user: "vendor", type: "Supply",   message: "Delivered 5 units of Yamaha YZF-R15M under PO-401" },
  { time: "2026-10-29 11:20", user: "seller", type: "Sale",     message: "Sold 1x Honda CBR 150R Tricolor to Ashiqur Rahman (5,65,000 Tk)" },
  { time: "2026-10-29 16:45", user: "admin",  type: "Bike",     message: "Low-stock alert triggered for Royal Enfield Classic 350 (1 unit left)" },
  { time: "2026-10-30 09:10", user: "admin",  type: "Settings", message: "Updated BRTA registration fee to 14,500 Tk" },
  { time: "2026-10-31 12:05", user: "karim",  type: "User",     message: "New Seller registration waiting for approval: Karim Hossain" }
];