module.exports = async (objPaginationPage, query, countDocuments) => {
    objPaginationPage.totalPage = Math.ceil((countDocuments) / objPaginationPage.limited);
    if (query.page && !isNaN(query.page)) {
        objPaginationPage.currentPage = Number(query.page);
    }
    return objPaginationPage;
}