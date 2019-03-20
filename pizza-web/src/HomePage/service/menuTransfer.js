
// 首页菜单
export function transferMenuData(serverData) {
    console.log('transferMenuData', serverData)
    const menuList = serverData.map((mItem) => {
        if (!mItem || !mItem.item) {
            return
        }
        return {
            proId: mItem.item.itemId,
            name: mItem.item.itemName,
            detail: mItem.item.description,
            stock: mItem.count,
            selectCount: 0, // 初始选中0
            price: mItem.item.price,
            imgUrl: '../../../images/pizza.png'
        }
    })
    return menuList
}

// 首页单购物车
export function transferCartData(serverData) {
    console.log('transferCartData', serverData)
    const shopName = serverData && serverData.shop && serverData.shop.shopName || ''
    let cartItemList = []
    if (serverData && serverData.items) {
        cartItemList = serverData.items.map((cItem) => {
            return {
                proId: cItem.item.itemId,
                name: cItem.item.itemName,
                detail: cItem.item.description,
                stock: 100,
                selectCount: cItem.count,
                price: cItem.item.price,
                imgUrl: '../../../images/pizza.png'
            }
        })
    }
    return {
        cartItemList,
        shopName
    }
}

