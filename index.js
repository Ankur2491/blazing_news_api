const Cors = require('cors');
var redis = require('redis');
let redis_host = "redis-11422.c62.us-east-1-4.ec2.cloud.redislabs.com"
let redis_port = 11422
const axios = require('axios');
let redis_password = "AFahzbIs3wTxs0VMPnvTqkuqyoZOWXwV"
const Mercury = require('@postlight/mercury-parser');
var client = redis.createClient({ host: redis_host, port: redis_port, password: redis_password })
const express = require("express");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const app = express();
app.use(jsonParser)
app.use(Cors())
let port = process.env.PORT || 3000;
// setInterval(() => {
//     let obj = { 'news': [] }
//     client.get("all_news", async (err, resp) => {
//         let data = JSON.parse(resp);
//         for (let i in data['news']) {
//             let articles = [];
//             allPromises = [];
//             for (let article of data['news'][i]['articles']) {
//                 let innerObj = {
//                     'description': article['description'],
//                     'url': article['url'], 'title': article['title'],
//                     'publishedAt': article['publishedAt'], 'urlToImage': article['urlToImage']
//                 }
//                 if (article["urlToImage"].includes("./img")) {
//                     //let response = await axios.post('https://hnews-image.herokuapp.com/image', { 'url': article['url'] });
//                     allPromises.push(Mercury.parse(article['url']))
//                     // console.log(Object.keys(response))
//                     if (response['lead_image_url'] !== undefined) {
//                         innerObj['urlToImage'] = response['lead_image_url'];
//                     }
//                     else {
//                         let arr = innerObj["urlToImage"].split("/");
//                         innerObj["urlToImage"] = './assets/img/' + arr[2];
//                     }
//                     console.log(innerObj);
//                 }
//                 articles.push(innerObj);
//             }
//             data['news'][i] = { 'status': 'ok', 'articles': articles };
//         }
//         console.log(data);
//         obj.news = data['news'];
//         client.set('enriched_news', JSON.stringify(obj));
//     })
// }, 3000)
app.get("/all", (req, res) => {
    client.get('all_news', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data['news'][0]['articles']);
    })
});

app.get("/general", (req, res) => {
    client.get('all_news', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data['news'][1]['articles']);
    })
});

app.get("/business", (req, res) => {
    client.get('all_news', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data['news'][2]['articles']);
    })
});

app.get("/entertainment", (req, res) => {
    client.get('all_news', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data['news'][3]['articles']);
    })
});

app.get("/health", (req, res) => {
    client.get('all_news', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data['news'][4]['articles']);
    })
});

app.get("/science", (req, res) => {
    client.get('all_news', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data['news'][5]['articles']);
    })
});

app.get("/technology", (req, res) => {
    client.get('all_news', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data['news'][6]['articles']);
    })
});

app.get("/sport", (req, res) => {
    client.get('all_news', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data['news'][7]['articles']);
    })
});

app.get("/offbeat", (req, res) => {
    client.get('all_news', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data['news'][8]['articles']);
    })
});

app.get("/keyNews", (req, res) => {
    client.get('keyNews', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data);
    })
});

app.get("/backImg", (req, res) => {
    client.get('all_news', (err, resp) => {
        let data = JSON.parse(resp);
        let x = { 'url': data['backImg'] };
        res.send(x);
    })
})

app.get("/joke", (req, res) => {
    const options = {
        headers: { 'Accept': 'application/json' }
    }
    axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit', options).then(response => {
        if (response.data.type == "twopart") {
            let obj = { "joke": `${response.data.setup} -> ${response.data.delivery}` }
            res.send(obj);
        }
        else {
            res.send({ "joke": response.data.joke });
        }

    })
})

app.post('/smartRead', async (req, res) => {
    const url = req.body.url
    let result = await Mercury.parse(url).catch(err => { console.log("mercuryError", err) });
    result.content = result.content.replace(/<[^>]*>?/gm, '');
    result.content = result.content.replace(/&apos;/g, '\'')
    result.content = result.content.replace(/&quot;/g, '"');
    result.content = result.content.replace(/&#xA0;/g, ' ')
    result.content = result.content.replace(/&amp;/g, '&')
    result.content = result.content.replace(/&#x201C;/g, '"')
    result.content = result.content.replace(/&#x201D;/g, '"')
    result.content = result.content.replace(/&#x2019;/g, "'")
    result.content = result.content.replace(/&#x2013;/g, "-")
    result.content = result.content.replace(/&#x2026;/g, "...")
    result.content = result.content.replace(/&#x2C6;/g, "^");
    result.content = result.content.replace(/&#x2DC;/g, "~");
    result.content = result.content.replace(/&#x2002;/g, " ");
    result.content = result.content.replace(/&#x2003;/g, " ");
    result.content = result.content.replace(/&#x2009;/g, " ");
    result.content = result.content.replace(/&#x200C;/g, " ");
    result.content = result.content.replace(/&#x200D;/g, " ");
    result.content = result.content.replace(/&#x200E;/g, " ");
    result.content = result.content.replace(/&#x200F;/g, " ");
    result.content = result.content.replace(/&#x2014;/g, "--");
    result.content = result.content.replace(/&#x2018;/g, "'");
    result.content = result.content.replace(/&#x201A;/g, "‚");
    result.content = result.content.replace(/&#x201E;/g, ",,");
    result.content = result.content.replace(/&#x2039;/g, "<");
    result.content = result.content.replace(/&#x203A;/g, ">");
    result.content = result.content.replace(/&#x20B9;/g, "₹");
    const params = new URLSearchParams()
    params.append('payload', result.content);
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    let postBody = {'payload': result.content};
    let resp = await axios.post('http://35.188.135.67:3050/smartRead', postBody, config);
    res.send(resp.data);
});

app.post("/prepareQuestions", async (req, res) => {
    let postBody = { 'para': req.body.para }
    let resp = await axios.post('http://34.171.54.43:3056/prepare',postBody);
    res.send(resp.data);

})

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`)
});