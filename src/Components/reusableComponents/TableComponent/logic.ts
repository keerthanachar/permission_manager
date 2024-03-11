export const calculateTablePages = (totalRecords = 0, PageList = 0) => {
    const rem = totalRecords % PageList;
    return Math.floor(totalRecords / PageList) + (rem ? 1 : 0);
};
