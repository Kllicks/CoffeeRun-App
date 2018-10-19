//|==============|
//| DOM Selection|
//|==============|
const orderForm = document.querySelector(`[data-form]`);
const notificationArea = document.querySelector(`[data-notification]`);


//|=================|
//| Helper Functions|
//|=================|
function handleSubmit(event) {
    event.preventDefault();
    console.log(`you get a coffee and you get a coffee and you get a coffee`);

    console.log(event.target);
    // debugger;
    // We're gonna Ajax that thing
    // Call fetch() 
    // pass it the URL
    // and an object with a method and a body
    const url = event.target.action;
    const method = event.target.method;
    const elements = event.target.elements;
    const data = {
        strength: elements.strength.value,
        flavor: elements.flavor.value,
        size: elements.size.value,
        coffee: elements.coffee.value,
        emailAddress: elements.emailAddress.value,
    }
    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(() => {
        notifyUser(`Your coffee order is complete`);
    }) // gotta wrap it in an anonymous function
    // debugger;

}

function notifyUser(notificationText) {
    // create a div
    const notificationBox = document.createElement('div');
    // add some text content
    notificationBox.textContent = notificationText;

    notificationArea.innerHTML = ``;
    // append to...something...somewhere...shomehow...
    notificationArea.appendChild(notificationBox);

}
//|=====================|
//| Main Event Listeners|
//|=====================|
console.log(`about to add event listener!`);
orderForm.addEventListener(`submit`, handleSubmit);
