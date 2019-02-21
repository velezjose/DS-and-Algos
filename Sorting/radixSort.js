// Returns a zero-padded number
const zeros = n => {
    let str = '';
    for (let i = 0; i < n; i += 1) {
        str += '0';
    }
    return str;
};

// Creates a new object bucket with key-value pair mappings of
// indexes (0 to RADIX - 1)  ––> empty arrays [] which will be
// where numbers with characters equal to the indexes will fall
// into.
const createBuckets = n => {
    let bucket = {};
    for (let i = 0; i < n; i += 1) {
        bucket[i] = [];
    }
    return bucket;
};

// Receives as input a nums array and a radix (base).
const radixSort = (nums, RADIX = 10) => {
    if (nums.length <= 0) return;

    // Get the max number and set it's toString()'s length as the number of passes
    let max = Math.max(...nums);
    let numPasses = max.toString().length;

    // Zero-pad all numbers in the array
    nums = nums.map(num => zeros(numPasses - num.toString().length) + num.toString());

    // Do a total of numPasses amount of passes
    for (let pass = 1; pass <= numPasses; pass += 1) {
        let bucketsObj = createBuckets(RADIX);

        // For the entire nums array:
        //  - get element
        //  - get the character at the given index (starting from charAt(string.length - 1) and decreasing to charAt(0))
        //  - push element into corresponding bucket
        for (let i = 0; i < nums.length; i += 1) {
            let numStr = nums[i];
            let char = numStr.charAt(numPasses - pass);
            let bucketArray = bucketsObj[char];
            bucketArray.push(numStr);
        }

        // Set nums to be empty array, and push the elements in each bucketArray in
        // the correct order from 0 –> bucketArray.length - 1
        nums = [];
        for (let i = 0; i < RADIX; i += 1) {
            let bucketArray = bucketsObj[i];
            bucketArray.forEach(num => nums.push(num));
        }

    }

    // Return final nums array that contains numbers (as opposed to zero-padded strings)
    return nums.map(num => Number(num));
};

module.exports = {
    radixSort,
};
