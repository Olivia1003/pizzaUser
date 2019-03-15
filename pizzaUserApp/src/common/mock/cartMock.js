const cartMock = {
    carts: [
        {
            cartId: '1',
            userId: '1',
            shop: {
                shopId: '222',
                shopName: '我爱pizza（金沙江路店）111',
            },
            items: [
                {
                    item: {
                        itemId: '1',
                        itemName: '吮指原味鸡222',
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
                        itemName: '香辣鸡翅333',
                        price: '20',
                        picUrl: '',
                        size: '13',
                        description: '',
                        state: '',
                    },
                    count: 3,
                }
            ]
        },
        {
            cartId: '1',
            userId: '1',
            shop: {
                shopId: '222',
                shopName: '我爱pizza（金沙江路店）222',
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
