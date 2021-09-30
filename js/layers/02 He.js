// LAYER 2: HELIUM
//
// ADDED IN 0.01
addLayer("He", {
    name: "Helium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "He", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
        ps: new Decimal(0),
        decay: new Decimal(0),
        decayRate: new Decimal(0.01),
        decayThreshold: new Decimal(1000)
    }},
    color: "#d9ffff",
    requires: new Decimal(1),
    resource: "Helium", // Name of prestige currency
    baseResource: "Hydrogen",
    baseAmount() {
        return player.H.points
    },
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    tabFormat: {
        "Main": {
            content: [
                ["main-display", 3],
                ["display-text", function() {
                    return "You are gaining "+format(player.He.ps)+" Helium per second."
                }],
                "blank",
                ["display-text", function() {
                    return "Helium decays when you have more than "+format(player.He.decayThreshold)+" of it."
                }],
                ["display-text", function() {
                    return "Due to the decay, you are losing "+format(player.He.decay)+" Helium per second."
                }],
                "blank",
                ["display-text", function() {
                    return "In total, you are netting "+format(player.He.ps.sub(player.He.decay))+" Helium per second."
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
            title: "Helium I",
            description: "Gain Helium based on Matter.",
            cost() {
                return new Decimal(1e6)
            },
            currencyDisplayName: "Matter",
            currencyInternalName: "points",
            effect() {
                let x = player.points
                let hc = false
                let hardcap = new Decimal(1e14)
                if (hasUpgrade("He", 33)) hardcap = new Decimal(1e22)
                if (player.points.gte(hardcap))
                {
                    hc = true
                    x = x.min(hardcap)
                }
                x = x.div(1e6).pow(0.5).times(0.0256)
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
            title: "Helium II",
            description: "Helium boosts Matter gain.",
            cost() {
                return new Decimal(1)
            },
            effect() {
                let x = player.He.points.add(1).pow(2)
                let hc = false
                let hardcap = new Decimal(1e4)
                if (x.gte(hardcap))
                {
                    hc = true
                    x = x.min(hardcap)
                }
                return {
                    amount: x,
                    hardcapped: hc
                }
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id).amount)
                if (upgradeEffect(this.layer, this.id).hardcapped)
                {
                    text = text + " (hardcapped)"
                }
                return text
            },
            unlocked() {
                return hasUpgrade("He", 11)
            }
        },
        13: {
            title: "Helium III",
            description: "Exponentiate Hydrogen gain by 1.02 for every Helium upgrade.",
            cost() {
                return new Decimal(2)
            },
            effect() {
                let x = new Decimal(player.He.upgrades.length)
                return new Decimal(1.02).pow(x)
            },
            effectDisplay() {
                let text = "^"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("He", 12)
            }
        },
        14: {
            title: "Helium IV",
            description: "Multiply Helium gain by log10(Matter+10).",
            cost() {
                return new Decimal(4)
            },
            effect() {
                let x = player.points.add(10).log(10)
                return x
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("He", 13)
            }
        },
        15: {
            title: "Helium V",
            description: "Multiply Helium gain by 6, but 4x the decay rate.",
            cost() {
                return new Decimal(500)
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
                return hasUpgrade("He", 14)
            }
        },
        21: {
            title: "Helium VI",
            description: "Multiply Helium gain by 1.1 for every Achievement earned.",
            cost() {
                return new Decimal(9000)
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
                return hasUpgrade("He", 15)
            }
        },
        22: {
            title: "Helium VII",
            description: "Hydrogen boosts Helium gain, but multiply Helium VIII cost by 2000.",
            cost() {
                if (hasUpgrade("He", 23)) return new Decimal(1e8)
                return new Decimal(50000)
            },
            effect() {
                return player.H.points.add(3).ln().times(0.5)
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("He", 21)
            }
        },
        23: {
            title: "Helium VIII",
            description: "Helium boosts Hydrogen gain, but multiply Helium III cost by 2000.",
            cost() {
                if (hasUpgrade("He", 22)) return new Decimal(1e8)
                return new Decimal(50000)
            },
            effect() {
                return player.He.points.add(3).ln().times(2)
            },
            effectDisplay() {
                let text = "x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("He", 21)
            }
        },
        24: {
            title: "Helium IX",
            description: "Helium decay rate is divided by 40.",
            cost() {
                return new Decimal(1e6)
            },
            unlocked() {
                return hasUpgrade("He", 22) || hasUpgrade("He", 23)
            }
        },
        25: {
            title: "Helium X",
            description: "Helium gain is raised ^1.2.",
            cost() {
                return new Decimal(5e6)
            },
            effect() {
                return new Decimal(1.2)
            },
            effectDisplay() {
                let text = "^"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("He", 24)
            }
        },
        31: {
            title: "Helium XI",
            description: "Matter gain is multiplied by Helium^<span style='color:#cc0000'>α</span>.",
            cost() {
                return new Decimal(1.5e8)
            },
            effect() {
                return player.He.points.add(1).pow(player.alpha)
            },
            effectDisplay() {
                let text = "<span style='color:#cc0000'>α</span>="
                text = text + format(player.alpha)
                text = text + "<br>Effect: x"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("He", 25) && hasUpgrade("He", 22) && hasUpgrade("He", 23)
            }
        },
        32: {
            title: "Helium XII",
            description: "Increase <span style='color:#cc0000'>α</span> by 0.5, but 5x the decay rate.",
            cost() {
                return new Decimal(3e9)
            },
            unlocked() {
                return hasUpgrade("He", 31)
            }
        },
        33: {
            title: "Helium XIII",
            description: "Increase the hardcap of Helium I to 1e22 Matter.",
            cost() {
                return new Decimal(5e9)
            },
            unlocked() {
                return hasUpgrade("He", 32)
            }
        },
        34: {
            title: "Helium XIV",
            description: "<span style='color:#cc0000'>α</span> is increased by 0.01 for every Achievement earned.",
            cost() {
                return new Decimal(3e14)
            },
            effect() {
                return player.ach.points.times(0.01)
            },
            effectDisplay() {
                let text = "+"
                text = text + format(upgradeEffect(this.layer, this.id))
                return text
            },
            unlocked() {
                return hasUpgrade("He", 33)
            }
        },
        35: {
            title: "Helium XV",
            description: "Unlock a new layer.",
            cost() {
                return new Decimal(1.5e15)
            },
            unlocked() {
                return hasUpgrade("He", 34)
            }
        },
    },
    update(diff) {
        player.alpha = new Decimal(0.5)
        if (hasUpgrade("He", 32)) player.alpha = player.alpha.add(0.5)
        if (hasUpgrade("He", 34)) player.alpha = player.alpha.add(upgradeEffect("He", 34))
        let gain = new Decimal(0)
        if (hasUpgrade("He", 11))
        {
            gain = upgradeEffect("He", 11).amount
            if (hasUpgrade("He", 14)) gain = gain.times(upgradeEffect("He", 14))
            if (hasUpgrade("He", 15)) gain = gain.times(upgradeEffect("He", 15))
            if (hasUpgrade("He", 21)) gain = gain.times(upgradeEffect("He", 21))
            if (hasUpgrade("He", 22)) gain = gain.times(upgradeEffect("He", 22))
            if (hasUpgrade("He", 25)) gain = gain.pow(upgradeEffect("He", 25))
        }
        player.He.ps = gain
        player.He.decayRate = new Decimal(0.01)
        if (hasUpgrade("He", 15)) player.He.decayRate = player.He.decayRate.times(4)
        if (hasUpgrade("He", 24)) player.He.decayRate = player.He.decayRate.times(0.025)
        player.He.decay = player.He.points.sub(player.He.decayThreshold).max(0).times(player.He.decayRate)
        player.He.points = player.He.points.add(player.He.ps.sub(player.He.decay).times(diff)).max(0)
    },
    layerShown() {
        return hasUpgrade("H", 35)
    },
    doReset(resettingLayer) {
		let keep = []
        if (layers[resettingLayer].row > layers[this.layer].row)
        {
            layerDataReset(this.layer, keep)
        }
	},
})