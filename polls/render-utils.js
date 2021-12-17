export function renderPoll(poll) {
    const div = document.createElement('div');
    const question = renderInputs(poll.question);
    const optionADiv = renderInputs(poll.optionA, poll.votesA);
    const optionBDiv = renderInputs(poll.optionB, poll.votesB);

    div.append(optionADiv, optionBDiv)

    return div;
}

export function renderInputs