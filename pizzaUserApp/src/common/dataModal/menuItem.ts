// 菜单、购物车item
export interface MenuItemDataType {
    proId: number; // 商品ID
    name: string; // 商品名
    detail: string; // 描述
    stock?: number; // 库存
    selectCount: number; // 选中个数
    price: string; // 价格
    imgUrl: string; // 图片url
}