
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

// event change delete
const ListBtnDelete = document.querySelectorAll('[btn-delete]');
if (ListBtnDelete.length > 0) {
    const formChangeDelete = document.querySelector('[change-delete]');
    ListBtnDelete.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('id');
            const path = formChangeDelete.getAttribute('path');
            formChangeDelete.action = `${path}/${id}?_method=DELETE`;
            formChangeDelete.submit();
        });
    });
}


