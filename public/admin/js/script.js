
const href = window.location.href;
let url = new URL(href)

// event btn status
const btnStatus = document.querySelectorAll('[btn-status]');
btnStatus.forEach((btn) => {
    btn.addEventListener('click', () => {
        const status = btn.getAttribute('btn-status');
        if (status) {
            url.searchParams.set('status', status);
        } else {
            url.searchParams.delete('status');
        }
        console.log(url.href);
        window.location.replace(url);
    });

});
