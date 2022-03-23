import { i18nextInit } from "./init.js";
import formHandle from "./formhandle.js";



export default () => {
  i18nextInit()
  .then(() => formHandle())
};

