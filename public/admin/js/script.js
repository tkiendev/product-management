const href = window.location.href;
// event btn status
const btnStatus = document.querySelectorAll('[btn-status]');
if (btnStatus) {
    const url = new URL(href);
    btnStatus.forEach((btn) => {
        btn.addEventListener('click', () => {
            const status = btn.getAttribute('btn-status');
            if (status) {
                url.searchParams.set('status', status);
            } else {
                url.searchParams.delete('status');
            }
            window.location.replace(url);
        });
    });
}

// event form sreach 
const formSreach = document.getElementById('form-seach');
if (formSreach) {
    const url = new URL(href);
    formSreach.addEventListener('submit', (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;
        if (keyword !== '') {
            url.searchParams.set('keyword', keyword);
        }
        else {
            url.searchParams.delete('keyword');
        }
        window.location.replace(url);
    });
}

// event pagination page
const btnPage = document.querySelectorAll('[btn-Page]');
if (btnPage) {
    const url = new URL(href);
    btnPage.forEach(page => {
        page.addEventListener('click', () => {
            const currentPage = page.getAttribute('btn-Page');

            if (currentPage && currentPage > 1) {
                url.searchParams.set('page', currentPage);
            }
            else {
                url.searchParams.delete('page');
            }
            window.location.replace(url);
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

// submit form change multi status
const formChangeMulti = document.querySelector('[form-change-multi]');
if (formChangeMulti) {
    formChangeMulti.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputCheckBox = formChangeMulti.querySelector('input[name="ids"]');
        const listCheck = table.querySelectorAll('input[name="id"]:checked');
        const listPosition = table.querySelectorAll('[input-position]');
        const option = formChangeMulti.querySelector('select[name="type"]');

        if (listCheck.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm!');
        } else {
            let arrayId = [];

            if (option.value === 'position') {
                listCheck.forEach((checkbox, index) => {
                    checkbox.value = `${checkbox.value}-${listPosition[index].value}`
                });
            }

            listCheck.forEach((checkbox) => {
                arrayId.push(checkbox.value);
            });
            inputCheckBox.value = arrayId.join(',');
            if (option.value === '') {
                alert('Vui lòng chọn hành động!');
            } else {
                formChangeMulti.submit();
            }
        }
    });
}

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
