// LAYER 1: ENERGY
//
// ADDED IN 0.1.01
addLayer("e", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "e", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(4),
        order: new Decimal(1),
        ps: new Decimal(0),
        gen: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        genps: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        genMult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        genCost: [new Decimal(2).pow(2), new Decimal(2).pow(6), new Decimal(2).pow(12), new Decimal(2).pow(20), new Decimal(2).pow(30), new Decimal(2).pow(42), new Decimal(2).pow(56), new Decimal(2).pow(72)],
        genCostIncr: [new Decimal(2), new Decimal(2).pow(2), new Decimal(2).pow(3), new Decimal(2).pow(4), new Decimal(2).pow(5), new Decimal(2).pow(6), new Decimal(2).pow(7), new Decimal(2).pow(8)],
        perGenMult: new Decimal(2).pow(1/8)
    }},
    color: "#ffff33",
    resource: "Energy", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Generators": {
            content: [
                ["main-display", 2],
                ["display-text",
                function() { 
                    return 'You are earning ' + format(player.e.ps) + ' Energy per second' 
                },
                { 
                    "color": "#dfdfdf"
                }],
                "blank",
                ["bar", "boostBar"],
                ["bar", "infBar"],
                "blank",
                "buyables",
            ],
            unlocked() {
                return true
            },
        },
    },
    buyables: {
        11: {
            title: "1st Energy Generator",
            cost(x) {
                return new Decimal(4).times(new Decimal(2).pow(x))
            },
            display() {
                let text = ""
                text = text + "<br><h3>Amount:</h3> "
                text = text + format(player.e.gen[0])
                text = text + " ("
                text = text + format(player.e.genps[0])
                text = text + "/s)<br><br><h3>Bought:</h3> "
                text = text + formatWhole(player.e.buyables[this.id])
                text = text + "<br><br><h3>Multiplier:</h3> "
                text = text + format(player.e.genMult[0])
                text = text + "<br><br><h3>Cost:</h3> "
                text = text + format(player.e.genCost[0])
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(player.e.genCost[0])
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(player.e.genCost[0])
                player.e.genCost[0] = player.e.genCost[0].times(player.e.genCostIncr[0])
                if (player.e.genCost[0].gte("1.79e308")) player.e.genCostIncr[0] = player.e.genCostIncr[0].times(2)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.e.gen[0] = player.e.gen[0].add(1)
                player.e.genMult[0] = player.e.genMult[0].times(player.e.perGenMult)
            },
            unlocked() {
                return true
            }
        },
        12: {
            title: "2nd Energy Generator",
            cost(x) {
                return new Decimal(64).times(new Decimal(4).pow(x))
            },
            display() {
                let text = ""
                text = text + "<br><h3>Amount:</h3> "
                text = text + format(player.e.gen[1])
                text = text + " ("
                text = text + format(player.e.genps[1])
                text = text + "/s)<br><br><h3>Bought:</h3> "
                text = text + formatWhole(player.e.buyables[this.id])
                text = text + "<br><br><h3>Multiplier:</h3> "
                text = text + format(player.e.genMult[1])
                text = text + "<br><br><h3>Cost:</h3> "
                text = text + format(player.e.genCost[1])
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(player.e.genCost[1])
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(player.e.genCost[1])
                player.e.genCost[1] = player.e.genCost[1].times(player.e.genCostIncr[1])
                if (player.e.genCost[1].gte("1.79e308")) player.e.genCostIncr[1] = player.e.genCostIncr[1].times(2)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.e.gen[1] = player.e.gen[1].add(1)
                player.e.genMult[1] = player.e.genMult[1].times(player.e.perGenMult)
            },
            unlocked() {
                return true
            }
        },
        13: {
            title: "3rd Energy Generator",
            cost(x) {
                return new Decimal(4096).times(new Decimal(8).pow(x))
            },
            display() {
                let text = ""
                text = text + "<br><h3>Amount:</h3> "
                text = text + format(player.e.gen[2])
                text = text + " ("
                text = text + format(player.e.genps[2])
                text = text + "/s)<br><br><h3>Bought:</h3> "
                text = text + formatWhole(player.e.buyables[this.id])
                text = text + "<br><br><h3>Multiplier:</h3> "
                text = text + format(player.e.genMult[2])
                text = text + "<br><br><h3>Cost:</h3> "
                text = text + format(player.e.genCost[2])
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(player.e.genCost[2])
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(player.e.genCost[2])
                player.e.genCost[2] = player.e.genCost[2].times(player.e.genCostIncr[2])
                if (player.e.genCost[2].gte("1.79e308")) player.e.genCostIncr[2] = player.e.genCostIncr[2].times(2)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.e.gen[2] = player.e.gen[2].add(1)
                player.e.genMult[2] = player.e.genMult[2].times(player.e.perGenMult)
            },
            unlocked() {
                return true
            }
        },
        14: {
            title: "4th Energy Generator",
            cost(x) {
                return new Decimal(1048576).times(new Decimal(16).pow(x))
            },
            display() {
                let text = ""
                text = text + "<br><h3>Amount:</h3> "
                text = text + format(player.e.gen[3])
                text = text + " ("
                text = text + format(player.e.genps[3])
                text = text + "/s)<br><br><h3>Bought:</h3> "
                text = text + formatWhole(player.e.buyables[this.id])
                text = text + "<br><br><h3>Multiplier:</h3> "
                text = text + format(player.e.genMult[3])
                text = text + "<br><br><h3>Cost:</h3> "
                text = text + format(player.e.genCost[3])
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(player.e.genCost[3])
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(player.e.genCost[3])
                player.e.genCost[3] = player.e.genCost[3].times(player.e.genCostIncr[3])
                if (player.e.genCost[3].gte("1.79e308")) player.e.genCostIncr[3] = player.e.genCostIncr[3].times(2)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.e.gen[3] = player.e.gen[3].add(1)
                player.e.genMult[3] = player.e.genMult[3].times(player.e.perGenMult)
            },
            unlocked() {
                return true
            }
        },
        21: {
            title: "5th Energy Generator",
            cost(x) {
                return new Decimal(2).pow(30).times(new Decimal(32).pow(x))
            },
            display() {
                let text = ""
                text = text + "<br><h3>Amount:</h3> "
                text = text + format(player.e.gen[4])
                text = text + " ("
                text = text + format(player.e.genps[4])
                text = text + "/s)<br><br><h3>Bought:</h3> "
                text = text + formatWhole(player.e.buyables[this.id])
                text = text + "<br><br><h3>Multiplier:</h3> "
                text = text + format(player.e.genMult[4])
                text = text + "<br><br><h3>Cost:</h3> "
                text = text + format(player.e.genCost[4])
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(player.e.genCost[4])
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(player.e.genCost[4])
                player.e.genCost[4] = player.e.genCost[4].times(player.e.genCostIncr[4])
                if (player.e.genCost[4].gte("1.79e308")) player.e.genCostIncr[4] = player.e.genCostIncr[4].times(2)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.e.gen[4] = player.e.gen[4].add(1)
                player.e.genMult[4] = player.e.genMult[4].times(player.e.perGenMult)
            },
            unlocked() {
                return true
            }
        },
        22: {
            title: "6th Energy Generator",
            cost(x) {
                return new Decimal(2).pow(42).times(new Decimal(64).pow(x))
            },
            display() {
                let text = ""
                text = text + "<br><h3>Amount:</h3> "
                text = text + format(player.e.gen[5])
                text = text + " ("
                text = text + format(player.e.genps[5])
                text = text + "/s)<br><br><h3>Bought:</h3> "
                text = text + formatWhole(player.e.buyables[this.id])
                text = text + "<br><br><h3>Multiplier:</h3> "
                text = text + format(player.e.genMult[5])
                text = text + "<br><br><h3>Cost:</h3> "
                text = text + format(player.e.genCost[5])
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(player.e.genCost[5])
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(player.e.genCost[5])
                player.e.genCost[5] = player.e.genCost[5].times(player.e.genCostIncr[5])
                if (player.e.genCost[5].gte("1.79e308")) player.e.genCostIncr[5] = player.e.genCostIncr[5].times(2)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.e.gen[5] = player.e.gen[5].add(1)
                player.e.genMult[5] = player.e.genMult[5].times(player.e.perGenMult)
            },
            unlocked() {
                return true
            }
        },
        23: {
            title: "7th Energy Generator",
            cost(x) {
                return new Decimal(2).pow(56).times(new Decimal(128).pow(x))
            },
            display() {
                let text = ""
                text = text + "<br><h3>Amount:</h3> "
                text = text + format(player.e.gen[6])
                text = text + " ("
                text = text + format(player.e.genps[6])
                text = text + "/s)<br><br><h3>Bought:</h3> "
                text = text + formatWhole(player.e.buyables[this.id])
                text = text + "<br><br><h3>Multiplier:</h3> "
                text = text + format(player.e.genMult[6])
                text = text + "<br><br><h3>Cost:</h3> "
                text = text + format(player.e.genCost[6])
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(player.e.genCost[6])
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(player.e.genCost[6])
                player.e.genCost[6] = player.e.genCost[6].times(player.e.genCostIncr[6])
                if (player.e.genCost[6].gte("1.79e308")) player.e.genCostIncr[6] = player.e.genCostIncr[6].times(2)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.e.gen[6] = player.e.gen[6].add(1)
                player.e.genMult[6] = player.e.genMult[6].times(player.e.perGenMult)
            },
            unlocked() {
                return true
            }
        },
        24: {
            title: "8th Energy Generator",
            cost(x) {
                return new Decimal(2).pow(72).times(new Decimal(256).pow(x))
            },
            display() {
                let text = ""
                text = text + "<br><h3>Amount:</h3> "
                text = text + format(player.e.gen[7])
                text = text + " ("
                text = text + format(player.e.genps[7])
                text = text + "/s)<br><br><h3>Bought:</h3> "
                text = text + formatWhole(player.e.buyables[this.id])
                text = text + "<br><br><h3>Multiplier:</h3> "
                text = text + format(player.e.genMult[7])
                text = text + "<br><br><h3>Cost:</h3> "
                text = text + format(player.e.genCost[7])
                return text
            },
            canAfford() {
                return player[this.layer].points.gte(player.e.genCost[7])
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(player.e.genCost[7])
                player.e.genCost[7] = player.e.genCost[7].times(player.e.genCostIncr[7])
                if (player.e.genCost[7].gte("1.79e308")) player.e.genCostIncr[7] = player.e.genCostIncr[7].times(2)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.e.gen[7] = player.e.gen[7].add(1)
                player.e.genMult[7] = player.e.genMult[7].times(player.e.perGenMult)
            },
            unlocked() {
                return true
            }
        },
        31: {
            title: "Booster",
            cost(x) {
                let exp = new Decimal(32).times(x.add(1))
                return new Decimal(2).pow(exp)
            },
            display() {
                let text = ""
                text = text + "Reset Energy and Generators to gain a Booster.<br><h3>Amount:</h3> "
                text = text + formatWhole(player.e.buyables[this.id])
                text = text + "<br><br><h3>Effect:</h3> x"
                text = text + format(buyableEffect(this.layer, this.id))
                text = text + " to all Generators<br><br><h3>Cost:</h3> "
                text = text + format(this.cost())
                return text
            },
            effect(x) {
                return new Decimal(2).pow(x)
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = new Decimal(4)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                for (let i = 11; i < 25; i++)
                {
                    if (i % 10 >= 1 && i % 10 <= 4)
                    {
                        player.e.buyables[i] = new Decimal(0)
                    }
                }
                for (let i = 0; i < 8; i++)
                {
                    player.e.gen[i] = new Decimal(0)
                    player.e.genps[i] = new Decimal(0)
                    player.e.genMult[i] = new Decimal(2).pow(getBuyableAmount(this.layer, this.id))
                    player.e.genCost[i] = new Decimal(2).pow((i+2)*(i+1))
                    player.e.genCostIncr[i] = new Decimal(2).pow(i+1)
                }
            },
            unlocked() {
                return true
            }
        },
    },
    bars: {
        boostBar: {
            direction: RIGHT,
            width: 400,
            height: 40,
            display() {
                let max = new Decimal(32).times(getBuyableAmount('e', 31).add(1))
                let cur
                if (player.e.points.lt(1))
                {
                    cur = new Decimal(0)
                }
                else
                {
                    cur = player.e.points.log(2)
                }
                let pct = cur.div(max).times(100).min(100)
                let text = format(pct)
                text = text + "% to the Next Booster"
                return text
            },
            progress() {
                let max = new Decimal(32).times(getBuyableAmount('e', 31).add(1))
                let cur
                if (player.e.points.lt(1))
                {
                    cur = new Decimal(0)
                }
                else
                {
                    cur = player.e.points.log(2)
                }
                return cur.div(max).min(1)
            },
            baseStyle: {
                "background-color": "#333300"
            },
            fillStyle: {
                "background-color": "#999900"
            },
            textStyle: {
                "color": "#ffffff"
            },
            instant: true
        },
        infBar: {
            direction: RIGHT,
            width: 400,
            height: 40,
            display() {
                let max = new Decimal(1024)
                let cur
                if (player.e.points.lt(1))
                {
                    cur = new Decimal(0)
                }
                else
                {
                    cur = player.e.points.log(2)
                }
                let pct = cur.div(max).times(100).min(100)
                let text = format(pct)
                text = text + "% to the Next Layer"
                return text
            },
            progress() {
                let max = new Decimal(1024)
                let cur
                if (player.e.points.lt(1))
                {
                    cur = new Decimal(0)
                }
                else
                {
                    cur = player.e.points.log(2)
                }
                return cur.div(max).min(1)
            },
            baseStyle: {
                "background-color": "#333300"
            },
            fillStyle: {
                "background-color": "#999900"
            },
            textStyle: {
                "color": "#ffffff"
            },
            instant: true
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
            key: 'b',
            description: 'B: Reset for a Booster',
            unlocked: true,
            onPress() {
			    if (tmp.e.buyables[31].canAfford)
                {
                    tmp.e.buyables[31].buy()
                }
		    },
        },
    ],
    update(diff) {
        let gain7 = player.e.gen[7].times(player.e.genMult[7])
        player.e.genps[6] = gain7
        player.e.gen[6] = player.e.gen[6].add(gain7.times(diff))
        let gain6 = player.e.gen[6].times(player.e.genMult[6])
        player.e.genps[5] = gain6
        player.e.gen[5] = player.e.gen[5].add(gain6.times(diff))
        let gain5 = player.e.gen[5].times(player.e.genMult[5])
        player.e.genps[4] = gain5
        player.e.gen[4] = player.e.gen[4].add(gain5.times(diff))
        let gain4 = player.e.gen[4].times(player.e.genMult[4])
        player.e.genps[3] = gain4
        player.e.gen[3] = player.e.gen[3].add(gain4.times(diff))
        let gain3 = player.e.gen[3].times(player.e.genMult[3])
        player.e.genps[2] = gain3
        player.e.gen[2] = player.e.gen[2].add(gain3.times(diff))
        let gain2 = player.e.gen[2].times(player.e.genMult[2])
        player.e.genps[1] = gain2
        player.e.gen[1] = player.e.gen[1].add(gain2.times(diff))
        let gain1 = player.e.gen[1].times(player.e.genMult[1])
        player.e.genps[0] = gain1
        player.e.gen[0] = player.e.gen[0].add(gain1.times(diff))
        let gain0 = player.e.gen[0].times(player.e.genMult[0])
        player.e.ps = gain0
        player.e.points = player.e.points.add(gain0.times(diff))
    },
    layerShown() {
        return true
    },
    doReset(resettingLayer) {
		let keep = []
        if (resettingLayer.row >= this.row)
        {
            layerDataReset('e', keep)
        }
	},
})