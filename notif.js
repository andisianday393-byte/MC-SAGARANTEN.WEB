// notif.js
function tambahNotif(pesan) {
    let logs = JSON.parse(localStorage.getItem('notif_logs') || '[]');
    
    // Tambahkan notif baru
    logs.unshift({
        pesan: pesan,
        waktu: new Date().toLocaleString('id-ID'),
        timestamp: Date.now(),
        read: false
    });

    // Batasi 20 notif saja
    logs = logs.slice(0, 20);
    localStorage.setItem('notif_logs', JSON.stringify(logs));
    
    // Trigger update badge jika fungsi updateBadge tersedia
    if (typeof updateBadge === 'function') {
        updateBadge();
    }
}
