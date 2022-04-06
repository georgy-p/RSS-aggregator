import i18next from 'i18next';
import { setLocale } from 'yup';
import ru from './locales/ru.js';
import app from './app.js';

export default () => {
  const state = {
    feedbackStatus: '',
    content: {
      links: [],
      posts: [],
      feeds: [],
      readed: [],
    },
    modalData: null,
  };

  const elements = {
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
      close: document.querySelector('.btn-secondary'),
    },
  };

  setLocale({
    string: {
      url: 'invalid',
    },
  });

  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  }).then(() => {
    elements.headEl.textContent = i18nextInstance.t('header');
    elements.subheadEl.textContent = i18nextInstance.t('subheader');
    elements.form.innerText.textContent = i18nextInstance.t('formText');
    elements.form.button.textContent = i18nextInstance.t('buttons.add');
    elements.exampleEl.textContent = i18nextInstance.t('exampleText');
    elements.modal.link.textContent = i18nextInstance.t('modal.read');
    elements.modal.close.textContent = i18nextInstance.t('modal.close');
  }).then(() => app(state, i18nextInstance, elements));
};
