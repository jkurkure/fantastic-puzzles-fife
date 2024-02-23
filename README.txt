The code was ran on the localhost via the following commands.
Note that the starting directory is ./project-code.

Back-End:

cd *rest
npm i
npm start

Front-End:

cd *web
npm i
npm start

NOTE: The code will only run on localhost if you change the mongoDB URL in mongoConnection.js:

Instead of this:

const mongoDB = "mongodb://admin:Moh4yie9@0.0.0.0:24086"
// const mongoDB = "mongodb+srv://djn9:denisiscool1912@cluster0.mdlfvbz.mongodb.net/?retryWrites=true&w=majority";

It should be this:

// const mongoDB = "mongodb://admin:Moh4yie9@0.0.0.0:24086"
const mongoDB = "mongodb+srv://djn9:denisiscool1912@cluster0.mdlfvbz.mongodb.net/?retryWrites=true&w=majority";


URL "mongodb://admin:Moh4yie9@0.0.0.0:24086" only works with the pseudo user website.