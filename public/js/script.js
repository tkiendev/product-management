// change quantity in cart
const ListProduct = document.querySelectorAll('[product]');
if (ListProduct) {
    ListProduct.forEach((product) => {
        const inputQuantity = product.querySelector(`input[name='quantity']`);
        const inputId = product.querySelector(`input[name='id']`).value;
        const formChange = product.querySelector(`form[name='${inputId}']`);
        inputQuantity.addEventListener('change', (event) => {
            formChange.submit();
        });
    });

}