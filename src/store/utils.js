const removeDuplicated = (array, key = 'id') => {
  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i].hasOwnProperty(key)) {
        if (a[i][key] === a[j][key]) a.splice(j--, 1);
      } else {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }
  }
  return a;
};

export default removeDuplicated;
