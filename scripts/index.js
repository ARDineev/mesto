const openEditBtn = document.querySelector('.profile__edit-button');
const formCloseBtn = document.querySelector('.edit-form__close-btn');
const editForm = document.querySelector('.edit-form');
const nameField = document.querySelector('.edit-form__name-field');
const profileName = document.querySelector('.profile__name');
const descriptionField = document.querySelector('.edit-form__description-field');
const profileDescription = document.querySelector('.profile__description');


function openEditForm() {
  editForm.classList.add('edit-form_open');
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;
}

function closeEditForm() {
  editForm.classList.remove('edit-form_open');
  nameField.value = '';
  descriptionField.value = '';
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
  closeEditForm();
}

openEditBtn.addEventListener('click', openEditForm);
formCloseBtn.addEventListener('click', closeEditForm);
editForm.addEventListener('submit', handleFormSubmit);