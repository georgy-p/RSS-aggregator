import i18next from "i18next";
import ru from "./locales/ru.js";
import { setLocale } from "yup";
import app from "./app.js";
import { elements } from "./handles/elements.js";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
  
  setLocale({
    string: {
      url: ru.translation.feedback.errors.invalid,
    }
  })

  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    }
  }).then(() => {
    elements.headEl.textContent = i18nextInstance.t('header');
    elements.subheadEl.textContent = i18nextInstance.t('subheader');
    elements.form.innerText.textContent = i18nextInstance.t('formText');
    elements.form.button.textContent = i18nextInstance.t('buttons.add');
    elements.exampleEl.textContent = i18nextInstance.t('exampleText');
    elements.modal.link.textContent = i18nextInstance.t('modal.read');
    elements.modal.close.textContent = i18nextInstance.t('modal.close');
  }).then(() => app(state, i18nextInstance));
}