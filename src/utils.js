function chooseSecondaryCtg(primaryCtg, ctgIndex) {
    switch (primaryCtg) {
        case 'Electronics':
            this.ctgIndex = 0;
            break;
        case 'Furniture':
            ctgIndex = 1;
            break;
        case 'Clothing':
            ctgIndex = 2;
            break;
        case 'Art':
            ctgIndex = 3;
            break;
    }
}
export default {
    chooseSecondaryCtg ,
}