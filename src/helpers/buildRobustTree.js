module.exports.buildRobustTree = (flatList) => {
    const nodeMap = new Map();

    // Bước 1: Chuẩn hóa dữ liệu và tạo node với children
    flatList.forEach(item => {
        const id = item._id.toString();
        nodeMap.set(id, { ...item, children: [] });
    });

    const tree = [];

    // Bước 2: Gắn phần tử con vào phần tử cha
    flatList.forEach(item => {
        const id = item._id.toString();
        const parent_id = item.parent_id?.toString();

        if (parent_id && nodeMap.has(parent_id)) {
            nodeMap.get(parent_id).children.push(nodeMap.get(id));
        } else {
            // Nếu không có cha hoặc cha không tồn tại => là gốc
            tree.push(nodeMap.get(id));
        }
    });

    return tree;
}