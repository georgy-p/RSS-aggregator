import { string } from "yup";
import _ from "lodash";
import { watchedState } from "./render";
import { init } from "./init";



export default () => {
  init().then(() => {
    const formEl = document.querySelector('form');
    formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const link = data.get('url');
    string().url().isValid(link)
      .then((validStatus) =>  {
        console.log(validStatus);
        if (validStatus === true) {
          if (!_.includes(watchedState.feeds, link)) {
            watchedState.valid = true;
            watchedState.feeds.push(link);
            watchedState.feedbackStatus = 'done';
          } else {
            watchedState.valid = false;
            watchedState.feedbackStatus = 'dublicate';
          }
        } else {
          watchedState.valid = false;
          watchedState.feedbackStatus = 'error';
        }
      });
    })
  })
};


