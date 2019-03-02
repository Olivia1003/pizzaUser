const orderMock = {
    orderList:[
        {
            orderId: '111',
            state: 'canceled',
            shopId: '222',
            shopName: '我爱pizza（金沙江路店）',
            items: [
                {
                    itemId: '1',
                    itemName: '吮指原味鸡',
                    count: '3',
                    price: '12',
                },
                {
                    itemId: '2',
                    itemName: '香辣鸡翅',
                    count: '4',
                    price: '82',
                }
            ],
            totalPrice: 106,
            startDate: '2018-3-1'
        },
        {
            orderId: '112',
            state: 'pending',
            shopId: '222',
            shopName: '我爱pizza（真杯路店）',
            items: [
                {
                    itemId: '1',
                    itemName: '吮指原味鸡',
                    count: '3',
                    price: '12',
                }
            ],
            totalPrice: 106,
            startDate: '2018-3-1'
        }
    ]
};

// interface IOrderItem{
//     orderId:string;
// }
//
// interface IOrderResponseData{
//     orderList:IOrderItem[]
// }

module.exports={
    orderMock,
}
