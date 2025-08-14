// event change status
const btnchangeStatus = document.querySelectorAll('[data-status]');
if (btnchangeStatus.length > 0) {
    let statusProduct = {}
    const formChangeStatus = document.querySelector('[change-status]');
    btnchangeStatus.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            statusProduct.status = item.getAttribute('data-status') == 'active' ? 'inactive' : 'active';
            statusProduct.id = item.getAttribute('id');

            const path = formChangeStatus.getAttribute('path');
            formChangeStatus.action = `${path}/${statusProduct.status}/${statusProduct.id}?_method=PATCH`
            formChangeStatus.submit();
        });
    });
}

