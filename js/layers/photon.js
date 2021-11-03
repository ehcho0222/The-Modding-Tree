// LAYER 1: MONEY
//
// ADDED IN 0.20
addLayer("photon", {
    name: "Photon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(1),
        ps: new Decimal(0),
        order: new Decimal(2),
        maxReset: new Decimal(0),
    }},
    color: "#e3d1e7",
    resource: "Photons", // Name of prestige currency
    baseResource: "Energy",
    baseAmount() {
        return player.energy.points
    },
    requires: new Decimal(100),
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25,
    row: 1, // Row the layer is in on the tree (0 is the first row)
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ["energy"],
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    onPrestige(gain) {
        player.photon.maxReset = player.photon.maxReset.max(gain)
    },
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "upgrades",
            ],
            unlocked() {
                return true
            },
        },
    },
    hotkeys: [
        {
            key: 'p',
            description: 'P: Reset for Photons',
            unlocked: true,
            onPress() {
			    if (canReset(this.layer)) doReset(this.layer)
		    },
        },
    ],
    upgrades: {
        11: {
            title: "[11]",
            description: "Unspent Energy boosts Matter gain.",
            cost() {
                return new Decimal(1)
            },
            effect() {
                return player.energy.points.add(2).pow(0.25)
            },
            effectDisplay() {
                return "x"+format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {
                return true
            },
        },
    },
    layerShown(){
        return player.energy.points.gte(50) || player.photon.unlocked
    },
})