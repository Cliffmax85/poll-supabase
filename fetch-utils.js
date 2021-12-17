const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwODU3MCwiZXhwIjoxOTU1MDg0NTcwfQ.b9_dCGIQkWfhzS3QZihLzQkD3n-sAt3L9swaEU7JzqI';
const SUPABASE_URL = 'https://rfwnchvtfqbachqhdfbi.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


export async function createPoll(question, option1, option2, votes1, votes2) {
    const response = await client

        .from('polls')
        .insert([
            {
                user_id: client.auth.user().id,
                question: question,
                optionA: option1,
                optionB: option2,
                scoreA: votes1,
                scoreB: votes2,
            },
        ]);
        console.log(response.data);
    return response.data;
}

export async function getPolls() {
    const response = await client
        .from('polls')
        .select();
    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../');
}

export async function redirectToPolls() {
    if (await getUser()) {
        location.replace('./polls');
    }
}

export async function signUpUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client
        .auth
        .signIn({ email, password });
    

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.console.error(error) : data;
}