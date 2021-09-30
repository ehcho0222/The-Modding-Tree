let modInfo = {
	name: "The Elements Tree",
	id: "basicPowerfulPlacidHighway27818612",
	author: "sleepground123",
	pointsName: "Matter",
	modFiles: ["tree.js", "changelog.js", "layers/00 Achievements.js", "layers/01 H.js", "layers/02 He.js", "layers/-01 Alpha.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

let VERSION = {
	num: "0.01",
	name: "The Beginning",
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
	return hasUpgrade("H", 12)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new Decimal(0)
	let gain = new Decimal(0.1)
	if (hasUpgrade("H", 14)) gain = gain.times(upgradeEffect("H", 14))
	if (hasUpgrade("H", 21)) gain = gain.times(upgradeEffect("H", 21))
	if (hasUpgrade("H", 24)) gain = gain.times(upgradeEffect("H", 24))
	if (hasUpgrade("H", 31)) gain = gain.times(upgradeEffect("H", 31))
	if (hasUpgrade("He", 12)) gain = gain.times(upgradeEffect("He", 12).amount)
	if (hasUpgrade("He", 31)) gain = gain.times(upgradeEffect("He", 31))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	alpha: new Decimal(0.5),
}}

// Display extra things at the top of the page
var displayThings = [
	"Current Endgame: 1.79e308 Matter",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1.79e308"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(500)
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}