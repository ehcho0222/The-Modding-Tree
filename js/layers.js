addLayer("b", {
    name: "Bitcoin", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "₿", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        gain: new Decimal(1),
        ps: new Decimal(0),
    }},
    color: "#CBA901",
    resource: "Bitcoin", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Main": {
            content: [
                ["main-display", 2],
                ["display-text",
                    function() { return 'You are earning ' + format(player.b.ps) + ' Bitcoin per second.' },
                {}],
                    "blank",
                "clickables"
            ],
        },
        "Investment": {
            content: [
                ["main-display", 2],
                ["display-text",
                    function() { return 'You are earning ' + format(player.b.ps) + ' Bitcoin per second.' },
                {}],
                "blank",
                ["row", [["buyable", 11], ["buyable", 21]]]
            ],
        },
        "Mining": {
            content: [
                ["main-display", 2],
                ["display-text",
                    function() { return 'You are earning ' + format(player.b.ps) + ' Bitcoin per second.' },
                {}],
                "blank",
                ["row", [["upgrade", 211], ["upgrade", 212], ["upgrade", 213], ["upgrade", 214], ["upgrade", 215], ["upgrade", 216]]]
            ],
        },
    },
    clickables: {
        11: {
            display() {
                let text = ""
                text = text + "Click to get <h3><b>+"
                text = text + player.b.gain
                text = text + "</b></h3> Bitcoin"
                return text
            },
            canClick() {
                return true
            },
            onClick() {
                player.b.points = player.b.points.add(player.b.gain)
            },
            unlocked() {
                return true
            },
        },
    },
    buyables: {
        11: {
            title: "Comic Books",
            cost(x) {
                return new Decimal(15).times(new Decimal(1.15).pow(x))
            },
            display() {
                let text = ""
                text = text + "<h3>Amount:</h3> "
                text = text + getBuyableAmount(this.layer, this.id)
                text = text + "/100"
                if (getBuyableAmount(this.layer, this.id).gte(1))
                {
                    text = text + "<br>Earns you <b>"
                    text = text + format(buyableEffect(this.layer, this.id).div(getBuyableAmount(this.layer, this.id)))
                    text = text + "</b> Bitcoin/s, for a total of <b>"
                    text = text + format(buyableEffect(this.layer, this.id))
                    text = text + "</b> Bitcoin/s."
                }
                text = text + "<br><h3>Cost:</h3> "
                text = text + format(this.cost())
                text = text + " Bitcoin"
                return text
            },
            effect(x) {
                let base = new Decimal(0.1)
                return base.times(x)
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                return new Decimal(100)
            },
            unlocked() {
                return true
            },
        },
        21: {
            title: "Lottery Tickets",
            cost(x) {
                return new Decimal(100).times(new Decimal(1.15).pow(x))
            },
            display() {
                let text = ""
                text = text + "<h3>Amount:</h3> "
                text = text + getBuyableAmount(this.layer, this.id)
                text = text + "/100"
                if (getBuyableAmount(this.layer, this.id).gte(1))
                {
                    text = text + "<br>Earns you <b>"
                    text = text + format(buyableEffect(this.layer, this.id).div(getBuyableAmount(this.layer, this.id)))
                    text = text + "</b> Bitcoin/s, for a total of <b>"
                    text = text + format(buyableEffect(this.layer, this.id))
                    text = text + "</b> Bitcoin/s."
                }
                text = text + "<br><h3>Cost:</h3> "
                text = text + format(this.cost())
                text = text + " Bitcoin"
                return text
            },
            effect(x) {
                let base = new Decimal(0.5)
                return base.times(x)
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                return new Decimal(100)
            },
            unlocked() {
                return true
            },
        },
    },
    upgrades: {
        211: {
            title: "Plentum 90MHz",
            description: "Increases Bitcoin per click to 4",
            cost: new Decimal(100),
            onPurchase() {
                player.b.gain = new Decimal(4)
            },
        },
        212: {
            title: "Plentum 150MHz",
            description: "Increases Bitcoin per click to 16",
            cost: new Decimal(480),
            onPurchase() {
                player.b.gain = new Decimal(16)
            },
            unlocked() {
                return hasUpgrade('b', 211)
            }
        },
        213: {
            title: "Plentum 233MHz",
            description: "Increases Bitcoin per click to 64",
            cost: new Decimal(2240),
            onPurchase() {
                player.b.gain = new Decimal(64)
            },
            unlocked() {
                return hasUpgrade('b', 212)
            }
        },
        214: {
            title: "Plentum 2 300MHz",
            description: "Increases Bitcoin per click to 256",
            cost: new Decimal(10240),
            onPurchase() {
                player.b.gain = new Decimal(256)
            },
            unlocked() {
                return hasUpgrade('b', 213)
            }
        },
        215: {
            title: "Plentum 2 350MHz",
            description: "Increases Bitcoin per click to 1,000",
            cost: new Decimal(46080),
            onPurchase() {
                player.b.gain = new Decimal(1000)
            },
            unlocked() {
                return hasUpgrade('b', 214)
            }
        },
        216: {
            title: "Plentum 2 450MHz",
            description: "Increases Bitcoin per click to 4,000",
            cost: new Decimal(200000),
            onPurchase() {
                player.b.gain = new Decimal(4000)
            },
            unlocked() {
                return hasUpgrade('b', 215)
            }
        },
    },
    update(diff) {
        player.b.ps = new Decimal(0)
        player.b.ps = player.b.ps.add(buyableEffect('b', 11))
        player.b.ps = player.b.ps.add(buyableEffect('b', 21))
        player.b.points = player.b.points.add(player.b.ps.times(diff))
    },
    layerShown(){
        return true
    },
})