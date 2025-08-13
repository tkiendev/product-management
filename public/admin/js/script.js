
const href = window.location.href;
let url = new URL(href);

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
        window.location.replace(url);
    });

});

// event form sreach 
const formSreach = document.getElementById('form-seach');
if (formSreach) {
    formSreach.addEventListener('submit', (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;
        if (keyword !== '') {
            url.searchParams.set('keyword', keyword);
        }
        else {
            console.log(1)
            url.searchParams.delete('keyword');
        }
        window.location.replace(url);
    });
}

// event pagination page
const btnPage = document.querySelectorAll('[btn-Page]');
if (btnPage) {
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
        })
    });
}