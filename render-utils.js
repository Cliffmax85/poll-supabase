export function renderPoll(poll) {
    const div = document.createElement('div');
    const question = renderInputs(poll.question);
    const optionADiv = renderInputs(poll.optionA, poll.scoreA);
    const optionBDiv = renderInputs(poll.optionB, poll.scoreB);

    div.append(question, optionADiv, optionBDiv);

    return div;
}

export function renderInputs(option, vote) {
    const div = document.createElement('div');
    const optionEl = document.createElement('p');
    const voteEl = document.createElement('p');

    
    optionEl.textContent = option;
    voteEl.textContent = vote;

    div.append(optionEl, voteEl);

    div.classList.add('input');
    optionEl.classList.add('option');
    voteEl.classList.add('vote');

    return div;
}