// LAYER 3: FANS
//
// ADDED IN 0.25
addLayer("f", {
    name: "Fans", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        cd: new Decimal(0),
        maxcd: new Decimal(15),
        auto: false,
        order: new Decimal(3),
    }},
    color: "#00abc0",
    requires: new Decimal("1e120"),
    resource: "Fans", // Name of prestige currency
    baseResource: "Popularity",
    baseAmount() {
        return player.points
    },
    prestigeButtonText() {
        let text = "Reset Popularity for <b>+"
        if (hasMilestone('f', 2)) text = "Gain <b>+"
        text = text + formatWhole(tmp.f.getResetGain)
        text = text + "</b> Fans<br>Requires "
        text = text + format(tmp.f.getNextAt)
        text = text + " Popularity"
        return text
    },
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    getResetGain() {
        let gain = new Decimal(1)
        if (hasUpgrade('f', 14)) gain = gain.times(upgradeEffect('f', 14))
        if (hasUpgrade('f', 24)) gain = gain.times(upgradeEffect('f', 24))
        if (hasUpgrade('f', 45)) gain = gain.times(upgradeEffect('f', 45))
        if (hasUpgrade('f', 54)) gain = gain.times(upgradeEffect('f', 54))
        if (player.i.unlocked) gain = gain.times(tmp.i.effect)
        if (hasUpgrade('i', 61)) gain = gain.times(upgradeEffect('i', 61))
        return gain
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    canReset() {
        return player.f.cd.lte(0) && player.points.gte(new Decimal("1e120"))
    },
    getNextAt() {
        return new Decimal("1e120")
    },
    prestigeNotify() {
        return player.f.cd.lte(0) && player.points.gte(new Decimal("1e120"))
    },
    onPrestige(gain) {
        //calculateMaxCD()
        player.f.cd = player.f.maxcd
    },
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
                ["display-text",
                    function() { 
                        return 'There is a '+formatWhole(player.f.maxcd)+'-second cooldown when resetting for Fans.' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                ["display-text",
                    function() { 
                        return 'You can reset for Fans in '+format(player.f.cd.max(0))+' seconds.' 
                    },
                    { 
                        "color": "#dfdfdf"
                    }],
                "blank",
                "milestones",
            ],
        },
        "Upgrades": {
            content: [
                "main-display",
                "blank",
                "buyables",
                "blank",
                "upgrades",
            ],
            unlocked() {
                return hasMilestone('f', 0)
            },
        },
    },
    effect() {
        let mult = new Decimal(1)
        let power = new Decimal(1.5)
        if (hasUpgrade('f', 11)) power = power.times(2)
        if (hasUpgrade('f', 12)) mult = mult.times(upgradeEffect('f', 12))
        if (hasUpgrade('f', 32)) power = power.times(2)
        if (hasUpgrade('f', 42)) power = power.times(1.5)
        if (hasUpgrade('f', 52)) power = power.times(1.5)
        if (hasUpgrade('i', 81)) power = power.times(2)
        if (hasUpgrade('i', 91)) power = power.times(1.5)
        let x = player.f.points.add(1).pow(power).times(mult)
        if (hasMilestone('f', 3)) x = player.f.best.add(1).pow(power).times(mult)
        return x
    },
    effectDescription() {
        let text = ""
        text = text + "multiplying Popularity and Money gain by <h2 style='color:"
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
            requirementDescription: "3 Fans",
            effectDescription: "Unlock Fans Upgrades.",
            done() {
                return player.f.points.gte(3)
            },
        },
        1: {
            requirementDescription: "10 Fans",
            effectDescription: "Unlock Auto Fans Reset.",
            done() {
                return player.f.points.gte(10)
            },
            toggles: [['f', 'auto']]
        },
        2: {
            requirementDescription: "100 Fans",
            effectDescription: "Fans reset nothing.",
            done() {
                return player.f.points.gte(100)
            },
        },
        3: {
            requirementDescription: "250,000,000 Fans",
            effectDescription: "Fans effect is based on the best amount, and unlock a Fans buyable.",
            done() {
                return player.f.points.gte(2.5e8)
            },
        },
    },
    upgrades: {
        11: {
            title: "Organize Fan Club",
            description: "Square Fans effect.",
            cost() {
                return new Decimal(5)
            },
            unlocked() {
                return hasMilestone('f', 0)
            },
        },
        12: {
            title: "Fan Letters",
            description: "Fans effect is multiplied by the best number of Fans.",
            cost() {
                return new Decimal(10)
            },
            effect() {
                if (player.f.best.lte(0)) return new Decimal(1)
                return player.f.best
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('f', 11)
            },
        },
        13: {
            title: "Mass Streaming",
            description: "Video Views gain is multiplied by the cube root of the best number of Fans.",
            cost() {
                return new Decimal(10)
            },
            effect() {
                if (player.f.best.lte(0)) return new Decimal(1)
                return player.f.best.pow(new Decimal(1).div(3))
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('f', 12)
            },
        },
        14: {
            title: "Cross Promotion",
            description: "Fans gain is increased based on ceil(log10(log10(best Money))).",
            cost() {
                return new Decimal(10)
            },
            effect() {
                let logbase = new Decimal(10)
                if (hasUpgrade('f', 34)) logbase = new Decimal(2)
                let ol = logbase
                if (hasUpgrade('f', 43)) ol = new Decimal(1.1)
                return player.money.best.add(1).log(logbase).add(1).log(ol).ceil()
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('f', 13)
            },
        },
        15: {
            title: "Album Marketing II",
            description: "Album Sales gain is multiplied by the 4th root of the best number of Fans.",
            cost() {
                return new Decimal(15)
            },
            effect() {
                if (player.f.best.lte(0)) return new Decimal(1)
                return player.f.best.pow(new Decimal(1).div(4))
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('f', 14)
            },
        },
        21: {
            title: "Attract More Fans",
            description: "Fans cooldown is reduced to 7 seconds.",
            cost() {
                return new Decimal(15)
            },
            unlocked() {
                return hasUpgrade('f', 11)
            },
        },
        22: {
            title: "Official Fan Club Status",
            description: "Fans cooldown is reduced to 3 seconds.",
            cost() {
                return new Decimal(25)
            },
            unlocked() {
                return hasUpgrade('f', 12) && hasUpgrade('f', 21)
            },
        },
        23: {
            title: "Mass Streaming II",
            description: "Video Views gain is multiplied by the cube root of the reciprocal of Fans cooldown plus 1.",
            cost() {
                return new Decimal(50)
            },
            effect() {
                return player.f.maxcd.pow(-1).pow(new Decimal(1).div(3)).add(1)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('f', 13) && hasUpgrade('f', 22)
            },
        },
        24: {
            title: "Cross Promotion II",
            description: "Fans gain is increased based on ceil(log5(log5(Popular-ity))).",
            cost() {
                return new Decimal(100)
            },
            effect() {
                let logbase = new Decimal(5)
                if (hasUpgrade('f', 35)) logbase = new Decimal(1.5)
                let ol = logbase
                if (hasUpgrade('f', 43)) ol = new Decimal(1.1)
                return player.points.add(1).log(logbase).add(1).log(ol).ceil()
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('f', 14) && hasUpgrade('f', 23)
            },
        },
        25: {
            title: "Album Promotion II",
            description: "<b>Album Promotion</b> is stronger based on the best number of Fans.",
            cost() {
                return new Decimal(150)
            },
            effect() {
                return player.f.best.add(1).log(10).times(0.1).add(1)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasUpgrade('f', 15) && hasUpgrade('f', 24)
            },
        },
        31: {
            title: "Attract More Fans II",
            description: "Fans cooldown is reduced to 2 seconds.",
            cost() {
                return new Decimal(1000)
            },
            unlocked() {
                return hasUpgrade('f', 21)
            },
        },
        32: {
            title: "National Top 25 Fan Club",
            description: "Square Fans effect again.",
            cost() {
                return new Decimal(1004)
            },
            unlocked() {
                return hasUpgrade('f', 22) && hasUpgrade('f', 31)
            },
        },
        33: {
            title: "Mass Album Purchase",
            description: "Double Album Sales.",
            cost() {
                return new Decimal(1111)
            },
            effect() {
                return new Decimal(2)
            },
            unlocked() {
                return hasUpgrade('f', 23) && hasUpgrade('f', 32)
            },
        },
        34: {
            title: "Cross Promotion III",
            description: "Reduce the both log bases in <b>Cross Promotion</b> to 2.",
            cost() {
                return new Decimal(1207)
            },
            unlocked() {
                return hasUpgrade('f', 24) && hasUpgrade('f', 33)
            },
        },
        35: {
            title: "Cross Promotion IV",
            description: "Reduce the both log bases in <b>Cross Promotion II</b> to 1.5.",
            cost() {
                return new Decimal(2015)
            },
            unlocked() {
                return hasUpgrade('f', 25) && hasUpgrade('f', 34)
            },
        },
        41: {
            title: "Attract More Fans III",
            description: "Fans cooldown is reduced to 1 second.",
            cost() {
                return new Decimal(6000)
            },
            unlocked() {
                return hasUpgrade('f', 31)
            },
        },
        42: {
            title: "National Top 10 Fan Club",
            description: "Raise Fans effect ^1.5.",
            cost() {
                return new Decimal(16000)
            },
            unlocked() {
                return hasUpgrade('f', 32) && hasUpgrade('f', 41)
            },
        },
        43: {
            title: "Cross Promotion V",
            description: "Reduce the outer log bases in <b>Cross Promotion</b> and <b>Cross Promotion II</b> to 1.1.",
            cost() {
                return new Decimal(21000)
            },
            unlocked() {
                return hasUpgrade('f', 33) && hasUpgrade('f', 42)
            },
        },
        44: {
            title: "User-Created Banner Ad",
            description: "Cube <b>Banner Ad</b> effect.",
            cost() {
                return new Decimal(250000)
            },
            unlocked() {
                return hasUpgrade('f', 34) && hasUpgrade('f', 43)
            },
        },
        45: {
            title: "Attract More Fans IV",
            description: "Increase Fans gain by 1% for every Money Buyable level.",
            effect() {
                let levels = new Decimal(0)
                levels = levels.add(getBuyableAmount('money', 11))
                levels = levels.add(getBuyableAmount('money', 12))
                levels = levels.add(getBuyableAmount('money', 13))
                return levels.times(0.01).add(1)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            cost() {
                return new Decimal(500000)
            },
            unlocked() {
                return hasUpgrade('f', 35) && hasUpgrade('f', 44)
            },
        },
        51: {
            title: "Attract More Fans V",
            description: "Fans cooldown is reduced to half a second.",
            cost() {
                return new Decimal(1e7)
            },
            unlocked() {
                return hasUpgrade('f', 41)
            },
        },
        52: {
            title: "National Top 3 Fan Club",
            description: "Raise Fans effect ^1.5.",
            cost() {
                return new Decimal(1.5e7)
            },
            unlocked() {
                return hasUpgrade('f', 42) && hasUpgrade('f', 51)
            },
        },
        53: {
            title: "Fan Investments",
            description: "Increase <b>Investment</b> effect base by 0.5.",
            cost() {
                return new Decimal(2e7)
            },
            unlocked() {
                return hasUpgrade('f', 43) && hasUpgrade('f', 52)
            },
        },
        54: {
            title: "Ran Out of Ideas",
            description: "6x Fan Gain.",
            effect() {
                let levels = new Decimal(6)
                return levels
            },
            cost() {
                return new Decimal(2.5e7)
            },
            unlocked() {
                return hasUpgrade('f', 44) && hasUpgrade('f', 53)
            },
        },
        55: {
            title: "Fan-Created Video Ads",
            description: "Increase <b>Video Ad</b> effect base by 0.05.",
            cost() {
                return new Decimal(99999999)
            },
            unlocked() {
                return hasUpgrade('f', 45) && hasUpgrade('f', 54)
            },
        },
    },
    buyables: {
        11: {
            title: "Planet-spanning Fanbase",
            cost(x) {
                let n = new Decimal(33554432).times(new Decimal(2).pow(x.pow(1.025)))
                if (x.gte(10)) n = n.pow(x.sub(4).times(0.2))
                if (x.gte(20)) n = n.pow(x.sub(9).times(0.1))
                if (x.gte(30)) n = n.pow(x.sub(19).times(0.1))
                if (x.gte(40)) n = n.pow(x.sub(24).times(0.1))
                if (x.gte(50)) n = n.pow(x.sub(29).times(0.1))
                return n
            },
            display() {
                return "<h3>Level:</h3> "+formatWhole(getBuyableAmount('f', 11))+"<br><h3>Effect:</h3> +"+format(buyableEffect('f', 11))+" to GFRIEND Songs effect base<br><h3>Cost:</h3> "+format(tmp.f.buyables[11].cost)+" Fans"
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                if (this.canAfford)
                {
                    player[this.layer].points = player[this.layer].points.sub(tmp[this.layer].buyables[this.id].cost)
                    addBuyables(this.layer, this.id, 1)
                }
            },
            effect(x) {
                let base = new Decimal(50).pow(x)
                return base
            },
            unlocked() {
                return hasMilestone('f', 3)
            },
        },
    },
    hotkeys: [
        {
            key: 'f',
            description: 'F: Reset for Fans',
            unlocked: true,
            onPress() {
			    if (canReset(this.layer))
                {
                    doReset(this.layer)
                }
		    },
        },
    ],
    layerShown(){
        return player.money.best.gte(new Decimal("1.79e308")) || player.i.unlocked
    },
    resetsNothing() {
        return hasMilestone('f', 2)
    },
    calculateMaxCD() {
        let time = new Decimal(15)
        if (hasUpgrade('f', 21)) time = new Decimal(7)
        if (hasUpgrade('f', 22)) time = new Decimal(3)
        if (hasUpgrade('f', 31)) time = new Decimal(2)
        if (hasUpgrade('f', 41) || hasUpgrade('i', 41)) time = new Decimal(1)
        if (hasUpgrade('f', 51)) time = new Decimal(0.5)
        player.f.maxcd = time
    },
    automate(diff) {
        if (hasUpgrade('i', 93)) tmp.f.buyables[11].buy()
        if (player.f.points.lt(0)) player.f.points = new Decimal(0)
    },
    update(diff) {
        if (player.f.cd.gt(0)) player.f.cd = player.f.cd.sub(diff)
        if (player.f.best.lt(player.f.points)) player.f.best = player.f.points
    },
    autoPrestige() {
        return hasMilestone('f', 1) && player.f.auto
    },
    doReset(resettingLayer) {
		let keep = []
        keep.push("auto")
        let upgradesKeep = []
        if (hasMilestone('i', 8))
        {
            if (player.i.resets.gte(5))
            {
                upgradesKeep.push(11)
                upgradesKeep.push(12)
                upgradesKeep.push(13)
                upgradesKeep.push(14)
                upgradesKeep.push(15)
            }
            if (player.i.resets.gte(10))
            {
                upgradesKeep.push(21)
                upgradesKeep.push(22)
                upgradesKeep.push(23)
                upgradesKeep.push(24)
                upgradesKeep.push(25)
            }
            if (player.i.resets.gte(15))
            {
                upgradesKeep.push(31)
                upgradesKeep.push(32)
                upgradesKeep.push(33)
                upgradesKeep.push(34)
                upgradesKeep.push(35)
            }
            if (player.i.resets.gte(20))
            {
                upgradesKeep.push(41)
                upgradesKeep.push(42)
                upgradesKeep.push(43)
                upgradesKeep.push(44)
                upgradesKeep.push(45)
            }
            if (player.i.resets.gte(25))
            {
                upgradesKeep.push(51)
                upgradesKeep.push(52)
                upgradesKeep.push(53)
                upgradesKeep.push(54)
                upgradesKeep.push(55)
            }
        }
        if (hasMilestone('i', 6) && player[resettingLayer].order.eq(4)) keep.push("milestones")
		if (player[resettingLayer].order.gte(4))
        {
            layerDataReset('f', keep)
            player.f.upgrades = upgradesKeep
        }
	},
})