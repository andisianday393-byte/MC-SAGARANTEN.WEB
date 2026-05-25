// Fungsi untuk membandingkan data baru dengan data lama
function cekPerubahanData(key, dataBaru, pesan) {
    const dataLama = localStorage.getItem(key);
    
    // Jika data berbeda (terjadi perubahan)
    if (dataLama && dataLama !== dataBaru.toString()) {
        console.log("Ada perubahan pada data!");
        
        // Panggil fungsi pencatat log
        tambahLogNotif(pesan); 
    }
    
    // Simpan data terbaru ke local storage
    localStorage.setItem(key, dataBaru);
}

