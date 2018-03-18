function renderDeck()
{
	deck.deck().map(card => {
		document.getElementById("deck").appendChild(deck.getCardUI(card));
	});
}

function start()
{
    deck.init();
    console.log(deck.deck())
	renderDeck();
}

window.onload = start;