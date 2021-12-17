// IMPORT MODULES under test here:
// import { example } from '../example.js';

import { renderPoll } from "../render-utils.js";
const test = QUnit.test;

test('time to test a function', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '<div><div class="input"><p class="option">which color</p><p class="vote"></p></div><div class="input"><p class="option">yellow</p><p class="vote">5</p></div><div class="input"><p class="option">red</p><p class="vote">4</p></div></div>';
    const poll = {
        question: 'which color',
        optionA: 'yellow',
        optionB: 'red',
        scoreA: 5,
        scoreB: 4,
    }
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderPoll(poll);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});
