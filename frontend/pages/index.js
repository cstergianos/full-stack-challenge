import Head from "next/head"
import Footer from "../components/Footer";
import useSortableData from '../hooks/useSortableData'
import { useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowDownAZ,faArrowUpZA, faSort, faShuffle } from '@fortawesome/free-solid-svg-icons'

import MoonPayIcon from "../assets/icons/logo-full-purple.svg";

function HomePage({ apiData, config }) {
    const [uSisToggled, setUsIsToggled] = useState(false);
    const [testIsToggled, setTestIsToggled] = useState(false);
    const onUsToggle = () => setUsIsToggled(!uSisToggled);
    const onTestToggle = () => setTestIsToggled(!testIsToggled);
    let [shuffle, setShuffle] = useState(apiData);


    const SortButton = ({ direction, id, onClick, sortBy }) => {
        const arrows = { ascending: faArrowDownAZ, descending: faArrowUpZA }
        const arrow = sortBy === id ? arrows[direction] : faSort

        return (
            <FontAwesomeIcon className='sort-icon' id={id} onClick={onClick} icon={arrow} />
        )
    }

    const shuffleArray = () => {
        for (let i = shuffle.length; --i;)  {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]]
        }
        setShuffle([...shuffle]);
    }

    // /**
    //  * Shuffles a given array
    //  *
    //  * @param array - The array to sort.
    //  * @returns {array}
    //  */
    // const shuffleTableData = (array) => {
    //     shuffle = array;
    //     for (let i = shuffle.length - 1; i > 0; i--) {
    //         let j = Math.floor(Math.random() * (i + 1));
    //         let temp = shuffle[i];
    //         shuffle[i] = shuffle[j];
    //         shuffle[j] = temp;
    //     }
    //
    //     setShuffle([...shuffle]);
    // };

    const { items, requestSort, sortConfig } = useSortableData(
        apiData,
        config
    );

    return (
        <div className='startGrid'>
            <Head>
                <title>Moonpay FullStack Project</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="../assets/icons/favicon-purple-32x32.png"/>
            </Head>
            <div className="header">
                <img src={MoonPayIcon.src} className='headerIcon'/>
                <div className='toggle-container'>
                    <div className='toggle' id='us-enabled'>
                        <span>United States Available: </span>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={uSisToggled} onChange={onUsToggle} />
                            <span className="switch" />
                        </label>
                    </div>

                    <div className='toggle' id='testmode-enabled'>
                        <span>Test Mode Supported: </span>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={testIsToggled} onChange={onTestToggle} />
                            <span className="switch" />
                        </label>
                    </div>
                    <SortButton
                        direction={sortConfig?.direction}
                        id="name"
                        onClick={() => requestSort('name')}
                        sortBy={sortConfig?.key}
                    />
                    <FontAwesomeIcon className='shuffle-icon' onClick={shuffleArray} icon={faShuffle} />
                </div>
            </div>

            {/*.sort((a, b) => a.name > b.name ? -1 : 1)*/}

            {uSisToggled === true && testIsToggled === false &&
                <div className='tokensGrid'>
                    {items.filter(token => token.isSupportedInUS === true).map(token => (
                        <div className='tokenContainer' id={token.code}><span>{token.name} - {token.code}</span></div>
                    ))}
                </div>
            }

            {uSisToggled === false && testIsToggled === true &&
                <div className='tokensGrid'>
                    {items.filter(token => token.supportsTestMode === true).map(token => (
                        <div className='tokenContainer' id={token.code}><span>{token.name} - {token.code}</span></div>
                    ))}
                </div>
            }

            {uSisToggled === true && testIsToggled === true &&
                <div className='tokensGrid'>
                    {items.filter(token => token.isSupportedInUS === true && token.supportsTestMode === true).map(token => (
                        <div className='tokenContainer' id={token.code}><span>{token.name} - {token.code}</span></div>
                    ))}
                </div>
            }

            {uSisToggled === false &&
                <div className='tokensGrid'>
                {items.map((token) => (
                    <div className='tokenContainer' id={token.code}><span>{token.name} - {token.code}</span></div>
                ))}
                </div>
            }
            <Footer/>
        </div>
    );
}

/**
 * Using getStaticProps since the API response data is mainly static
 *
 * @returns {Promise<{props: {apiData: any}}|{notFound: boolean}>}
 */
export async function getStaticProps() {
    const res = await fetch(`https://api.moonpay.com/v3/currencies`)
    const apiData = await res.json();

    if (!apiData) {
        return {
            notFound: true,
        }
    }

    return { props: { apiData } }
}

export default HomePage