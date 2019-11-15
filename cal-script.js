const calscreen = document.querySelector('#displayscreen')
const answer = document.querySelector('#answerscreen');
const allbtn = document.querySelectorAll('.btn');
const darkmodebtn = document.querySelector('.dark-mode');
const calbody = document.querySelector('.cal-body');

const _url = 'http://api.mathjs.org/v4/?expr=';
let bracket;
let dotactive = 1;

darkmodebtn.addEventListener(('click'), (e) => {

    // --theme - pink: #FF70ED;
    // --theme - green: #29EBC7;
    // --theme - light - orange: #FFF2F3;
    // --theme - light - pink: #FFF4FD;
    // --theme - light - gray: #F8FAFB;
    // --theme - dark: #000000;
    // --theme - orange: #FC5561;
    // --theme - white: #ffffff;

    console.log('dark mode clicked');
    getComputedStyle(document.documentElement).getPropertyValue("--theme-pink");
    document.documentElement.style.setProperty("--theme-light-pink", '#2E191E');
    document.documentElement.style.setProperty("--theme-pink", '#FF68EC');
    document.documentElement.style.setProperty("--theme-orange", '#E63E4B');
    document.documentElement.style.setProperty("--theme-light-orange", '#2E191E');
    document.documentElement.style.setProperty("--theme-light-grey", '#1F2B30');
    document.documentElement.style.setProperty("--theme-dark", '#ffffff');
    calbody.setAttribute('style', 'background-color: #000000');
    calscreen.classList.add('bg-verydark');
    calscreen.classList.add('text-white');
    answer.classList.add('bg-verydark');
    answer.classList.add('text-white');

})
allbtn.forEach((button) => {
    button.addEventListener(('click'), (e) => {
        checkbtn(button.textContent);
        performcalculation(calscreen.value);
    })
})

function checkbtn(text) {
    if (text == 'C') {
        calscreen.value = '';
        answer.value = 0;
    } else if (text == '%' || text == '/' || text == '*' || text == '+' || text == '-' || text == '(' || text == '=' || text == '.' || text == ')') {
        if (calscreen.value == '') {
            if (text == '.') {
                calscreen.value = '0.';
                dotactive = 0;
            } else if (text == '()') {
                bracket = 0;
                appendtext('(');
            }
        } else if (text === '=') {
            calscreen.value = answer.value;
            answer.value = '';
        } else {
            removedoublesign(text);
        }
    } else {
        appendtext(text);
    }
}

function appendtext(textcontent) {
    calscreen.value = calscreen.value + textcontent;
}

function removedoublesign(sign) {
    console.log("sign " + sign);
    const calvalue = calscreen.value;
    let removespace = calvalue.trim();
    let lastval = removespace[removespace.length - 1];

    console.log("lastval " + lastval);
    switch (sign) {
        case '/':
            if (dotactive = 0) {
                dotactive = 1;
            }
            if (lastval == '/') {

                console.log('lastvalu ' + lastval);
            } else if (lastval == '+' || lastval == '-' || lastval == '*' || lastval == '.') {
                replacelastindex(removespace, '/')

            } else {
                appendtext(' ' + sign + ' ');

            }
            break;
        case '*':
            if (dotactive = 0) {
                dotactive = 1;
            }
            if (lastval == '*') {
                console.log('lastvalu ' + lastval);
            } else if (lastval == '+' || lastval == '-' || lastval == '/' || lastval == '.') {
                replacelastindex(removespace, '*')
            } else {
                appendtext(' ' + sign + ' ');
            }
            break;
        case '+':
            if (dotactive = 0) {
                dotactive = 1;
            }
            if (lastval == '+') {
                console.log('lastvalu ' + lastval);
            } else if (lastval == '/' || lastval == '-' || lastval == '*' || lastval == '.') {
                replacelastindex(removespace, '+')
            } else {
                appendtext(' ' + sign + ' ');
            }
            break;
        case '-':
            if (dotactive = 0) {
                dotactive = 1;
            }
            if (lastval == '-') {
                console.log('lastvalu ' + lastval);
            } else if (lastval == '+' || lastval == '/' || lastval == '*' || lastval == '.') {
                replacelastindex(removespace, '-')
            } else {
                appendtext(' ' + sign + ' ');
            }
            break;
        case '%':
            if (dotactive = 0) {
                dotactive = 1;
            }
            if (lastval == '%') {
                console.log('lastvalu ' + lastval);
            } else {
                appendtext(' ' + sign + ' ');
            }
            break;
        case '.':
            if (lastval == '.') {
                console.log('lastvalu ' + lastval);
            } else if (lastval == '+' || lastval == '-' || lastval == '/' || lastval == '*' || lastval == ')' || lastval == '(' || lastval == '%') {
                appendtext('0' + sign);
            } else if (lastval == '1' || lastval == '2' || lastval == '3' || lastval == '4' || lastval == '5' || lastval == '6' || lastval == '7' || lastval == '8' || lastval == '9' || lastval == '0') {
                console.log('gbgg ' + removespace.search("."));
                if (dotactive = 0) {
                    dotactive = 1;
                } else if (removespace.search(".") == 0) {
                    dotactive = 0;
                    appendtext(sign);
                }
            } else {
                if (dotactive = 1) {
                    dotactive = 0;
                    appendtext(sign);
                }
                appendtext(sign);
            }
            break;
        case '()':
            if (dotactive = 0) {
                dotactive = 1;
            }
            if (lastval == '.') {
                console.log('lastvalu ' + lastval);
            } else if (lastval == '+' || lastval == '-' || lastval == '/' || lastval == '*' || lastval == ')' || lastval == '(' || lastval == '%') {
                appendtext('0' + sign);
            } else {
                appendtext(sign);
            }
            break;
        default:
            return;
    }
}

function performcalculation(value) {
    let cal = encodeURIComponent(value);
    let apiRequest = new XMLHttpRequest();
    console.log('url : ' + _url + cal);
    apiRequest.open('GET', _url + cal);
    apiRequest.send();


    apiRequest.onreadystatechange = () => {
        if (apiRequest.readyState === 4) {
            let theanswer = JSON.parse(apiRequest.response);
            answer.value = theanswer;
            console.log('wenw ' + JSON.stringify(apiRequest.response));
        }
    }


}

function replacelastindex(str, sign) {
    var index = [];
    for (var i = 0; i < str.length; i++) {
        console.log('fist ' + str[0] + ' second ' + str[1]);
        index.push(str[i]);
    }
    len = index.length;
    index[len - 1] = sign;
    calscreen.value = index.join("");
    calscreen.value = calscreen.value + " ";
}