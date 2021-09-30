// SPECIAL LAYER: ACHIEVEMENTS
//
// ADDED IN 0.01
addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⭐", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffcc00",
    resource: "Achievement Points", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "1-56": {
            content: [
                "main-display",
                "blank",
                "achievements",
            ],
            unlocked() {
                return true
            },
        },
    },
    achievements: {
        11: {
            name: "First Matter Production",
            done() {
                return player.points.gt(1)
            },
            tooltip: "Begin the generation of Matter."
        },
        12: {
            name: "One for each GFRIEND Member",
            done() {
                return player.points.gte(6)
            },
            tooltip: "Reach 6 Matter."
        },
        13: {
            name: "Nice",
            done() {
                return player.points.gte(69)
            },
            tooltip: "Reach 69 Matter."
        },
        14: {
            name: "404 Not Found",
            done() {
                return player.points.gte(404)
            },
            tooltip: "Reach 404 Matter."
        },
        15: {
            name: "Old Age",
            done() {
                return player.points.gte(2021)
            },
            tooltip: "Reach 2,021 Matter."
        },
        16: {
            name: "(hardcapped)",
            done() {
                return player.points.gte(1e4)
            },
            tooltip: "Reach 10,000 Matter."
        },
        17: {
            name: "(hardcapped 10 TIMES)",
            done() {
                return player.points.gte(1e5)
            },
            tooltip: "Reach 100,000 Matter."
        },
        21: {
            name: "Hydrogen Collector I",
            done() {
                return player.H.points.gt(1)
            },
            tooltip: "Have more than 1 Hydrogen."
        },
        22: {
            name: "Hydrogen Collector II",
            done() {
                return player.H.points.gte(10)
            },
            tooltip: "Reach 10 Hydrogen."
        },
        23: {
            name: "Hydrogen Collector III",
            done() {
                return player.H.points.gte(1e4)
            },
            tooltip: "Reach 10,000 Hydrogen."
        },
        24: {
            name: "Hydrogen Collector IV",
            done() {
                return player.H.points.gte(1e7)
            },
            tooltip: "Reach 10,000,000 Hydrogen."
        },
        25: {
            name: "Hydrogen Collector V",
            done() {
                return player.H.points.gte(1e10)
            },
            tooltip: "Reach 1e10 Hydrogen."
        },
        26: {
            name: "Hydrogen Collector VI",
            done() {
                return player.H.points.gte(1e13)
            },
            tooltip: "Reach 1e13 Hydrogen."
        },
        27: {
            name: "Hydrogen Collector VII",
            done() {
                return player.H.points.gte(1e16)
            },
            tooltip: "Reach 1e16 Hydrogen."
        },
        31: {
            name: "Helium Collector I",
            done() {
                return player.He.points.gt(0)
            },
            tooltip: "Begin the generation of Helium."
        },
        32: {
            name: "Helium Collector II",
            done() {
                return player.He.points.gte(10)
            },
            tooltip: "Reach 10 Helium."
        },
        33: {
            name: "Helium Collector III",
            done() {
                return player.He.points.gte(1e4)
            },
            tooltip: "Reach 10,000 Helium."
        },
        34: {
            name: "Helium Collector IV",
            done() {
                return player.He.points.gte(1e7)
            },
            tooltip: "Reach 10,000,000 Helium."
        },
        35: {
            name: "Helium Collector V",
            done() {
                return player.He.points.gte(1e10)
            },
            tooltip: "Reach 1e10 Helium."
        },
        36: {
            name: "Helium Collector VI",
            done() {
                return player.He.points.gte(1e13)
            },
            tooltip: "Reach 1e13 Helium."
        },
        37: {
            name: "Helium Collector VII",
            done() {
                return player.He.points.gte(1e16)
            },
            tooltip: "Reach 1e16 Helium."
        },
    },
    update(diff) {
        player.ach.points = new Decimal(player.ach.achievements.length)
    },
    layerShown() {
        return true
    },
    doReset(resettingLayer) {
		let keep = []
        if (layers[resettingLayer].row > layers[this.layer].row)
        {
            layerDataReset(this.layer, keep)
        }
	},
})