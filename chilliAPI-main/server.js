const express = require("express"); 
const app = express(); 
app.use(express.json()); 

// Variables (in-memory storage):
let chillies = []; 
var count = 0; 

app.get("/chillies", (req, res) => { 
    console.log("get all chillies"); 
    res.json(chillies);
}); 

app.get("/chillies/:id", (req, res) => { 
    console.log(`get a chilli with id ${req.params.id}`);
    
    var chilli = chillies.find(c => c.id == req.params.id);
    if (chilli) {
        res.json(chilli);
    } else {
        res.status(404).send("Chilli not found");
    }
}); 

app.post("/chillies", (req, res) => { 
    console.log("add a chilli"); 
    const { name, heat } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }
    const newChilli = {
        id: ++count,
        name,
        heat: heat || null,
        createdAt: new Date().toISOString()
    };
    chillies.push(newChilli);
    res.status(201).json(newChilli);
}); 

app.put("/chillies/:id", (req, res) => { 
    console.log(`update a chilli with id ${req.params.id}`);
    const id = parseInt(req.params.id, 10);
    const chilli = chillies.find(c => c.id === id);
    if (!chilli) {
        return res.status(404).json({ error: 'Chilli not found' });
    }
    const { name, heat } = req.body;
    if (!name && typeof heat === 'undefined') {
        return res.status(400).json({ error: 'At least one of name or heat must be provided' });
    }
    if (name) chilli.name = name;
    if (typeof heat !== 'undefined') chilli.heat = heat;
    chilli.updatedAt = new Date().toISOString();
    res.json(chilli);
}); 

app.delete("/chillies/:id", (req, res) => { 
    console.log(`delete a chilli with id ${req.params.id}`); 
}); 

app.listen(3001, () => { 
    console.log("listening on port 3001"); 
}); 