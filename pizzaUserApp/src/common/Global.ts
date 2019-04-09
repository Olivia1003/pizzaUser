const GlobalData = {
    userId: '111',
    userData: {
        nickName: 'YoungTree',
        telephone: '15317802636',
        address: {
            name: 'Young',
            phone: '18022222222',
            addressStr: '华东师范大学',
            addressStr2: '中山北路3663号'
        }
    }

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

