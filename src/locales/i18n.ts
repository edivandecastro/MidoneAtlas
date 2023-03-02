import { createI18n } from "vue-i18n";

const locales = ["pt-br", "en"];

const i18n = createI18n({
  locale: "pt-br",
  messages: {
    "en": {
      validations: {
        required: "The field {property} is required.",
        minLength: "This {property} should be at least {min} characters long"
      },
    },
    "pt-br": {
      validations: {
        required: "O campo {property} é obrigátorio.",
        minLength: "O campo {property} deve ter pelo menos {min} caracteres.",
        maxLength: "O tamanho máximo permitido para o campo {property} é {max}."
      },
    },
  },
});

export { locales, i18n };
