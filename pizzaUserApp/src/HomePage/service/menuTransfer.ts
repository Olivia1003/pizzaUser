export function transferMenuData(serverData) {
    console.log('transferMenuData', serverData)
    // const menuList = [
    //     {
    //         proId: 1,
    //         name: '吮指原味鸡',
    //         detail: 'detail',
    //         stock: 3,
    //         selectCount: 1,
    //         price: '12',
    //         imgUrl: '../../../images/pizza.png'
    //     },
    //     {
    //         proId: 1,
    //         name: '吮指原味鸡',
    //         detail: 'detail',
    //         stock: 3,
    //         selectCount: 1,
    //         price: '12',
    //         imgUrl: '../../../images/pizza.png'
    //     }
    // ]
    const menuList = serverData.map((mItem) => {
        if (!mItem || !mItem.item) {
            return
        }
        return {
            proId: mItem.item.itemId,
            name: mItem.item.itemName,
            detail: mItem.item.description,
            // stock: mItem.count,
            selectCount: mItem.count,
            price: mItem.item.price,
            imgUrl: '../../../images/pizza.png'
        }
    })
    return menuList
}

export function transferCartData(serverData) {
    console.log('transferCartData', serverData)
    // const menuList = [
    //     {
    //         proId: 1,
    //         name: '吮指原味鸡',
    //         detail: 'detail',
    //         stock: 3,
    //         selectCount: 1,
    //         price: '12',
    //         imgUrl: '../../../images/pizza.png'
    //     },
    //     {
    //         proId: 1,
    //         name: '吮指原味鸡',
    //         detail: 'detail',
    //         stock: 3,
    //         selectCount: 1,
    //         price: '12',
    //         imgUrl: '../../../images/pizza.png'
    //     }

    // ]
    const shopName = serverData && serverData.shop && serverData.shop.shopName || ''

    let cartList = []
    if (serverData && serverData.items) {
        cartList = serverData.items.map((cItem) => {
            return {
                proId: cItem.item.itemId,
                name: cItem.item.itemName,
                detail: cItem.item.description,
                stock: cItem.count,
                // selectCount: cItem.count,
                price: cItem.item.price,
                imgUrl: '../../../images/pizza.png'
            }
        })
    }
    return {
        cartList,
        shopName
    }
}