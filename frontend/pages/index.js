import Head from "next/head"
import MoonPayIcon from "../assets/icons/logo-full-purple.svg";
import ShuffleData from "../hooks/ShuffleData";
import ToggleContainer from "../components/ToggleContainer";
import TokensGrid from "../components/TokensGrid";
import SortData from "../hooks/SortData";
import { faArrowDownAZ,faArrowUpAZ, faSort, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function HomePage({ apiData }) {
    /**
     * Flag declarations
     */
    const [usIsToggled, setUsIsToggled] = useState(false);
    const [testIsToggled, setTestIsToggled] = useState(false);
    const [shuffleIsToggled, setShuffleIsToggled] = useState(false);
    const [sortByCodeIsToggled, setSortByCodeIsToggled] = useState(false);
    const firstUpdateSort = useRef(true);

    /**
     * Component references
     */
    const { items, requestSort, sortConfig } = SortData(
        apiData,
        {key: sortByCodeIsToggled === true ? 'code' : 'name', direction: 'ascending'}
    );

    const { shuffleItems, requestShuffle } = ShuffleData(items);

    /**
     * Helpers
     */
    const handleChange = () => {
        setShuffleIsToggled(false);
    };

    const handleClick = () => {
        setShuffleIsToggled(true);
    };

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : 'ascending';
    };

    useEffect(() => {
        if (firstUpdateSort.current) {
            firstUpdateSort.current = false;
        } else {
            requestSort(sortByCodeIsToggled === true ? 'code' : 'name' )
        }
    },[sortByCodeIsToggled])


    /**
     * Mini component for the sort direction toggle
     *
     * @param direction
     * @param id
     * @param onClick
     * @param sortBy
     * @returns SortButton
     * @constructor
     */
    const SortButton = ({ direction, id, onClick, sortBy }) => {
        const arrows = { ascending: faArrowDownAZ, descending: faArrowUpAZ }
        const arrow = sortBy === id ? arrows[direction] : faSort

        return (
            <div className='wrapper'>
                <span>Sort</span>
                <FontAwesomeIcon className='sort-icon' id={id} onClick={onClick} icon={arrow} />
            </div>
        )
    }

    /**
     * Mini component for the shuttle button
     *
     * @param onClick
     * @returns ShuffleButton
     * @constructor
     */
    const ShuffleButton = ({onClick}) => {
        return (
            <div className='btn-wrapper'>
                <button onClick={onClick}>
                    <FontAwesomeIcon className='shuffle-icon' icon={faShuffle} /> Shuffle
                </button>
            </div>
        )
    }

    return (
        <div className='startGrid'>
            <Head>
                <title>Moonpay FullStack Project</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" href="../assets/icons/favicon-purple-32x32.png"/>
            </Head>
            <div className="header">
                <img src={MoonPayIcon.src} className='headerIcon'/>
            </div>

            <div className='flex-wrapper'>
                <ToggleContainer
                testIsToggled={testIsToggled}
                setTestIsToggled={setTestIsToggled}
                usIsToggled={usIsToggled}
                setUsIsToggled={setUsIsToggled}
                sortByCodeIsToggled={sortByCodeIsToggled}
                setSortByCodeIsToggled={setSortByCodeIsToggled}
                setShuffleIsToggled={setShuffleIsToggled}
                />

                <div className='sort-shuffle-container'>
                    <SortButton
                        id={sortByCodeIsToggled === true ? 'code' : 'name'}
                        onClick={() => {requestSort(sortByCodeIsToggled === true ? 'code' : 'name' ); handleChange();}}
                        className={getClassNamesFor(sortByCodeIsToggled === true ? 'code' : 'name')}
                        sortBy={sortByCodeIsToggled === true ? 'code' : 'name'}
                        direction={sortConfig.direction}
                    />

                    <ShuffleButton onClick={() => { requestShuffle(items); handleClick();}}/>
                </div>
            </div>


            <TokensGrid
                items={items}
                usIsToggled={usIsToggled}
                testIsToggled={testIsToggled}
                shuffleItems={shuffleItems}
                shuffleIsToggled={shuffleIsToggled}
            />

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