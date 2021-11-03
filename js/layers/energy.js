// LAYER 1: MONEY
//
// ADDED IN 0.20
addLayer("energy", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(1),
        ps: new Decimal(0),
        order: new Decimal(1),
        maxReset: new Decimal(0),
        nerfExp: new Decimal(0.5),
    }},
    color: "#ba693b",
    resource: "Energy", // Name of prestige currency
    baseResource: "Matter",
    baseAmount() {
        return player.points
    },
    requires: new Decimal(1),
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2,
    row: 0, // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('energy', 31)) mult = mult.times(upgradeEffect('energy', 31))
        if (hasUpgrade('energy', 32)) mult = mult.times(upgradeEffect('energy', 32))
        if (hasUpgrade('energy', 33)) mult = mult.times(upgradeEffect('energy', 33))
        if (hasAchievement('ach', 14)) mult = mult.times(1.5)
        return mult
    },
    onPrestige(gain) {
        player.energy.maxReset = player.energy.maxReset.max(gain)
    },
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text", 
                    function() {
                        return "Current Matter is dividing Matter gain by "+format(player.points.add(1).pow(player.energy.nerfExp))
                    }
                ],
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
            key: 'ctrl+s',
            description: 'Ctrl+S: Save the game',
            unlocked: true,
            onPress() {
			    save(true)
		    },
        },
        {
            key: 'e',
            description: 'E: Reset for Energy',
            unlocked: true,
            onPress() {
			    if (canReset(this.layer)) doReset(this.layer)
		    },
        },
    ],
    upgrades: {
        11: {
            title: "[11]",
            description: "Gain 0.1 Matter per Energy upgrade per second.",
            cost() {
                return new Decimal(0)
            },
            effect() {
                return new Decimal(0.1).times(player.energy.upgrades.length)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"/s"
            },
            unlocked() {
                return true
            },
        },
        21: {
            title: "[21]",
            description: "Bonus to Matter gain that increases with more Matter.<br>Buying this upgrade multiplies upgrade 22 cost by 99.",
            // x2 (at 0 Matter) - x17 (at 1e15 Matter)
            cost() {
                if (hasUpgrade('energy', 22)) return new Decimal(99)
                return new Decimal(1)
            },
            effect() {
                return player.points.add(1).log(10).add(2).min(17)
            },
            effectDisplay() {
                return "x"+format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {
                return hasUpgrade('energy', 11)
            },
        },
        22: {
            title: "[22]",
            description: "Bonus to Matter gain that decreases with more Matter.<br>Buying this upgrade multiplies upgrade 21 cost by 99.",
            // x6 (at 0 Matter) - x2 (at 1e8 Matter)
            cost() {
                if (hasUpgrade('energy', 21)) return new Decimal(99)
                return new Decimal(1)
            },
            effect() {
                return player.points.add(1).log(10).times(-0.5).add(6).max(2)
            },
            effectDisplay() {
                return "x"+format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {
                return hasUpgrade('energy', 11)
            },
        },
        31: {
            title: "[31]",
            description: "Bonus to Energy gain that increases with more Energy.<br>Buying this upgrade multiplies upgrades 32 and 33 costs by 99.",
            // x1.1 (at 0 Energy) - x1.9 (at 1e6 Energy)
            cost() {
                let cost = new Decimal(26)
                if (hasUpgrade('energy', 32)) cost = cost.times(99)
                if (hasUpgrade('energy', 33)) cost = cost.times(99)
                return cost
            },
            effect() {
                return player.energy.points.add(1).log(10).div(3).times(0.4).add(1.1)
            },
            effectDisplay() {
                return "x"+format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {
                return hasUpgrade('energy', 21) || hasUpgrade('energy', 22)
            },
        },
        32: {
            title: "[32]",
            description: "Gain 50% more Energy.<br>Buying this upgrade multiplies upgrades 31 and 33 costs by 99.",
            cost() {
                let cost = new Decimal(26)
                if (hasUpgrade('energy', 31)) cost = cost.times(99)
                if (hasUpgrade('energy', 33)) cost = cost.times(99)
                return cost
            },
            effect() {
                return new Decimal(1.5)
            },
            effectDisplay() {
                return "x"+format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {
                return hasUpgrade('energy', 21) || hasUpgrade('energy', 22)
            },
        },
        33: {
            title: "[33]",
            description: "Bonus to Energy gain that decreases with more Energy.<br>Buying this upgrade multiplies upgrades 31 and 32 costs by 99.",
            // x1.9 (at 0 Energy) - x1.1 (at 1e6 Energy)
            cost() {
                let cost = new Decimal(26)
                if (hasUpgrade('energy', 31)) cost = cost.times(99)
                if (hasUpgrade('energy', 32)) cost = cost.times(99)
                return cost
            },
            effect() {
                return player.energy.points.add(1).log(10).div(3).times(-0.4).add(1.9)
            },
            effectDisplay() {
                return "x"+format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {
                return hasUpgrade('energy', 21) || hasUpgrade('energy', 22)
            },
        },
    },
    update(diff) {
        player.energy.nerfExp = new Decimal(0.5)
        if (hasAchievement('ach', 15)) player.energy.nerfExp = new Decimal(0.3)
        if (hasAchievement('ach', 16)) player.energy.nerfExp = new Decimal(0.25)
    },
    layerShown(){
        return true
    },
})