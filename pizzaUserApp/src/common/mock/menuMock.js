const menuMock = {
    menu: {
        menuId: '2',
        shopId: {
            shopId: 2,
            shopName: null,
            posX: null,
            posY: null,
            posString: null,
            picUrl: null
        },
        items: [
            {
                item: {
                    itemId: 1,
                    itemName: '吮指原味鸡111',
                    price: '22',
                    picUrl: '',
                    pizzaSize: '13',
                    description: 'detail',
                    state: '',
                },
                count: 3,
            },
            {
                item: {
                    itemId: 2,
                    itemName: '香辣鸡翅222',
                    price: '30',
                    picUrl: '',
                    size: '13',
                    description: 'detail',
                    state: '',
                },
                count: 3,
            },
            {
                item: {
                    itemId: 3,
                    itemName: '香辣鸡翅333',
                    price: '12',
                    picUrl: '',
                    size: '13',
                    description: 'detail',
                    state: '',
                },
                count: 3,
            }
        ]
    }
};

module.exports = {
    menuMock,
};
