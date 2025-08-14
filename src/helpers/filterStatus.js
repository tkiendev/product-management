module.exports = (query, objBtn) => {
    if (query.status) {
        const index = objBtn.findIndex((btn) => {
            return btn.status === query.status;
        });
        objBtn[index].class = 'active';
    }
    else {
        const index = objBtn.findIndex((btn) => {
            return btn.status === '';
        });
        objBtn[index].class = 'active';
    }
    return objBtn;
}