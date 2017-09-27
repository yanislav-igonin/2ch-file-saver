const fs = require('fs');
const fetch = require('node-fetch');

const dir = './pics';
let threadTitle = '';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const getPosts = async () => {
  try {
    const result = await fetch(`https://2ch.hk/${process.env.THREAD}.json`)
    const threadsData = await result.json();
    threadTitle = threadsData.title;
    if (!fs.existsSync(`${dir}/${threadTitle}`)){
        fs.mkdirSync(`${dir}/${threadTitle}`);
    }
    return threadsData.threads[0].posts;
  } catch (e) {
    console.log(e.message);
    return []
  }
}

const main = async () => {
  const posts = await getPosts();  
  
  let filesCount = 0;
  posts.forEach(post => {
    filesCount += post.files.length;
  });

  console.log(`${filesCount} files will be downloaded`);
        
  filesCount = 1;

  posts.forEach((post, postIndex) => {
    if(post.files.length > 0){
      post.files.forEach(async file => {
        try {
          await fetch(`https://2ch.hk${file.path}`)
            .then(async res => {
              await res.body.pipe(fs.createWriteStream(`${dir}/${threadTitle}/${file.name}`));
              console.log(`${filesCount++} file ${file.name} downloaded`);
            });
        } catch (e) {
          console.log(e.message);
        }
      });
    }
  });
}

main();