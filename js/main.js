// JavaScript portofolio Putri Dwi Paulia
// Dipasang di ketiga halaman dengan defer
// 1. Daftar keahlian (halaman Beranda), data dari data/keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");
async function muatKeahlian() {
    try {
        const response = await fetch("data/keahlian.json");
        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }
        const skills = await response.json();
        skills.forEach((skill) => {
            const item = document.createElement("li");
            item.textContent = `${skill.nama} (${skill.level})`;
            daftarSkill.appendChild(item);
        });
        jumlahSkill.textContent = `Ada ${skills.length} keahlian yang 
sedang saya kembangkan.`;
    } catch (error) {
        jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
        console.error(error);
    }
}
if (daftarSkill) {
    muatKeahlian();
}
// 2. Tema gelap (semua halaman)
const tombolTema = document.querySelector("#tombol-tema");
tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
        tombolTema.textContent = "Mode Terang";
    } else {
        tombolTema.textContent = "Mode Gelap";
    }
});

// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");
if (kotakPesan) {
    kotakPesan.addEventListener("input", () => {
        hitungKarakter.textContent = `${kotakPesan.value.length}/300
karakter`;
    });
}

if (kotakPesan) {
    const tombolKosongkan = document.querySelector("#tombol-kosongkan");
    const hapusPesan = document.querySelector("button[type='reset']");
    hapusPesan.addEventListener("click", () => {
        hitungKarakter.textContent = "0/300 karakter";
    });
    kotakPesan.addEventListener("input", () => {
        const panjangPesan = kotakPesan.value.length;
        hitungKarakter.textContent = `${panjangPesan}/300 karakter`;
        if (panjangPesan > 250) {
            tombolKosongkan.style.display = "inline-block";
        } else {
            tombolKosongkan.style.display = "inline-block";
        }
    });
}
// 4. Daftar proyek dan filter (halaman Proyek)
const proyek = [
    {
        judul: "Halaman Profil Pertama",
        kategori: "HTML",
        gambar: "img/proyek-profil.png",
        alt: "Tangkapan layar halaman profil Andi Pratama",
        deskripsi: "Halaman web pertama saya, dibuat dengan HTML dasar.",
    },
    {
        judul: "Form Kontak",
        kategori: "HTML",
        gambar: "img/proyek-kontak.png",
        alt: "Tangkapan layar form kontak berisi lima isian",
        deskripsi: "Form dengan label dan validasi bawaan browser.",
    },
    {
        judul: "Tabel Jadwal Belajar",
        kategori: "HTML",
        gambar: "img/proyek-jadwal.png",
        alt: "Tangkapan layar tabel jadwal belajar mandiri",
        deskripsi: "Jadwal belajar mingguan dengan thead dan tbody.",
    },
    {
        judul: "Portofolio Responsif",
        kategori: "CSS",
        gambar: "img/proyek-responsif.png",
        alt: "Tangkapan layar portofolio di ponsel dan laptop",
        deskripsi: "Rapi di ponsel, tablet, dan laptop dengan Flexbox.",
    },
    {
        judul: "Kalkulator Nilai Rapor",
        kategori: "JavaScript",
        gambar: "img/proyek-kalkulator.png",
        alt: "Tangkapan layar hasil kalkulator nilai di Console",
        deskripsi: "Rata-rata dan predikat nilai dengan fungsi JavaScript.",
    },
    {
        judul: "Lima Soal Logika",
        kategori: "JavaScript",
        gambar: "img/proyek-logika.png",
        alt: "Tangkapan layar hasil uji lima soal logika",
        deskripsi: "Lima fungsi logika yang masing-masing diuji 3 masukan.",
    },
];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
function buatKartu(item) {
    return `
 <article class="kartu">
 <span class="label">${item.kategori}</span>
 <h3>${item.judul}</h3>
 <img src="${item.gambar}" alt="${item.alt}" width="280">
 <p>${item.deskripsi}</p>
 </article>`;
}
function tampilkanProyek(daftar) {
    const semuaKartu = daftar.map((item) => buatKartu(item));
    daftarProyek.innerHTML = semuaKartu.join("");
    jumlahProyek.textContent = `Menampilkan ${daftar.length} dari 6 proyek`;
}

function pasangFilter(idTombol, kategori) {
    const tombol = document.querySelector(idTombol);
    tombol.addEventListener("click", () => {
        if (kategori === "Semua") {
            tampilkanProyek(proyek);
        } else {
            tampilkanProyek(proyek.filter((item) => item.kategori ===
                kategori));
        }
    });
}
if (daftarProyek) {
    tampilkanProyek(proyek);
    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-javascript", "JavaScript");
    pasangFilter("#filter-css", "CSS");
    pasangFilter("#filter-html", "HTML");
}

// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "putrirpl22-cyber";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");
if (daftarRepo) {
    async function ambilRepo() {
        try {
            const response = await fetch(alamatRepo + pilihan);
            if (!response.ok) {
                throw new Error(`GitHub mengembalikan status ${response.status}`);
            }

            const repos = await response.json();
            repos.forEach((repo) => {
                const item = document.createElement("li");
                const tautan = document.createElement("a");
                tautan.href = repo.html_url;
                tautan.target = "_blank";
                tautan.rel = "noopener noreferrer";
                tautan.textContent = repo.name;
                item.appendChild(tautan);
                item.append(
				` (${repo.language || "tanpa bahasa"}, ${repo.stargazers_count} bintang)`
			);
                daftarRepo.appendChild(item);
            });
            statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;
        } catch (error) {
            statusRepo.textContent =  "Maaf, daftar repository tidak dapat dimuat. Periksa koneksi atau nama akun GitHub.";
            console.error("Gagal memuat repositori GitHub:", error);
        }
    }

    ambilRepo();
}