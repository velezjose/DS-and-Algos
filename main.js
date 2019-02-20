const { LRUCache } = require('./LRU.js');

let cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(`${cache.get(1)} should be 1.`)
cache.put(1, 'one');
console.log(`${cache.get(1)} should be one.`)
cache.put(3, 3);    // evicts key 2
console.log(`${cache.get(2)} should be -1 (not found).`);
cache.put(4, 4);    // evicts key 1
console.log(`${cache.get(1)} should be -1 (not found).`);
console.log(`${cache.get(3)} should be 3.`);
cache.put(3, 'three');
console.log(`${cache.get(3)} should be three.`);
console.log(`${cache.get(4)} should be 4.`);
