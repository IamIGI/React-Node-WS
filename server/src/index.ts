const test: string[] = ['elo', 'elo', 'w2', 'what'];

console.log(test);

setTimeout(() => {
  test.push('kkkk');
}, 1000);
setTimeout(() => {
  console.log(test);
}, 1200);
