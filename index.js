// Use the provided index.html
// -----------------------------------------------------------------------------------

// 1. USA
// Define function getUSA()
// Find the html element that contains "USA".
// Print that element's contents.
function getUSA() {
    const topElement = document.firstElementChild;
    const usaElement = findUSAContents(topElement, 0)
    if (usaElement) {
        console.log(usaElement);
        console.log(usaElement.innerText);
    } else {
        console.log("No USA element");
    }
}

function findUSAContents(element) {
    if (element && element.innerText && element.innerText.includes("USA")) {
        if (element.children) {
            for (let child of element.children) {
                const childUSA = findUSAContents(child);
                if (childUSA) {
                    return childUSA;
                }
            }
        }
        return element;
    }
    return undefined;
}

// 2. Sales
// Define function getPeopleInSales()
// Print the names of all the people in the sales department.
function getPeopleInSales() {
    const rows = document.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const possibleRow = rows[i];
        if (possibleRow.children.length == 2) {
            // console.log(possibleRow);
            if (possibleRow.children[0].className === "empName") {
                if (possibleRow.children[1].textContent === "Sales")
                    console.log(possibleRow.children[0].textContent);
            }
        }
    }
}

// 3. Click Here
// Define function getAnchorChildren()
// Find all anchor elements with a <span> child.
// Print the contents of <span>
function getAnchorChildren() {
    const anchors = document.getElementsByTagName('a');
    for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];
        const spanChildren = anchor.getElementsByTagName('span');
        for (let j = 0; j < spanChildren.length; j++) {
            console.log(spanChildren[0].textContent);
        }
    }
}

// 4. Hobbies
// Define function getHobbies()
// Find the selected 'hobby' in the select element.
// Print the value and the contents.
function getHobbies() {
    const hobbySelector = document.getElementsByName('hobbies')[0];
    console.log(hobbySelector);
    const selectedElement = hobbySelector.options[hobbySelector.selectedIndex];
    console.log(selectedElement.value);
    console.log(selectedElement.textContent);
}

// 5. Custom Attribute
// Define function getCustomAttribute()
// Find all elements with "data-customAttr" attribute
// Print the value of the attribute.
// Print the element that has the attribute.
function getCustomAttribute() {
    const elements = document.querySelectorAll('[data-customAttr]');
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
        const ele = elements[i];
        console.log(ele.getAttribute('data-customAttr'));
        console.log(ele);
    }
}

// 6. Sum Event
// NOTE: Write unobtrusive Javascript
// Regarding these elements:
// 	<input id="num1" class="nums" type="text"/>
// 	<input id="num2" class="nums" type="text"/>
// 	<h3>Sum: <span id="sum"></span></h3>  
// Define onchange event handler.
// Add <input> element values.
// Put the sum in the <span> element.
// If values cannot be added, put "Cannot add" in the <span> element

document.getElementById('num1').addEventListener('change', makeSum);
document.getElementById('num2').addEventListener('change', makeSum);

function makeSum() {
    const num1 = document.getElementById('num1');
    const num2 = document.getElementById('num2');
    const sumSpan = document.getElementById('sum');
    const potentialSum = Number(num1.value) + Number(num2.value);
    if (!potentialSum) {
        sumSpan.textContent = 'Cannot add';
    } else {
        sumSpan.textContent = potentialSum;
    }
}



// 7. Skills Event
// NOTE: Write unobtrusive Javascript
// When user selects a skill, create an alert with a message similar to:
// 	"Are you sure CSS is one of your skills?"
// NOTE: no alert should appear when user deselects a skill.
// Note: Try bootstrap model rather then alert
document.getElementsByName('skills')[0].addEventListener('change', alertSkill);
function alertSkill() {
    const skillSelector = document.getElementsByName('skills')[0];
    const selectedElement = skillSelector.options[skillSelector.selectedIndex];

    const title = 'Skill Change Check';
    const text = `Are you sure \'${selectedElement.textContent}\' is one of your skills?`;
    const modal = createMessage(title, text);

    const body = document.getElementsByTagName('body')[0];
    body.appendChild(modal);
    modal.setAttribute('id', 'skillCheckMessageWindow');
    $('#skillCheckMessageWindow').modal({ show: true })

    // delete modal when done,so that the id is freed up
    $('#skillCheckMessageWindow').on('hidden.bs.modal', function (e) {
        body.removeChild(modal);
    })
}

function createMessage(title, text) {
    // surrounding divs
    const messageElement = document.createElement('div');
    messageElement.setAttribute('class', 'modal');
    messageElement.setAttribute('tabindex', -1);
    messageElement.setAttribute('role', 'dialog');

    const messageDialog = document.createElement('div');
    messageDialog.setAttribute('class', 'modal-dialog');
    messageDialog.setAttribute('role', 'document');
    messageElement.appendChild(messageDialog);

    const messageContent = document.createElement('div');
    messageContent.setAttribute('class', 'modal-content');
    messageDialog.appendChild(messageContent);


    // inner divs
    const messageheader = document.createElement('div');
    messageheader.setAttribute('class', 'modal-header');
    messageContent.appendChild(messageheader);

    const messagebody = document.createElement('div');
    messagebody.setAttribute('class', 'modal-body');
    messageContent.appendChild(messagebody);

    const messagefooter = document.createElement('div');
    messagefooter.setAttribute('class', 'modal-footer');
    messageContent.appendChild(messagefooter);

    // header divs
    const messagetitle = document.createElement('h5');
    messagetitle.setAttribute('class', 'modal-title');
    messagetitle.innerText = title;
    messageheader.appendChild(messagetitle);

    const messageTitleButton = document.createElement('button');
    messageTitleButton.setAttribute('type', 'button');
    messageTitleButton.setAttribute('class', 'close');
    messageTitleButton.setAttribute('data-dismiss', 'modal');
    messageTitleButton.setAttribute('aria-label', 'Close');
    messageheader.appendChild(messageTitleButton);

    // const messageButtonText = document.createElement('span');
    // messageButtonText.setAttribute('aria-hidden', 'true');
    // messageButtonText.innerText = `&times;`;
    // messageTitleButton.appendChild(messageButtonText);

    // body divs
    const messageText = document.createElement('p');
    messageText.innerText = text;
    messagebody.appendChild(messageText);

    // footer divs
    const messageCloseButton = document.createElement('button');
    messageCloseButton.setAttribute('type', 'button');
    messageCloseButton.setAttribute('class', 'btn btn-secondary');
    messageCloseButton.setAttribute('data-dismiss', 'modal');
    messageCloseButton.innerText = 'close';
    messagefooter.appendChild(messageCloseButton);

    // messageCloseButton.addEventListener("click", function () {
    //     console.log('Close')
    //     messageElement.modal('dispose');
    // });
    return messageElement;
}

// 8. Favorite Color Event
// NOTE: Write unobtrusive Javascript
// NOTE: This is regarding the favoriteColor radio buttons.
// When a user selects a color, create an alert with a message similar to:
// 	"So you like green more than blue now?"
// In this example, green is the new value and blue is the old value.
// Make the background color (of all favoriteColor radio buttons) the newly selected favoriteColor
let currentFavoriteRadioButtonColor = 'white';
let radioColorButtons = document.getElementsByName('favoriteColor');
for (let colorRadio of radioColorButtons) {
    colorRadio.addEventListener('change', function (event) {
        alertColorRadioButtonSelect(event);
    });
}
function alertColorRadioButtonSelect(event) {
    let newColor = event.target.value;

    const title = 'New Favorite Color';
    const text = `So you like ${newColor}` +
        ` more than ${currentFavoriteRadioButtonColor} now?`;
    const modal = createMessage(title, text);

    const body = document.getElementsByTagName('body')[0];
    body.appendChild(modal);
    modal.setAttribute('id', 'radioColorFavoriteCheckMessageWindow');
    $('#radioColorFavoriteCheckMessageWindow').modal({ show: true })

    // delete modal when done,so that the id is freed up
    $('#radioColorFavoriteCheckMessageWindow').on('hidden.bs.modal', function (e) {
        body.removeChild(modal);
    })

    let radioColorButtonDivs = document.querySelectorAll('div.favoriteColorDiv');
    for (let colorRadio of radioColorButtonDivs) {
        colorRadio.setAttribute('style', `background-color: ${newColor}`);
    }
    currentFavoriteRadioButtonColor = newColor;
}


// 9. Show/Hide Event
// NOTE: Write unobtrusive Javascript
// When user hovers over an employees name:
// 	Hide the name if shown.
// 	Show the name if hidden.
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
let employeeNameElementList = document.querySelectorAll('.empName');
for (let employeNameElement of employeeNameElementList) {
    let employeeNameText = employeNameElement.innerText;
    employeNameElement.setAttribute('data-toggle', `tooltip`);
    employeNameElement.setAttribute('data-placement', `top`);
    employeNameElement.setAttribute('title', employeeNameText);
}


// 10. Current Time
// Regarding this element:
// 	<h5 id="currentTime"></h5>
// Show the current time in this element in this format: 9:05:23 AM
// The time should be accurate to the second without having to reload the page.
timerUpdater();
function timerUpdater() {
    const timeElement = document.getElementById('currentTime');
    const currentDateObject = new Date();
    const currentHour = currentDateObject.getHours();
    const currentMinute = currentDateObject.getMinutes();
    const currentSecond = currentDateObject.getSeconds();
    const twelveHour = currentHour < 12 ? 'AM' : 'PM';
    const currentTime = `${currentHour}:${currentMinute}:${currentSecond} ${twelveHour}`;
    timeElement.innerText = currentTime;
    setTimeout(timerUpdater, 1000);
}

// 11. Delay
// Regarding this element:
// 	<p id="helloWorld">Hello, World!</p>
// Three seconds after a user clicks on this element, change the text to a random color.
const helloWorldElement = document.getElementById('helloWorld');
helloWorldElement.addEventListener('click',
    () => {
        setTimeout(() => {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            const rgbText = `rgb(${red},${green},${blue})`
            helloWorldElement.setAttribute('style', `color: ${rgbText}`);
        }, 3000)
    }
);




// 12. Walk the DOM
// Define function walkTheDOM(node, func)
// This function should traverse every node in the DOM. Use recursion.
// On each node, call func(node).
function walkTheDOM(element) {
    func(element);
    for (let child of element.children) {
        const childUSA = walkTheDOM(child);
    }
}
