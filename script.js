// Mendapatkan elemen template kartu pengguna dari HTML
const userCardTemplate = document.querySelector("[data-user-template]");

// Mendapatkan kontainer untuk semua kartu pengguna dari HTML
const userCardContainer = document.querySelector("[data-user-cards-container]");

// Mendapatkan input pencarian dari HTML
const searchInput = document.querySelector("[data-search]");

// Mendefinisikan array kosong untuk menyimpan data pengguna
let users = [];

// Menambahkan event listener untuk memantau perubahan input pencarian
searchInput.addEventListener("input", (e) => {
  // Mendapatkan nilai dari input pencarian dan mengonversinya menjadi huruf kecil
  const value = e.target.value.toLowerCase();

  // Iterasi melalui setiap pengguna
  users.forEach((user) => {
    // Memeriksa apakah nama pengguna atau emailnya mengandung nilai pencarian
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);

    // Menggunakan metode toggle untuk menambah atau menghapus kelas "hide" sesuai dengan visibilitas
    user.element.classList.toggle("hide", !isVisible);
    console.log(user);
  });
});

// Mengambil data pengguna dari API menggunakan fetch
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    // Membuat kartu untuk setiap pengguna dan menambahkannya ke kontainer kartu
    users = data.map((user) => {
      // Menggandakan template kartu dan mengisi data pengguna
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = user.name;
      body.textContent = user.email;
      userCardContainer.append(card);

      // Mengembalikan objek pengguna yang berisi informasi pengguna dan elemen HTML kartu
      return {
        name: user.name,
        email: user.email,
        element: card,
      };
    });
  });
