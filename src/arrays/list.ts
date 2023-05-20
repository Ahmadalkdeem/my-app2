import { optionstype } from "../@types/Mytypes"
export const brands: optionstype[] = [
    { value: 'Zara', label: 'Zara' },
    { value: 'H&M', label: 'H&M' },
    { value: `Victoria's Secret`, label: `Victoria's Secret` },
    { value: `Burberry`, label: `Burberry` },
    { value: `Tommy Hilfiger`, label: `Tommy Hilfiger` },
    { value: `Nike`, label: `Nike` },
    { value: `Adidas`, label: `Adidas` },
    { value: `Ralph Lauren`, label: `Ralph Lauren` },
    { value: `Calvin Klein`, label: `Calvin Klein` },
    { value: `Gap`, label: `Gap` },
    { value: `Mango`, label: `Mango` },
    { value: `Ted Baker`, label: `Ted Baker` },
    { value: `Versace`, label: `Versace` },
    { value: `Gucci`, label: `Gucci` },
    { value: `Balmain`, label: `Balmain` },
    { value: `Dior`, label: `Dior` },
    { value: `Berberry`, label: `Berberry` },
    { value: `Louis Vuitton`, label: `Louis Vuitton` },
    { value: `Armani`, label: `Armani` },
    { value: `Bershka`, label: `Bershka` },

];
export const categorys: optionstype[] = [
    { value: 'Shirts', label: 'Shirts' },
    { value: 'pants', label: 'pants' },
    { value: 'shoes', label: 'shoes' },

];
export const sort: optionstype[] = [
    { value: '-1', label: 'המוצרים הכי נמכרים' },
    { value: '1', label: 'המוצרים הפחות נמכרים' },
];
export const limet: optionstype[] = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '30', label: '30' },
    { value: '40', label: '40' },
    { value: '50', label: '50' },
    { value: '60', label: '60' },
    { value: '70', label: '70' },
    { value: '80', label: '80' },
    { value: '90', label: '90' },
    { value: '100', label: '100' },
];
export const categorys2: optionstype[] = [
    { value: 'מכנסיים קצרים', label: 'מכנסיים קצרים' },
    { value: 'מכנסיים ארוכים', label: 'מכנסיים ארוכים' },
    { value: 'מכנסיים נילון', label: 'מכנסיים נילון' },

];
export const categorys3: optionstype[] = [
    { value: 'חולצות קצרים', label: 'חולצות קצרים' },
    { value: 'חולצות ארוכים', label: 'חולצות ארוכים' },
    { value: 'חולצות נילון', label: 'חולצות נילון' },

];
export const categorys4: optionstype[] = [
    { value: 'נעלי ספורט', label: 'נעלי ספורט' },
    { value: 'נעלי עבודה', label: 'נעלי עבודה' },
    { value: 'נעלי יום', label: 'נעלי יום' },

];
export const colourOptions: optionstype[] = [
    { value: 'Red', label: 'אדום' },
    { value: 'Blue', label: 'Blue' },
    { value: 'Green', label: 'ירוק' },
    { value: 'Yellow', label: 'Yellow' },
    { value: 'Orange', label: 'Orange' },
    { value: 'Purple', label: 'Purple' },
    { value: 'Pink', label: 'Pink' },
    { value: 'Brown', label: 'Brown' },
    { value: 'Black', label: 'Black' },
    { value: 'White', label: 'White' },
    { value: 'Gray', label: 'Gray' },
    { value: 'Gold', label: 'Gold' },
    { value: 'Magenta', label: 'Magenta' },
    { value: 'Turquoise', label: 'Turquoise' },
];
export const SizeOptions: optionstype[] = [
    { value: 'XS', label: 'XSmall' },
    { value: 'S', label: 'Small' },
    { value: 'M', label: 'Medume' },
    { value: 'L', label: 'Large' },
    { value: 'XL', label: 'XLarge' },
    { value: '2XL', label: '2XLarge' },
    { value: '3XL', label: '3XLarge' },
    { value: '4XL', label: '4XLarge' },
    { value: '5XL', label: '5XLarge' },
    { value: '6XL', label: '6XLarge' },
];
export const SizeOptions2: optionstype[] = [
    { value: '30', label: '30' },
    { value: '31', label: '31' },
    { value: '32', label: '32' },
    { value: '33', label: '33' },
    { value: '34', label: '34' },
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
    { value: '46', label: '46' },
    { value: '47', label: '47' },
    { value: '48', label: '48' },
    { value: '49', label: '49' },
    { value: '50', label: '50' },

];
export const stylelableOption: any = {
    control: (base: any) => ({
        ...base,
        border: '1.5px solid black',
        borderRadius: '4px',
        boxShadow: 'none',
        '&:hover': {
            border: '1.5px solid black'
        }
    }), option: (base: any, state: any) => ({
        ...base,
        color: "#1e2022",
        textAlign: 'center',

    })
}
