export class CardList {
  constructor(card,cards, cardsContainer) { 
    this.container = cardsContainer;
    this.cards = cards; 
    this.newCard = card;
  }

  addCard(formCard) {
    event.preventDefault();
  
    this.container.appendChild(this.newCard.create(formCard.elements.name.value, formCard.elements.link.value)); 

    formCard.reset();

  }

  renderCards(container, cards, newCard) {
      cards.forEach(function (item) {
      container.appendChild(newCard.create(item.name, item.link)); 
    });

  }
}