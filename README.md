# 2ch-file-saver

Node util for saving files from 2ch.hk threads

Uses async/await so be sure that your Node version > 7.0.0.

Install dependencies
```
npm install
```

Run util with THREAD env var, e.g.
```
THREAD=pr/res/1057223 node index.js
```
If Windows
```
set THREAD=pr/res/1057223 node index.js
```

Files saves in pics/THREAD_NAME, that creates automatically, if not exists.

Some files can be downloaded broken, don't know now, why it's happening.

Feel free to make PR.