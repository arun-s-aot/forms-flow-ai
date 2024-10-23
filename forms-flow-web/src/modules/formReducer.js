import ACTION_CONSTANTS from "../actions/actionConstants";
import _cloneDeep from 'lodash/cloneDeep';
import _camelCase from 'lodash/camelCase';
import _set from 'lodash/set';

const initialState = {
  formSubMissionDelete: { modalOpen: false, submissionId: "", formId: "" },
  formDelete: { modalOpen: false, formId: "", formName: "" },
  formSubmissionError: { modalOpen: false, message: "" },
  isFormSubmissionLoading: false,
  isFormWorkflowSaved: false,
  formSubmitted: false,
  publicFormStatus: null, //expected values sample {anonymous:false,status:'inactive'}
};

export const currentFormReducer = (form, { type, value }) => {
  const formCopy = _cloneDeep(form);
  switch (type) {
    case "formChange":
      for (let prop in value) {
        if (Object.prototype.hasOwnProperty.call(value, prop)) {
          form[prop] = value[prop];
        }
      }
      return form;
    case "replaceForm":
      return _cloneDeep(value);
    case "title":
      if (type === "title" && !form._id) {
        formCopy.name = _camelCase(value);
        formCopy.path = _camelCase(value).toLowerCase();
      }
      break;
    default:
      break;
  }
  _set(formCopy, type, value);
  return formCopy;
};

const formDelete = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.FORM_SUBMISSION_DELETE:
      return { ...state, formSubMissionDelete: action.payload };
    case ACTION_CONSTANTS.FORM_DELETE:
      return { ...state, formDelete: action.payload };
    case ACTION_CONSTANTS.FORM_SUBMISSION_ERROR:
      return { ...state, formSubmissionError: action.payload };
    case ACTION_CONSTANTS.IS_FORM_SUBMISSION_LOADING:
      return { ...state, isFormSubmissionLoading: action.payload };
    case ACTION_CONSTANTS.IS_FORM_WORKFLOW_SAVED:
      return { ...state, isFormWorkflowSaved: action.payload };
    case ACTION_CONSTANTS.PUBLIC_FORM_SUBMIT:
      return { ...state, formSubmitted: action.payload };
    case ACTION_CONSTANTS.PUBLIC_FORM_STATUS:
      return { ...state, publicFormStatus: action.payload };
    default:
      return state;
  }
};

export default formDelete;
