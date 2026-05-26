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
function updateBadge() {

    const notifBadge =
        document.getElementById('notif-badge');

    if (!notifBadge) return;

    const logs =
        JSON.parse(
            localStorage.getItem('notif_logs') || '[]'
        );

    // Hanya hitung notif yang benar-benar belum dibaca
    const unreadCount =
        logs.filter(log => log.read === false).length;

    // Jika tidak ada notif
    if (logs.length === 0 || unreadCount === 0) {

        notifBadge.style.display = 'none';
        notifBadge.textContent = '';

        return;
    }

    notifBadge.style.display = 'flex';
    notifBadge.textContent = unreadCount;

}