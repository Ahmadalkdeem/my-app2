export interface Cardtype {
    _id: string,
    src: string[],
    description: string,
    brand: string,
    name: string,
    category: string,
    category2: string,
    price: number,
    price2: number,
    stock: any,
}
export interface Cardforcart {
    _id: string,
    src: any,
    description: string,
    brand: string,
    name: string,
    category: string,
    category2: string,
    price: number,
    price2: number,
    stock: any,
    quantity: number,
    color: string,
    sizeselect: string,
}
export interface optionstype {
    value: string,
    label: string
}

export interface sliCecatgre {
    loading: boolean,
    error: string,
    users: Cardtype[],
    findusers: Cardtype[],
    search: boolean,
    value: { size: optionstype[], colors: optionstype[], brands: optionstype[], stopusers: boolean, stopfindusers: boolean },

}
export interface props {
    h1: string,
    search: boolean,
    users: Cardtype[],
    categories: string,
    value: { size: optionstype[], colors: optionstype[], brands: optionstype[], stopusers: boolean, stopfindusers: boolean },
    length: { finduser: number, user: number, }
}
export interface cart {
    cart: Cardforcart[],
}
export interface user {
    accessToken: string,
    email: string,
    roles: [string],
    username: string
}
export interface div {
    src: string,
    navigate: string,
    btn: string
}

export interface item {
    name: string,
    loading: boolean,
    error: string,
    users: Cardtype[],
    findusers: Cardtype[],
    search: boolean,
    value: { size: optionstype[], colors: optionstype[], brands: optionstype[], stopusers: boolean, stopfindusers: boolean },


}
export interface initialStatetype {
    arr: item[]

}


