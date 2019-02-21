// Returns a zero-padded number
const zeros = n => {
    let str = '';
    for (let i = 0; i < n; i += 1) {
        str += '0';
    }
    return str;
};

const createBuckets = n => {
    let bucket = {};
    for (let i = 0; i < n; i += 1) {
        bucket[i] = [];
    }
    return bucket;
};

const radixSort = (nums, RADIX) => {
    if (nums.length <= 0) return;

    let max = Math.max(...nums);
    let numPasses = max.toString().length;

    nums = nums.map(num => zeros(numPasses - num.toString().length) + num.toString());

    for (let pass = 1; pass <= numPasses; pass += 1) {
        let bucketsObj = createBuckets(RADIX);

        for (let i = 0; i < nums.length; i += 1) {
            let numStr = nums[i];
            let char = numStr.charAt(numPasses - pass);
            let bucketArray = bucketsObj[char];
            bucketArray.push(numStr);
        }

        nums = [];

        for (let i = 0; i < RADIX; i += 1) {
            let bucketArray = bucketsObj[i];
            bucketArray.forEach(num => nums.push(num));
        }

    }

    return nums.map(num => Number(num));
};

module.exports = {
    radixSort,
};
