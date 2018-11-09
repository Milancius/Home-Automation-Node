const hue = require("node-hue-api");
const HueApi = hue.HueApi;

let lightState = hue.lightState;

const displayResult = function(result) {
   console.log(JSON.stringify(result, null, 2));
};

let hostname = "192.168.2.189";
let username = "D4Lik-nGOqoMKLufdEO6pugRmrHySR9wNLXl7ur8";
let port = "80";

let api = new HueApi(hostname, username, 25000, port);

exports.getConfig = (req, res) => {
    api.getConfig((err, config) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(config);
    })
}

exports.getFullState = (req, res) => {
    api.getFullState((err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
};

exports.getLightsState = (req, res) => {
    api.lights((err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
};

exports.getLightState = (req, res) => {
    if (!req.params.id) return res.status(400).json({error: "Light id required"});
    api.lightStatus(req.params.id, (err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
};

exports.getLightStateFull = (req, res) => {
    if (!req.params.id) return res.status(400).json({error: "Light id required"});
    api.lightStatusWithRGB(req.params.id, (err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
}

exports.turnLightOn = (req, res) => {
    if (!req.params.id) return res.status(400).json({error: "Light id required"});
    api.setLightState(req.params.id, {"on": true}, (err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
}

exports.turnLightOff = (req, res) => {
    if (!req.params.id) return res.status(400).json({error: "Light id required"});
    api.setLightState(req.params.id, {"on": false}, (err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
}

exports.changeLightState = (req, res) => {
    if (!req.params.id) return res.status(400).json({error: "Light id required"});
    if (!req.body.state) return res.status(400).json({error: "Invalid body"});
    
    api.setLightState(req.params.id, req.body.state, (err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
}


// G-R-O-U-P-S
exports.getGroupsState = (req, res) => {
    api.groups((err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    });
}

exports.getGroupState = (req, res) => {
    if (!req.params.id) return res.status(400).json({error: "Group id required"});
    api.getGroup(req.params.id, (err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
};

exports.turnGroupOn = (req, res) => {
    if (!req.params.id) return res.status(400).json({error: "Group id required"});
    api.setGroupLightState(req.params.id, {"on": true}, (err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
}

exports.turnGroupOff = (req, res) => {
    if (!req.params.id) return res.status(400).json({error: "Group id required"});
    api.setGroupLightState(req.params.id, {"on": false}, (err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
}

exports.changeGroupState = (req, res) => {
    if (!req.params.id) return res.status(400).json({error: "Group id required"});
    if (!req.body.state) return res.status(400).json({error: "Invalid body"});
    
    api.setGroupLightState(req.params.id, req.body.state, (err, result) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(result)
    })
}

// -------------- || -------------- \\

// Searching for new lights (Documentation)
// TODO: This should be implemented later with functions for adding lights in the system, naming lights and groups
exports.searchForNewLights = (req, res) => {
    api.searchForNewLights((err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result)
    })
}

