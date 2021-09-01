addLayer("b", {
    name: "Bitcoin", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "₿", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        gain: new Decimal(1),
    }},
    color: "#CBA901",
    resource: "Bitcoin", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "blank",
                "clickables"
            ],
        },
    },
    clickables: {
        11: {
            display() {
                let text = ""
                text = text + "Click to get <b>+"
                text = text + player.b.gain
                text = text + "</b> Bitcoin"
                return text
            },
            canClick() {
                return true
            },
            onClick() {
                player.b.points = player.b.points.add(player.b.gain)
            },
            unlocked() {
                return true
            },
        },
    },
    layerShown(){
        return true
    },
})
