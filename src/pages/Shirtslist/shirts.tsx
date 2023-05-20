import { useState } from 'react'
import axios from 'axios'
import Cardlist from '../../components/cardlist/Cardlist';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addItem } from '../../features/cards/cardshirts';
import Spiner from '../../components/Spiner/Spiner';
import { Helmet } from "react-helmet";

function Shose() {
    const [end, setend] = useState<any>(true);
    const { loading, users, error } = useAppSelector((s) => s.cardshirts);
    let Dispatch = useAppDispatch()

    const getData = async () => {
        if (end === true) {
            console.log('aa');

            setend(false)
            axios.get(`http://localhost:3001/uplode/Shirtsproduct/${users.length}`, {
            }).then((response) => {
                setend(true)
                if (response.data.length < 1) {
                    setend(false)
                }
                Dispatch(addItem(response.data))
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
                <title>קנו חולצות לגברים ונשים בחנות האופנה המובילה באינטרנט</title>
                <meta name="description" content="גלו את המגוון הרחב שלנו של חולצות לגברים ונשים, כולל חולצות טי, חולצות פולו, חולצות חורף ועוד. הזמינו עכשיו ותהיו בטופ!" />
                <meta name="keywords" content="חולצות, טי, פולו, חורף, אופנה, חנות, אינטרנט," />
            </Helmet>
            {loading === true && <Spiner />}
            {users.length > 0 && <Cardlist h1='חולצות גבריים' users={users} />}
            {error && <div>{error}</div>}

        </>
    )
}

export default Shose