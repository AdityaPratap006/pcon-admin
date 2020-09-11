const currentYear = new Date(Date.now()).getFullYear();

export const getYearList = (startYear, endYear = currentYear) => {
    const yearList = [];

    for (let year = startYear; year <= endYear; ++year) {
        yearList.unshift({
            key: year,
            value: year,
        });
    }

    return yearList;
}

export const monthList = [
    {
        key: 1,
        value: 'JAN',
    },
    {
        key: 2,
        value: 'FEB',
    },
    {
        key: 3,
        value: 'MAR',
    },
    {
        key: 4,
        value: 'APR',
    },
    {
        key: 5,
        value: 'MAY',
    },
    {
        key: 6,
        value: 'JUN',
    },
    {
        key: 7,
        value: 'JUL',
    },
    {
        key: 8,
        value: 'AUG',
    },
    {
        key: 9,
        value: 'SEP',
    },
    {
        key: 10,
        value: 'OCT',
    },
    {
        key: 11,
        value: 'NOV',
    },
    {
        key: 12,
        value: 'DEC',
    },
];

export const monthListWithNull = [{ key: 0, value: '' }, ...monthList];