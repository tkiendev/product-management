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
            console.log(1)
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