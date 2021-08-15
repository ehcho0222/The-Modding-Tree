// LAYER 1: MONEY
//
// ADDED IN 0.20
addLayer("money", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
        best: new Decimal(1),
        ps: new Decimal(0),
        auto: false,
        auto1: false,
        auto2: false,
        order: new Decimal(1),
    }},
    color: "#5fad70",
    resource: "Money", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: [
        ["main-display", 2],
        "blank",
        ["display-text",
        function() { 
            return 'You are earning ' + format(player.money.ps) + ' Money per second' 
        },
        { 
            "color": "#dfdfdf"
        }],
        "blank",
        ["display-text",
            function() { 
                return 'You have ' + format(player.points) + ' Popularity' 
            },
            { 
                "color": "#dfdfdf"
            }],
        "blank",
        "buyables",
        "blank",
        "upgrades",
    ],
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
    upgrades: {
        11: {
            title: "Begin",
            description: "Earn Money based on Popularity.",
            cost() {
                return new Decimal(1)
            },
            effect() {
                return player.points.times(0.1)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"/s"
            },
            unlocked() {
                return true
            },
        },
        12: {
            title: "Youtube Account",
            description: "Gain 0.05 Popularity per second.",
            cost() {
                return new Decimal(2)
            },
            effect() {
                return new Decimal(0.05)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"/s"
            },
            unlocked() {
                return hasUpgrade('money', 11)
            },
        },
        13: {
            title: "Funding Site",
            description: "Money gain is multiplied by the number of Money upgrades bought plus 1.16.",
            cost() {
                return new Decimal(10)
            },
            effect() {
                return new Decimal(player.money.upgrades.length).add(1.16)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('money', 12)
            },
        },
        14: {
            title: "External Funding Site",
            description: "Popularity gain is multiplied by the number of Money upgrades bought plus 1.16.",
            cost() {
                return new Decimal(100)
            },
            effect() {
                return new Decimal(player.money.upgrades.length).add(1.16)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('money', 13)
            },
        },
        15: {
            title: "Campaign",
            description: "Popularity gain is multiplied x1.5 for every Money upgrade bought.",
            cost() {
                return new Decimal(1000)
            },
            effect() {
                return new Decimal(1.5).pow(player.money.upgrades.length)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('money', 14)
            },
        },
        21: {
            title: "Yet Another Popularity Upgrade",
            description: "Popularity gain is raised ^1.025 for every Money upgrade bought, if it is above 1.",
            cost() {
                return new Decimal(5000)
            },
            effect() {
                return new Decimal(1.025).pow(player.money.upgrades.length)
            },
            effectDisplay() {
                return "^"+format(upgradeEffect(this.layer, this.id))
            },
            unlocked() {
                return hasUpgrade('money', 15)
            },
        },
        22: {
            title: "Advertising I",
            description: "Unlock the first Money buyable.",
            cost() {
                return new Decimal(15000)
            },
            unlocked() {
                return hasUpgrade('money', 21)
            },
        },
        23: {
            title: "Advertising II",
            description: "<b>Banner Ad</b> also boosts Money gain.",
            cost() {
                return new Decimal(50000)
            },
            unlocked() {
                return hasUpgrade('money', 22)
            },
        },
        24: {
            title: "Advertising III",
            description: "Unlock the second Money buyable.",
            cost() {
                return new Decimal(250000)
            },
            unlocked() {
                return hasUpgrade('money', 23)
            },
        },
        25: {
            title: "Advertising IV",
            description: "<b>Banner Ad</b> effect is raised ^1.25.",
            cost() {
                return new Decimal(5e7)
            },
            unlocked() {
                return hasUpgrade('money', 24)
            },
        },
        31: {
            title: "Found a Business",
            description: "Unlock the third Money buyable.",
            cost() {
                return new Decimal(1e9)
            },
            unlocked() {
                return hasUpgrade('money', 25)
            },
        },
        32: {
            title: "Large Scale Investment",
            description: "<b>Investment</b> is stronger based on the levels of <b>Banner Ad</b> and <b>Video Ad</b> buyables.",
            cost() {
                return new Decimal(4e10)
            },
            unlocked() {
                return hasUpgrade('money', 31)
            },
        },
        33: {
            title: "Conceptualize",
            description: "<b>Video Ad</b> levels directly boost <b>Investment</b>.",
            cost() {
                return new Decimal(1e16) // GFRIEND debut 2015.1.16
            },
            unlocked() {
                return hasUpgrade('money', 32)
            },
        },
        34: {
            title: "Prepare",
            description: "<b>Video Ad</b> effect base is increased by 0.1.",
            cost() {
                return new Decimal(5e22) // GFRIEND disbandment 2021.5.22
            },
            unlocked() {
                return hasUpgrade('money', 33)
            },
        },
        35: {
            title: "Re-debut GFRIEND",
            description: "Unlock a new layer.<br>Requires 27 levels of <b>Investment</b>.",
            cost() {
                return new Decimal(1e30)
            },
            canAfford() {
                return getBuyableAmount('money', 13).gte(27)
            },
            unlocked() {
                return hasUpgrade('money', 34)
            },
        },
    },
    buyables: {
        11: {
            title: "Banner Ad",
            cost(x) {
                let n = new Decimal(10000).times(new Decimal(1.55).pow(x.pow(1.05)))
                if (x.gte(500)) n = n.pow(x.sub(399).times(0.01))
                if (x.gte(1000)) n = n.pow(x.sub(799).times(0.005))
                if (x.gte(2500)) n = n.pow(x.sub(2099).times(0.0025))
                if (x.gte(5000)) n = n.pow(x.sub(3999).times(0.001))
                if (x.gte(10000)) n = n.pow(x.sub(9849).times(0.01))
                return n
            },
            display() {
                if (hasUpgrade('money', 23)) return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('money', 11))+"<br><h3>Effect:</h3> "+format(buyableEffect('money', 11))+"x Popularity and Money gain<br><h3>Cost:</h3> "+format(tmp.money.buyables[11].cost)+" Money"
                return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('money', 11))+"<br><h3>Effect:</h3> "+format(buyableEffect('money', 11))+"x Popularity gain<br><h3>Cost:</h3> "+format(tmp.money.buyables[11].cost)+" Money"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (this.canAfford)
                {
                    if (!hasMilestone('i', 7)) player[this.layer].points = player[this.layer].points.sub(tmp[this.layer].buyables[this.id].cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let n = new Decimal(1).add(x.times(0.5))
                let exp = new Decimal(1)
                if (hasUpgrade('money', 25)) exp = new Decimal(1.25)
                if (hasUpgrade('g', 21)) exp = exp.add(upgradeEffect('g', 21))
                if (hasUpgrade('f', 44)) exp = exp.times(3)
                if (hasUpgrade('i', 22)) exp = exp.times(3)
                if (hasChallenge('i', 11)) exp = exp.times(2)
                if (inChallenge('i', 11)) n = new Decimal(1)
                if (inChallenge('i', 21)) n = new Decimal(1)
                return n.pow(exp)
            },
            unlocked() {
                return hasUpgrade('money', 22)
            },
        },
        12: {
            title: "Video Ad",
            cost(x) {
                let n = new Decimal(160000).times(new Decimal(3.1).pow(x.pow(1.05)))
                if (x.gte(500)) n = n.pow(x.sub(399).times(0.01))
                if (x.gte(1000)) n = n.pow(x.sub(799).times(0.005))
                if (x.gte(2500)) n = n.pow(x.sub(2099).times(0.0025))
                if (x.gte(5000)) n = n.pow(x.sub(3999).times(0.001))
                if (x.gte(10000)) n = n.pow(x.sub(9849).times(0.01))
                return n
            },
            display() {
                return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('money', 12))+"<br><h3>Effect:</h3> "+format(buyableEffect('money', 12))+"x Popularity and Money gain<br><h3>Cost:</h3> "+format(tmp.money.buyables[12].cost)+" Money"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (this.canAfford)
                {
                    if (!hasMilestone('i', 7)) player[this.layer].points = player[this.layer].points.sub(tmp[this.layer].buyables[this.id].cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let base = new Decimal(1.2)
                if (hasUpgrade('money', 34)) base = base.add(0.1)
                if (hasUpgrade('g', 22)) base = base.add(upgradeEffect('g', 22))
                if (hasUpgrade('g', 34)) base = base.add(0.015)
                if (hasUpgrade('f', 55)) base = base.add(0.05)
                if (hasUpgrade('i', 42)) base = base.add(0.085)
                if (hasChallenge('i', 21)) base = base.add(0.2)
                if (inChallenge('i', 21)) base = new Decimal(1)
                return base.pow(x)
            },
            unlocked() {
                return hasUpgrade('money', 24)
            },
        },
        13: {
            title: "Investment",
            cost(x) {
                let n = new Decimal(1e9).times(new Decimal(4.65).pow(x.pow(1.05)))
                if (x.gte(500)) n = n.pow(x.sub(399).times(0.01))
                if (x.gte(1000)) n = n.pow(x.sub(799).times(0.005))
                if (x.gte(2500)) n = n.pow(x.sub(2099).times(0.0025))
                if (x.gte(5000)) n = n.pow(x.sub(3999).times(0.001))
                if (x.gte(10000)) n = n.pow(x.sub(9849).times(0.01))
                return n
            },
            display() {
                return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('money', 13))+"<br><h3>Effect:</h3> "+format(buyableEffect('money', 13))+"x Money gain<br><h3>Cost:</h3> "+format(tmp.money.buyables[13].cost)+" Money"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (this.canAfford)
                {
                    if (!hasMilestone('i', 7)) player[this.layer].points = player[this.layer].points.sub(tmp[this.layer].buyables[this.id].cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let n = getBuyableAmount('money', 11).add(getBuyableAmount('money', 12))
                let m = getBuyableAmount('money', 12)
                if (!hasUpgrade('money', 32)) n = new Decimal(0)
                if (!hasUpgrade('money', 33)) m = new Decimal(0)
                let base = new Decimal(2)
                if (hasUpgrade('f', 53)) base = base.add(0.5)
                if (hasChallenge('i', 12)) base = base.add(0.5)
                if (inChallenge('i', 12)) return new Decimal(1)
                return new Decimal(base).pow(x.pow(0.95)).times(new Decimal(1).add(n.times(0.1))).times(m.times(0.5).add(1))
            },
            unlocked() {
                return hasUpgrade('money', 31)
            },
        },
    },
    layerShown(){
        return true
    },
    update(diff){
        let gain = new Decimal(0)
        if (hasUpgrade('money', 11)) gain = gain.add(upgradeEffect('money', 11))
        if (hasUpgrade('money', 13)) gain = gain.times(upgradeEffect('money', 13))
        if (hasUpgrade('money', 23)) gain = gain.times(buyableEffect('money', 11))
        gain = gain.times(buyableEffect('money', 12))
        gain = gain.times(buyableEffect('money', 13))
        if (player.g.unlocked) gain = gain.times(tmp.g.effect)
        if (hasUpgrade('g', 15)) gain = gain.times(upgradeEffect('g', 15))
        if (hasMilestone('g', 3)) gain = gain.times(player.g.salesEffect)
        if (player.f.unlocked) gain = gain.times(tmp.f.effect)
        if (player.i.unlocked) gain = gain.times(tmp.i.effect)
        if (hasUpgrade('i', 102)) gain = gain.times(upgradeEffect('i', 102))
        player.money.ps = gain
        player.money.points = player.money.points.add(gain.times(diff))
        if (player.money.best.lt(player.money.points)) player.money.best = player.money.points
    },
    automate(diff){
        let bulk = 1
        if (hasMilestone('i', 7)) bulk = 1
        if (hasMilestone('g', 2)){
            if (hasUpgrade('money', 31) && player.money.auto2)
            {
                tmp.money.buyables[13].buy()
            }
            if (hasUpgrade('money', 24) && player.money.auto1)
            {
                tmp.money.buyables[12].buy()
            }
            if (hasUpgrade('money', 22) && player.money.auto)
            {
                tmp.money.buyables[11].buy()
            }
            if (player.money.points.lt(0)) player.money.points = new Decimal(0)
        }
    },
    doReset(resettingLayer) {
		let keep = []
        let upgradesKeep = []
        keep.push("auto")
        keep.push("auto1")
        keep.push("auto2")
        if (hasMilestone('i', 1))
        {
            if (player.i.resets.gte(1))
            {
                upgradesKeep.push(11)
                upgradesKeep.push(12)
            }
            if (player.i.resets.gte(2))
            {
                upgradesKeep.push(13)
                upgradesKeep.push(14)
            }
            if (player.i.resets.gte(3))
            {
                upgradesKeep.push(15)
                upgradesKeep.push(21)
            }
            if (player.i.resets.gte(4))
            {
                upgradesKeep.push(22)
                upgradesKeep.push(23)
            }
            if (player.i.resets.gte(5))
            {
                upgradesKeep.push(24)
                upgradesKeep.push(25)
            }
            if (player.i.resets.gte(6))
            {
                upgradesKeep.push(31)
                upgradesKeep.push(32)
            }
            if (player.i.resets.gte(7))
            {
                upgradesKeep.push(33)
                upgradesKeep.push(34)
            }
            if (player.i.resets.gte(8))
            {
                upgradesKeep.push(35)
            }
        }
		if (player[resettingLayer].order.gte(4))
        {
            layerDataReset('money', keep)
            player.money.upgrades = upgradesKeep
        }
	},
})