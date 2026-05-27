function goBack(){

    if(window.history.length > 1){

        window.history.back();

    }else{

        window.location.href = "index.html";

    }

}

// =========================
// UPDATE BADGE
// =========================
function updateBadge() {

    const notifBadge =
        document.getElementById(
            'notif-badge'
        );

    if (!notifBadge) return;

    let logs =
        JSON.parse(
            localStorage.getItem(
                'notif_logs'
            ) || '[]'
        );

    // Hapus notif lebih dari 1 hari
    logs = logs.filter(log => {

        const umur =
            Date.now() -
            (log.timestamp || 0);

        return umur < 86400000;

    });

    localStorage.setItem(
        'notif_logs',
        JSON.stringify(logs)
    );

    const unread =
        logs.filter(
            log => !log.read
        ).length;

    if (unread > 0) {

        notifBadge.style.display =
            'flex';

        notifBadge.textContent =
            unread;

    } else {

        notifBadge.style.display =
            'none';

    }

}

// =========================
// TAMBAH NOTIF
// =========================
function tambahNotif(pesan) {

    let logs =
        JSON.parse(
            localStorage.getItem(
                'notif_logs'
            ) || '[]'
        );

    logs.unshift({

        pesan: pesan,

        waktu:
            new Date()
            .toLocaleString('id-ID'),

        timestamp: Date.now(),

        read: false

    });

    // Maksimal 20 notif
    logs = logs.slice(0, 20);

    localStorage.setItem(
        'notif_logs',
        JSON.stringify(logs)
    );

    updateBadge();

}

// =========================
// AUTO UPDATE
// =========================
document.addEventListener(
    'DOMContentLoaded',
    updateBadge
);

// Update realtime antar halaman
window.addEventListener(
    'storage',
    function(event){

        if(event.key === 'notif_logs'){
            updateBadge();
        }

    }
);
