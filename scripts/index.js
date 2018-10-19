//|==============|
//| DOM Selection|
//|==============|
const orderForm = document.querySelector(`[data-form]`);
const notificationArea = document.querySelector(`[data-notification]`);
const resetButton = document.querySelector(`[data-reset-button]`);
const orderListingArea = document.querySelector(`[data-order-area]`);
const orderListingButton = document.querySelector(`[data-load-orders]`);

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
		emailAddress: elements.emailAddress.value
	};
	fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		body: JSON.stringify(data)
	})
		.then((r) => r.json())
		.then((orderInfo) => {
			// check the orderInfo for errors
			// && is a "falsey hunter"
			// It moves from left to right and will stop moving whene it finds the first falsey expression
			if (orderInfo.name && orderInfo.name === `ValidationError`) {
				notifyUser(`I'm sorry. Please fill out the coffee field and the email address field. Thank you.`);
			} else {
				notifyUser(`Your coffee order is complete`);
			}
		}); // gotta wrap it in an anonymous function
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

function confirmReset(e) {
	let doesWantToReset = confirm(`Really?`);
	if (!doesWantToReset) {
		e.preventDefault();
	}
}

function getAndShowOrders(event) {
	console.log(`click`);
	console.log(event);
}

//|=====================|
//| Main Event Listeners|
//|=====================|
console.log(`about to add event listener!`);
orderForm.addEventListener(`submit`, handleSubmit);
resetButton.addEventListener('click', confirmReset);
orderListingButton.addEventListener(`click`, getAndShowOrders);
