/* =========================
   GLOBAL NOTIFICATION SYSTEM
========================= */
(function () {
    const STORAGE_KEY = 'notif_logs';
    const BADGE_KEY = 'notif_badge';
    const EXCEL_FILE_URL = '/index-data.xlsx'; // ⚠️ GANTI dengan URL Excel Anda

    // =========================
    // SIMPAN NOTIF
    // =========================
    window.tambahNotif = function ({
        aktivitas = '-',
        halaman = location.pathname,
        detail = ''
    }) {
        try {
            let logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            
            const notifBaru = {
                id: Date.now(),
                waktu: new Date().toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                aktivitas,
                halaman,
                detail
            };

            logs.unshift(notifBaru);
            logs = logs.slice(0, 100);

            localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
            localStorage.setItem(BADGE_KEY, logs.length);
            updateNotifBadge();

            console.log('Notif tersimpan:', notifBaru);
        } catch (error) {
            console.error('Error menyimpan notifikasi:', error);
        }
    };

    // =========================
    // UPDATE BADGE
    // =========================
    window.updateNotifBadge = function () {
        try {
            const badge = document.getElementById('notif-badge');
            if (!badge) return;

            const total = parseInt(localStorage.getItem(BADGE_KEY) || '0');
            
            if (total <= 0) {
                badge.style.display = 'none';
            } else {
                badge.style.display = 'flex';
                badge.textContent = total > 99 ? '99+' : total;
            }
        } catch (error) {
            console.error('Error update badge:', error);
        }
    };

    // =========================
    // CEK UPDATE EXCEL (DIEKSPOR KE WINDOW)
    // =========================
    window.cekUpdateExcel = async function(namaFile, arrayBuffer) {
        try {
            const uint8 = new Uint8Array(arrayBuffer);
            let hash = 0;
            
            for (let i = 0; i < uint8.length; i++) {
                hash = ((hash << 5) - hash) + uint8[i];
                hash |= 0;
            }
            
            const newHash = hash.toString();
            const key = 'excel_hash_' + namaFile;
            const oldHash = localStorage.getItem(key);

            if (oldHash && oldHash !== newHash) {
                tambahNotif({
                    aktivitas: 'File Excel diperbarui',
                    halaman: location.pathname,
                    detail: namaFile + ' memiliki data terbaru'
                });
            }
            
            localStorage.setItem(key, newHash);
        } catch (error) {
            console.error('Error cek update Excel:', error);
        }
    };

    // =========================
    // AUTO LOAD BADGE SAAT DOM READY
    // =========================
    document.addEventListener('DOMContentLoaded', () => {
        updateNotifBadge();
    });

})();
