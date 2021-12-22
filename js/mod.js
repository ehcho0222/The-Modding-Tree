let modInfo = {
	name: "Tree of Light",
	id: "Cube Entertainment is Satan",
	author: "sleepground123",
	pointsName: "Energy",
	modFiles: ["tree.js", "changelog.js", "layers/ach.js", "layers/radio.js", "layers/micro.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

let VERSION = {
	num: "0.20",
	name: "Layer One",
}

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new Decimal(0)
	// Base Gain
	let gain = new Decimal(0.2).div(3)
	if (hasUpgrade("radio", 11)) gain = gain.add(new Decimal(0.1).div(3))
	// Gain Multipliers
	if (hasUpgrade("radio", 12)) gain = gain.times(1.5)
	if (hasUpgrade("radio", 13)) gain = gain.times(upgradeEffect("radio", 13))
	if (hasUpgrade("radio", 22)) gain = gain.times(2)
	if (hasUpgrade("radio", 23)) gain = gain.times(upgradeEffect("radio", 23))
	if (hasAchievement("ach", 14)) gain = gain.times(3)
	if (hasUpgrade("micro", 11)) gain = gain.times(upgradeEffect("micro", 11))
	if (hasUpgrade("micro", 12)) gain = gain.times(upgradeEffect("micro", 12))
	// Challenge Multipliers
	if (inChallenge("micro", 11)) gain = gain.times(0.01)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Current Endgame: e4,041,640 Energy",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e4041640"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(1000)
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}