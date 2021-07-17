let modInfo = {
	name: "The GFRIEND Tree",
	id: "gfriendforever",
	author: "sleepground123",
	pointsName: "Popularity",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.20",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h2>v0.2x - Classic Era</h2><br>
	<h3>v0.20 - Initial Release</h3><br>
		- Added contents up to Re-debut and Streaming.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade('money', 12)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.05)
	if (hasUpgrade('money', 14)) gain = gain.times(upgradeEffect('money', 14))
	if (hasUpgrade('money', 15)) gain = gain.times(upgradeEffect('money', 15))
	if (hasUpgrade('money', 21) && gain.gt(1)) gain = gain.pow(upgradeEffect('money', 21))
	gain = gain.times(buyableEffect('money', 11))
	gain = gain.times(buyableEffect('money', 12))
	if (player.g.unlocked) gain = gain.times(tmp.g.effect)
	if (hasUpgrade('g', 13)) gain = gain.times(upgradeEffect('g', 13))
	if (hasUpgrade('g', 14)) gain = gain.times(upgradeEffect('g', 14))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
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
	return(600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}