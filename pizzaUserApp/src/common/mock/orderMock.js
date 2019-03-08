const orderMock = {
    orderList:[
        {
            orderId: '111',
            state: 'canceled',
            shop:{
                shopId: '222',
                shopName: '我爱pizza（金沙江路店）',
            },
            items: [
                {
                    item:{
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
                    item:{
                        itemId: '1',
                        itemName: '吮指原味鸡',
                        price: '12',
                        picUrl: '',
                        size: '13',
                        description: '',
                        state: '',
                    },
                    count: 3,
                }
            ],
            price: 106,
            startTime: '2018-3-1',
            endTime: '2018-3-2',
        },
        {
            orderId: '112',
            state: 'pending',
            shop:{
                shopId: '222',
                shopName: '我爱pizza（真北路店）',
            },
            items: [
                {
                    item:{
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
                    item:{
                        itemId: '1',
                        itemName: '吮指原味鸡',
                        price: '12',
                        picUrl: '',
                        size: '13',
                        description: '',
                        state: '',
                    },
                    count: 3,
                }
            ],
            price: 106,
            startTime: '2018-3-1',
            endTime: '2018-3-2',
        }
    ]
};

module.exports={
    orderMock,
};
