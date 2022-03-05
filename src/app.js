import { string } from "yup";
import _ from "lodash";
import { watchedState } from "./render";

export default () => {
  const formEl = document.querySelector('form');
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const link = data.get('url');
    string().url().isValid(link)
      .then((validStatus) =>  {
        if (validStatus === true) {
          if (!_.includes(watchedState.feeds, link)) {
            watchedState.valid = true;
            watchedState.feeds.push(link);
          } else {
            watchedState.valid = false;
          }
        } else {
          watchedState.valid = false;
        }
      });
      
  })
};


