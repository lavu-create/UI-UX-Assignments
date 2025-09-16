// ===== Packages Table ====
const packages = [
  { id: 1, destination: "Paris, France", type: "Standard", durationDays: 5, basePrice: 1200, season: "high" },
  { id: 2, destination: "Paris, France", type: "Deluxe", durationDays: 5, basePrice: 1500, season: "high" },
  { id: 3, destination: "Paris, France", type: "Premium", durationDays: 5, basePrice: 1800, season: "high" },
  { id: 4, destination: "Goa, India", type: "Standard", durationDays: 3, basePrice: 400, season: "low" },
  { id: 5, destination: "Goa, India", type: "Deluxe", durationDays: 3, basePrice: 600, season: "low" },
  { id: 6, destination: "Goa, India", type: "Premium", durationDays: 3, basePrice: 800, season: "low" },
  { id: 7, destination: "Bali, Indonesia", type: "Standard", durationDays: 6, basePrice: 900, season: "mid" },
  { id: 8, destination: "Bali, Indonesia", type: "Deluxe", durationDays: 6, basePrice: 1200, season: "mid" },
  { id: 9, destination: "Bali, Indonesia", type: "Premium", durationDays: 6, basePrice: 1500, season: "mid" },
  { id:10, destination: "Disney Land, USA", type: "Standard", durationDays: 4, basePrice: 1200, season: "high" },
  { id:11, destination: "Disney Land, USA", type: "Deluxe", durationDays: 4, basePrice: 1600, season: "high" },
  { id:12, destination: "Disney Land, USA", type: "Premium", durationDays: 4, basePrice: 2000, season: "high" }
];
function calcFinalPrice(pkg) {
  let multiplier = 1;
  switch(pkg.season) {
    case "high": multiplier = 1.3; break;
    case "mid": multiplier = 1.15; break;
    case "low": multiplier = 0.9; break;
  }
  if(pkg.durationDays > 5) multiplier += 0.1;
  return (pkg.basePrice * multiplier).toFixed(2);
}
// Render table if it exists
const tableBody = document.querySelector(".table tbody");
if(tableBody) {
  tableBody.innerHTML = "";
  packages.forEach(pkg => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays} Days</td>
      <td>$${pkg.basePrice}</td>
      <td>${pkg.season}</td>
      <td>$${calcFinalPrice(pkg)}</td>
    `;
    tableBody.appendChild(row);
  });
}

// ==== Booking Price Estimator ====
const bookingForm = document.querySelector(".form");
if(bookingForm) {
  const checkIn = bookingForm.querySelector("#start");
  const checkOut = bookingForm.querySelector("#end");
  const guests = bookingForm.querySelector("#travellers");
  const promo = bookingForm.querySelector("#promoCode");
  const destinationSelect = bookingForm.querySelector("#destination");
  const packageSelect = bookingForm.querySelector("#package");
  const totalSpan = document.createElement("p");
  totalSpan.style.fontWeight = "bold";
  bookingForm.appendChild(totalSpan);
  function calcBookingTotal() {
    if(!checkIn.value || !checkOut.value || !guests.value || !destinationSelect.value || !packageSelect.value) {
      totalSpan.textContent = "Please fill all required fields";
      return;
    }
    const startDate = new Date(checkIn.value);
    const endDate = new Date(checkOut.value);
    let nights = (endDate - startDate)/(1000*60*60*24);
    if(nights <= 0) { totalSpan.textContent = "Invalid dates"; return; }
    const selectedPackage = packages.find(
        p => p.destination === destinationSelect.value && p.type === packageSelect.value
    );
    let pricePerNight = selectedPackage ? Number(calcFinalPrice(selectedPackage)) : 0;
    let total = nights * pricePerNight * guests.value;
    // Guests multiplier
    if(guests.value > 2) total *= 1.2;
    // Promo code discount
    let promoCode = promo ? promo.value.trim().toUpperCase() : "";
    switch(promoCode) {
      case "EARLYBIRD": total *= 0.9; break;
      case "SUMMER21": total *= 0.85; break;
    }
    totalSpan.textContent = `Estimated Total: $${total.toFixed(2)}`;
  }
  [checkIn, checkOut, guests, promo, destinationSelect, packageSelect].forEach(el => {
    el.addEventListener("input", calcBookingTotal);
  });
  bookingForm.addEventListener("submit", e => {
    e.preventDefault();
    if(totalSpan.textContent.includes("Please") || totalSpan.textContent.includes("Invalid")) {
        alert("Fix errors before submitting!");
        return;
    }
   alert("Booking submitted successfully!\n" + totalSpan.textContent);
   bookingForm.reset();
   totalSpan.textContent = "";
  });
}

// ==== Gallery Modal ====
const galleryItems = document.querySelectorAll(".gallery__item img");
if(galleryItems.length) {
  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed; inset:0; background: rgba(0,0,0,0.8);
    display: flex; justify-content:center; align-items:center; z-index:10000;
    visibility: hidden; opacity:0; transition: opacity 0.3s;
  `;
  const modalImg = document.createElement("img");
  modalImg.style.maxWidth = "90%";
  modalImg.style.maxHeight = "90%";
  modal.appendChild(modalImg);
  document.body.appendChild(modal);
  galleryItems.forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.dataset.large || img.src;
      modalImg.alt = img.alt;
      modal.style.visibility = "visible";
      modal.style.opacity = "1";
    });
  });
  modal.addEventListener("click", () => {
    modal.style.opacity = "0";
    setTimeout(() => { modal.style.visibility = "hidden"; }, 300);
  });
}

// ==== Nav Highlight ====
const navLinks = document.querySelectorAll(".nav-link");
const currentPath = window.location.pathname.split("/").pop();
navLinks.forEach(link => {
  const href = link.getAttribute("href");
  if(href === currentPath) link.classList.add("active");
});