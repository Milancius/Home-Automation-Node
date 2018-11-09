const {Client} = require("tplink-smarthome-api");
const client = new Client();

global.plugs = [];

function init () {
    client.startDiscovery().on('device-new', (device) => {
        device.getSysInfo().then(console.log);
        plugs.push(device);
    })
}

exports.init = init;


exports.getPlugs = (req, res) => {
    let devices = [];
    for (let i = 0; i < global.plugs.length; i++) {
        devices.push({plug: global.plugs[i]._sysInfo, power: global.plugs[i].inUse});
    }
    return res.status(200).json(devices);
};

exports.turnAllPlugsOn = (req, res) => {
    let status = [];
    for (let i = 0; i < global.plugs.length; i++) {
        global.plugs[i].setPowerState(true).then((result) => {
            status.push(global.plugs[i].inUse);
            if (i == global.plugs.length - 1) return res.status(200).json({power: status})
        }).catch((err) => {
            status.push(null);
            if (i == global.plugs.length - 1) return res.status(200).json({power: status})
        });
    }
}

exports.turnAllPlugsOff = (req, res) => {
    let status = [];
    for (let i = 0; i < global.plugs.length; i++) {
        global.plugs[i].setPowerState(false).then((result) => {
            status.push(global.plugs[i].inUse);
            if (i == global.plugs.length - 1) return res.status(200).json({power: status})
        }).catch((err) => {
            status.push(null);
            if (i == global.plugs.length - 1) return res.status(200).json({power: status})
        });
    }
}

exports.toggleAllPlugs = (req, res) => {
    let status = [];
    for (let i = 0; i < global.plugs.length; i++) {
        global.plugs[i].togglePowerState().then((result) => {
            status.push(global.plugs[i].inUse);
            if (i == global.plugs.length - 1) return res.status(200).json({power: status})
        }).catch((err) => {
            status.push(null);
            if (i == global.plugs.length - 1) return res.status(200).json({power: status})
        });
    }
}

