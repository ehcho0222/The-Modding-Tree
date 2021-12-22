// LAYER 1: RADIO WAVES
//
// ADDED IN 0.20
addLayer("radio", {
    name: "Radio Waves", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        ps: new Decimal(0),
        order: new Decimal(1),
        maxReset: new Decimal(0),
    }},
    color: "#cc6600",
    resource: "Radio Waves", // Name of prestige currency
    baseResource: "Energy",
    baseAmount() {
        return player.points
    },
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(1),
    row: 0, // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    exponent() {
        let exp = new Decimal(0.125)
        if (hasUpgrade("radio", 21)) exp = new Decimal(0.2)
        return exp
    },
    gainMult() {
        let mult = new Decimal(1)
        if (hasAchievement("ach", 13)) mult = mult.times(4)
        if (hasAchievement("ach", 15)) mult = mult.times(2)
        if (hasUpgrade("micro", 13)) mult = mult.times(upgradeEffect("micro", 13))
        return mult
    },
    onPrestige(gain) {
        player.radio.maxReset = player.radio.maxReset.max(gain)
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
    upgrades: {
        11: {
            title: "[11]",
            description: "Increase base Energy gain by 0.033.",
            cost: new Decimal(1),
            unlocked() {
                return true
            },
            canAfford() {
                return true
            }
        },
        12: {
            title: "[12]",
            description: "Increase Energy gain by 50%.",
            cost: new Decimal(1),
            unlocked() {
                return true
            },
            canAfford() {
                return true
            }
        },
        13: {
            title: "[13]",
            description: "Unspent Radio Waves boost Energy gain.",
            cost: new Decimal(2),
            effect() {
                return player.radio.points.add(2).log(5).add(1)
            },
            effectDisplay() {
                return "x"+format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {
                return true
            },
            canAfford() {
                return true
            }
        },
        21: {
            title: "[21]",
            description: "Improve Radio Waves gain formula.",
            cost: new Decimal(3),
            effectDisplay() {
                return "^0.125 -> ^0.2"
            },
            unlocked() {
                return true
            },
            canAfford() {
                return hasUpgrade("radio", 11)
            }
        },
        22: {
            title: "[22]",
            description: "Double Energy gain.",
            cost: new Decimal(13),
            unlocked() {
                return true
            },
            canAfford() {
                return hasUpgrade("radio", 12)
            }
        },
        23: {
            title: "[23]",
            description: "Unspent Energy boosts Energy gain.",
            cost: new Decimal(118),
            effect() {
                return player.points.add(1).log(2).add(1)
            },
            effectDisplay() {
                return "x"+format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {
                return true
            },
            canAfford() {
                return hasUpgrade("radio", 13)
            }
        },
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
        {
            key: 'w',
            description: 'W: Reset for Radio Waves',
            unlocked: true,
            onPress() {
			    if (canReset(this.layer)) doReset(this.layer)
		    },
        },
    ],
    layerShown(){
        return true
    },
})