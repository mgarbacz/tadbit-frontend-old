var TadbitRouter = require('router');

// Called when page is done loading
$(function() {
    // Starts up our entire app
    Tadbit = new TadbitRouter();
    Tadbit.start();

    // Header on scroll stuff, TODO move to its own file
    window.addEventListener('scroll', function(e) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 70;

        if (distanceY > shrinkOn) {
            $('header').addClass('shrink');
        } else {
            $('header').removeClass('shrink');
        }
    });

    // Logo stuff, TODO move to its own file
    var mainColor = '#eeff41';
    var pairColor = '#009688';

    var logoCanvas = $('#logo')[0];
    var context = logoCanvas.getContext('2d');

    // 3/4ths of a circle, top exposed
    context.strokeStyle = mainColor;
    context.lineWidth = 12;
    context.lineCap = 'round';
    context.beginPath();
    context.arc(40, 40, 30, -0.25 * Math.PI, 1.25 * Math.PI, false);
    context.stroke();
    context.closePath();

    // Tadpole tail
    context.fillStyle = mainColor;
    context.beginPath();
    context.moveTo(32, 32);
    context.quadraticCurveTo(40, -30, 48, 30);
    context.fill();
    context.closePath();

    // Tadpole legs
    context.strokeStyle = mainColor;
    context.lineWidth = 4;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(32, 28);
    context.lineTo(30, 16);
    context.moveTo(48, 28);
    context.lineTo(50, 16);
    context.stroke();
    context.closePath();

    // Tadpole head
    context.fillStyle = mainColor;
    context.beginPath();
    context.arc(40, 40, 16, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();

    // Tadpole eyes
    context.beginPath();
    context.fillStyle = pairColor;
    context.arc(34, 44, 4, 0, 2 * Math.PI, false);
    context.arc(46, 44, 4, 0, 2 * Math.PI, false);
    context.fill();
    context.closePath();

    // Make tadpole eyes glint red on mouseover
    $('#logo').mouseenter(function() {
        context.beginPath();
        context.fillStyle = '#aa0000';
        context.arc(34, 44, 4.5, 0, 2 * Math.PI, false);
        context.arc(46, 44, 4.5, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();

        window.setTimeout(function() {
            context.fillStyle = mainColor;
            context.beginPath();
            context.arc(40, 40, 16, 0, 2 * Math.PI, false);
            context.fill();
            context.closePath();
            context.beginPath();
            context.fillStyle = pairColor;
            context.arc(34, 44, 4, 0, 2 * Math.PI, false);
            context.arc(46, 44, 4, 0, 2 * Math.PI, false);
            context.fill();
            context.closePath();
        }, 600);
    });

    // Logo stuff, TODO move to its own file
    var logoShrinkCanvas = $('#logo-shrink')[0];
    var shrinkContext = logoShrinkCanvas.getContext('2d');

    // 3/4ths of a circle, top exposed
    shrinkContext.strokeStyle = mainColor;
    shrinkContext.lineWidth = 6;
    shrinkContext.lineCap = 'round';
    shrinkContext.beginPath();
    shrinkContext.arc(20, 20, 15, -0.25 * Math.PI, 1.25 * Math.PI, false);
    shrinkContext.stroke();
    shrinkContext.closePath();

    // Tadpole tail
    shrinkContext.fillStyle = mainColor;
    shrinkContext.beginPath();
    shrinkContext.moveTo(16, 15);
    shrinkContext.quadraticCurveTo(20, -15, 24, 15);
    shrinkContext.fill();
    shrinkContext.closePath();

    // Tadpole legs
    shrinkContext.strokeStyle = mainColor;
    shrinkContext.lineWidth = 2;
    shrinkContext.lineCap = 'round';
    shrinkContext.beginPath();
    shrinkContext.moveTo(16, 14);
    shrinkContext.lineTo(15, 8);
    shrinkContext.moveTo(24, 14);
    shrinkContext.lineTo(25, 8);
    shrinkContext.stroke();
    shrinkContext.closePath();

    // Tadpole head
    shrinkContext.fillStyle = mainColor;
    shrinkContext.beginPath();
    shrinkContext.arc(20, 20, 8, 0, 2 * Math.PI, false);
    shrinkContext.fill();
    shrinkContext.closePath();

    // Tadpole eyes
    shrinkContext.beginPath();
    shrinkContext.fillStyle = pairColor;
    shrinkContext.arc(17, 22, 2, 0, 2 * Math.PI, false);
    shrinkContext.arc(23, 22, 2, 0, 2 * Math.PI, false);
    shrinkContext.fill();
    shrinkContext.closePath();

    // Make tadpole eyes glint red on mouseover
    $('#logo-shrink').mouseenter(function() {
        shrinkContext.beginPath();
        shrinkContext.fillStyle = '#aa0000';
        shrinkContext.arc(17, 22, 2.25, 0, 2 * Math.PI, false);
        shrinkContext.arc(23, 22, 2.25, 0, 2 * Math.PI, false);
        shrinkContext.fill();
        shrinkContext.closePath();

        window.setTimeout(function() {
            shrinkContext.fillStyle = mainColor;
            shrinkContext.beginPath();
            shrinkContext.arc(20, 20, 8, 0, 2 * Math.PI, false);
            shrinkContext.fill();
            shrinkContext.closePath();
            shrinkContext.beginPath();
            shrinkContext.fillStyle = pairColor;
            shrinkContext.arc(17, 22, 2, 0, 2 * Math.PI, false);
            shrinkContext.arc(23, 22, 2, 0, 2 * Math.PI, false);
            shrinkContext.fill();
            shrinkContext.closePath();
        }, 600);
    });

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
