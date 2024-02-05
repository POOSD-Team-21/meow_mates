// Grab the user from local storage
const user = JSON.parse(localStorage.getItem('user'));

// If the user is not logged in, redirect to the sign-in page
//if (!user) {
//window.location.href = '/sign-in';
//}

// Allows html to be formatted with Prettier
const html = String.raw;

// NOTE: Do not use comments in the html template literals

/* Modal code */

// Dummy pet data (to be replaced with real data)
const dummyPets = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    type: 'cat',
    caretakerFirstName: 'Caleb',
    caretakerLastName: 'Rivera',
    caretakerEmail: 'calebrossr@gmail.com',
    caretakerPhone: '2392934504',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    type: 'dog',
    caretakerFirstName: 'Caleb',
    caretakerLastName: 'Rivera',
    caretakerEmail: 'calebrossr@gmail.com',
    caretakerPhone: '2392934504',
  },
  {
    id: 3,
    firstName: 'John',
    lastName: 'Doe',
    type: 'dog',
    caretakerFirstName: 'Caleb',
    caretakerLastName: 'Rivera',
    caretakerEmail: 'calebrossr@gmail.com',
    caretakerPhone: '2392934504',
  },
  {
    id: 4,
    firstName: 'John',
    lastName: 'Doe',
    type: 'dog',
    caretakerFirstName: 'Caleb',
    caretakerLastName: 'Rivera',
    caretakerEmail: 'calebrossr@gmail.com',
    caretakerPhone: '2392934504',
  },
  {
    id: 5,
    firstName: 'John',
    lastName: 'Doe',
    type: 'dog',
    caretakerFirstName: 'Caleb',
    caretakerLastName: 'Rivera',
    caretakerEmail: 'calebrossr@gmail.com',
    caretakerPhone: '2392934504',
  },
];

function flip(card) {
  // First child is the inner card element we want to animate flipping
  card.classList.toggle('rotate-y-180');

  // Flip all buttons in the card
  const buttons = card.parentElement.querySelectorAll('button');
  buttons.forEach((button) => {
    button.classList.toggle('rotate-y-180');
  });
}

// Grab the card grid where we will display the pet cards
const cardGrid = document.querySelector('#card-grid');

// For each pet, create a card
const cards = dummyPets.map((dummyPet) => {
  // sets image to what type of animal it is
  let imageSrc;

  // for each image, based on type uses the correct image for it
  switch (dummyPet.type) {
    // for dogs
    case 'dog':
      imageSrc = '/assets/pet_images/dog.jpg';
      altText = 'Image of a dog representing dog pets';
      break;

    // for cats
    case 'cat':
      imageSrc = '/assets/pet_images/cat.jpg';
      altText = 'Image of standard issue cat, representing cat pets';
      break;

    // for birds
    case 'bird':
      imageSrc = 'path/to/bird-image.jpg';
      altText = 'Image of a colorful parrot, representing bird pets';
      break;

    // for sharks
    case 'shark':
      imageSrc = '/assets/pet_images/shark.jpg';
      altText = 'Image of a shark, representing shark pets';
      break;

    // for fish
    case 'fish':
      imageSrc = '/assets/pet_images/fish.jpg';
      altText = 'Image of a gold fish, representing fish pets';
      break;

    // for reptiles
    case 'reptile':
      imageSrc = '/assets/pet_images/reptile.jpg';
      altText = 'Image of a snake representing reptile pets';
      break;

    // it was not a case or is an other type
    default:
      // Default image for unknown types
      imageSrc = '/assets/pet_images/other.jpg';
      altText = 'Image of hamster, representing other types of pets.';
  }

  return html`
    <div class="group h-full w-full" style="perspective: 1000px" onclick="flip(this.children[0])">
      <div
        role="button"
        class="flex h-[300px] w-full rounded-md text-left ring-main-text-color transition-all duration-300 transform-style-3d focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-background-color group-hover:-translate-y-2"
        tabindex="0"
      >
      <div class="absolute h-full w-full overflow-hidden rounded-md border border-main-text-color bg-white p-6 text-main-text-color shadow-md backface-hidden flex items-center justify-center">
      <div class="flex items-center">
        <div class="mr-8">
          <img
            src="${imageSrc}"
            alt="${altText}"
            class="w-32 h-32 rounded-full"
          />
        </div>
        <dl>
          <dt><strong>First Name:</strong></dt>
          <dd>${dummyPet.firstName}</dd>
    
          <dt><strong>Last Name:</strong></dt>
          <dd>${dummyPet.lastName}</dd>
    
         </dl>
      </div>
    </div>
        <div
          class="absolute h-full w-full overflow-hidden rounded-md border border-main-text-color bg-white p-6 text-main-text-color shadow-md rotate-y-180 backface-hidden"
        >
        <dl>
          <dt><strong>First Name:</strong></dt>
          <dd>${dummyPet.caretakerFirstName}</dd>
    
          <dt><strong>Last Name:</strong></dt>
          <dd>${dummyPet.caretakerLastName}</dd>

          <dt><strong>Email:</strong></dt>
          <dd>${dummyPet.caretakerEmail}</dd>

          <dt><strong>Phone Number:</strong></dt>
          <dd>${dummyPet.caretakerPhone}</dd>

          <dt><strong>Date Created:</strong></dt>
          <dd>${dummyPet.dateCreated}</dd>
    
         </dl>
        </div>
      </div>
      <div class="fixed bottom-6 right-6 flex gap-2">
        <button
          onclick="event.stopPropagation(); showModal('delete', ${dummyPet.id})"
          class="z-40 rounded-md bg-[#B40100] p-2 text-white shadow-md transition-all hover:ring-2 hover:ring-[#B40100] hover:ring-offset-2 hover:ring-offset-[#B40100] focus:ring-2 focus:ring-[#B40100] focus:ring-offset-2 focus:ring-offset-[#B40100] group-hover:-translate-y-2""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-trash-2"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </button>
        <button
          onclick="event.stopPropagation(); showModal('edit', ${JSON.stringify(dummyPet).replace(/"/g, '&quot;')})"
          class="z-40 rounded-md bg-main-text-color p-2 text-white shadow transition-all hover:ring-2 hover:ring-main-text-color hover:ring-offset-2 hover:ring-offset-main-text-color focus:ring-2 focus:ring-main-text-color focus:ring-offset-2 focus:ring-offset-main-text-color group-hover:-translate-y-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-square-pen"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
          </svg>
        </button>
      </div>
    </div>
  `;
});

// Insert the cards into the card grid
cardGrid.innerHTML = cards.join('');

const signInLink = document.querySelector('#sign-in-link');
const signOutButton = document.querySelector('#sign-out-button');

if (user) {
  // swaps sign in button with sign out button
  signInLink.style.display = 'none';
  signOutButton.style.display = 'block';
} else {
  // user is not logged in, so we show the sign-in button
  signInLink.style.display = 'block';
  signOutButton.style.display = 'none';
}

/* Modal code */
// PREFACE: This is why we use frameworks like React. I hate my life :(.

const addPetButton = document.querySelector('#add-pet-button');
addPetButton.addEventListener('click', () => {
  showModal('add');
});

// adds pet based on form
async function addPet(pet) {
  try {
    const apiUrl = '/api/add-pet.php';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      // sends the form data to the server
      body: JSON.stringify(pet),
    });

    const result = await response.json();

    // Check for errors or success
    if (data.error) {
      // triggers when connected, but server gives error
      console.error('Error deleting pet:', data.error);
    } else {
      // success in terms of reaching the API
      console.log('Pet added successfully:', result);
      hideModal();
    }
  } catch (error) {
    // Server fails to connect or send data
    console.error('Error adding pet:', error.message);
  }
}

// updates pet information
async function editPet(pet) {
  try {
    const apiUrl = '/api/update-pet.php';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      // sends the form data to the server
      body: JSON.stringify(pet),
    });

    const result = await response.json();

    // Check for errors or success
    if (data.error) {
      // triggers when connected, but server gives error
      console.error('Error deleting pet:', data.error);
    } else {
      // success in terms of reaching the API
      console.log('Pet added successfully:', result);
      hideModal();
    }
  } catch (error) {
    // Server fails to connect or send data
    console.error('Error adding pet:', error.message);
  }
}

// deletes the pet
async function deletePet(petId) {
  try {
    // calls the pet delete api
    const response = await fetch('/api/delete-pet.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // sends pet id to the php call to delete the right pet
      body: JSON.stringify({ id: petId }),
    });

    // waits for response from server
    const data = await response.json();

    // Check for errors or success
    if (data.error) {
      // triggers when connected, but server gives error
      console.error('Error deleting pet:', data.error);
    } else {
      // success in terms of reaching the API
      console.log('Pet deleted successfully. Deleted Pet ID:', data.deleted_pet_id);
      hideModal();
    }
    // error when reaching server or other things
  } catch (error) {
    console.error('Error during deletePet function:', error);
  }
}

// Purpose must be 'add', 'edit', or 'delete'
function showModal(purpose, data) {
  const body = document.querySelector('body');

  // Prevent scrolling when the modal is open
  body.style.overflow = 'hidden';

  let modalContent = '';

  // For delete, data will be the id of the pet
  if (purpose === 'delete') {
    modalContent = html`
      <div>
        <h2 class="mb-2 text-lg font-bold">Are you absolutely sure?</h2>
        <p>This action cannot be undone. This will permanently delete this pet and remove its data from our servers.</p>
      </div>
      <div class="flex justify-end gap-4">
        <button
          onclick="hideModal()"
          class=" rounded-md border border-main-text-color px-4 py-2 text-main-text-color transition hover:underline hover:ring-main-text-color hover:ring-offset-2 hover:ring-offset-main-text-color focus:underline focus:outline-none focus:ring-2 focus:ring-main-text-color focus:ring-offset-2 focus:ring-offset-white"
        >
          Cancel
        </button>
        <button
          onclick="deletePet(${data})"
          class="rounded-md border border-[#B40100] bg-[#B40100] px-4 py-2 text-white transition hover:underline hover:ring-2 hover:ring-[#B40100] hover:ring-offset-2 hover:ring-offset-[#B40100] focus:underline focus:ring-2 focus:ring-[#B40100] focus:ring-offset-2 focus:ring-offset-[#B40100]"
        >
          Delete
        </button>
      </div>
    `;
    // For edit, data will be the pet object with id
    // For data, data will be undefined
  } else if (purpose === 'add' || purpose === 'edit') {
    // For edit, the form will be pre-filled with the pet's data
    modalContent = html`
      <form
        class="mx-auto flex w-[350px] flex-col gap-2"
        onsubmit="event.preventDefault(); ${purpose === 'add'
          ? `addPet({ userid: ${JSON.parse(localStorage.getItem('user')).id}, ...Object.fromEntries(new FormData(this)) })`
          : `editPet({ id: ${data.id}, ...Object.fromEntries(new FormData(this)) })`}"
      >
        <label for="petFirst" class="text-base">Pet First Name</label>
        <input
          class="rounded-md border border-main-text-color px-4 py-2 shadow-md transition placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-main-text-color focus:ring-offset-2 focus:ring-offset-white"
          id="petFirst"
          name="petFirst"
          placeholder="pet first name"
          type="text"
          required
          ${purpose === 'edit' ? `value="${data.firstName}"` : ''}
        />
        <label for="petLast" class="text-base">Pet Last Name</label>
        <input
          class="rounded-md border border-main-text-color px-4 py-2 shadow-md transition placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-main-text-color focus:ring-offset-2 focus:ring-offset-white"
          id="petLast"
          name="petLast"
          placeholder="pet last name"
          type="text"
          required
          ${purpose === 'edit' ? `value="${data.lastName}"` : ''}
        />
        <label for="first" class="text-base">Pet Type</label>
        <select
          id="petType"
          name="petType"
          class="rounded-md border border-main-text-color px-4 py-2 shadow-md transition placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-main-text-color focus:ring-offset-2 focus:ring-offset-white"
        >
          ${['dog', 'cat', 'bird', 'fish', 'reptile', 'shark', 'other'].map(
            (type) => html`
              <option value="${type}" ${purpose === 'edit' && data.type === type ? 'selected' : ''}>
                ${type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            `,
          )}
        </select>
        <label for="caretakerFirst" class="text-base">Caretaker First Name</label>
        <input
          class="rounded-md border border-main-text-color px-4 py-2 shadow-md transition placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-main-text-color focus:ring-offset-2 focus:ring-offset-white"
          id="caretakerFirst"
          name="caretakerFirst"
          placeholder="caretaker first name"
          type="text"
          required
          ${purpose === 'edit' ? `value="${data.caretakerFirstName}"` : ''}
        />
        <label for="caretakerLast" class="text-base">Caretaker Last Name</label>
        <input
          class="rounded-md border border-main-text-color px-4 py-2 shadow-md transition placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-main-text-color focus:ring-offset-2 focus:ring-offset-white"
          id="caretakerLast"
          name="caretakerLast"
          placeholder="caretaker last name"
          type="text"
          required
          ${purpose === 'edit' ? `value="${data.caretakerLastName}"` : ''}
        />
        <label for="caretakerEmail" class="text-base">Caretaker Email</label>
        <input
          class="rounded-md border border-main-text-color px-4 py-2 shadow-md transition placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-main-text-color focus:ring-offset-2 focus:ring-offset-white"
          id="caretakerEmail"
          name="caretakerEmail"
          placeholder="caretaker email"
          type="email"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
          title="Enter a valid email address"
          required
          ${purpose === 'edit' ? `value="${data.caretakerEmail}"` : ''}
        />
        <label for="caretakerPhone" class="text-base">Caretaker Phone</label>
        <input
          class="rounded-md border border-main-text-color px-4 py-2 shadow-md transition placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-main-text-color focus:ring-offset-2 focus:ring-offset-white"
          id="caretakerPhone"
          name="caretakerPhone"
          placeholder="caretaker phone"
          type="tel"
          pattern="[0-9]{10}"
          title="Enter a 10-digit phone number. Ex: 1234567891"
          required
          ${purpose === 'edit' ? `value="${data.caretakerPhone}"` : ''}
        />
        <button
          class="mt-2 rounded-md bg-main-text-color px-4 py-2 font-semibold text-white shadow-md outline-none transition duration-300 hover:bg-main-text-color/90 focus:ring-2 focus:ring-main-text-color focus:ring-offset-2"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    `;
  }

  const modal = html`
    <div
      ${purpose === 'edit' || purpose === 'add' ? 'onclick="hideModal()"' : ''}
      id="modal-overlay"
      data-state="open"
      class="fixed inset-0 z-50 bg-main-text-color/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    ></div>
    <div
      id="modal"
      data-state="open"
      class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg gap-4 border border-main-text-color bg-white p-6 text-main-text-color shadow-md duration-200 translate-x-[-50%] translate-y-[-50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-[425px] sm:rounded-lg"
    >
      ${modalContent}
    </div>
  `;

  // Insert the modal overlay at the end of the body
  body.insertAdjacentHTML('beforeend', modal);

  // Trap focus inside the modal by making everything outside the modal inert
  const bodyChildren = Array.from(document.body.children);
  bodyChildren.forEach((child) => {
    if (child.id !== 'modal-overlay' && child.id !== 'modal') {
      child.setAttribute('inert', '');
    }
  });

  // Pressing the escape key should close the modal
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideModal();
    }
  });
}

function hideModal() {
  const body = document.querySelector('body');

  // Allow scrolling when the modal is closed
  body.style.overflow = 'auto';

  const modalOverlay = document.querySelector('#modal-overlay');
  const modal = document.querySelector('#modal');

  // This will trigger the fade-out animation
  modalOverlay.dataset.state = 'closed';
  modal.dataset.state = 'closed';

  // Remove the modal overlay after its fade-out animation ends
  modalOverlay.addEventListener('animationend', () => {
    modalOverlay.remove();
  });

  // Remove the modal after its fade-out animation ends
  modal.addEventListener('animationend', () => {
    modal.remove();
  });

  // Allow elements outside the modal to be interacted with again
  const bodyChildren = Array.from(document.body.children);
  bodyChildren.forEach((child) => {
    child.removeAttribute('inert');
  });
}

/* Search related code */

const searchInput = document.querySelector('#search-pets-input');
// Debounce the search input so it only fires after the user stops typing

// Delays the execution of a callback function until a certain amount of time has passed without any further invocations.
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

// When the user types in the search input, search for pets
searchInput.addEventListener(
  'input',
  debounce((event) => {
    const searchTerm = event.target.value;
    // TODO: implement search
  }, 500),
);
