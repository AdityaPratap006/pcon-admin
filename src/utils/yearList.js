const currentYear = new Date(Date.now()).getFullYear();

const yearList = [];

for (let year = 2016; year <= currentYear; ++year) {
    yearList.unshift({
        key: year,
        value: year,
    });
}

export {
    yearList,
    currentYear
};