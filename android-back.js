document.addEventListener("DOMContentLoaded", function() {
    // 1. Amankan halaman utama agar tidak terkena loop kembali otomatis
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        return; 
    }

    // 2. Cari tombol kembali teks bawaan yang lama (berdasarkan ID atau Class)
    const tombolLama = document.getElementById('back-btn') || 
                       document.querySelector('.back-button') || 
                       document.querySelector('.btn-back');

    // 3. SEMBUNYIKAN saja teks tombol lamanya agar tidak merusak pemandangan, 
    // JANGAN dipicu klik-nya (.click()) oleh script agar tidak kembali otomatis saat di-run
    if (tombolLama) { 
        tombolLama.style.opacity = '0';
        tombolLama.style.pointerEvents = 'none';
        tombolLama.style.display = 'none';
    }

    // 4. Buat tombol bulat floating Android yang baru secara aman
    const androidBtn = document.createElement('a');
    androidBtn.href = 'index.html'; 
    androidBtn.className = 'android-back-floating';
    androidBtn.innerHTML = '◀'; 
    androidBtn.setAttribute('title', 'Kembali ke Beranda');
    
    // Tambahkan gaya inline tambahan untuk menjamin posisinya mutlak di atas
    androidBtn.style.zIndex = '99999';

    // 5. Suntikkan tombol bulat baru ke dalam halaman
    document.body.appendChild(androidBtn);
});
