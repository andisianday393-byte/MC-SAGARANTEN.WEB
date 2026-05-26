function goBack(){

    if(window.history.length > 1){

        window.history.back();

    }else{

        window.location.href = "index.html";

    }

}
window.addEventListener('storage', (event) => {
    if (event.key === 'notif_logs') {
        updateBadge();
    }
});
// Hapus semua fungsi lama, ganti dengan ini:
function updateBadge() {
    const notifBadge = document.getElementById('notif-badge');
    if (!notifBadge) return;

    const logs = JSON.parse(localStorage.getItem('notif_logs') || '[]');
    const unreadCount = logs.filter(log => log.read !== true).length;

    if (unreadCount > 0) {
        notifBadge.style.display = 'flex';
        notifBadge.textContent = unreadCount;
    } else {
        notifBadge.style.display = 'none';
        notifBadge.textContent = '';
    }
}

// Event listener ini WAJIB ada agar saat notif.html berubah, index.html otomatis update
window.addEventListener('storage', (event) => {
    if (event.key === 'notif_logs') {
        updateBadge();
    }
});

document.addEventListener('DOMContentLoaded', updateBadge);

