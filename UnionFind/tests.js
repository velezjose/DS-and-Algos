const { QuickFind } = require('./QuickFind');
const { QuickUnion } = require('./QuickUnion');
const { CompressedQuickUnion } = require('./CompressedQuickUnion');
const { CompressedAndWeightedUnionFind: OptimalUnionFind } = require('./OptimalUnionFind');

let UnionFindImplementations = [
  { name: 'Quick Find', importedClass: QuickFind },
  { name: 'Quick Union', importedClass: QuickUnion },
  { name: 'Compressed Quick Union', importedClass: CompressedQuickUnion },
  { name: 'Optimal Union Find', importedClass: OptimalUnionFind },
];

UnionFindImplementations.forEach(obj => {

  console.log('\n---------------------------')
  console.log(`${ obj.name } Tests:`);
  console.log('---------------------------')

  let unionFind = new obj.importedClass(10);

  // All components start out disconnected
  console.log(unionFind.connected(0, 5), 'should be false.');

  // After uniting 0 and 5, they should be connected.
  unionFind.union(0, 5);
  console.log(unionFind.connected(0, 5), 'should be true.');
  
  // Connecting several other components
  unionFind.union(3, 8);
  unionFind.union(8, 9);
  unionFind.union(1, 2);
  unionFind.union(4, 4);
  unionFind.union(7, 2);

  try {
    unionFind.union(100, 100);
  } catch (e) {
    console.log('Should throw an error.');
  }

  console.log(unionFind.connected(0, 1), 'should be false');
  console.log(unionFind.connected(6, 6), 'should be true');
  console.log(unionFind.connected(3, 9), 'should be true');
  console.log(unionFind.connected(3, 7), 'should be false');

  unionFind.union(7, 3);
  console.log(unionFind.connected(3, 7), 'should be true');
  console.log('TESTS PASSED!');
  console.log('---------------------------\n')

});
