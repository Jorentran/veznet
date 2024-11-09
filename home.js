document.addEventListener("DOMContentLoaded", function () {
  // Check if the name is already saved in localStorage
  let savedName = localStorage.getItem("userName");
  const logout = document.querySelector("#logout");
  const player = document.querySelector("#playerName");
  const regexName = /^[a-zA-Z0-9_]{3,16}$/;

  // Menambahkan event listener untuk tautan "Logout"
  logout.addEventListener("click", async function (event) {
    if (savedName) {
      event.preventDefault(); // Menghentikan perilaku default dari tautan

      player.textContent = "Guest Account";

      // Menghapus data dari localStorage
      localStorage.removeItem("userName");

      // Menampilkan pesan atau melakukan tindakan lain jika diperlukan
      await Swal.fire({
        title: `Successfully Logouted`,
        icon: "success",
        background: "rgb(29, 28, 28)",
        color: "#fff",
      });
    } else {
      await Swal.fire({
        title: `You are not logged in`,
        icon: "error",
        background: "rgb(29, 28, 28)",
        color: "#fff",
      });
    }
    await login();
  });

  async function login() {
    let version = "";
    const versionSelect = await Swal.fire({
      title: "Kamu bermain dimana?",
      showDenyButton: true,
      background: "rgb(29, 28, 28)",
      color: "#fff",
      confirmButtonText: "Java",
      denyButtonText: "Bedrock",
      denyButtonColor: "#7066e0",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
    });

    if (versionSelect.isDenied) version = ".";

    Swal.fire({
      title: "Masukkan Username",
      input: "text",
      background: "rgb(29, 28, 28)",
      color: "#fff",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: false,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) return "Invalid username";
        if (!regexName.test(value)) return "Invalid username";
      },
      preConfirm: (name) => {
        // Save the entered name to localStorage
        localStorage.setItem("version", version);
        localStorage.setItem("userName", version + name);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Hello, ${result.value}!`,
          icon: "success",
          background: "rgb(29, 28, 28)",
          color: "#fff",
        });

        player.textContent = "Hi, " + version + result.value;
      }
    });
  }

  if (!savedName) login();
  if (savedName) player.textContent = "Hi, " + savedName;

  const open = document.querySelectorAll(".coin");
  const iframe = document.querySelector("iframe");
  let diskon = 0;

  fetch("/api/discount")
    .then((response) => response.json())
    .then((data) => {
      diskon = parseFloat(data.discount);
      console.log("Diskon:", diskon);
    })
    .catch((error) => console.error("Error fetching discount:", error));

  open.forEach(function (coin, index) {
    coin.addEventListener("click", async function () {
      let savedName = localStorage.getItem("userName");
      let version = localStorage.getItem("version");
      let quantity;
      if (index === 0) {
        quantity = Math.floor(10 * ((100 - diskon) / 100));
      } else if (index === 1) {
        quantity = Math.floor(20 * ((100 - diskon) / 100));
      } else if (index === 2) {
        quantity = Math.floor(50 * ((100 - diskon) / 100));
      } else if (index === 3) {
        quantity = Math.floor(80 * ((100 - diskon) / 100));
      } else if (index === 4) {
        quantity = Math.floor(100 * ((100 - diskon) / 100));
      } else if (index === 5) {
        quantity = Math.floor(140 * ((100 - diskon) / 100));
      } else if (index === 6) {
        quantity = Math.floor(200 * ((100 - diskon) / 100));
      } else if (index === 7) {
        quantity = Math.floor(250 * ((100 - diskon) / 100));
      }
      toggleScrolling(true); // Disable scrolling
      toggleNavbar(false); // Hide navbar
      iframe.style.display = "block";
      iframe.src = `https://trakteer.id/veznetwork/tip/embed/modal?step=2&supporter_message=Ubah emailnya! emailnya bebas. Jangan ubah apapun kecuali email!&quantity=${quantity}&payment_method=qris&display_name=${savedName}&email=play@anomaly.network&`;
      iframe.contentWindow.postMessage({ type: "embed.openModal" }, `https://trakteer.id/zyxkemren/tip/`);
    });
  });

  window.addEventListener("message", function (event) {
    if ("embed.modalClosed" === event.data.type) {
      setTimeout(function () {
        var iframe = document.querySelector("iframe");
        iframe.style.display = "none";
        toggleScrolling(false); // Enable scrolling
        toggleNavbar(true); // Show navbar
      }, 200);
    }
  });

  let prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    toggleNavbar(prevScrollpos > currentScrollPos || currentScrollPos <= 0);
    prevScrollpos = currentScrollPos;
  };

  function toggleScrolling(disable) {
    if (disable) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  function toggleNavbar(show) {
    document.querySelector("nav").style.top = show ? "0" : "-90px";
  }
});
