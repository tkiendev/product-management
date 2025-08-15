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

// event change multi 
const table = document.querySelector('[table-check]');
if (table) {
    const checkBoxAll = table.querySelector('input[name="checkAll"]');
    const listCheckBox = table.querySelectorAll('[check-box]');
    let conutCheck = 0;
    if (checkBoxAll) {
        checkBoxAll.addEventListener('click', () => {
            if (checkBoxAll.checked) {
                listCheckBox.forEach(box => {
                    box.checked = true;
                    conutCheck++;
                });
            } else {
                listCheckBox.forEach(box => {
                    box.checked = false;
                });
            }
        });
    }
    if (listCheckBox) {
        listCheckBox.forEach((box) => {
            box.addEventListener('click', () => {
                const lengthListCheck = table.querySelectorAll('input[name="id"]:checked').length;
                if (lengthListCheck !== conutCheck) {
                    checkBoxAll.checked = false;
                }
                else {
                    checkBoxAll.checked = true;
                }
            })
        });
    }
}

// submut form change multi status
const formChangeMulti = document.querySelector('[form-change-multi]');
if (formChangeMulti) {
    formChangeMulti.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputCheckBox = formChangeMulti.querySelector('input[name="ids"]');
        const listCheck = table.querySelectorAll('input[name="id"]:checked');
        if (listCheck.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm');
        } else {
            let arrayId = [];
            listCheck.forEach((checkbox) => {
                arrayId.push(checkbox.value);
            });
            inputCheckBox.value = arrayId.join(',');
            formChangeMulti.submit();
        }
    })
}

