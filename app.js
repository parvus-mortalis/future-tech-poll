const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Pug Setup
app.set('views', './views');
app.set('view engine', 'pug');

// Stylesheet Setup
app.use("/css", express.static(__dirname + "/css"));

// bodyParser Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Vars
const ques = [
    "Do you think that the possible technological developments of the next 50 years will have a postive impact?",
    "Do you think that you will be able to have custom organs grown in a lab in the next 50 years?",
    "In the next 50 years, will computers be able to replicate human art indistinquishably?",
    "Will the science to teleport objects be around in 50 years?",
    "50 years from now, will we have colonized other planets?"
]

function JsonToArray(json){
    let out = [];
    for(let val in json){
        let value = json[val]
        out.push(value);
    }
    return out;
}

app.get('/', (req, res) => {
    res.render('index', {ques: ques});
});

app.post('/', (req, res) => {
    let body = req.body;
    let response = JsonToArray(body);
    res.render('index-post', {answers: response, ques: ques});
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server started on Port ' + (port)));