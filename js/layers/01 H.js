// LAYER 1: HYDROGEN
//
// ADDED IN 0.01
addLayer("H", {
    name: "Hydrogen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
        ps: new Decimal(0),
        decay: new Decimal(0),
        decayRate: new Decimal(0.01),
        decayThreshold: new Decimal(1000)
    }},
    color: "#ffffff",
    requires: new Decimal(1),
    resource: "Hydrogen", // Name of prestige currency
    baseResource: "Matter",
    baseAmount() {
        return player.points
    },
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    tabFormat: {
        "Main": {
            content: [
                ["main-display", 3],
                ["display-text", function() {
                    return "You are gaining "+format(player.H.ps)+" Hydrogen per second."
                }],
                "blank",
                ["display-text", function() {
                    return "Hydrogen decays when you have more than "+format(player.H.decayThreshold)+" of it."
                }],
                ["display-text", function() {
                    return "Due to the decay, you are losing "+format(player.H.decay)+" Hydrogen per second."
                }],
                "blank",
                ["display-text", function() {
                    return "In total, you are netting "+format(player.H.ps.sub(player.H.decay))+" Hydrogen per second."
                }],
                "blank",
                "upgrades"
            ],
            unlocked() {
                return true
            },
        },
    },
    upgrades: {
        11: {
            title: "Hydrogen I",
            description: "Gain Hydrogen based on Matter.",
            cost() {
                return new Decimal(1)
            },
            effect() {
                let x = player.points
                let hc = false
                let hardcap = new Decimal(1e4)
                if (hasUpgrade("H", 34)) hardcap = new Decimal(1e8)
                if (player.points.gte(hardcap))
                {
                    hc = true
                    x = x.min(hardcap)
                }
                x = x.times(0.0256)
                return {
                    amount: x,
                    hardcapped: hc
                }
            },
            effectDisplay() {
                let text = ""
                text = text + format(upgradeEffect(this.layer, this.id).amount)
                text = text + "/s"
                if (upgradeEffect(this.layer, this.id).hardcapped)
                {
                    text = text + " (hardcapped)"
                }
                return text
            },
            unlocked() {
                return true
            }
        },
        12: {
            title: "Hydrogen II",
            description: "Gain 0.1 Matter per second.",
            cost() {
                return new Decimal(0.25)
            },
            unlocked() {
                return hasUpgrade("H", 11)
            }
        },
        13: {
            title: "Hydrogen III",
            description: "Multiply Hydrogen gain by 1.16 for every Hydrogen upgrade.",
            cost() {
                return new Decimal(6)
            },
            effect() {
                return new Decimal(1.16).pow(player.H.upgrades.length)
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("H", 12)
            }
        },
        14: {
            title: "Hydrogen IV",
            description: "Multiply Matter gain by 1.1 for every Achievement earned.",
            cost() {
                return new Decimal(20)
            },
            effect() {
                return new Decimal(1.1).pow(player.ach.points)
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("H", 13)
            }
        },
        15: {
            title: "Hydrogen V",
            description: "Multiply Hydrogen gain by ln(Matter+3).",
            cost() {
                return new Decimal(50)
            },
            effect() {
                if (hasUpgrade("H", 33)) return player.points.add(3).log(2)
                return player.points.add(3).ln()
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("H", 14)
            }
        },
        21: {
            title: "Hydrogen VI",
            description: "Multiply Matter gain by 6 and Hydrogen VII cost by 100.",
            cost() {
                if (hasUpgrade("H", 22)) return new Decimal(2.5e4)
                return new Decimal(250)
            },
            effect() {
                return new Decimal(6)
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("H", 15)
            }
        },
        22: {
            title: "Hydrogen VII",
            description: "Multiply Hydrogen gain by 4 and Hydrogen VI cost by 100.",
            cost() {
                if (hasUpgrade("H", 21)) return new Decimal(2.5e4)
                return new Decimal(250)
            },
            effect() {
                return new Decimal(4)
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("H", 15)
            }
        },
        23: {
            title: "Hydrogen VIII",
            description: "Multiply Hydrogen gain by 1.5 for every Achievement earned.",
            cost() {
                return new Decimal(1500)
            },
            effect() {
                return new Decimal(1.5).pow(player.ach.points)
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("H", 21) || hasUpgrade("H", 22)
            }
        },
        24: {
            title: "Hydrogen IX",
            description: "Multiply Matter gain by 2 for every 2 Hydrogen upgrades.",
            cost() {
                return new Decimal(1.25e5)
            },
            effect() {
                return new Decimal(2).pow(player.ach.points.div(2))
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("H", 23)
            }
        },
        25: {
            title: "Hydrogen X",
            description: "Multiply Hydrogen gain by 4, but double the decay rate.",
            cost() {
                return new Decimal(1.68e6)
            },
            effect() {
                return new Decimal(4)
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("H", 24)
            }
        },
        31: {
            title: "Hydrogen XI",
            description: "Multiply Matter gain by log10(Hydrogen+10).",
            cost() {
                return new Decimal(2.55e7)
            },
            effect() {
                if (hasUpgrade("H", 33)) return player.H.points.add(10).log(2)
                return player.H.points.add(10).log(10)
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("H", 25)
            }
        },
        32: {
            title: "Hydrogen XII",
            description: "Multiply Hydrogen gain by 5, and halve the decay rate.",
            cost() {
                return new Decimal(5e8)
            },
            effect() {
                return new Decimal(5)
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("H", 31)
            }
        },
        33: {
            title: "Hydrogen XIII",
            description: "Reduce the log base in Hydrogen V and XI to 2.",
            cost() {
                return new Decimal(9.9e9)
            },
            unlocked() {
                return hasUpgrade("H", 32)
            }
        },
        34: {
            title: "Hydrogen XIV",
            description: "Increase the hardcap of Hydrogen I to 100,000,000 Matter.",
            cost() {
                return new Decimal(2.222e10)
            },
            unlocked() {
                return hasUpgrade("H", 33)
            }
        },
        35: {
            title: "Hydrogen XV",
            description: "Unlock Helium.",
            cost() {
                return new Decimal(2e12)
            },
            unlocked() {
                return hasUpgrade("H", 34)
            }
        },
    },
    update(diff) {
        let gain = new Decimal(0)
        if (hasUpgrade("H", 11))
        {
            gain = upgradeEffect("H", 11).amount
            // Gain Multipliers
            if (hasUpgrade("H", 13)) gain = gain.times(upgradeEffect("H", 13))
            if (hasUpgrade("H", 15)) gain = gain.times(upgradeEffect("H", 15))
            if (hasUpgrade("H", 22)) gain = gain.times(upgradeEffect("H", 22))
            if (hasUpgrade("H", 23)) gain = gain.times(upgradeEffect("H", 23))
            if (hasUpgrade("H", 25)) gain = gain.times(upgradeEffect("H", 25))
            if (hasUpgrade("H", 32)) gain = gain.times(upgradeEffect("H", 32))
            if (hasUpgrade("He", 23)) gain = gain.times(upgradeEffect("He", 23))
            // Gain Exponentiators
            if (hasUpgrade("He", 13)) gain = gain.pow(upgradeEffect("He", 13))
        }
        player.H.ps = gain
        player.H.decayRate = new Decimal(0.01)
        if (hasUpgrade("H", 25)) player.H.decayRate = player.H.decayRate.times(2)
        if (hasUpgrade("H", 32)) player.H.decayRate = player.H.decayRate.times(0.5)
        player.H.decay = player.H.points.sub(player.H.decayThreshold).max(0).times(player.H.decayRate)
        player.H.points = player.H.points.add(player.H.ps.sub(player.H.decay).times(diff)).max(0)
    },
    layerShown() {
        return true
    },
    doReset(resettingLayer) {
		let keep = []
        if (layers[resettingLayer].row > layers[this.layer].row)
        {
            layerDataReset(this.layer, keep)
        }
	},
})