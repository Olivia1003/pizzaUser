const cartMock = {
    carts: [
        {
            cartId: '1',
            userId: '1',
            shop: {
                shopId: '1',
                shopName: '我爱pizza',
                shopPos: '金沙江路222号'
            },
            items: [
                {
                    item: {
                        itemId: '1',
                        itemName: '吮指原味鸡111',
                        price: '12',
                        picUrl: '',
                        size: '13',
                        description: '',
                        state: '',
                    },
                    count: 1,
                },
                {
                    item: {
                        itemId: '2',
                        itemName: '香辣鸡翅222',
                        price: '20',
                        picUrl: '',
                        size: '13',
                        description: '',
                        state: '',
                    },
                    count: 2,
                }
            ]
        },
        {
            cartId: '1',
            userId: '1',
            shop: {
                shopId: '2',
                shopName: '超级pizza',
                shopPos: '中山北路123号'
            },
            items: [
                {
                    item: {
                        itemId: '1',
                        itemName: '吮指原味鸡',
                        price: '12',
                        picUrl: '',
                        size: '13',
                        description: '',
                        state: '',
                    },
                    count: 3,
                },
                {
                    item: {
                        itemId: '2',
                        itemName: '香辣鸡翅',
                        price: '12',
                        picUrl: '',
                        size: '13',
                        description: '',
                        state: '',
                    },
                    count: 3,
                }
            ]
        }
    ]
};

module.exports = {
    cartMock,
};
