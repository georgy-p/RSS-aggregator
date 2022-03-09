import i18next from 'i18next';
import ru from './locales/ru';
import { setLocale } from 'yup';

export const elements = {
  headEl: document.querySelector('h1'),
  subheadEl: document.querySelector('.lead'),
  form: {
    formEl: document.querySelector('form'),
    inputEl: document.querySelector('input'),
    innerText: document.querySelector('label'),
    button: document.querySelector('button'),
  },
  exampleEl: document.querySelector('.text-muted'),
};

setLocale({
  
})

export const init = () => i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  }
}).then((t) => {
  elements.headEl.textContent = i18next.t('header')
  elements.subheadEl.textContent = i18next.t('subheader')
  elements.form.innerText.textContent = i18next.t('formText')
  elements.form.button.textContent = i18next.t('addButton')
  elements.exampleEl.textContent = i18next.t('exampleText')
});