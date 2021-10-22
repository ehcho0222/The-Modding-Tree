// LAYER 1: FARM
//
// ADDED IN 0.9.0.01
addLayer("farm", {
    name: "Farm", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    tooltip: "",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#66cc66",
    resource: "Farm Points", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: [
        "blank",
    ],
    grid: {
        rows: 3,
        cols: 3,
        maxRows: 3,
        maxCols: 3,
    },
    hotkeys: [
        {
            key: 'ctrl+s',
            description: 'Ctrl+S: Save the game',
            unlocked: true,
            onPress() {
			    save(true)
		    },
        },
    ],
    layerShown(){
        return true
    },
})