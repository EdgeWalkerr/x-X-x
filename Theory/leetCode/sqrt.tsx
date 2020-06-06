const sqrt = (num: number) => {
    let low = 0;
    let high = num;
    while (low <= high) {
        let middle = low + Math.floor((high - low) / 2);
        if (Math.pow(middle, 2) <= num && Math.pow(middle + 1, 2) > num) {
            return middle;
        } else if (Math.pow(middle, 2) > num) {
            high = middle - 1;
        } else {
            low = middle + 1;
        }
    }
}
