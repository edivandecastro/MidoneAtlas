import * as validators from '@vuelidate/validators'
import { i18n } from "@/locales/i18n";

const { createI18nMessage } = validators
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

const required = withI18nMessage(validators.required)
const minLength = withI18nMessage(validators.minLength, { withArguments: true })
const maxLength = withI18nMessage(validators.maxLength, { withArguments: true })

export { required, minLength, maxLength }
