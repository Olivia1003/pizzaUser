import { MenuItemDataType } from '../dataModal/menuItem'
// 计算购物车中商品总价
export function calculatePrice(itemList: MenuItemDataType[]) {
    let totalPrice = 0
    console.log('calculatePrice', itemList)
    if (itemList) {
        itemList.forEach((item) => {
            totalPrice += Number(item.price) * item.selectCount
        })
    }
    return totalPrice
}