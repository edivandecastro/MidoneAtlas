import { required, minLength, maxLength } from "@/utils/I18nValidators";

export const CountryFormValidation = {
  name: {
    required,
  },
  locale: {
    required,
    maxLength: maxLength(8),
    minLength: minLength(2),
  },
  acronym: {
    required,
    maxLength: maxLength(4),
    minLength: minLength(3),
  },
};
