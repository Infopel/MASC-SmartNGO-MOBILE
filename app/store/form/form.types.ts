import {TxKeyPath} from 'i18n/i18n';

export type IFormType =
  | 'task-diary'
  | 'pa-or-vdo-member'
  | 'pa-or-vdo-action'
  | 'savings-group-member-monitoring'
  | 'savings-group-member-quitting'
  | 'savings-group-member'
  | 'savings-group-monitoring'
  | 'civic-incubator-participant'
  | 'civic-incubator-events'
  | 'savings-group'
  | 'action-plan'
  | 'report-action-plan-progress'
  | 'monitoring-visits';

type PageInfo = {
  title: string;
  subTitle?: string;
  index: number;
  stepCount: number;
};
export type IForm = {
  name: TxKeyPath;
  steps: IStep[];
};

type IFieldValue = number | string | undefined;
export type IFormStore = {
  form?: IForm;
  formType?: IFormType;
  contextId?: string;
  parentContextId?: string;
  index: number;
  page: () => PageInfo | undefined;
  isMultiPage: () => boolean;
  getSubformFields: (name: string) => IField[];
  clear: () => void;
  nextPage: () => void;
  isLastPage: () => boolean;
  isFirstPage: () => boolean;
  prevPage: () => void;
  fields: () => IField[];
  requestForm: (
    type: IFormType,
    contextId?: string,
    parentContextId?: string,
  ) => void;
};

export type ISelectorDBQuery = 'PROVINCE' | 'DISTRICT' | 'CYCLE';
export type ISelectorItem = {name: string; id: string};
type IFieldBaseValidation = {
  required: boolean;
};
type IBaseTextField = {
  type: 'text';
  placeholder?: TxKeyPath;
  validation: ITextValidation;
};
type IBaseDateField = {
  type: 'date';
  placeholder?: TxKeyPath;
};
type IBaseSelectorField = {
  type: 'selector';
  items: ISelectorItem[] | ISelectorDBQuery;
  queryFrom?: string;
  placeholder?: TxKeyPath;
};
type IBaseRadioField = {type: 'radio'; items: ISelectorItem[]};
type IBaseImageCaptureField = {type: 'image'};

export type IBaseSubFormField = {
  type: 'sub-form';
  fields: IField[];
};

export type ITextValidation = IFieldBaseValidation & {
  contentType?: 'text' | 'number-positive' | 'decimal-positive' | 'long-text';
  max?: number;
  min?: number;
};

type IBaseField = {
  id: string;
  dependOn?: string;
  dependOnVisibleValue?: string;
  name: TxKeyPath;
  validation: IFieldBaseValidation;

  helperText?: TxKeyPath;
};
export type IField =
  | ISelectorField
  | ITextField
  | IDateField
  | IRadioField
  | ISubFormField
  | IImageCaptureField;

export type ISelectorField = IBaseField & IBaseSelectorField;
export type ITextField = IBaseField & IBaseTextField;
export type IDateField = IBaseField & IBaseDateField;
export type IRadioField = IBaseField & IBaseRadioField;
export type ISubFormField = IBaseField & IBaseSubFormField;
export type IImageCaptureField = IBaseField & IBaseImageCaptureField;

type IStep = {
  name: TxKeyPath;
  fields: IField[];
};
