export const imageToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function descendingComparator(a, b, orderBy, typeNums) {
  const bV = typeNums.indexOf(orderBy)>=0 ? parseFloat(b[orderBy]):b[orderBy]
  const aV = typeNums.indexOf(orderBy)>=0 ? parseFloat(a[orderBy]):a[orderBy]
  if (bV < aV) {
    return -1;
  }
  if (bV > aV) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy, typeNums) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy, typeNums)
    : (a, b) => -descendingComparator(a, b, orderBy, typeNums);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function formatNumber(number) {
  if (!number) {
    return 0;
  }
  return new Intl.NumberFormat('en-EN').format(number)
}

export function groupBy(array, key) {
  return array.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
