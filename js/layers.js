addLayer("money", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
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
            title: "Wadiz Account",
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
            title: "Attract Investors",
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
                return new Decimal(10000).times(new Decimal(1.55).pow(x.pow(1.05)))
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
                    player[this.layer].points = player[this.layer].points.sub(this.cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let n = new Decimal(1).add(x.times(0.5))
                if (hasUpgrade('money', 25)) n = n.pow(1.25)
                return n
            },
            unlocked() {
                return hasUpgrade('money', 22)
            },
        },
        12: {
            title: "Video Ad",
            cost(x) {
                return new Decimal(160000).times(new Decimal(3.1).pow(x.pow(1.05)))
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
                    player[this.layer].points = player[this.layer].points.sub(this.cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                if (hasUpgrade('money', 34)) return new Decimal(1.3).pow(x)
                return new Decimal(1.2).pow(x)
            },
            unlocked() {
                return hasUpgrade('money', 24)
            },
        },
        13: {
            title: "Investment",
            cost(x) {
                return new Decimal(1e9).times(new Decimal(4.65).pow(x.pow(1.05)))
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
                    player[this.layer].points = player[this.layer].points.sub(this.cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let n = getBuyableAmount('money', 11).add(getBuyableAmount('money', 12))
                let m = getBuyableAmount('money', 12)
                if (!hasUpgrade('money', 32)) n = new Decimal(0)
                if (!hasUpgrade('money', 33)) m = new Decimal(0)
                return new Decimal(2).pow(x.pow(0.95)).times(new Decimal(1).add(n.times(0.1))).times(m.times(0.5).add(1))
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
        player.money.points = player.money.points.add(gain.times(diff))
    },
    automate(diff){
        if (hasMilestone('g', 2)){
          if (hasUpgrade('money', 31)) tmp.money.buyables[13].buy()
          if (hasUpgrade('money', 24)) tmp.money.buyables[12].buy()
          if (hasUpgrade('money', 22)) tmp.money.buyables[11].buy()
        }
    },
    doReset(resettingLayer) {
		let keep = []
		//if (layers[resettingLayer].id = '') layerDataReset("money", keep)
	},
})
addLayer("g", {
    name: "GFRIEND Songs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        views: new Decimal(0),
        subs: new Decimal(0),
    }},
    color: "#f1f0ec",
    requires: new Decimal(1e30),
    resource: "GFRIEND Songs", // Name of prestige currency
    baseResource: "Money",
    baseAmount() {
        return player.money.points
    },
    resetDescription: "Reset Popularity to produce ",
    exponent: new Decimal(2),
    base: new Decimal(1000),
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ['money'],
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text",
                    function() { 
                        return 'Money is reduced by the requirement when producing GFRIEND Songs.' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() { 
                        return 'You have ' + format(player.points) + ' Popularity' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() { 
                        return 'You have ' + format(player.money.points) + ' Money' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                "milestones",
            ],
        },
        "Streaming": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                ["display-text",
                    function() { 
                        return 'You have ' + format(player.points) + ' Popularity' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() { 
                        return 'You have ' + format(player.money.points) + ' Money' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                ["display-text",
                    function() {
                        if (player.g.views.gte(1000)) format(player.g.views, 2)
                        return 'You have ' + format(player.g.views, 0) + ' Video Views' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() {
                        if (player.g.subs.gte(1000)) format(player.g.subs, 2)
                        return 'You have ' + format(player.g.subs, 0) + ' Subscribers' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                "upgrades",
            ],
            unlocked() {
                return hasMilestone('g', 0)
            },
        },
    },
    effect() {
        let x = new Decimal(5).pow(player.g.points)
        return x
    },
    effectDescription() {
        let text = ""
        text = text + "boosting Popularity and Money gain by <h2 style='color:"
        text = text + this.color
        text = text + "; text-shadow:"
        text = text + this.color
        text = text + " 0px 0px 10px'>"
        text = text + format(this.effect())
        text = text + "x</h2>."
        return text
    },
    milestones: {
        0: {
            requirementDescription: "2 GFRIEND Songs",
            effectDescription: "Unlock Streaming.",
            done() {
                return player.g.points.gte(2)
            },
        },
        1: {
            requirementDescription: "3 GFRIEND Songs",
            effectDescription: "5x Subscriber Gain.",
            done() {
                return player.g.points.gte(3)
            },
        },
        2: {
            requirementDescription: "4 GFRIEND Songs",
            effectDescription: "Autobuy Money buyables.",
            done() {
                return player.g.points.gte(4)
            },
        },
    },
    upgrades: { // Streaming
        11: {
            title: "Upload First Video",
            description: "Earn Views based on GFRIEND Songs.",
            cost() {
                return new Decimal(1e37)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            effect() {
                return new Decimal(3).pow(player.g.points)
            },
            effectDisplay() {
                return formatWhole(upgradeEffect(this.layer, this.id))+"/s"
            },
            unlocked() {
                return true
            },
        },
        12: {
            title: "Beg for Subscribes",
            description: "Earn Subscribers based on Views growth rate.<br>Requires 100 Views.",
            cost() {
                return new Decimal(1e40)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.views.gte(100)
            },
            effect() {
                let i = upgradeEffect('g', 11).times(0.01)
                if (hasMilestone('g', 1)) i = i.times(5)
                if (i.gt(1000))
                {
                    let j = i.div(1000)
                    j = j.pow(0.5)
                    i = j.times(1000)
                }
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"/s"
            },
            unlocked() {
                return hasUpgrade('g', 11)
            },
        },
        13: {
            title: "Promotion",
            description: "Subscribers boost Popularity gain.<br>Requires 20 Subscribers.",
            cost() {
                return new Decimal(1e43)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(20)
            },
            effect() {
                let i = player.g.subs.round().add(1)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 12)
            },
        },
        14: {
            title: "Streaming Power",
            description: "GFRIEND Songs boost Popularity gain.<br>Requires 200 Subscribers.",
            cost() {
                return new Decimal(1e49)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(200)
            },
            effect() {
                let i = new Decimal(3).pow(player.g.points)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 13)
            },
        },
        15: {
            title: "Monetization",
            description: "Views boost Money gain.<br>Requires 1,000 Subscribers and 24,000 Views.",
            cost() {
                return new Decimal(1e58)
            },
            currencyDisplayName: "Money",
            currencyInternalName: "points",
            currencyLayer: "money",
            canAfford() {
                return player.g.subs.gte(1000) && player.g.views.gte(24000)
            },
            effect() {
                let i = player.g.views.pow(0.75).add(1)
                return i
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('g', 14)
            },
        },
    },
    layerShown(){
        return hasUpgrade('money', 35) || player.g.unlocked
    },
    onPrestige() {
        player.money.points = player.money.points.sub(tmp.g.nextAt)
    },
    update(diff) {
        if (hasUpgrade('g', 11)) player.g.views = player.g.views.add(upgradeEffect('g', 11).times(diff))
        if (hasUpgrade('g', 12)) player.g.subs = player.g.subs.add(upgradeEffect('g', 12).times(diff))
    },
    doReset(resettingLayer) {
		let keep = []
		//if (layers[resettingLayer].id = '') layerDataReset("money", keep)
	},
})