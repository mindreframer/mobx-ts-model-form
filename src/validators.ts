import { AbstractControl, ValidatorsFunction } from './abstract-control';
import { FormControl } from './form-control';
import { ValidationEvent, ValidationEventTypes } from './types';
import { combineErrors } from './utilites';

export const requiredValidatorKey = 'required';
export const requiredValidator = <TEntity>(message: string = 'Field required', eventType = ValidationEventTypes.Error): ValidatorsFunction<FormControl<TEntity>> => async (
  control: FormControl<TEntity>
): Promise<ValidationEvent[]> => {
  if (control.value == null || ((control.value as any) as string) === '') {
    return [
      {
        message,
        key: requiredValidatorKey,
        type: eventType,
        validationEvent: true,
      },
    ];
  }
  return [];
};

export const notEmptyOrSpacesValidatorKey = 'notEmptyOrSpaces';
export const notEmptyOrSpacesValidator = (message: string = 'Missing meaningful input', eventType = ValidationEventTypes.Error): ValidatorsFunction<FormControl<string>> => async (
  control: FormControl<string> | FormControl<string | null>
): Promise<ValidationEvent[]> => {
  if (control.value != null && control.value.trim() !== '') {
    return [];
  }
  return [
    {
      message,
      key: notEmptyOrSpacesValidatorKey,
      type: eventType,
      validationEvent: true,
    },
  ];
};

export const notContainSpacesValidatorKey = 'notContainSpaces';
/**
 * Not contain spaces
 * / Не содержит проблелов
 */
export const notContainSpacesValidator = (message: string = 'Must not contain spaces', eventType = ValidationEventTypes.Error) => async (
  control: FormControl<string> | FormControl<string | null>
): Promise<ValidationEvent[]> => {
  if (control.value == null || !/\s/.test(control.value)) {
    return [];
  }
  return [
    {
      message,
      key: notContainSpacesValidatorKey,
      type: eventType,
      validationEvent: true,
    },
  ];
};

export const patternValidatorKey = 'pattern';
/**
 * Error if there is no pattern matching
 * / Ошибка, если нет соответствия паттерну
 */
export const patternValidator = <TAbstractControl extends FormControl<string> | FormControl<string | null>>(
  regExp: RegExp,
  message: string = 'Does not match required pattern',
  eventType = ValidationEventTypes.Error
): ValidatorsFunction<TAbstractControl> => async (control: TAbstractControl): Promise<ValidationEvent[]> => {
  if (control.value != null && regExp.test(control.value)) {
    return [];
  }
  return [
    {
      message,
      key: patternValidatorKey,
      type: eventType,
      validationEvent: true,
    },
  ];
};

/**
 * Error if there is a pattern match
 * / Ошибка, если есть соответствие паттерну
 */
export const invertPatternValidator = <TAbstractControl extends FormControl<string> | FormControl<string | null>>(
  regExp: RegExp,
  message: string = 'Matches a restricted pattern',
  eventType = ValidationEventTypes.Error
): ValidatorsFunction<TAbstractControl> => async (control: TAbstractControl): Promise<ValidationEvent[]> => {
  if (control.value != null && regExp.test(control.value)) {
    return [
      {
        message,
        key: patternValidatorKey,
        type: eventType,
        validationEvent: true,
      },
    ];
  }
  return [];
};

export const minLengthValidatorKey = 'minlength';
export const minLengthValidator = (
  minlength: number,
  message: string = `Minimal length ${minlength}`,
  eventType = ValidationEventTypes.Error
): ValidatorsFunction<FormControl> => async (control: FormControl<string> | FormControl<string | null>): Promise<ValidationEvent[]> => {
  if (control.value == null || minlength <= control.value.length || control.value === '') {
    return [];
  }
  return [
    {
      message,
      key: minLengthValidatorKey,
      type: eventType,
      validationEvent: true,
    },
  ];
};

export const maxLengthValidatorKey = 'maxlength';
export const maxLengthValidator = (
  maxlength: number,
  message: string = `Maximal length ${maxlength}`,
  eventType = ValidationEventTypes.Error
): ValidatorsFunction<FormControl> => async (control: FormControl<string> | FormControl<string | null>): Promise<ValidationEvent[]> => {
  if (control.value == null || control.value.length <= maxlength) {
    return [];
  }
  return [
    {
      message,
      key: maxLengthValidatorKey,
      type: eventType,
      validationEvent: true,
    },
  ];
};

export const absoluteLengthValidatorKey = 'absoluteLength';
export const absoluteLengthValidator = (
  length: number,
  message: string = `Length not ${length}`,
  eventType = ValidationEventTypes.Error
): ValidatorsFunction<FormControl> => async (control: FormControl): Promise<ValidationEvent[]> => {
  if (control.value == null || control.value.length === length) {
    return [];
  }
  return [
    {
      message,
      key: absoluteLengthValidatorKey,
      type: eventType,
      validationEvent: true,
    },
  ];
};

export const minValueValidatorKey = 'minValue';
export const minValueValidator = <TEntity extends string | null | number | Date>(
  min: TEntity | (() => TEntity),
  message: string = 'Value too small',
  eventType = ValidationEventTypes.Error
) => {
  const getMin: () => TEntity = typeof min === 'function' ? min : () => min;
  return async (control: FormControl<TEntity>): Promise<ValidationEvent[]> => {
    if (control.value == null) {
      return [];
    }
    const minValue = getMin();
    let value: any = control.value;
    if (typeof value === 'string') {
      if (typeof minValue === 'number') {
        value = +value;
      } else if (minValue instanceof Date) {
        value = new Date(value);
      }
    }
    if (value < minValue) {
      return [
        {
          message,
          key: minValueValidatorKey,
          type: eventType,
          validationEvent: true,
        },
      ];
    }
    return [];
  };
};

export const maxValueValidatorKey = 'minValue';
export const maxValueValidator = <TEntity extends string | null | number | Date>(
  max: TEntity | (() => TEntity),
  message: string = 'Value too big',
  eventType = ValidationEventTypes.Error
) => {
  const getMax: () => TEntity = typeof max === 'function' ? max : () => max;
  return async (control: FormControl<TEntity>): Promise<ValidationEvent[]> => {
    if (control.value == null) {
      return [];
    }
    const maxValue = getMax();
    let value: any = control.value;
    if (typeof value === 'string') {
      if (typeof maxValue === 'number') {
        value = +value;
      } else if (maxValue instanceof Date) {
        value = new Date(value);
      }
    }
    if (maxValue < value) {
      return [
        {
          message,
          key: maxValueValidatorKey,
          type: eventType,
          validationEvent: true,
        },
      ];
    }
    return [];
  };
};

export const compairValidatorKey = 'compair';
/**
 * Wrapper for complex validation (error if validation returns false)
 * / Обёртка для сложной проверки (ошибка, если проверка вернула false)
 */
export const compareValidator = <TEntity>(
  expression: (value: TEntity) => boolean,
  message: string = 'Field not valid',
  eventType = ValidationEventTypes.Error
): ValidatorsFunction<FormControl<TEntity>> => async (control: FormControl<TEntity>): Promise<ValidationEvent[]> => {
  if (expression(control.value)) {
    return [];
  }
  return [
    {
      message,
      key: compairValidatorKey,
      type: eventType,
      validationEvent: true,
    },
  ];
};

export const isEqualValidatorKey = 'isEqual';
/**
 * Equals to {value}
 * / Равно значению {value}
 */
export const isEqualValidator = <TEntity>(
  value: TEntity,
  message: string = "Fields don't match",
  eventType = ValidationEventTypes.Error
): ValidatorsFunction<FormControl<TEntity>> => async (control: FormControl<TEntity>): Promise<ValidationEvent[]> => {
  if (control.value == null || control.value !== value) {
    return [];
  }
  return [
    {
      message,
      key: isEqualValidatorKey,
      type: eventType,
      validationEvent: true,
    },
  ];
};

/**
 * Runs validations only if activation conditions are met
 * / Запускает валидации только если условие активации выполнено
 */
export const wrapperActivateValidation = <TAbstractControl extends AbstractControl>(
  activate: (control: TAbstractControl) => boolean,
  validators: ValidatorsFunction<TAbstractControl>[],
  elseValidators: ValidatorsFunction<TAbstractControl>[] = []
): ValidatorsFunction<TAbstractControl> => async (control: TAbstractControl): Promise<ValidationEvent[]> => {
  if (activate(control)) {
    const validations = await Promise.all(validators.map((validator) => control.executeAsyncValidation(validator)));
    return combineErrors(validations);
  }
  if (elseValidators && elseValidators.length > 0) {
    const validations = await Promise.all(elseValidators.map((validator) => control.executeAsyncValidation(validator)));
    return combineErrors(validations);
  }
  return [];
};

/**
 * Wrapper for sequential validations (The next validation is launched only after the previous one passed without errors)
 * / Обертка для последовательных валидаций (Следующая валидация запускается, только после того, что предыдущая прошла без ошибок)
 */
export const wrapperSequentialCheck = <TAbstractControl extends AbstractControl>(
  validators: ValidatorsFunction<TAbstractControl>[]
): ValidatorsFunction<TAbstractControl> => async (control: TAbstractControl): Promise<ValidationEvent[]> => {
  for (const validator of validators) {
    const validationResult = await control.executeAsyncValidation(validator);
    if (validationResult.length > 0) {
      return validationResult;
    }
  }
  return [];
};
