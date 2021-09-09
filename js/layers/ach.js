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
            name: "We Couldn't Afford 5",
            tooltip: "Have 4 Boosters.",
            done() {
                return getBuyableAmount('e', 31).gte(4)
            },
        },
        31: {
            name: "Burning",
            tooltip: "Have 1 Fuel.",
            done() {
                return getBuyableAmount('e', 32).gte(1)
            },
        },
        32: {
            name: "This Generator is OP",
            tooltip: "Reach x1.00e16 Multiplier for the 1st Energy Generator.",
            done() {
                return player.e.genMult[0].gte(1e16)
            },
        },
        33: {
            name: "Lucky Number",
            tooltip: "Have 7 Boosters.", // 2^224
            done() {
                return getBuyableAmount('e', 31).gte(7)
            },
        },
        34: {
            name: "Double Fuel",
            tooltip: "Have 2 Fuel.", // 2^304
            done() {
                return getBuyableAmount('e', 32).gte(2)
            },
        },
        35: {
            name: "Triple Fuel",
            tooltip: "Have 3 Fuel.", // 2^528
            done() {
                return getBuyableAmount('e', 32).gte(3)
            },
        },
        36: {
            name: "Overdrive",
            tooltip: "Have 20 Boosters.", // 2^640
            done() {
                return getBuyableAmount('e', 31).gte(20)
            },
        },
        37: {
            name: "Age of Automation",
            tooltip: "Buy all Energy Generator Autobuyers.", // 2^768
            done() {
                return player.ab.upgrades.length >= 8
            },
        },
        38: {
            name: "Full Tank",
            tooltip: "Have 4 Fuel.", // 2^800
            done() {
                return getBuyableAmount('e', 32).gte(4)
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
        1: {
            requirementDescription: "13 Achievements",
            effectDescription(){
                let text = "Achievements boost the 1st Energy Generator.<br>Currently: x"
                text = text + format(new Decimal(player.ach.achievements.length).sub(9).times(9).pow(0.5))
                return text
            },
            done() {
                return player.ach.achievements.length >= 13
            },
            effect() {
                return new Decimal(player.ach.achievements.length).sub(9).times(9).pow(0.5)
                // 13 => 6x
                // 18 => 9x
                // 25 => 12x
                // 34 => 15x
                // 45 => 18x
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