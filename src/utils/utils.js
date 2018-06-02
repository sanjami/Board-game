
export const checkActiveFields = (remainingFields, field) => {
    let activeFields = remainingFields.filter(element => {
        let a = Math.abs(parseInt(element[0]) - parseInt(field[0]));
        let b = Math.abs(parseInt(element[1]) - parseInt(field[1]));
        let br = a.toString() + b.toString()
        if (br === '03' || br === '30' || br === '22') {
            return true;
        } else {
            return false;
        }
    })
    return activeFields
};