import React from 'react'

/**
 * A React hook that will sort the data
 *
 * @param {array} items - The data that needs to be sorted.
 * @param {object|null} [config] - A configuration object.
 * @param {string} [config.key] - Name of key to sort by.
 * @param {string} [config.direction] - The sort direction.
 * @returns {object}
 */
const SortData = (items = [], config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config)

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];

        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }

                return 0;
            });
        }

        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';

        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig }
}

export default SortData
