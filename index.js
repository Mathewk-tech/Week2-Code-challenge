const guests = [];

// Get elements from the HTML
const form = document.getElementById('Guest-form');
const nameInput = document.getElementById('guest-name');
const categorySelect = document.getElementById('category');
const guestList = document.getElementById('guest-list');
const guestCountDisplay = document.getElementById('display');
const emptyState = document.getElementById('empty-state');
const notattendingdoc=document.getElementById('not-attending-count');
const attendingdoc=document.getElementById('attending-count');

// Listen for form submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Stop the page from refreshing

  const name = nameInput.value.trim(); // Get the guest name
  const category = categorySelect.value; // Get the guest category

  // get a new date (locale machine date time)
var date = new Date();
// get the date as a string
var n = date.toDateString();
// get the time as a string
var time = date.toLocaleTimeString();

// log the date in the browser console
console.log('date:', n);
// log the time in the browser console
console.log('time:',time);

  if (name === '') return; // Don't add if the name is empty

  // Add guest to the list
  guests.push({ name: name, category: category,attending:true,time: time});

  // Show the updated guest list
  updateGuestList();
  calculateAttendes();
console.log(guests);
  // Clear the input field
  nameInput.value = '';
});

// Function to show all guests
function updateGuestList() {
  // Clear the current list
  guestList.innerHTML = '';

  // Go through each guest
  guests.forEach(function (guest, index) {
    // Create a list item
    const li = document.createElement('li');
    li.className = 'guest-item';

    // Add guest name and category
    li.innerHTML = `
      <div class="guest-info">
        <div class="guest-name">
          <span class="category-icon">👤</span>
          <span class="name">${guest.name}</span>
        </div>
        <div class="guest-meta">
          <span class="category-tag ${guest.category}">${guest.category}</span>
           <span class="tag ${guest.time}">${guest.time}</span>
        </div>
      </div>
    `;

   
    const label=document.createElement('label');
    label.className='switch';
    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    const slider=document.createElement('span');
    slider.className='slider';

    label.appendChild(checkbox);
    label.appendChild(slider);

    checkbox.checked=guest.attending || false;
    checkbox.addEventListener('change', function () {
    guest.attending = checkbox.checked;
    console.log(`${guest.name} is ${checkbox.checked ? 'attending' : 'not attending'}`);
    calculateAttendes();
  });

  li.appendChild(label);

  guestList.appendChild(li);

 // Create a delete button

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '🗑️';
    deleteBtn.title = 'Delete guest';
    deleteBtn.className = 'btn-remove';
    
    // When clicked, remove the guest
    deleteBtn.addEventListener('click', function () {
      guests.splice(index, 1); // Remove guest from array
      updateGuestList(); // Show updated list
      calculateAttendes();
    });

    // Add button to the list item
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'guest-actions';
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(actionsDiv);
    guestList.appendChild(li);
  });

  // Update the counter
  guestCountDisplay.textContent = `${guests.length}/10 guests`;
  if(guests.length>10){
    alert("you have exceeded the limit");
    return;
  }

  // Show or hide the empty state message
  if (guests.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
}
function calculateAttendes(){
let attending=guests.filter(function(attendee){

  return attendee.attending === true;
});

let notattending=guests.filter(function(attendee){

 return attendee.attending === false;
});

notattendingdoc.textContent=`${notattending.length}`;
attendingdoc.textContent=`${attending.length}`;
}

