
const checkActiveFields = (remainingFields, field) => {
  const activeFields = remainingFields.filter((element) => {
    const a = Math.abs(parseInt(element[0], 10) - parseInt(field[0], 10));
    const b = Math.abs(parseInt(element[1], 10) - parseInt(field[1], 10));
    const br = a.toString() + b.toString();
    if (br === '03' || br === '30' || br === '22') {
      return true;
    }
    return false;
  });
  return activeFields;
};

export default checkActiveFields;
