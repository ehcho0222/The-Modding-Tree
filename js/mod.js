let modInfo = {
	name: "The Energy Tree",
	id: "somberWaggishRedBath6e86a1e2",
	author: "sleepground123",
	pointsName: "log(Energy)",
	modFiles: ["tree.js", "changelog.js", "layers/ach.js", "layers/energy.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

let VERSION = {
	num: "0.1.01",
	name: "",
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
	if (player.e.points.lte(1))
	{
		player.points = new Decimal(0)
	}
	else
	{
		player.points = player.e.points.log(10)
	}
	if(!canGenPoints()) return new Decimal(0)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Current Endgame: 1.79e308 Energy (308.25 logE)",
]

// Determines when the game "ends"
function isEndgame() {
	return player.e.points.gte(new Decimal("1.7977e308"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(1)
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}