import { string, } from "yup";
//import _ from "lodash";
import { watchedState } from "./render.js";
import { state } from "./init.js";
import ru from "./locales/ru.js";

const schemaIsValid = string().url();
const schemaHasDublicate = string().test(
  'has-dublicate',
  () => ru.translation.feedback.errors.dublicate,
  (value) => !state.feeds.includes(value),
);
export const formHandle = () => {
  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const link = data.get('url');
    schemaIsValid.validate(link)
      .then(() => schemaHasDublicate.validate(link))
      .then(() => {
            watchedState.valid = true;
            watchedState.feeds.push(link);
          })
      .catch((e) => {
            watchedState.feedbackStatus = e.errors.join();
            watchedState.valid = false;
            })
    });
};
