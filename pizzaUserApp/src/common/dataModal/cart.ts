import { MenuItemDataType } from './menuItem'

// 购物车total list
// export interface cartTotalListType {
//     cartTotalList: cartListItemType[]
// }

// 购物车一个门店
export interface cartSetItemType {
    shopId: string
    shopName: string
    cartItemList: MenuItemDataType[]
    setPrice?: number
}