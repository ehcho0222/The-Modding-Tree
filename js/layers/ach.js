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
    color: "#ffc040",
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
            name: "You've Gotta Start Somewhere",
            done() {
                return hasUpgrade('energy', 11)
            },
            tooltip: "Begin the generation of Matter.",
        },
        12: {
            name: "Another Upgrade",
            done() {
                return hasUpgrade('energy', 21) || hasUpgrade('energy', 22)
            },
            tooltip: "Have any row 2 Energy Upgrade.",
        },
        13: {
            name: "The Last Row",
            done() {
                return hasUpgrade('energy', 31) || hasUpgrade('energy', 32) || hasUpgrade('energy', 33)
            },
            tooltip: "Have any row 3 Energy Upgrade.",
        },
        14: {
            name: "Triple Counter",
            done() {
                return player.energy.maxReset.gte(3)
            },
            tooltip: "Gain at least 3 Energy in one reset. Reward: Gain 50% more Energy.",
        },
        15: {
            name: "50 Energy is a Lot",
            done() {
                return player.energy.points.gte(50)
            },
            tooltip: "Reach 50 Energy. Reward: Production nerf based on Matter is 40% weaker.",
        },
        16: {
            name: "Let There be Light",
            done() {
                return player.photon.points.gte(1)
            },
            tooltip: "Reset for Photons. Reward: Production nerf based on Matter is 16.7% weaker.",
        },
    },
    updatePoints() {
        player.ach.points = new Decimal(player.ach.achievements.length)
    },
    layerShown(){
        return true
    },
})