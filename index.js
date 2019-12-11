const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const size = process.env.SIZE;
const startingnumber = process.env.STARTINGNUMBER;
const batchsize = process.env.BATCHSIZE;
const url = process.env.URL;

  console.log("Project Parakeet, Let's get your request!");
  getBook(`http://www.gutenberg.org/cache/epub/${startingnumber}/pg${batchsize}.txt`);

function getHeader(body){
  var array = body.split("\r\n");
  for(var i = 0; i < 20; i++){
      console.log(`loop ${i}`)
      if(array[i].includes("Project Gutenberg"))
      {
        return array[i]
      }
  }
  return "";
}
async function getBook(request){
    fetch(request)
      .then(res => res.text())
      .then(body => {
          let book = {}
          book.title = getHeader(body);
          book.text =  body.slice(0,size);
          jsonBook = JSON.stringify(book);
          fetch(`${url}`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              mode: 'cors',
              body: jsonBook
            }
            ).then(response=>{
              console.log(response)
            })
      });
}