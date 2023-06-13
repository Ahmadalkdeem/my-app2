import { optionstype, brandstype, div } from "../@types/Mytypes"
import img from '../pages/Homepage/Red Modern New Arrival Shoes Instagram Post.png'
import img2 from '../pages/Homepage/Blue Minimalist Fashion Denim Facebook Post.png'
import img3 from '../pages/Homepage/White Modern T-shirts Giveaway (A4 Document).png'
export const Url = 'http://localhost:3001/'
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
export const divcomponts: div[] = [
    { src: img3, navigate: '/Shirts', btn: 'חולצות' },
    { src: img2, navigate: '/pants', btn: 'מכנסיים' },
    { src: img, navigate: '/shoes', btn: 'נעליים' },
];
export const brands2: brandstype[] = [
    { value: 'Zara', src: 'https://cdn.mos.cms.futurecdn.net/UkabSwd9CX7buvuAztJG8J-320-80.jpg' },
    { value: 'H&M', src: 'https://1000logos.net/wp-content/uploads/2017/02/Colors-of-the-HM-Logo.jpg' },
    { value: `Victoria's Secret`, src: `https://1000logos.net/wp-content/uploads/2017/12/Victoria-Secret-Logo.jpg` },
    { value: `Burberry`, src: `https://1000logos.net/wp-content/uploads/2016/10/Burberry-Logo-2018.png` },
    { value: `Tommy Hilfiger`, src: `https://logowik.com/content/uploads/images/tommy-hilfiger3583.logowik.com.webp` },
    { value: `Nike`, src: `https://www.shutterstock.com/image-photo/kiev-ukraine-march-31-2015-260nw-275940803.jpg` },
    { value: `Adidas`, src: `https://thumbs.dreamstime.com/b/adidas-ag-multinational-corporation-founded-headquartered-herzogenaurach-germany-designs-manufactures-shoes-139136442.jpg` },
    { value: `Ralph Lauren`, src: `https://logos-world.net/wp-content/uploads/2020/04/Ralph-Lauren-Symbol.png` },
    { value: `Calvin Klein`, src: `https://1000logos.net/wp-content/uploads/2016/10/calvin-klein-symbol.jpg` },
    { value: `Gap`, src: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS963uzNBvaXZ97Eck9C9eQ9stlAcsHs2XktXciuD40g&s` },
    { value: `Mango`, src: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Mango-logo.jpg/2560px-Mango-logo.jpg` },
    { value: `Ted Baker`, src: `https://logonoid.com/images/ted-baker-logo.jpg` },
    { value: `Versace`, src: `https://images.ikrix.com/product_images/original/SL10261-009_04-4c77f9.jpg` },
    { value: `Gucci`, src: `https://logowik.com/content/uploads/images/493_gucci.jpg` },
    { value: `Balmain`, src: `https://1000logos.net/wp-content/uploads/2020/09/Balmain-Logo-1945.jpg` },
    { value: `Dior`, src: `https://logowik.com/content/uploads/images/christian-dior-new3874.jpg` },
    { value: `Berberry`, src: `https://1000logos.net/wp-content/uploads/2016/10/Burberry-Logo-2018.png` },
    { value: `Louis Vuitton`, src: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-syWtyNstSFScxr3ECgHohLzc-zVdAOSEE13q0bYmeg&s` },
    { value: `Armani`, src: `https://logowik.com/content/uploads/images/877_emporioarmani.jpg` },
    { value: `Bershka`, src: `https://1000logos.net/wp-content/uploads/2023/04/bershka-logo.jpg` },
];
let item = {
    _id: '645a57d9a074bec371712bde',
    src: ['ahmas', 'ahmad'],
    name: 'Shirts',
    category: 'pants',
    category2: 'מכנסיים קצרים',
    brand: 'Mango',
    price2: 199,
    price: 199,
    stock: [
        {
            size: 'S', colors: [
                { color: 'Blue' },
                { color: 'Green' },
                { color: 'Yellow' }
            ]
        }, {
            size: 'M', colors: [
                { color: 'Blue' },
                { color: 'Green' },
                { color: 'Yellow' }
            ]
        }
    ]

}