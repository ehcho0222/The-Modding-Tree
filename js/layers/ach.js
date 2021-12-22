// SPECIAL LAYER: ACHIEVEMENTS
//
// ADDED IN 0.20
addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ach", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffcc33",
    resource: "Achievements", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    tabFormat: [
        "main-display",
        "blank",
        "achievements"
    ],
    tooltip() {
        return player.ach.points+" Achievements Earned"
    },
    achievements: {
        11: {
            name: "First Upgrade",
            done() {
                return player.radio.upgrades.length >= 1
            },
            tooltip: "Buy a Radio Waves upgrade."
        },
        12: {
            name: "First Row",
            done() {
                return hasUpgrade("radio", 11) && hasUpgrade("radio", 12) && hasUpgrade("radio", 13)
            },
            tooltip: "Buy all first row Radio Waves upgrades."
        },
        13: {
            name: "Formula Break",
            done() {
                return player.radio.maxReset.gte(2)
            },
            tooltip: "Get 2 or more Radio Waves in a single reset.<br>Reward: Quadruple Radio Waves gain."
        },
        14: {
            name: "100 Energy is a Lot",
            done() {
                return player.points.gte(100)
            },
            tooltip: "Reach 100 Energy.<br>Reward: Triple Energy gain."
        },
        15: {
            name: "Microwave Pizza",
            done() {
                return player.micro.points.gte(1)
            },
            tooltip: "Reset for Microwaves.<br>Reward: Double Radio Waves gain."
        },
    },
    updatePoints() {
        player.ach.points = new Decimal(player.ach.achievements.length)
    },
    layerShown(){
        return true
    },
})