// LAYER 1: ENERGY
//
// ADDED IN 0.1.01
addLayer("c", {
    name: "Counting", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ps: new Decimal(1),
        successRate: new Decimal(0.5),
        penalty: new Decimal(0),
        reward: new Decimal(0),
        pointDivisor: new Decimal(4096)
    }},
    color: "#808080",
    resource: "Counting Points", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Counting": {
            content: [
                ["main-display", 3],
                ["display-text",
                function() { 
                    return 'The current number is ' + formatWhole(player.points)
                },
                { 
                    "color": "#dfdfdf",
                    "font-size": "18px",
                }],
                "blank",
                ["display-text",
                function() { 
                    return 'You are counting at a rate of ' + format(player.c.ps) + ' numbers per second' 
                },
                { 
                    "color": "#dfdfdf"
                }],
                "blank",
                ["display-text",
                function() { 
                    return 'The success rate is ' + format(player.c.successRate.times(100)) + '%' 
                },
                { 
                    "color": "#dfdfdf"
                }],
                ["display-text",
                function() { 
                    return 'Each failure reduces the current number by ' + format(player.c.penalty.times(-100).add(100)) + '%, rounded up' 
                },
                { 
                    "color": "#dfdfdf"
                }],
                "blank",
                ["display-text",
                function() { 
                    return 'You will gain ' + format(player.c.reward) + ' Counting Points for the next successful count, based on the current number' 
                },
                { 
                    "color": "#dfdfdf"
                }],
                "blank",
                ["microtabs", "stuff"]
            ],
            unlocked() {
                return true
            },
        },
    },
    microtabs: {
        stuff: {
            Upgrades: {
                content: [
                    "upgrades"
                ],
            },
        },
    },
    upgrades: {
        11: {
            title: "Success Rate Increaser I",
            description: "Base success rate becomes 60%",
            cost() {
                return new Decimal(0.005)
            },
            unlocked() {
                return true
            }
        },
        12: {
            title: "CP Gain Increaser I",
            description: "Counting Point gain is doubled",
            cost() {
                return new Decimal(0.008)
            },
            unlocked() {
                return hasUpgrade('c', 11)
            }
        },
        13: {
            title: "Counting Accelerator I",
            description: "Counting speed is increased by 50%",
            cost() {
                return new Decimal(0.010)
            },
            unlocked() {
                return hasUpgrade('c', 12)
            }
        },
        21: {
            title: "Success Rate Increaser II",
            description: "Base success rate becomes 70%",
            cost() {
                return new Decimal(0.020)
            },
            unlocked() {
                return hasUpgrade('c', 13)
            }
        },
        31: {
            title: "Success Rate Increaser III",
            description: "Base success rate becomes 80%",
            cost() {
                return new Decimal(0.225)
            },
            unlocked() {
                return hasUpgrade('c', 21)
            }
        },
        41: {
            title: "Success Rate Increaser IV",
            description: "Base success rate becomes 90%",
            cost() {
                return new Decimal(4)
            },
            unlocked() {
                return hasUpgrade('c', 31)
            }
        },
        51: {
            title: "Success Rate Increaser V",
            description: "Base success rate becomes 95%",
            cost() {
                return new Decimal(2e308)
            },
            unlocked() {
                return hasUpgrade('c', 41)
            }
        },
        22: {
            title: "CP Gain Increaser II",
            description: "Counting Point gain is doubled",
            cost() {
                return new Decimal(0.060)
            },
            unlocked() {
                return hasUpgrade('c', 13)
            }
        },
        32: {
            title: "CP Gain Increaser III",
            description: "Counting Point gain is multiplied by 2.5",
            cost() {
                return new Decimal(0.600)
            },
            unlocked() {
                return hasUpgrade('c', 22)
            }
        },
        42: {
            title: "CP Gain Increaser IV",
            description: "Counting Point gain is tripled",
            cost() {
                return new Decimal(2e308)
            },
            unlocked() {
                return hasUpgrade('c', 32)
            }
        },
        52: {
            title: "CP Gain Increaser V",
            description: "Counting Point gain is multiplied by 3.5",
            cost() {
                return new Decimal(2e308)
            },
            unlocked() {
                return hasUpgrade('c', 42)
            }
        },
        23: {
            title: "Number Saver I",
            description: "Penalty for each failure is lowered to -50%",
            cost() {
                return new Decimal(0.125)
            },
            unlocked() {
                return hasUpgrade('c', 13)
            }
        },
        33: {
            title: "Counting Accelerator II",
            description: "Counting speed is increased by 50%",
            cost() {
                return new Decimal(2)
            },
            unlocked() {
                return hasUpgrade('c', 23)
            }
        },
        43: {
            title: "Number Saver II",
            description: "Penalty for each failure is lowered to -25%",
            cost() {
                return new Decimal(2e308)
            },
            unlocked() {
                return hasUpgrade('c', 33)
            }
        },
        53: {
            title: "Counting Accelerator III",
            description: "Counting speed is increased by 60%",
            cost() {
                return new Decimal(2e308)
            },
            unlocked() {
                return hasUpgrade('c', 43)
            }
        },
    },
    update(diff) {
        player.ms = player.ms.add(diff*1000)

        player.c.successRate = new Decimal(0.5)
        if (hasUpgrade('c', 11)) player.c.successRate = new Decimal(0.6)
        if (hasUpgrade('c', 21)) player.c.successRate = new Decimal(0.7)
        if (hasUpgrade('c', 31)) player.c.successRate = new Decimal(0.8)
        if (hasUpgrade('c', 41)) player.c.successRate = new Decimal(0.9)
        if (hasUpgrade('c', 51)) player.c.successRate = new Decimal(0.95)

        player.c.pointDivisor = new Decimal(4096)
        if (hasUpgrade('c', 12)) player.c.pointDivisor = player.c.pointDivisor.div(2)
        if (hasUpgrade('c', 22)) player.c.pointDivisor = player.c.pointDivisor.div(2)
        if (hasUpgrade('c', 32)) player.c.pointDivisor = player.c.pointDivisor.div(2.5)
        if (hasUpgrade('c', 42)) player.c.pointDivisor = player.c.pointDivisor.div(3)
        if (hasUpgrade('c', 52)) player.c.pointDivisor = player.c.pointDivisor.div(3.5)

        player.c.ps = new Decimal(1)
        if (hasUpgrade('c', 13)) player.c.ps = player.c.ps.times(1.5)
        if (hasUpgrade('c', 33)) player.c.ps = player.c.ps.times(1.5)
        if (hasUpgrade('c', 53)) player.c.ps = player.c.ps.times(1.6)
        player.c.cooldown = player.c.ps.pow(-1).times(1000)

        player.c.penalty = new Decimal(0)
        if (hasUpgrade('c', 23)) player.c.penalty = new Decimal(0.5)
        if (hasUpgrade('c', 43)) player.c.penalty = new Decimal(0.75)

        while (player.ms.gte(player.c.cooldown))
        {
            let rng = new Decimal(Math.random())
            if (rng.lte(player.c.successRate)) // success
            {
                player.points = player.points.add(1)
                player.c.points = player.c.points.add(player.c.reward)
                player.c.reward = player.points.div(player.c.pointDivisor)
                player.ms = player.ms.sub(player.c.cooldown)
            }
            else // failure
            {
                player.points = player.points.times(player.c.penalty).floor()
                player.c.reward = player.points.div(player.c.pointDivisor)
                player.ms = player.ms.sub(player.c.cooldown)
            }
        }
    },
    automate(diff) {
        
    },
    layerShown() {
        return true
    },
    doReset(resettingLayer) {
		let keep = []
        if (resettingLayer.row >= this.row)
        {
            layerDataReset('c', keep)
        }
	},
})