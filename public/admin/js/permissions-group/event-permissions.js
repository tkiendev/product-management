
// event grant permissions
const tablePermissions = document.querySelector('[table-permissions]');
if (tablePermissions) {
    const btnSubmit = document.querySelector('[btn-submit]');
    const checkbox = tablePermissions.querySelector('tbody').querySelectorAll('tr');
    btnSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        let tress = [];
        checkbox.forEach((item) => {
            if (item.getAttribute('id')) {
                item.querySelectorAll('input').forEach((input) => {
                    const id = input.value;
                    tress.push({
                        id: id,
                        permissions: []
                    });
                })
            } else {
                const dataName = item.getAttribute('data-name');
                item.querySelectorAll('input').forEach((input, index) => {
                    if (input.checked) {
                        tress[index].permissions.push(dataName);
                    }
                });
            }
        });

        const formActionPremissions = document.querySelector('[form-action-permissions]');
        if (formActionPremissions) {
            let input = formActionPremissions.querySelector('[input-action-permissions]');
            input.value = JSON.stringify(tress);
            formActionPremissions.submit();
            console.log(formActionPremissions);
        }
    });
}

// display checked permissions
const data = document.querySelector('[data]');
if (data) {
    const lisstPermissions = JSON.parse(data.getAttribute('data'));
    lisstPermissions.forEach((item, index) => {
        const { id, permissions } = item;
        permissions.forEach((dataName) => {
            const checkbox = tablePermissions.querySelector('tbody').querySelectorAll('tr');
            checkbox.forEach((box) => {
                if (dataName == box.getAttribute('data-name')) {
                    box.querySelectorAll('input')[index].checked = true;
                }
            })
        });
    });
}