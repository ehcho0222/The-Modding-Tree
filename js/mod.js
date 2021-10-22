let modInfo = {
	name: "Farmcremental",
	id: "blueheadedmoremi",
	author: "sleepground123",
	pointsName: "Money",
	modFiles: ["tree.js", "changelog.js", "layers/farm.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

let VERSION = {
	num: "0.9.0.01",
	name: "dev-211020",
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
	return false
}

// Calculate points/sec!
function getPointGen() {
	return new Decimal(0)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	level: new Decimal(0),
	xp: new Decimal(0),
	energy: new Decimal(100),
	maxEnergy: new Decimal(100),
	energyRegen: new Decimal(0.025),
	seeds: {
		tomato: new Decimal(0)
	},
}}

// Display extra things at the top of the page
var displayThings = [
	"Current Endgame: 1.79e308 Money",
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
	return(1000)
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}