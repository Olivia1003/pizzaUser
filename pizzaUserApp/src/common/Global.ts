const GlobalData = {
    // user: {
    //     userId: 4,
    //     nickName: 'YoungTree',
    //     telephone: '15317802636',
    //     address: {
    //         name: 'Young',
    //         phone: '18022222222',
    //         addressStr: '华东师范大学',
    //         addressStr2: '中山北路3663号',
    //         posX: '50.10',
    //         posY: '5.1',
    //     },
    // },
    selectShop: {}

}

export function getGlobal(key: string) {
    let res
    if (key) {
        res = GlobalData[key]
    }
    return res
}

export function setGlobal(key: string, value: any) {
    GlobalData[key] = value
}

