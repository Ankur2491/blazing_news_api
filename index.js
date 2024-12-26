const Cors = require('cors');
var redis = require('redis');
let redis_host = "redis-11422.c62.us-east-1-4.ec2.cloud.redislabs.com"
let redis_port = 11422
const axios = require('axios');
const natural = require('natural');
const stopWords = ["call", "upon", "still", "nevertheless", "down", "every", "forty", "'re", "always", "whole", "side", "n't", "now", "however", "an", "show", "least", "give", "below", "did", "sometimes", "which", "'s", "nowhere", "per", "hereupon", "yours", "she", "moreover", "eight", "somewhere", "within", "whereby", "few", "has", "so", "have", "for", "noone", "top", "were", "those", "thence", "eleven", "after", "no", "'ll", "others", "ourselves", "themselves", "though", "that", "nor", "just", "'s", "before", "had", "toward", "another", "should", "herself", "and", "these", "such", "elsewhere", "further", "next", "indeed", "bottom", "anyone", "his", "each", "then", "both", "became", "third", "whom", "'ve", "mine", "take", "many", "anywhere", "to", "well", "thereafter", "besides", "almost", "front", "fifteen", "towards", "none", "be", "herein", "two", "using", "whatever", "please", "perhaps", "full", "ca", "we", "latterly", "here", "therefore", "us", "how", "was", "made", "the", "or", "may", "'re", "namely", "'ve", "anyway", "amongst", "used", "ever", "of", "there", "than", "why", "really", "whither", "in", "only", "wherein", "last", "under", "own", "therein", "go", "seems", "'m", "wherever", "either", "someone", "up", "doing", "on", "rather", "ours", "again", "same", "over", "'s", "latter", "during", "done", "'re", "put", "'m", "much", "neither", "among", "seemed", "into", "once", "my", "otherwise", "part", "everywhere", "never", "myself", "must", "will", "am", "can", "else", "although", "as", "beyond", "are", "too", "becomes", "does", "a", "everyone", "but", "some", "regarding", "'ll", "against", "throughout", "yourselves", "him", "'d", "it", "himself", "whether", "move", "'m", "hereafter", "re", "while", "whoever", "your", "first", "amount", "twelve", "serious", "other", "any", "off", "seeming", "four", "itself", "nothing", "beforehand", "make", "out", "very", "already", "various", "until", "hers", "they", "not", "them", "where", "would", "since", "everything", "at", "together", "yet", "more", "six", "back", "with", "thereupon", "becoming", "around", "due", "keep", "somehow", "n't", "across", "all", "when", "i", "empty", "nine", "five", "get", "see", "been", "name", "between", "hence", "ten", "several", "from", "whereupon", "through", "hereby", "'ll", "alone", "something", "formerly", "without", "above", "onto", "except", "enough", "become", "behind", "'d", "its", "most", "n't", "might", "whereas", "anything", "if", "her", "via", "fifty", "is", "thereby", "twenty", "often", "whereafter", "their", "also", "anyhow", "cannot", "our", "could", "because", "who", "beside", "by", "whence", "being", "meanwhile", "this", "afterwards", "whenever", "mostly", "what", "one", "nobody", "seem", "less", "do", "'d", "say", "thus", "unless", "along", "yourself", "former", "thru", "he", "hundred", "three", "sixty", "me", "sometime", "whose", "you", "quite", "'ve", "about", "even", "said"]
let redis_password = "AFahzbIs3wTxs0VMPnvTqkuqyoZOWXwV"
const Mercury = require('@postlight/mercury-parser');
var client = redis.createClient({ host: redis_host, port: redis_port, password: redis_password })
const express = require("express");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json({limit:'50mb'})
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

app.get("/positiveNews", (req, res)=> {
    client.get('sentimentNews', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data.positive);
    })
})

app.get("/negativeNews", (req, res)=> {
    client.get('sentimentNews', (err, resp) => {
        let data = JSON.parse(resp);
        res.send(data.negative);
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
            'Content-Type': 'application/json'
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
app.get("/places",async (req, res) => {
    let x = await fetch('https://radio.garden/api/ara/content/places')
	let json = await x.json()
	res.send(json)
})
app.get("/channels/:channelId", async (req, res) => {
    let channelId = req.params.channelId;
    let x = await fetch(`https://radio.garden/api/ara/content/page/${channelId}/channels`)
	let json = await x.json()
	res.send(json)
});

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyBGitFHOcooc4WLc2OOyhH53n6MbIer604";
  
  async function runChat() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings
    });
  
    const result = await chat.sendMessage("some interesting facts");
    const response = result.response;
    return response.text();
  }
  
  app.get("/interestingFacts", async (req, res) => {
    let data = await runChat();
    let json = {facts: data};
	res.send(json)
});

app.post("/prepareKeyNews", async(req, res) => {
    let newsArr = req.body.newsArr;
    let keyNews = prepareKeyNews(newsArr);
    res.send({"keyNews": keyNews});
    });

function prepareKeyNews(newsArr) {
    let tokenizer = new natural.WordTokenizer();
    let wordScore = {};
    for (let news of newsArr) {
        let wordArr = tokenizer.tokenize(news['title']);
        let filteredWordArr = wordArr.filter(word => !stopWords.includes(word.toLowerCase()));
        for (let w of filteredWordArr) {
            if(w.length>3) {
            if (wordScore && wordScore.hasOwnProperty(w)) {
                wordScore[w] = wordScore[w] + 1;
            }
            else {
                wordScore[w] = 1;
            }
        }
        }
    }
    let entries = Object.entries(wordScore);
    let sortedEntries = entries.sort((a,b)=>b[1]-a[1]);
    let finalValues = [];
    for(let i=0;i<20;i++) {
        finalValues.push(sortedEntries[i][0]);
    }
    return finalValues;
}


app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`)
});