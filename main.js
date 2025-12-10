const troops = require('./jsons/troops.json');
const buildings = require('./jsons/buildings.json');
const spells = require('./jsons/spells.json');
const tt = require('./jsons/tower-troops.json');
const evos = require('./jsons/evo.json');

const evo_percent = 0.5;
const evo_counter = 2;

const allCards = [...buildings, ...troops,...spells];

function chanceEvo(card, currentEvos) {
    if (currentEvos >= evo_counter) return card;

    const evoCheck = evos.find(e => e.toLowerCase().includes(card.toLowerCase())); 
    if (evoCheck && Math.random() < evo_percent) {
     return evoCheck;
    }
    return card;
}

function getDeck(array, count){
    const random = array.slice().sort(() => 0.5 - Math.random());
    let evoNumber = 0; 

    return random.slice(0, count).map(card => { 
        const evoCard = chanceEvo(card, evoNumber);
        if (evos.includes (evoCard)) evoNumber++;
    return evoCard
    });

}

const randomDeck = getDeck(allCards, 8);
const randomTT = tt[Math.floor(Math.random() * tt.length)];

function generateRoyaleApiLink(deck) {
    const formattedDeck = deck.map(card => {
        const lower = card.toLowerCase();
        if (evos.includes(card)) {
            const base = lower.replace("evo ", "").replace(/ /g, "-");
            return `${base}-ev1`;
        }
        return lower.replace(/ /g, "-");
    }).join(',');

    return `https://royaleapi.com/decks/stats/${formattedDeck}`;
}

const royaleApiLink = generateRoyaleApiLink(randomDeck);

console.log("Your randomized deck:", randomDeck.join(", "));
console.log("Tower troop for this deck:", randomTT);
console.log("RoyaleAPI link for the deck:", royaleApiLink);
