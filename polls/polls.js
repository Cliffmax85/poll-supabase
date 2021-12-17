import {
    logout,
    checkAuth,
    createPoll,
    getPolls,

} from '../fetch-utils.js';

import { renderPoll } from '../render-utils.js';

// check if authorized
checkAuth();

const currentPollEl = document.querySelector('.current-poll-container');
const pastPollsContainer = document.querySelector('.past-polls');
const questionEl = document.getElementById('poll-question');
const optionATitlel = document.getElementById('option-a-title');
const optionBTitleEl = document.getElementById('option-b-title');
const optionAVotesEl = document.getElementById('option-a-votes');
const optionBVotesEl = document.getElementById('option-b-votes');
const optionAButtonEl = document.getElementById('vote-a');
const optionBButtonEl = document.getElementById('vote-b');
const closePollButton = document.getElementById('close-poll-button');
const pollFormEl = document.querySelector('#poll-form');
const logoutButtonEl = document.getElementById('logout');

let question = '';
let optionA = '';
let optionB = '';
let votesA = '0';
let votesB = '0';


pollFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(pollFormEl);

    question = data.get('question');
    optionA = data.get('option-a');
    optionB = data.get('option-b');
    // votesA = data.get('vote-a');
    //votesB = data.get('vote-b');

    questionEl.textContent = question;
    optionATitlel.textContent = optionA;
    optionBTitleEl.textContent = optionB;
    optionAVotesEl.textContent = votesA;
    optionBVotesEl.textContent = votesB;



    pollFormEl.reset();
}); 

optionAButtonEl.addEventListener('click', () => {
    votesA++;
    displayCurrentPoll();
});

optionBButtonEl.addEventListener('click', () => {
    votesB++;
    displayCurrentPoll();
});

logoutButtonEl.addEventListener('click', () => {
    logout();
});

closePollButton.addEventListener('click', async() => {
    const poll = {
        optionA,
        optionB,
        votesA,
        votesB,
    };
    await createPoll(poll);

    displayAllPolls();

    optionA = '';
    optionB = '';
    votesA = '0';
    votesB = '0';

    displayCurrentPoll();

});

function displayCurrentPoll() {
    currentPollEl.textContent = '';
    questionEl.textContent = 'question';
    optionATitlel.textContent = 'optionA';
    optionBTitleEl.textContent = 'optionB';
    optionAVotesEl.textContent = 'votesA';
    optionBVotesEl.textContent = 'votesB';

//     const newPoll = {
//         question,
//         optionA,
//         optionB,
//         votesA,
//         votesB,
//     };

//     const pollEl = renderPoll(newPoll);
//     currentPollEl.append(pollEl);

}

async function displayAllPolls() {
    const polls = await getPolls();
    pastPollsContainer.textContent = '';

    for (let poll of polls) {
        const pollEl = renderPoll(poll);
        pastPollsContainer.append(pollEl);
    }
}