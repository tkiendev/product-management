// event delete permissions group
const btnDeleteGrop = document.querySelectorAll('[btn-delete]');
if (btnDeleteGrop.length > 0) {
    const formChangeDelete = document.querySelector('[change-delete]');
    let path = formChangeDelete.getAttribute('path');
    btnDeleteGrop.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const id = event.target.id;
            console.log(id);
            path = `${path}/${id}?_method=DELETE`;
            formChangeDelete.action = path;
            formChangeDelete.submit();
        });
    });
}