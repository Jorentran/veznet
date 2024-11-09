document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/discount")
    .then((response) => response.json())
    .then((data) => {
      const discount = parseFloat(data.discount);

      function updatePrices(discountPercentage) {
        const coins = document.querySelectorAll(".price");

        coins.forEach((priceElem) => {
          const priceNormal = parseFloat(priceElem.getAttribute("data-normal")); // Ambil harga normal dari atribut data
          const discountFactor = (100 - discountPercentage) / 100; // Menghitung faktor diskon
          let priceDiscounted = priceNormal * discountFactor; // Hitung harga diskon

          // Bulatkan harga diskon ke ribuan terdekat
          priceDiscounted = Math.floor(priceDiscounted / 1000) * 1000;

          if (discountPercentage > 0) {
            // Jika ada diskon, tampilkan harga dengan coret dan harga diskon
            priceElem.innerHTML = `<s>${priceNormal.toLocaleString("id-ID")} IDR</s><br>${priceDiscounted.toLocaleString("id-ID")} IDR`;
          } else {
            // Jika tidak ada diskon, hanya tampilkan harga normal
            priceElem.innerHTML = `${priceNormal.toLocaleString("id-ID")} IDR`;
          }
        });
      }

      function updateLogo(discountPercentage) {
        const logo = document.querySelector(".logo");
        if (discountPercentage > 0) {
          logo.textContent = `${discountPercentage}% OFF!!`;
        } else {
          logo.textContent = "Anomaly Network";
        }
      }

      updateLogo(discount);
      updatePrices(discount);
    })
    .catch((error) => console.error("Error fetching discount:", error));
});