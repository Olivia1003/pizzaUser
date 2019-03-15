export function transferCartTotalData(serverData) {
    let cartTotalList = []
    if (serverData && serverData.carts) {
        cartTotalList = serverData.carts.map((cartItem) => {
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
                cartItemList,
            }
        })
    }
    return {
        cartTotalList
    }
}