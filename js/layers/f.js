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
        text = text + "</b> Fans<br>Next at "
        if (player.points.lt(new Decimal("1e120")))
        {
            text = text + format(tmp.f.getNextAt)
        }
        else
        {
            text = text + "Infinity"
        }
        text = text + " Popularity"
        return text
    },
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    getResetGain() {
        let gain = new Decimal(1)
        if (hasUpgrade('f', 14)) gain = gain.times(upgradeEffect('f', 14))
        if (hasUpgrade('f', 24)) gain = gain.times(upgradeEffect('f', 24))
        return gain
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    canReset() {
        return player.f.cd.lte(0) && player.points.gte(new Decimal("1e120"))
    },
    getNextAt() {
        if (player.points.lt(new Decimal("1e120"))) return new Decimal("1e120")
        return new Decimal("e998244353")
    },
    prestigeNotify() {
        return player.f.cd.lte(0) && player.points.gte(new Decimal("1e120"))
    },
    onPrestige(gain) {
        player.f.cd = player.f.maxcd
    },
    branches: ['money'],
    tabFormat: [
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
                return 'There is a '+formatWhole(player.f.maxcd)+'-second cooldown of resetting for Fans.' 
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
        "blank",
        "upgrades",
    ],
    effect() {
        let mult = new Decimal(1)
        let power = new Decimal(1.5)
        if (hasUpgrade('f', 11)) power = power.times(2)
        if (hasUpgrade('f', 12)) mult = mult.times(upgradeEffect('f', 12))
        let x = player.f.points.add(1).pow(power).times(mult)
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
                return player.money.best.add(1).log(10).add(1).log(10).ceil()
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
            description: "Fans cooldown is halved.",
            cost() {
                return new Decimal(15)
            },
            unlocked() {
                return hasUpgrade('f', 11)
            },
        },
        22: {
            title: "Official Fan Club Status",
            description: "Fans cooldown is reduced by 60%.",
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
            title: "Cross Promotion",
            description: "Fans gain is increased based on ceil(log5(log5(Popular-ity))).",
            cost() {
                return new Decimal(100)
            },
            effect() {
                return player.points.add(1).log(5).add(1).log(5).ceil()
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
            description: "<b>Album Promotion</b>is stronger based on the best number of Fans.",
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
    },
    layerShown(){
        return player.money.best.gte(new Decimal("1.79e308"))
    },
    resetsNothing() {
        return hasMilestone('f', 2) && player.f.auto
    },
    calculateMaxCD() {
        let time = new Decimal(15)
        if (hasUpgrade('f', 21)) time = time.times(0.5)
        if (hasUpgrade('f', 22)) time = time.times(0.4)
        player.f.maxcd = time
    },
    update(diff) {
        if (player.f.cd.gt(0)) player.f.cd = player.f.cd.sub(diff)
        if (player.f.best.lt(player.f.points)) player.f.best = player.f.points
    },
    autoPrestige() {
        return hasMilestone('f', 1)
    },
    doReset(resettingLayer) {
		let keep = []
		//if (layers[resettingLayer].id = '') layerDataReset("money", keep)
	},
})