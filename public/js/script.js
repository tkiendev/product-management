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

// submit checkout
// product: [
//     {
//         id,
//         quantity,
//         newPrice,
//         total,
//         title
//     }
// ]
// const trData = document.querySelectorAll(`tr[name='data']`);
// if (trData.length > 0) {
//     const product = [];
//     trData.forEach((tr) => {
//         let data = tr.querySelectorAll('td');
//         let obj = {};
//         data.forEach((item, index) => {
//             obj[`${item.getAttribute('name')}`] = item.getAttribute('value')
//         });
//         product.push(obj)
//     });

//     const form = document.querySelector(`form[name='pay']`);
//     if (form) {
//         const products = form.querySelector(`input[name='product']`);
//         products.value = JSON.stringify(product)
//     }
// }