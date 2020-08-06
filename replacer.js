const fs = require('fs');

fs.readFile('dist/index.html', 'utf-8', (err, data) => {
  if (err) {
    throw err;
  }

  const cssRegexp = /static\/(\w*~?\w*\.\w*.(css|jpg))/g;
  let key;
  let replacerData = data;
  // eslint-disable-next-line no-cond-assign
  while ((key = cssRegexp.exec(data))) {
    if (key[1]) {
      replacerData = replacerData.replace(key[0], `https://subdued-view.surge.sh/${key[1]}`);
    }
  }

  fs.writeFileSync('dist/index.html', replacerData, 'utf-8', (error) => {
    if (error) {
      throw error;
    }
  });
});
