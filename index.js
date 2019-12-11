const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const size = process.env.SIZE;
const startingnumber = process.env.STARTINGNUMBER;
const batchsize = process.env.BATCHSIZE;
const url = process.env.URL;

  console.log("Project Parakeet, Let's get your request!");
  fetch(`http://www.gutenberg.org/cache/epub/${startingnumber}/pg${batchsize}.txt`)
      .then(res => res.text())
      .then(body => {
          let book = {}
          realbody =  body.slice(1,size);
          book.text = realbody
          book.title = getheader(book.text);
          jsonbook = JSON.stringify(book);
          console.log(book)

          fetch(`${url}`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              mode: 'cors',
              body: jsonbook
            }
            ).then(response=>{
              console.log(response)
            })
            .catch(error=>Promise.reject());
      });


function getheader(body){
  return "Kylers";
}