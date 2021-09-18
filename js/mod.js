let modInfo = {
	name: "The Counting Tree",
	id: "angryDrunkHalfSoup1b43c14a",
	author: "sleepground123",
	pointsName: "Number",
	modFiles: ["tree.js", "changelog.js", "layers/c.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

let VERSION = {
	num: "0.20",
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
	return false
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new Decimal(0)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	ms: new Decimal(0)
}}

// Display extra things at the top of the page
var displayThings = [
	"Current Endgame: Count to 100",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal(100))
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