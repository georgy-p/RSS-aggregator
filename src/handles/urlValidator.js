import * as yup from "yup";
import { isValidRss } from "./rsshandle.js";

export const urlValidator = (url, feedsList) => {
  const schemaUrl = yup
    .string()
    .required('notEmpty')
    .url('invalid')
    .notOneOf(feedsList, 'dublicate')
  return schemaUrl.validate(url);
};

export const rssValidator = (url) => {
  const schemaRss = yup.string().url().test(
    'has-valid RSS',
    () => 'invalidUrl',
    (value) => isValidRss(value));
  return schemaRss.validate(url);
}