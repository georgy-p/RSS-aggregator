import i18next from 'i18next';
import ru from './locales/ru.js';
import { setLocale } from 'yup';

export const state = {
  feedbackError: '',
  content: {
    links: [],
    posts: [],
    feeds: [],
  },
  modalData: null,
};

export const elements = {
  bodyEl: document.querySelector('body'),
  headEl: document.querySelector('h1'),
  subheadEl: document.querySelector('.lead'),
  footerEl: document.querySelector('footer'),
  form: {
    formEl: document.querySelector('form'),
    inputEl: document.querySelector('input'),
    innerText: document.querySelector('label'),
    button: document.querySelector('button.h-100'),
  },
  exampleEl: document.querySelector('.text-muted'),
  feedbackEl: document.querySelector('.feedback'),
  content: {
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
  },
  modal: {
    mainDiv: document.querySelector('#modal'),
    header: document.querySelector('.modal-title'),
    body: document.querySelector('.modal-body'),
    link: document.querySelector('#modal-link'),
  }
  
};

setLocale({
  string: {
    url: ru.translation.feedback.errors.invalid,
  }
})

export const i18nextInit = () => i18next.init({
  lng: 'ru',
  debug: false,
  resources: {
    ru,
  }
}).then(() => {
  elements.headEl.textContent = i18next.t('header')
  elements.subheadEl.textContent = i18next.t('subheader')
  elements.form.innerText.textContent = i18next.t('formText')
  elements.form.button.textContent = i18next.t('addButton')
  elements.exampleEl.textContent = i18next.t('exampleText')
});