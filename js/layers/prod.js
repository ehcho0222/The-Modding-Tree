addLayer("p", {
    name: "Production", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        yields: [new Decimal(2), new Decimal(8)],
        cd: [new Decimal(0), new Decimal(0)],
        maxcd: [new Decimal(2), new Decimal(6)],
    }},
    color: "#00ff00",
    resource: "Production", // Name of prestige currency
    tooltip: "Production",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Production": {
            content: [
                ["display-text",
                    function() { return 'I have ' + format(player.points) + ' pointy points!' },
                    { "color": "red", "font-size": "32px", "font-family": "Comic Sans MS" }],
                "blank",
                "clickables"
            ],
        },
        "Upgrades": {
            content: [
                ["display-text",
                    function() { return 'I have ' + format(player.points) + ' pointy points!' },
                    { "color": "red", "font-size": "32px", "font-family": "Comic Sans MS" }],
                "blank",
                "upgrades"
            ],
        },
        "Milestones": {
            content: [
                ["display-text",
                    function() { return 'I have ' + format(player.points) + ' pointy points!' },
                    { "color": "red", "font-size": "32px", "font-family": "Comic Sans MS" }],
                "blank",
                "milestones"
            ],
        },
    },
    layerShown(){
        return true
    }
})
