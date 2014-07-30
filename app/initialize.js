var TadbitRouter = require('router');

// Called when page is done loading
$(function() {
  // Starts up our entire app
  Tadbit = new TadbitRouter();
  Tadbit.start();

  // Logo stuff, TODO move to its own file
  var logoCanvas = $('#logo')[0];
  var context = logoCanvas.getContext('2d');

  // Style for circle and tadpole
  var mainColor = '#bb4444';
  var pairColor = '#fafafa';

  // 3/4ths of a circle, top exposed
  context.strokeStyle = mainColor;
  context.lineWidth = 6;
  context.lineCap = 'round';
  context.beginPath();
  context.arc(20, 20, 15, -0.25 * Math.PI, 1.25 * Math.PI, false);
  context.stroke();
  context.closePath();

  // Tadpole tail
  context.fillStyle = mainColor;
  context.beginPath();
  context.moveTo(16, 15);
  context.quadraticCurveTo(20, -15, 24, 15);
  context.fill();
  context.closePath();

  // Tadpole legs
  context.strokeStyle = mainColor;
  context.lineWidth = 2;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(16, 14);
  context.lineTo(15, 8);
  context.moveTo(24, 14);
  context.lineTo(25, 8);
  context.stroke();
  context.closePath();

  // Tadpole head
  context.fillStyle = mainColor;
  context.beginPath();
  context.arc(20, 20, 8, 0, 2 * Math.PI, false);
  context.fill();
  context.closePath();

  // Tadpole eyes
  context.beginPath();
  context.fillStyle = pairColor;
  context.arc(17, 22, 2, 0, 2 * Math.PI, false);
  context.arc(23, 22, 2, 0, 2 * Math.PI, false);
  context.fill();
  context.closePath();

});

// Testing the creation of a single card
function createCard(question, answer, difficulty, tags) {
  var card = new Card();

  card.set({ question: question });
  card.set({ answer: answer });
  card.set({ difficulty: difficulty });
  card.set({ tags: tags });

  card.save();
}

// Testing the destruction of a single card
function destroyCard(card_id) {
  var card = new Card({ id: card_id} );

  card.destroy();
}
