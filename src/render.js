import onChange from "on-change";

const state = {
  valid: null,
  feeds: [],
};

const elements = {
  formEl: document.querySelector('form'),
  inputEl: document.querySelector('input'),
};

export const watchedState = onChange(state, (path, value) => {
  if (path === 'valid') {
    if (state.valid === false) {
      elements.inputEl.classList.add('is-invalid');
    } else {
      elements.inputEl.classList.remove('is-invalid');
      elements.formEl.reset();
      elements.inputEl.focus();
    }
  }
});