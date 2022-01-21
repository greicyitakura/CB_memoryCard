let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  places: [
    "riodejaneiro",
    "belohorizonte",
    "curitiba",
    "jericoacora",
    "salvador",
    "joaopessoa",
    "manaus",
    "jalapao",
    "belem",
    "florianopolis",
  ],

  cards: null,

  setCard: function (id){

    let card = this.cards.filter(card => card.id === id)[0];
    console.log(card);

    if(card.flipped || this.lockMode){
        return false;
    }
    if(!this.firstCard){
        this.firstCard = card;
        this.firstCard.flipped = true;
        return true;
    }else{
        this.secondCard = card;
        this.secondCard.flipped = true;
        this.lockMode = true;
        return true;
    }
  },

  checkMatch: function(){
      if(!this.firstCard || !this.secondCard){
          return false;
      }
      return this.firstCard.icon === this.secondCard.icon;

  },

  clearCards: function(){
      this.firstCard = null;
      this.secondCard = null;
      this.lockMode = false;

  },

  unflipledCards(){
      this.firstCard.flipped =  false;
      this.secondCard.flipped = false;
      this.clearCards();

  },

  checkGameOver(){
     return this.cards.filter(card => !card.flipped).length == 0;
  },


  createCardsFromPlaces: function () {
    this.cards = [];

    this.places.forEach((place) => {
      this.cards.push(this.createPairFromPlace(place));
    });
    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },

  createPairFromPlace: function (place) {
    return [
      {
        id: this.createIdWithPlace(place),
        icon: place,
        flipped: false,
      }, {
        id: this.createIdWithPlace(place),
        icon: place,
        flipped: false,
      }]
  },

  createIdWithPlace: function (place) {
    return place + parseInt(Math.random() * 1000);
  },

  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],this.cards[randomIndex]];
    }
  }
}
