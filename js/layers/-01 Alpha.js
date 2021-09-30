// LAYER -1: ALPHA
// MINIGAME: BURNER
//
// ADDED IN 0.01
addLayer("side1", {
    name: "α", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "α", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        pointEff: new Decimal(1),
        fuel: new Decimal(0),
        maxfuel: new Decimal(19),
        fuelps: new Decimal(1),
        fuelgain: new Decimal(2)
    }},
    color: "#808080",
    requires: new Decimal(1),
    resource: "α-Coin", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    tabFormat: {
        "Main": {
            content: [
                ["main-display", 3],
                ["display-text", function() {
                    return "Every second, you are burning "+format(player.side1.fuelps)+" Fuel to gain "+format(player.side1.fuelps.times(player.side1.pointEff))+"α-Coin."
                }],
                "blank",
                ["bar", "fuelBar"],
                "blank",
                "clickables",
                "blank",
                ["microtabs", "upgs"]
            ],
            unlocked() {
                return true
            },
        },
    },
    microtabs: {
        upgs: {
            "Pipe": {
                content: [
                    ["row", [["upgrade", 11]]]
                ],
            },
            "Fuel Tank": {
                content: [
                ],
            },
            "Burner": {
                content: [
                ],
            },
            "Automation": {
                content: [
                ],
            },
        },
    },
    bars: {
        fuelBar: {
            direction: RIGHT,
            width: 300,
            height: 60,
            progress() {
                return player.side1.fuel.div(player.side1.maxfuel)
            },
            display() {
                let text = "Fuel: "
                text = text + format(player.side1.fuel)
                text = text + "/"
                text = text + format(player.side1.maxfuel)
                text = text + " ("
                text = text + format(player.side1.fuel.div(player.side1.maxfuel).times(100))
                text = text + "%)"
                return text
            },
            baseStyle: {
                "background-color": "#333333"
            },
            fillStyle: {
                "background-color": "#666666"
            },
        },
    },
    clickables: {
        11: {
            display() {
                let text = "Click this button to gain "
                text = text + format(player.side1.fuelgain)
                text = text + " Fuel"
                return text
            },
            canClick() {
                return true
            },
            onClick() {
                player.side1.fuel = player.side1.fuel.add(player.side1.fuelgain)
                if (player.side1.fuel.gt(player.side1.maxfuel))
                {
                    player.side1.fuel = player.side1.maxfuel
                }
            }
        }
    },
    upgrades: {
        11: {
            title: "",

        },
    },
    update(diff) {
        let fuelLoss = player.side1.fuelps.times(diff).min(player.side1.fuel)
        let pointGain = fuelLoss.times(player.side1.pointEff)
        player.side1.fuel = player.side1.fuel.sub(fuelLoss)
        player.side1.points = player.side1.points.add(pointGain)
    },
    layerShown() {
        return hasUpgrade("He", 35)
    },
    doReset(resettingLayer) {
		let keep = []
        if (layers[resettingLayer].row > layers[this.layer].row)
        {
            layerDataReset(this.layer, keep)
        }
	},
})