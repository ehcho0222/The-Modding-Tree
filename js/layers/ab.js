// SPECIAL LAYER: AUTOBUYERS
//
// ADDED IN 0.1.01
addLayer("ab", {
    name: "Autobuyers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#cccccc",
    resource: "Autobuyers", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Normal": {
            content: [
                ["display-text",
                function() { 
                    return 'These autobuyers are permanent.' 
                },
                { 
                    "color": "#dfdfdf"
                }],
                "blank",
                ["row", [["upgrade", 11],["upgrade", 12],["upgrade", 13],["upgrade", 14]]],
                ["row", [["upgrade", 21],["upgrade", 22],["upgrade", 23],["upgrade", 24]]],
            ],
            unlocked() {
                return true
            },
        },
    },
    tooltip() {
        return 'Autobuyers' 
    },
    upgrades: {
        11: {
            title: "1st Energy Generator Autobuyer",
            description: "Autobuy 1st Energy Generators.",
            cost() {
                return new Decimal(2).pow(128)
            },
            currencyDisplayName: "Energy",
            currencyInternalName: "points",
            currencyLayer: "e",
            unlocked() {
                return !hasUpgrade('ab', 11)
            },
        },
        12: {
            title: "2nd Energy Generator Autobuyer",
            description: "Autobuy 2nd Energy Generators.",
            cost() {
                return new Decimal(2).pow(192)
            },
            currencyDisplayName: "Energy",
            currencyInternalName: "points",
            currencyLayer: "e",
            unlocked() {
                return !hasUpgrade('ab', 12)
            },
        },
        13: {
            title: "3rd Energy Generator Autobuyer",
            description: "Autobuy 3rd Energy Generators.",
            cost() {
                return new Decimal(2).pow(256)
            },
            currencyDisplayName: "Energy",
            currencyInternalName: "points",
            currencyLayer: "e",
            unlocked() {
                return !hasUpgrade('ab', 13)
            },
        },
        14: {
            title: "4th Energy Generator Autobuyer",
            description: "Autobuy 4th Energy Generators.",
            cost() {
                return new Decimal(2).pow(320)
            },
            currencyDisplayName: "Energy",
            currencyInternalName: "points",
            currencyLayer: "e",
            unlocked() {
                return !hasUpgrade('ab', 14)
            },
        },
        21: {
            title: "5th Energy Generator Autobuyer",
            description: "Autobuy 5th Energy Generators.",
            cost() {
                return new Decimal(2).pow(384)
            },
            currencyDisplayName: "Energy",
            currencyInternalName: "points",
            currencyLayer: "e",
            unlocked() {
                return !hasUpgrade('ab', 21)
            },
        },
        22: {
            title: "6th Energy Generator Autobuyer",
            description: "Autobuy 6th Energy Generators.",
            cost() {
                return new Decimal(2).pow(512)
            },
            currencyDisplayName: "Energy",
            currencyInternalName: "points",
            currencyLayer: "e",
            unlocked() {
                return !hasUpgrade('ab', 22)
            },
        },
        23: {
            title: "7th Energy Generator Autobuyer",
            description: "Autobuy 7th Energy Generators.",
            cost() {
                return new Decimal(2).pow(640)
            },
            currencyDisplayName: "Energy",
            currencyInternalName: "points",
            currencyLayer: "e",
            unlocked() {
                return !hasUpgrade('ab', 23)
            },
        },
        24: {
            title: "8th Energy Generator Autobuyer",
            description: "Autobuy 8th Energy Generators.",
            cost() {
                return new Decimal(2).pow(768)
            },
            currencyDisplayName: "Energy",
            currencyInternalName: "points",
            currencyLayer: "e",
            unlocked() {
                return !hasUpgrade('ab', 24)
            },
        },
    },
    layerShown(){
        return hasMilestone('ach', 0)
    },
    doReset(resettingLayer) {
		let keep = []
		//if (layers[resettingLayer].id = '') layerDataReset("money", keep)
	},
})