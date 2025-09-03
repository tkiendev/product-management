// notification
const btnNotification = document.querySelector('[btn-notification]');
const notification = document.querySelector('.notification');
if (btnNotification) {
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
    }, btnNotification.getAttribute('data-time'))
    btnNotification.addEventListener('click', () => {
        notification.classList.remove('show');
        notification.classList.add('hide');
    });
    setTimeout(() => {
        notification.remove();
    }, 6000);
}