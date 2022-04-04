import * as yup from "yup";
import { isValidRss } from "./rsshandle.js";

export default (url, feedsList) => {
  const schemaUrl = yup
    .string()
    .required('notEmpty')
    .url()
    .notOneOf(feedsList, 'dublicate')
    .test(
      'has-valid RSS',
      () => 'invalidUrl',
      (value) => isValidRss(value))

  return schemaUrl.validate(url);
};