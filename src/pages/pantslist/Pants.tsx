import { useState } from 'react'
import axios from 'axios'
import Cardlist from '../../components/cardlist/Cardlist';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addItem2 } from '../../features/cards/cardPants';
import Spiner from '../../components/Spiner/Spiner';
import { Helmet } from "react-helmet";
function Shose() {
    const [end, setend] = useState<any>(true);
    const { loading2, users2, error2 } = useAppSelector((s) => s.cardPants);
    let x = users2.length
    console.log(users2);

    let Dispatch = useAppDispatch()
    const getData = async () => {
        if (end === true) {
            setend(false)
            axios.get(`http://localhost:3001/uplode/pantsproduct/${x}`, {
            }).then((response) => {
                setend(true)
                if (response.data.length < 1) {
                    setend(false)
                }
                Dispatch(addItem2(response.data))
            }).catch((err: any) => {
                console.log(err);
                console.log(err.response.data.error);
            })
        } else {
            console.log('bb');

        }
    };
    console.log(error2);

    window.onscroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.clientHeight;
        const scrollPercentage = (scrollPosition / (bodyHeight - windowHeight)) * 100;

        if (scrollPercentage > 50) {
            getData()
        }
    }

    return (
        <>
            <Helmet>
                <title> מגוון רחב של מכנסיים לגברים | חנות האופנה המובילה באינטרנט
                </title>
                <meta name="description" content="גלו את המגוון הרחב שלנו של מכנסיים לגברים ונשים, כולל מכנסי ג'ינס, טייץ, שורטים ועוד. הזמינו עכשיו וקבלו משלוח חינם!
" />
                <meta name="keywords" content="מכנסיים, ג'ינס, טייץ, שורטים, אופנה, חנות, אינטרנט, קניות" />
            </Helmet>
            {loading2 && <Spiner />}
            {users2.length > 0 && <Cardlist h1='מכנסיים גבריים' users={users2} />}
            {error2 && <div>{error2}</div>}

        </>
    )
}

export default Shose