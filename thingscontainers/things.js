var express = require('express'); 
var router = express.Router(); 

var thingsList = [ 
    { id: 1, title: 'A beautiful blue sky.' }, 
    { id: 2, title: 'The bubbles in my glass of water.' }, 
]

router.get('/', function(req, res){ 
    res.json(thingsList);
}); 

router.post('/', function(req, res){ 
    thingsList.push(req.body);
    res.send(req.body);
}); 

router.get('/:id', function (req, res) { 
    const id = parseInt(req.params.id);
    const thing = thingsList.find(t => t.id === id);
    
    if (thing) {
        res.send("The id is " + id + " and the title is: " + thing.title);
    } else {
        res.status(404).send({ error: 'Thing not found for id = ' + id });
    }
}); 

//export this router to use in our index.js 
module.exports = router; 