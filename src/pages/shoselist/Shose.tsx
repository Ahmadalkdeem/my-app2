import { useState } from 'react'
import axios from 'axios'
import Cardlist from '../../components/cardlist/Cardlist';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addItem3 } from '../../features/cards/cardshose';
import Spiner from '../../components/Spiner/Spiner';
import { Helmet } from "react-helmet";

function Shose() {
    const [end, setend] = useState<any>(true);
    const { loading3, users3, error3 } = useAppSelector((s) => s.cardshose);
    let x = users3.length
    let Dispatch = useAppDispatch()
    const getData = async () => {
        if (end === true) {
            setend(false)
            axios.get(`http://localhost:3001/uplode/shoesproduct/${x}`, {
            }).then((response) => {
                setend(true)

                if (response.data.length < 1) {
                    setend(false)
                }
                Dispatch(addItem3(response.data))
            }).catch((err: any) => {
                console.log(err);
                console.log(err.response.data.error);
            })
        } else {
            console.log('bb');

        }
    };
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
                <title>מבחר נעליים לגברים | חנות האופנה המובילה באינטרנט</title>
                <meta name="description" content="גלו את המבחר המדהים שלנו של נעליים לגברים , כולל סניקרס, נעלי עקב, נעלי ספורט ועוד. הזמינו עכשיו ותהיו בטופ!" />
                <meta name="keywords" content="נעליים, סניקרס, עקב, ספורט, אופנה, חנות, אינטרנט, קניות" />
            </Helmet>
            {loading3 && <Spiner />}
            {users3.length > 0 && <Cardlist h1='נעליים גבריים' users={users3} />}
            {error3 && <div>{error3}</div>}
        </>
    )
}

export default Shose