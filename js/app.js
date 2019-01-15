/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global $, jQuery, alert*/

// Single state object
var STORE = { // currentQuestion, currentAnswersCorrect, currentUserAnswer, question (q,a,u,c,r), history
	currentQ: 0,
    currentAnswersCorrect: 0,
	currentUserAnswer: null,
	questions: [{
					// [0] (INTRO)
					q: 'Welcome to this brand spanking new quiz. How well do you know volleyball?',
					a: ['Choose wisely', 'Only the penitent vballer will pass.', 'Have fun and good luck!'],
					u: null,
					c: null,
					r: null
				},{
					// [1]
					q:'Which is NOT a basic skill of volleyball?',
					a: ['Serve', 'Pass', 'Lift', 'Set', 'Hit', 'Block'],
					u: null,
					c: 2,
					r: null
				},{
					// [2]
					q: 'What is a Libero?',
					a: ['A player that is free to attack from the back row', 'A player that can freely talk to the ref', 'A player specialized in attacking and blocking skills', 'A player specialized in defensive skills', null, null],
					u: null,
					c: 3,
					r: null
				},{
					// [3]
					q: 'Which is NOT a position in Volleyball?',
					a: ['Outside Hitter', 'Backrow Hitter', 'Middle', 'Setter', 'Opposite', 'Libero'],
					u: null,
					c: 1,
					r: null
				},{
					// [4]
					q: 'What is a pancake?',
					a: ['That yummy and fluffy hotcake you put syrup on', 'When a player blocks an attacker and the ball goes straight down', 'When a ball bounced off a player\'s hand', 'When a spike hits an opponent\'s face', null, null],
					u: null,
					c: 2,
					r: null
				},{
					// [6]
					q: 'Which is NOT a common offensive systems in volleyball',
					a: ['3-4', '6-2', '5-1', '4-2', null, null],
					u: null,
					c: 0,
					r: null
				},{
					// [5]
					q: 'What is a roof?',
					a: ['That thing on top of your house', 'When a team is beating the other team by a large margin', 'When a player digs a ball using open hand above his or her head', 'When a player blocks an attacker and the ball goes straight down', null, null],
					u: null,
					c: 3,
					r: null
				},{
					// [7]
					q: 'What is a floater?',
					a: ['When a serve has no spin and follows an erratic path', 'When a pass reaches the setter perfectly', 'When a serve just makes it over the net', 'When ice cream floats to the top of pop', 'When a spike sails out of bounds', null],
					u: null,
					c: 0,
					r: null
				},{
					// [8]
					q: 'What was the original name of Volleyball?',
					a: ['YMCA Ball', 'Gym Ball', 'Mintonette', 'Net Ball', 'Bareebolu', null],
					u: null,
					c: 2,
					r: null
				},{
					// [9]
					q: 'What is a tandem?',
					a: ['When two players hit the ball at the same time  ', 'When two opposing players hit the ball above the net', 'When two players sub in/out at the same time', 'When a player attacks immediately behind another player\s fake swing', null, null],
					u: null,
					c: 3,
					r: null
				},{
					// [10]
					q: 'What is a party ball?',
					a: ['A ball that can be attacked on first contact', 'A ball filled with beer', 'A ball that can easily be passed', 'A ball that falls between multiple players', null, null],
					u: null,
					c: 0, 
					r: null
				},{
					// [11] (END)
					q: 'Good job finishing the quiz playa. See your results below:',
                    a: [],
                    u: null,
                    c: null,
                    r: null
                }]
	};

// State modification functions
function getUserAnswer(event){ //Gets checked answer
	STORE.currentUserAnswer = Number($('input:checked').val());
	return STORE.currentUserAnswer;
}



function handleSubmit(event){ //Handles submit
	event.preventDefault();
    $('#error').text('');
    
	if(STORE.currentQ == 11 ){ //If at end, submit will reload entire quiz
		console.log('RESTART');
		window.location.href='';
	}
	else if(STORE.currentQ == 0){
		console.log('BEGIN');
		renderQA(STORE.currentQ += 1); //Renders the new current page (next page)
	}
	else{
		console.log('SUBMIT');
        console.log($('input:checked').val());
        if ($('input:checked').val() === undefined){
			$('#error').text('You forgot to pick an answer baller!');
        }
        else {
            storeUserAnswer(getUserAnswer());
            checkUserAnswer(getUserAnswer());
        }
    }
}

function storeUserAnswer(answer){ // Push stored User Answer into the answerHistory array
	STORE.questions[STORE.currentQ].u = answer;
}	

function checkUserAnswer(userAnswer){ // check answer and push true if correct, false if incorrect
    if(userAnswer == STORE.questions[STORE.currentQ].c){
		STORE.questions[STORE.currentQ].r = 'Correct';
        STORE.currentAnswersCorrect = STORE.currentAnswersCorrect+1;
        console.log('AnswersCorrect is: '+STORE.currentAnswersCorrect)
		console.log('CORRECT!');
		$('#result').removeClass('incorrect').addClass('correct');
		displayResult('SCORE!')
	}
	else {
		STORE.questions[STORE.currentQ].r = 'Incorrect';
        console.log('AnswersCorrect is: '+STORE.currentAnswersCorrect)
        console.log('INCORRECT!');
		$('#result').removeClass('correct').addClass('incorrect');
		displayResult('SIDEOUT!')
	}
}

function getResults(){ // Match each user answer with appropriate question
	var resultsArray=[];
	for(i = 1 ; i < STORE.questions.length-1; i++){
		var question = STORE.questions[i].q;
		var answerNum = STORE.questions[i].u;
		var answerStr = STORE.questions[i].a[answerNum];
		resultsArray.push( {q:question, a:answerStr} );
	}
	return STORE.questions[11].a = resultsArray;
}

// Render functions
function initSelection(){ // CHECK FIRST RADIO AND GET IT AS THE CURRENT ANSWER
	$('input[value="'+STORE.currentUserAnswer+'"').prop('checked', false);
	getUserAnswer();
}

function renderQA(){ //Render current question and matching answers to the form
	var currentQ = STORE.currentQ;
    var currentAnswersCorrect = STORE.currentAnswersCorrect;
	$('#count').text('Question '+currentQ+' of '+(STORE.questions.length-2)); // Render question count
    $('#score').text('Your score: '+currentAnswersCorrect+'/'+(currentQ-1)); // Render question count
	$('#question').text(STORE.questions[currentQ].q); // Render question as form legend text
	$('#result').hide(); // Hide result DIV
	initSelection();	// Select first radio button

	if(currentQ == 0){ // INTRO
		$('#count').css('visibility', 'hidden');
        $('#score').css('visibility', 'hidden');
		STORE.questions[currentQ].a.forEach(function(answer, index){ // Render answers to radio labels
			var introHTML = `<p>${answer}</p>`;
			$('#intro').append(introHTML);
		});
		$('.radio-item').hide();
		$('#button-submit').show().text('Begin');
		$('#button-continue').hide();
	}
	else if(currentQ == 11){ // END
		$('#count').css('visibility', 'hidden');
        $('#score').css('visibility', 'hidden');
		getResults();
		for (i = 1; i < STORE.questions.length-1; i++){ // Render answers to radio labels
				var results = {
					n: i,
					q: STORE.questions[i].q,
					c: STORE.questions[i].a[STORE.questions[i].c],
					u: STORE.questions[i].a[STORE.questions[i].u],
					r: STORE.questions[i].r
				}
			var resultsHTML = `<p class="results-p"><span class="results-number">${results.n}.</span> <span class="results-question">${results.q}</span><br>Correct Answer: <span class="results-correct">${results.c}</span><br>Your Answer: <span class="results-user">${results.u}</span><br>Result: <span class="results-result">${results.r}</span></p>`;
			$('.radio-item').hide();
			$('#end-results').hide();
			$('#end-results').append(resultsHTML);
			$('#end-results').fadeIn();
			$('#button-submit').show().text('Restart');
			$('#button-continue').hide();
		};
	}
	else{
		$('#count').css('visibility', 'visible');
        $('#score').css('visibility', 'visible');
		$('#intro').hide();
		$('.radio-item').fadeIn();
		STORE.questions[currentQ].a.forEach(function(answer, index){ // Render answers to radio labels
			$('label[for="answer-'+index+'"]').text(answer);
            $('#answer-'+index).show();
            if (answer == null){
                $('#answer-'+index).hide();
            }
		});
		$('#button-submit').show().text('Submit');
		$('#button-continue').hide();
	}
	console.log('CurrentQ is: '+currentQ);
} 

function displayResult(result){ // Show if User Answer is correct or not
	$('.radio-item').hide();
	$('#button-submit').hide();
	$('#result').fadeIn();
	$('#result > p').text(result);
    $('#score').text('Your score: '+STORE.currentAnswersCorrect+'/'+STORE.currentQ); // Render question count
	$('#button-continue').show().unbind('click').click(function(e){
		e.preventDefault();
		console.log('currentq +1')
		renderQA(STORE.currentQ += 1); //Renders the new current page (next page)

	});
}

// Event listeners
function startListeners(form){ // Listen for answer selection and submit
	form.on('change','input[type=radio]', getUserAnswer)
		.on('submit', handleSubmit);
}

$(function(){ //Document Ready
	renderQA();
	startListeners($('form'));
	$('.no-fouc').removeClass('no-fouc');
});