// SPECIAL LAYER: ACHIEVEMENTS
//
// ADDED IN 0.01
addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🏆", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffcc00",
    resource: "Achievements Earned", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tooltip: "",
    tabFormat: {
        "Achievements": {
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
    },
    update(diff) {
        player.ach.points = new Decimal(player.ach.achievements.length)
    },
    layerShown() {
        return true
    },
})