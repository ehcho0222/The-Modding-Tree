// LAYER 1: MAIN
//
// ADDED IN 1.0
addLayer("main", {
    name: "Main", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💰", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0)
    }},
    color: "#ffffff",
    resource: "Main Points", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tooltip: "",
    tabFormat: {
        "Shop": {
            content: [
                "buyables"
            ],
            unlocked() {
                return true
            },
        },
        "Death": {
            content: [
                "clickables"
            ],
            unlocked() {
                return true
            },
        },
    },
    layerShown() {
        return true
    },
})