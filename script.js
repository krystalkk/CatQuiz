const questions = [
    {
        id: 1,
        title: 'Can cats eat chocolate or raisins?',
        value: 'no'
    },
    {
        id: 2,
        title: 'Can a 10-month-old kitten be considered an adult cat?',
        value: 'no'
    },
    {
        id: 3,
        title: 'Is there a difference between the diets of a kitten and an adult cat?',
        value: 'yes'
    },
    {
        id: 4,
        title: 'Rabies vaccines are mandatory for cats in New York State.',
        value: 'yes'
    },
    {
        id: 5,
        title: 'To avoid the suffering, cats do not have to be neutered/spayed.',
        value: 'no'
    },
    {
        id: 6,
        title: 'The best age to neuter/spay a cat is around 5 to 6 months old.',
        value: 'yes'
    },
    {
        id: 7,
        title: 'Like dogs, indoor cats need to go outside once in a while.',
        value: 'no'
    },
    {
        id: 8,
        title: 'To keep your cat clean, you should bath your cat once a week.',
        value: 'no'
    }
];

const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');
const loginInfo = document.querySelector('.login-info');
const nextBtn = document.querySelector('.next-btn');

let nickname = localStorage.getItem('nickname');
if (nickname) {
    login(nickname);
}

let currentQaIndex = -1;
let score = 0;
nextBtn && nextBtn.addEventListener('click', () => {

    if (!nickname) {
        alert('Please login first');
        return;
    }

    if (currentQaIndex === 7) {
        localStorage.setItem('score', score);
        location.href = `end.html`;
        return;
    }

    if (currentQaIndex === 6) {
        document.querySelector('.next-btn').innerHTML = 'Submit';
    }

    const nextQa = questions[currentQaIndex + 1]
    if (currentQaIndex === -1) {
        document.querySelector('main .start').setAttribute('style', 'display:none;');
        document.querySelector('main .qa-content').setAttribute('style', 'display:block;');
    }
    
    if (currentQaIndex >= 0) {
        const answerEl = document.querySelector('input:checked');
        if (!answerEl) {
            alert('Please select the question`s value');
            return;
        }
        if (answerEl.value === questions[currentQaIndex].value) {
            score++;
        }
        answerEl.checked = false
    }
    
    currentQaIndex++;
    document.querySelector('.qa-content h3 span').innerText =  `${currentQaIndex + 1}. ${nextQa.title}`;
});

function toggleDialog(visible) {
    const diaplay = visible ? 'block' : 'none';
    document.querySelector('.login-dialog').setAttribute('style', `display:${diaplay};`);
}

const openDialog = () => toggleDialog(true);
const closeDialog = () => toggleDialog(false);
loginBtn.addEventListener('click', openDialog);
document.querySelector('.login-dialog .cancel-btn').addEventListener('click', closeDialog);
document.querySelector('.login-dialog .submit-btn').addEventListener('click', () => {
    const nickname = document.querySelector('.dialog-content input').value;
    if (!nickname) {
        alert('Please press your nickname');
        return;
    }

    login(nickname);

    closeDialog();
});

logoutBtn.addEventListener('click', logout);

function login (username) {
    nickname = username;
    localStorage.setItem('nickname', nickname);
    loginBtn.setAttribute('style', 'display:none;');
    loginInfo.setAttribute('style', 'display:block;');
    document.querySelector('.login-info span').innerHTML = nickname;
}

function logout () {
    currentQaIndex = -1;
    score = 0;
    localStorage.removeItem('nickname');
    nickname = '';
    if (location.pathname.endsWith('end.html')) {
        location.href = 'index.html';
    } else {
        loginBtn.setAttribute('style', 'display:block;');
        loginInfo.setAttribute('style', 'display:none;');
        document.querySelector('main .start').setAttribute('style', 'display:block;');
        document.querySelector('main .qa-content').setAttribute('style', 'display:none;');
    }
}