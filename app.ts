const express = require('express');
const dns = require('dns');
const hostname = require('os').hostname();

const port = 4000;
const app = express();
app.use(express.static(`${__dirname}/dist`));
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
console.log('\n\n\nヽ(♡‿♡)ノ     Hello !     ヽ(♡‿♡)ノ\n\n');
setTimeout(() => console.log('     My name is \x1b[1;31m丫闩尺闩\x1b[0m   人____人'), 500);
setTimeout(() => console.log('                          ≧ (◕ ‿‿ ◕) ≦  \n\n'), 500);
setTimeout(
  () => console.log('I’ve been created by Pelikh Ilya, especially for Yandex!'),
  2000
);
setTimeout(() => console.log('I\'m glad to see you!'), 3000);
setTimeout(() => console.log('Enjoy me! I will be happy to get your feedback on Github. '), 4000);

dns.lookup(hostname, (err, add, fam) => {
  app.listen(port, () => {
    setTimeout(
      () => console.log(
        `\n(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧     \x1b[4;35mhttp://localhost:${port}/\x1b[0m OR \x1b[4;35mhttp://${add}:${port}/\x1b[0m   ✧ﾟ･: *ヽ(◕ヮ◕ヽ)`
      ),
      5000
    );
  });
});
