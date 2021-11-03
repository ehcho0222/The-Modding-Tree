let modInfo = {
	name: "Matter Tree",
	id: "fuckyouhybeandbbcandcubeentertainment",
	author: "sleepground123",
	pointsName: "Matter",
	modFiles: ["utils/math.js", "tree.js", "changelog.js", "layers/ach.js", "layers/energy.js", "layers/photon.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

let VERSION = {
	num: "0.20",
	name: "Genesis",
}

// Atom(15)
// Brane(5)
// Cell(23)
// DNA(22)
// Energy(1)
// F
// Graviton(11)
// Hadron(9)
// Isotope(17)
// J
// K
// Life(20)
// Molecule(16)
// Neutrino(4)
// Neutron(14)
// O
// Photon(3)
// Polymer(18)
// Quark(13)
// Radiation(6)
// RNA(21)
// String(2)
// Primordial Soup(19)
// Tachyon(10)
// U
// Vacuum Energy(12)
// W-Boson(7)
// X
// Y
// Z-Boson(8)

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade('energy', 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new Decimal(0)
	let gain = new Decimal(0)
	if (hasUpgrade('energy', 11)) gain = gain.add(upgradeEffect('energy', 11))
	if (hasUpgrade('energy', 21)) gain = gain.times(upgradeEffect('energy', 21))
	if (hasUpgrade('energy', 22)) gain = gain.times(upgradeEffect('energy', 22))
	gain = gain.div(player.points.add(1).pow(player.energy.nerfExp))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Current Endgame: 1e11800 Matter",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e11800"))
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