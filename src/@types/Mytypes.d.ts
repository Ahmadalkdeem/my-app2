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
    src: string[],
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

export interface prouctorderdetales {
    sizeselect: string,
    id: string,
    color: string,
    quantity: number,
}
export interface prouctorder {
    _id: string,
    name: string,
    category: string,
    brand: number,
    src: string[],
}
export interface order {
    _id: string,
    Email: string,
    City: string,
    Address2: string,
    Address: string,
    Zip: string,
    date: string,
    fullname: string,
    pricecart: number,
    status: boolean,
    arr: prouctorderdetales[],
    products: [prouctorder[]],

}
export interface optionstype {
    value: string,
    label: string
}
export interface brandstype {
    value: string,
    src: string,
}

export interface sliCecatgre {
    loading: boolean,
    error: string,
    users: Cardtype[],
    findusers: Cardtype[],
    search: boolean,
    value: { size: optionstype[], colors: optionstype[], brands: optionstype[], catgre: optionstype[], stopusers: boolean, stopfindusers: boolean },

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
    id: string,
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
    value: { size: optionstype[], colors: optionstype[], brands: optionstype[], categorys: optionstype[], categorys2: optionstype[], stopusers: boolean, stopfindusers: boolean },


}
export interface initialStatetype {
    arr: item[],
    arrproduct: Cardtype[]

}


