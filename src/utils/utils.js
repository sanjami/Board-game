/*
  Active fields check is done by narrowing down options from 8 to 3.
  Possible directions for moving are (-2, -2), (-2, 2), (2, -2), (2, 2), (-3, 0), (3, 0), (0, -3), (0, 3).
  By using absolute values of these movements, we can narrow down comparison to three cases: (2, 2), (0, 3) and (3, 0).
  We calculate difference between coordinates of the current field and each of the remaining fields, and, when that difference (absolute value)
  can be found in the above group of 3 movements, it is considered as a possible next position, meaning we're tagging it as an active field.
*/

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
