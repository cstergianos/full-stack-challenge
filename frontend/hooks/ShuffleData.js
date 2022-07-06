import React, {useState} from 'react'

/**
 * Shuffle an array hook
 *
 * @param items
 * @returns {{requestShuffle: requestShuffle, shuffleItems: *[]}}
 */
const ShuffleData = (items = []) => {
    const [shuffle, setShuffle] = useState(items);

    const requestShuffle = () => {
        for (let i = shuffle.length; --i;)  {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]]
        }

        setShuffle([...shuffle]);
    };

    return { shuffleItems: shuffle, requestShuffle }
}

export default ShuffleData