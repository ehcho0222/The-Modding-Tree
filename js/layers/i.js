// LAYER 4: INVESTORS
//
// ADDED IN 0.30
addLayer("i", {
    name: "Investors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        order: new Decimal(4),
        resets: new Decimal(0),
    }},
    color: "#5f4b8b",
    requires: new Decimal("1e1233"),
    resource: "Investors", // Name of prestige currency
    baseResource: "Money",
    baseAmount() {
        return player.money.points
    },
    type: "normal",
    exponent() {
        return new Decimal(1).div(1024) // 2^5120 needed for the second Investor
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    branches: ['g', 'f'],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('i', 62)) mult = mult.times(upgradeEffect('i', 62))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                ["display-text",
                    function() { 
                        return 'You have reset for Investors ' + formatWhole(player.i.resets) + ' times' 
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
        "Upgrades": {
            content: [
                "main-display",
                "blank",
                ["row", [["upgrade", 11]]],
                "blank",
                ["row", [["upgrade", 21], ["upgrade", 22]]],
                "blank",
                ["row", [["upgrade", 31]]],
                "blank",
                ["row", [["upgrade", 41], ["upgrade", 42]]],
                "blank",
                ["row", [["upgrade", 51]]],
                "blank",
                ["row", [["upgrade", 61], ["upgrade", 62]]],
                "blank",
                ["row", [["upgrade", 71]]],
                "blank",
                ["row", [["upgrade", 81], ["upgrade", 82]]],
                "blank",
                ["row", [["upgrade", 91], ["upgrade", 92], ["upgrade", 93]]],
                "blank",
                ["row", [["upgrade", 101], ["upgrade", 102]]],
                "blank",
                ["row", [["upgrade", 111]]],
            ],
            unlocked() {
                return true
            },
        },
        "Challenges": {
            content: [
                "main-display",
                "blank",
                "challenges",
            ],
            unlocked() {
                return hasMilestone('i', 9)
            },
        },
    },
    effect() {
        let mult = player.i.resets.add(2).log(2)
        let amt = player.i.total
        let power = new Decimal(2)
        if (hasUpgrade('i', 92)) power = power.add(0.5)
        if (hasUpgrade('i', 101)) power = power.add(0.5)
        let x = amt.add(1).pow(power).times(mult)
        return x
    },
    effectDescription() {
        let text = ""
        text = text + "multiplying Popularity, Money and Fans gain by <h2 style='color:"
        text = text + this.color
        text = text + "; text-shadow:"
        text = text + this.color
        text = text + " 0px 0px 10px'>"
        text = text + format(this.effect())
        text = text + "x</h2>."
        return text
    },
    onPrestige(gain) {
        player.i.resets = player.i.resets.add(1)
    },
    milestones: {
        0: {
            requirementDescription: "1 Investor Reset",
            effectDescription: "6x Views gain.",
            done() {
                return player.i.resets.gte(1)
            },
        },
        1: {
            requirementDescription: "2 Investor Resets",
            effectDescription: "Keep 2 Money upgrades for every Investor reset.",
            done() {
                return player.i.resets.gte(2)
            },
        },
        2: {
            requirementDescription: "3 Investor Resets",
            effectDescription: "Triple Album Sales gain.",
            done() {
                return player.i.resets.gte(3)
            },
        },
        3: {
            requirementDescription: "4 Investor Resets",
            effectDescription: "You can automatically produce GFRIEND Songs.",
            done() {
                return player.i.resets.gte(4)
            },
            toggles: [['g', 'auto']]
        },
        4: {
            requirementDescription: "5 Investor Resets",
            effectDescription: "Keep the 3rd GFRIEND Songs Milestone on Investor reset.",
            done() {
                return player.i.resets.gte(5)
            },
        },
        5: {
            requirementDescription: "6 Investor Resets",
            effectDescription: "You can autobuy GFRIEND Songs Buyables.",
            done() {
                return player.i.resets.gte(6)
            },
            toggles: [['g', 'auto1'], ['g', 'auto2']]
        },
        6: {
            requirementDescription: "7 Investor Resets",
            effectDescription: "Keep Fans Milestones on Investor reset.",
            done() {
                return player.i.resets.gte(7)
            },
        },
        7: {
            requirementDescription: "8 Investor Resets",
            effectDescription: "Money buyables don't cost anything.",
            done() {
                return player.i.resets.gte(8)
            },
        },
        8: {
            requirementDescription: "9 Investor Resets",
            effectDescription: "Keep a row of Fans upgrades for every 5 Investor resets.",
            done() {
                return player.i.resets.gte(9)
            },
        },
        9: {
            requirementDescription: "10 Investor Resets",
            effectDescription: "Unlock Investor Challenges.",
            done() {
                return player.i.resets.gte(10)
            },
        },
    },
    upgrades: {
        11: {
            title: "Streaming Investment",
            description: "Investors boost Video Views at a reduced rate.",
            cost() {
                return new Decimal(3)
            },
            effect() {
                let amt = player.i.total
                let x = amt.add(1).pow(1.5)
                return x
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return true
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        21: {
            title: "Advanced Streaming Investment",
            description: "Quadruple Subscriber Gain.",
            cost() {
                return new Decimal(6)
            },
            effect() {
                let x = new Decimal(4)
                return x
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return true
            },
            branches: [11],
            canAfford() {
                return hasUpgrade('i', 11)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        22: {
            title: "Advertisement Research",
            description: "Cube <b>Banner Ad</b> effect.",
            cost() {
                return new Decimal(6)
            },
            unlocked() {
                return true
            },
            branches: [11],
            canAfford() {
                return hasUpgrade('i', 11)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        31: {
            title: "Challenge 1",
            description: "Unlock an Investor Challenge.",
            cost() {
                return new Decimal(12)
            },
            unlocked() {
                return hasMilestone('i', 9)
            },
            branches: [21, 22],
            canAfford() {
                return hasUpgrade('i', 21) && hasUpgrade('i', 22)
            },
            style: {
                "min-height": "96px",
                "width": "192px",
                "font-size": "12px",
                "border-radius": "12.5%",
            },
        },
        41: {
            title: "Fan Club Investment",
            description: "Fans cooldown is at most 1 second.",
            cost() {
                return new Decimal(24)
            },
            unlocked() {
                return hasChallenge('i', 11)
            },
            branches: [31],
            canAfford() {
                return hasChallenge('i', 11)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        42: {
            title: "Advanced Advertisement Research",
            description: "Add 0.085 to <b>Video Ad</b> effect base.",
            cost() {
                return new Decimal(24)
            },
            unlocked() {
                return hasChallenge('i', 11)
            },
            branches: [31],
            canAfford() {
                return hasChallenge('i', 11)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        51: {
            title: "Challenge 2",
            description: "Unlock an Investor Challenge.",
            cost() {
                return new Decimal(48)
            },
            unlocked() {
                return hasChallenge('i', 11)
            },
            branches: [41, 42],
            canAfford() {
                return hasUpgrade('i', 41) && hasUpgrade('i', 42)
            },
            style: {
                "min-height": "96px",
                "width": "192px",
                "font-size": "12px",
                "border-radius": "12.5%",
            },
        },
        61: {
            title: "Advanced Fan Club Investment",
            description: "Multiply Fans gain by the number of Investor Upgrades.",
            cost() {
                return new Decimal(96)
            },
            effect() {
                let x = new Decimal(player.i.upgrades.length)
                if (x.lte(0)) x = new Decimal(1)
                return x
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasChallenge('i', 12)
            },
            branches: [51],
            canAfford() {
                return hasChallenge('i', 12)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        62: {
            title: "Investing Hub",
            description: "Challenge completions boost Investor gain.",
            cost() {
                return new Decimal(96)
            },
            effect() {
                let x = new Decimal(1)
                if (hasChallenge('i', 11)) x = x.add(1)
                if (hasChallenge('i', 12)) x = x.add(3)
                x = x.pow(0.5).times(2)
                return x
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id))+"x"
            },
            unlocked() {
                return hasChallenge('i', 12)
            },
            branches: [51],
            canAfford() {
                return hasChallenge('i', 12)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        71: {
            title: "Challenge 3",
            description: "Unlock an Investor Challenge.",
            cost() {
                return new Decimal(384)
            },
            unlocked() {
                return hasChallenge('i', 12)
            },
            branches: [61, 62],
            canAfford() {
                return hasUpgrade('i', 61) && hasUpgrade('i', 62)
            },
            style: {
                "min-height": "96px",
                "width": "192px",
                "font-size": "12px",
                "border-radius": "12.5%",
            },
        },
        81: {
            title: "Superior Fan Club Investment",
            description: "Square Fans effect.",
            cost() {
                return new Decimal(1536)
            },
            unlocked() {
                return hasChallenge('i', 21)
            },
            branches: [71],
            canAfford() {
                return hasChallenge('i', 21)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        82: {
            title: "Vault of Keeping",
            description: "Keep GFRIEND Songs milestones on reset.",
            cost() {
                return new Decimal(3072)
            },
            unlocked() {
                return hasChallenge('i', 21)
            },
            branches: [71],
            canAfford() {
                return hasChallenge('i', 21)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        91: {
            title: "Ultimate Fan Club Investment",
            description: "Raise Fans effect ^1.5.",
            cost() {
                return new Decimal(12288)
            },
            unlocked() {
                return hasChallenge('i', 21)
            },
            branches: [81],
            canAfford() {
                return hasUpgrade('i', 81)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        92: {
            title: "Very Large Scale Investment",
            description: "Add 0.5 to Investment effect exponent.",
            cost() {
                return new Decimal(49152)
            },
            unlocked() {
                return hasChallenge('i', 21)
            },
            branches: [81, 82],
            canAfford() {
                return hasUpgrade('i', 81) && hasUpgrade('i', 82)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        93: {
            title: "Ancient Robot",
            description: "Autobuy the Fans buyable.",
            cost() {
                return new Decimal(393216)
            },
            unlocked() {
                return hasChallenge('i', 21)
            },
            branches: [82],
            canAfford() {
                return hasUpgrade('i', 82)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        101: {
            title: "Super Large Scale Investment",
            description: "Add 0.5 to Investment effect exponent.",
            cost() {
                return new Decimal(3145728)
            },
            unlocked() {
                return hasChallenge('i', 21)
            },
            branches: [91, 92],
            canAfford() {
                return hasUpgrade('i', 91) && hasUpgrade('i', 92)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        102: {
            title: "Charm of Fortune",
            description: "1e100x Money gain",
            cost() {
                return new Decimal(50331648)
            },
            effect() {
                let x = new Decimal(1e100)
                return x
            },
            unlocked() {
                return hasChallenge('i', 21)
            },
            branches: [92, 93],
            canAfford() {
                return hasUpgrade('i', 92) && hasUpgrade('i', 93)
            },
            style: {
                "min-height": "128px",
                "width": "128px",
                "border-radius": "37.5%",
            },
        },
        111: {
            title: "Challenge 4",
            description: "Unlock an Investor Challenge.",
            cost() {
                return new Decimal(2.53e15)
            },
            unlocked() {
                return hasChallenge('i', 21)
            },
            branches: [101, 102],
            canAfford() {
                return hasUpgrade('i', 101) && hasUpgrade('i', 102)
            },
            style: {
                "min-height": "96px",
                "width": "192px",
                "font-size": "12px",
                "border-radius": "12.5%",
            },
        },
    },
    challenges: {
        11: {
            name: "Ad Blocker",
            challengeDescription: "<b>Banner Ad</b> buyable is useless.",
            goalDescription: "4.22e2003 Money",
            canComplete() {
                return player.money.points.gte("4.22e2003") // 6.5x
            },
            rewardDescription: "Square <b>Banner Ad</b> effect, and keep the first row of GFRIEND Songs upgrades.",
            unlocked() {
                return hasUpgrade('i', 31)
            },
        },
        12: {
            name: "Great Recession",
            challengeDescription: "<b>Investment</b> buyable is useless.",
            goalDescription: "7.56e2311 Money",
            canComplete() {
                return player.money.points.gte("7.56e2311") // 7.5x
            },
            rewardDescription: "Add 0.5 to <b>Investment</b> effect base, and keep the second row of GFRIEND Songs upgrades.",
            unlocked() {
                return hasUpgrade('i', 51)
            },
        },
        21: {
            name: "Ad Blocker Plus",
            challengeDescription: "<b>Banner Ad</b> and <b>Video Ad</b> buyables are useless.",
            goalDescription: "1.15e77 Money",
            canComplete() {
                return player.money.points.gte(1.15e77) // 0.25x
            },
            rewardDescription: "Add 0.2 to <b>Video Ad</b> effect base, and keep the third row of GFRIEND Songs upgrades.",
            unlocked() {
                return hasUpgrade('i', 71)
            },
        },
        22: {
            name: "Youtube Shut Down",
            challengeDescription: "Video Views and Subscribers are stuck at 0.",
            goalDescription: "3e21,577 Money",
            canComplete() {
                return player.money.points.gte("3.16e21577") // 70x
            },
            rewardDescription: "Get 100% of Investors gain every second.",
            unlocked() {
                return hasUpgrade('i', 111)
            },
        },
    },
    passiveGeneration() {
        return hasChallenge('i', 22)
    },
    hotkeys: [
        {
            key: 'i',
            description: 'I: Reset for Investors',
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
        return player.money.best.gte(new Decimal("1e1233")) || player.i.unlocked
    },
    doReset(resettingLayer) {
		let keep = []
		if (player[resettingLayer].order.gte(5)) layerDataReset("i", keep)
	},
})