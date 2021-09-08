// SPECIAL LAYER: ACHIEVEMENTS
//
// ADDED IN 0.1.01
addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ACH", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffcc33",
    resource: "Achievements", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Achievements": {
            content: [
                ["display-text",
                function() { 
                    return 'You have <h2>' + player.ach.achievements.length + '</h2> Achievements' 
                },
                { 
                    "color": "#dfdfdf"
                }],
                "blank",
                "achievements",
            ],
            unlocked() {
                return true
            },
        },
        "Milestones": {
            content: [
                ["display-text",
                function() { 
                    return 'You have <h2>' + player.ach.achievements.length + '</h2> Achievements' 
                },
                { 
                    "color": "#dfdfdf"
                }],
                "blank",
                "milestones",
            ],
            unlocked() {
                return true
            },
        },
    },
    tooltip() {
        return player.ach.achievements.length + ' Achievements' 
    },
    layerShown(){
        return true
    },
    achievements: {
        11: {
            name: "You've Got to Start Somewhere",
            tooltip: "Buy a 1st Energy Generator.",
            done() {
                return player.e.gen[0].gt(0)
            },
        },
        12: {
            name: "64 Energy is a Lot",
            tooltip: "Buy a 2nd Energy Generator.",
            done() {
                return player.e.gen[1].gt(0)
            },
        },
        13: {
            name: "Generational Triad",
            tooltip: "Buy a 3rd Energy Generator.",
            done() {
                return player.e.gen[2].gt(0)
            },
        },
        14: {
            name: "L4G: Left 4 Generators",
            tooltip: "Buy a 4th Energy Generator.",
            done() {
                return player.e.gen[3].gt(0)
            },
        },
        15: {
            name: "5 Generator Energy Punch",
            tooltip: "Buy a 5th Energy Generator.",
            done() {
                return player.e.gen[4].gt(0)
            },
        },
        16: {
            name: "One for Each GFRIEND Member",
            tooltip: "Buy a 6th Energy Generator.",
            done() {
                return player.e.gen[5].gt(0)
            },
        },
        17: {
            name: "Luck Related Achievement",
            tooltip: "Buy a 7th Energy Generator.",
            done() {
                return player.e.gen[6].gt(0)
            },
        },
        18: {
            name: "The Last Generator",
            tooltip: "Buy a 8th Energy Generator.",
            done() {
                return player.e.gen[7].gt(0)
            },
        },
        21: {
            name: "Boosted",
            tooltip: "Buy a Booster.",
            done() {
                return getBuyableAmount('e', 31).gte(1)
            },
        },
        22: {
            name: "Type I Civilization",
            tooltip: "Reach 1.00e16 Energy.",
            done() {
                return player.e.points.gte(1e16)
            },
        },
        23: {
            name: "Boosted Again",
            tooltip: "Have 2 Boosters.",
            done() {
                return getBuyableAmount('e', 31).gte(2)
            },
        },
        24: {
            name: "Type II Civilization",
            tooltip: "Reach 1.00e26 Energy.",
            done() {
                return player.e.points.gte(1e26)
            },
        },
        25: {
            name: "Boosted Yet Again",
            tooltip: "Have 3 Boosters.",
            done() {
                return getBuyableAmount('e', 31).gte(3)
            },
        },
        26: {
            name: "Type III Civilization",
            tooltip: "Reach 1.00e36 Energy.",
            done() {
                return player.e.points.gte(1e36)
            },
        },
        27: {
            name: "8x8",
            tooltip: "Have 8 8th Energy Generators.",
            done() {
                return player.e.gen[7].gte(8)
            },
        },
        28: {
            name: "We Couldn't Afford 9",
            tooltip: "Have 6 Boosters.",
            done() {
                return getBuyableAmount('e', 31).gte(6)
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "10 Achievements",
            effectDescription: "Unlock Autobuyers.",
            done() {
                return player.ach.achievements.length >= 10
            },
            unlocked() {
                return true
            },
        },
    },
    doReset(resettingLayer) {
		let keep = []
		//if (layers[resettingLayer].id = '') layerDataReset("money", keep)
	},
})