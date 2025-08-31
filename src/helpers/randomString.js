module.exports = (doDai = 30) => {
    const kyTu = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let chuoi = '';
    for (let i = 0; i < doDai; i++) {
        const viTri = Math.floor(Math.random() * kyTu.length);
        chuoi += kyTu.charAt(viTri);
    }
    return chuoi;
}