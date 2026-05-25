function goBack(){

    if(window.history.length > 1){

        window.history.back();

    }else{

        window.location.href = "index.html";

    }

}
        
const now = new Date();

document.getElementById('updateTime').textContent =
    'Update Data: ' +
    now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) +
    ' • ' +
    now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });