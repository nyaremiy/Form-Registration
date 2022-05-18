// Очищаю всі помилки
const resetError = () => {
  const errors = document.querySelectorAll('.c-form__error');
  for (const iterator of errors) {
    iterator.innerText = '';
  }
};
// Очищаю всі інпути
const resetValues = () => {
  const values = document.querySelectorAll('.e-input');
  for (const iterator of values) {
    iterator.value = '';
  }
};
// Виводиться помилка якщо інпут порожній
const addErrorRequired = (id) => {
  document.getElementById(id).innerText = 'This field is required';
};

// Перевіряє на певну кількість символів
const minNumCharacter = (id, num) => {
  document.getElementById(id).innerText = `Minimum number of characters ${num}`;
};

// Перевірка інпутів
const checkInputs = (form, name, id, num) => {
  if (!form.get(name) || !form.get(name).trim()) {
    addErrorRequired(id);
    return false;
  } else if (form.get(name).length < num) {
    minNumCharacter(id, num);
    return false;
  } else {
    return true;
  }
};
// Модальне вікно
const showModalInfo = (response, className) => {
  const modalWindow = document.getElementById('js-modal');
  modalWindow.classList.add(`c-modal-window--${className}`);
  modalWindow.innerText = response.message.ua;
  setTimeout(() => {
    modalWindow.classList.remove(`c-modal-window--${className}`);
  }, 3000);
};
document.getElementById('js-form').addEventListener('submit', (e) => {
  const URL =
    'https://beetroot-solodkui.herokuapp.com/beetroot-solodkui/users/registration';

  e.preventDefault();

  // Очищаю всі помилки
  resetError();
  // FormDATA
  const form = new FormData(e.target);
  const body = {
    disabledSeasonAnimation: true,
    language: 'ua',
    role: 2,
    firstName: form.get('firstName'),
    lastName: form.get('lastName'),
    username: form.get('userName'),
    email: form.get('email'),
    password: form.get('password'),
  };
  // Перевіряю інпути
  if (
    checkInputs(form, 'userName', 'js-error-username', 4) &&
    checkInputs(form, 'firstName', 'js-error-firstname', 4) &&
    checkInputs(form, 'lastName', 'js-error-lastname', 4) &&
    checkInputs(form, 'email', 'js-error-email', 4) &&
    checkInputs(form, 'password', 'js-error-password', 6)
  ) {
    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        // Повідомлення
        if (response.success) {
          showModalInfo(response, 'success');
        } else {
          showModalInfo(response, 'error');
        }
      });
    // Очищаю всі інпути
    resetValues();
  }
});
