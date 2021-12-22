// LAYER 2: MICROWAVES
//
// ADDED IN 0.20
addLayer("micro", {
    name: "Microwaves", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        ps: new Decimal(0),
        order: new Decimal(2),
        maxReset: new Decimal(0),
    }},
    color: "#66cccc",
    resource: "Microwaves", // Name of prestige currency
    baseResource: "Radio Waves",
    baseAmount() {
        return player.radio.points
    },
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires: new Decimal(1000),
    row: 1, // Row the layer is in on the tree (0 is the first row)
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    displayRow: 0,
    exponent() {
        let exp = new Decimal(1).div(7)
        return exp
    },
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    onPrestige(gain) {
        player.micro.maxReset = player.micro.maxReset.max(gain)
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
        "Challenges": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "challenges",
            ],
            unlocked() {
                return hasUpgrade("micro", 14)
            },
        },
    },
    upgrades: {
        11: {
            title: "[11]",
            description: "Unspent Microwaves boost Energy gain.",
            cost: new Decimal(1),
            effect() {
                return player.micro.points.add(2)
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
        12: {
            title: "[12]",
            description: "Achievements boost Energy gain.",
            cost: new Decimal(2),
            effect() {
                return new Decimal(2).pow(player.ach.points.div(8))
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
        13: {
            title: "[13]",
            description: "Unspent Microwaves boost Radio Waves gain.",
            cost: new Decimal(3),
            effect() {
                return player.micro.points.add(1).pow(0.5).add(1)
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
        14: {
            title: "[14]",
            description: "Unlock Microwave Challenges.",
            cost: new Decimal(7),
            unlocked() {
                return true
            },
            canAfford() {
                return true
            }
        },
    },
    challenges: {
        11: {
            name: "Microwave Challenge 1",
            challengeDescription: "Energy production is 99% weaker.",
            goalDescription: "1.79e308 Radio Waves",
            canComplete() {
                return player.radio.points.gte("1.79e308")
            },
            rewardDescription: "Unlock a new Microwave Upgrade.",
        },
    },
    hotkeys: [
        {
            key: 'm',
            description: 'M: Reset for Microwaves',
            unlocked: true,
            onPress() {
			    if (canReset(this.layer)) doReset(this.layer)
		    },
        },
    ],
    layerShown(){
        return player.radio.best.gte(500) || player.micro.unlocked
    },
})