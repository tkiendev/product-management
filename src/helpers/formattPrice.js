module.exports = (number) => {
    const string = number.toString();
    const charArray = string.split('');
    let count = 1;
    for (let i = charArray.length - 1; i >= 0; i--) {
        if (count % 3 === 0) {
            charArray.splice(i, 0, '.');
        }
        count++;
    }
    const formatted = charArray.join('');
    return formatted;
}