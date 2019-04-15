export function transferCartTotalData(serverList) {
    let cartTotalList = []
    if (serverList) {
        cartTotalList = serverList.map((cartItem) => {
            let cartItemList = []
            if (cartItem.items) {
                cartItemList = cartItem.items.map((pItem) => {
                    return {
                        proId: pItem.item.itemId,
                        name: pItem.item.itemName,
                        detail: pItem.item.description,
                        // stock: pItem.count,
                        selectCount: pItem.count,
                        price: pItem.item.price,
                        imgUrl: '../../../images/pizza.png'
                    }
                })
            }
            return {
                shopId: cartItem.shop && cartItem.shop.shopId || '',
                shopName: cartItem.shop && cartItem.shop.shopName || '',
                shopPos: cartItem.shop && cartItem.shop.shopPos || '',
                cartItemList,
            }
        })
    }
    return {
        cartTotalList
    }
}