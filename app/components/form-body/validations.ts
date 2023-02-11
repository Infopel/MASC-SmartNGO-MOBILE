import {
  IField,
  IBaseSubFormField,
  ITextField,
  IImageCaptureField,
} from 'store/form';
import * as yup from 'yup';

export function generateValidationSchema(fields: IField[]): yup.AnySchema {
  return yup.object().shape({
    ...fields.reduce((acc, v) => {
      let validation: Record<string, yup.AnySchema> = {};
      switch (v.type) {
        case 'text':
          validation[v.id] = textValidations(v);
          break;
        case 'sub-form':
          validation[v.id] = subformValidations(v);
          break;

        case 'image':
          validation[v.id] = imageValidations(v);
          break;
        default:
          validation[v.id] = baseValidations(v);
          break;
      }

      if (v.validation.required) validation[v.id] = validation[v.id].required();
      return {...acc, ...validation};
    }, {}),
  });
}

function baseValidations(field: IField): yup.BooleanSchema | yup.StringSchema {
  const val = yup.string();
  return val;
}
function textValidations(
  field: ITextField,
): yup.StringSchema | yup.NumberSchema {
  const {
    validation: {contentType, max, min},
  } = field;

  return contentType === 'number-positive' || contentType === 'decimal-positive'
    ? numberContentValidations(field)
    : textContentValidations(field);
}
function textContentValidations(
  field: ITextField,
): yup.StringSchema | yup.NumberSchema {
  const {
    validation: {contentType, max, min},
  } = field;
  let val: yup.StringSchema;

  val = yup.string();

  if (max) {
    val = val.max(max);
  }
  if (min) {
    val = val.min(min);
  }

  return val;
}
function numberContentValidations(
  field: ITextField,
): yup.StringSchema | yup.NumberSchema {
  const {
    validation: {contentType, max, min},
  } = field;
  let val: yup.NumberSchema = yup.number().typeError('Deve ser um numero');
  if (contentType === 'number-positive') {
    val = val.positive('Deve ser numero inteiro positivo');
  } else {
    val = val.positive('Deve ser numero positivo');
  }

  val = val.lessThan(max ?? Number.MAX_SAFE_INTEGER);

  val = val.moreThan(min ?? Number.MIN_SAFE_INTEGER);

  return val;
}

function subformValidations(field: IBaseSubFormField): yup.AnySchema {
  return yup.array().of(generateValidationSchema(field.fields));
}
function imageValidations(field: IImageCaptureField): yup.AnySchema {
  return yup.array().of(yup.string());
}
