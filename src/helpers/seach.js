module.exports = (query) => {
    if (query.keyword) {
        let regex = new RegExp(query.keyword, 'i');
        const title = regex;
        const keywordSreach = query.keyword;
        return {
            title: title,
            keywordSreach: keywordSreach
        };
    }
}