<script setup lang="ts">
import Button from "@/base-components/Button";
import Toastify from "toastify-js";
import Notification from "@/base-components/Notification";
import Lucide from "../base-components/Lucide";
import { FormInput, FormLabel, FormSelect, FormTextarea, FormInline } from "@/base-components/Form";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive, toRefs } from "vue";
import { CountryService } from "@/services/CountryService";
import { baseUrl } from "@/services/Api";
import { Country } from "@/models/Country";
import { CountryApi } from "@/utils/interfaces";

const rules = {
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

const formData: CountryApi = reactive({
  name: "",
  locale: "",
  acronym: "",
});

const showToast = (elementNode: HTMLElement) => {
  Toastify({
    node: elementNode,
    duration: 4000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
  }).showToast();
};

const queryHtmlElement = (id: string) => {
  const element = document.querySelectorAll(id)[0].cloneNode(true) as HTMLElement;
  element.classList.remove("hidden");
  return element;
};

const showToastifySuccess = () => {
  const successEl = queryHtmlElement("#success-notification-content");
  showToast(successEl);
};

const showToastifyFail = () => {
  const failedEl = queryHtmlElement("#failed-notification-content");
  showToast(failedEl);
};

const validate = useVuelidate(rules, toRefs(formData));
const countryService = new CountryService(baseUrl.atlas_api_v1);

const onSubmit = () => {
  validate.value.$touch();
  if (validate.value.$invalid) {
    showToastifyFail();
  } else {
    const country = new Country(formData);

    countryService
      .create(country)
      .then(() => {
        showToastifySuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // console.log(validate.value.$error);
};
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Novo País</h2>
  </div>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12">
      <div class="intro-y box lg:mt-5">
        <div class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
          <h2 class="mr-auto text-base font-medium">Cadastro de País</h2>
        </div>
        <div class="p-5">
          <div class="flex flex-col xl:flex-row">
            <div class="flex-1 mt-6 xl:mt-0">
              <form class="validate-form" @submit.prevent="onSubmit">
                <div class="input-form">
                  <FormLabel htmlFor="horizontal-form-1" class="sm:w-20"> Nome </FormLabel>
                  <FormInput
                    id="horizontal-form-1"
                    type="text"
                    placeholder="Brasil"
                    v-model.trim="validate.name.$model"
                    :class="{ 'border-danger': validate.name.$error }"
                  />
                  <template v-if="validate.name.$error">
                    <div
                      v-for="(error, index) in validate.name.$errors"
                      :key="index"
                      class="mt-2 text-danger"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>
                <div class="mt-3 input-form">
                  <FormLabel htmlFor="horizontal-form-2" class="sm:w-20"> Localidade </FormLabel>
                  <FormInput
                    id="horizontal-form-2"
                    type="text"
                    placeholder="pt-br"
                    v-model.trim="validate.locale.$model"
                    :class="{ 'border-danger': validate.locale.$error }"
                  />
                  <template v-if="validate.locale.$error">
                    <div
                      v-for="(error, index) in validate.locale.$errors"
                      :key="index"
                      class="mt-2 text-danger"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>
                <div class="mt-3 input-form">
                  <FormLabel htmlFor="horizontal-form-3" class="sm:w-20"> Acrônimo </FormLabel>
                  <FormInput
                    id="horizontal-form-3"
                    type="text"
                    placeholder="BRL"
                    v-model.trim="validate.acronym.$model"
                    :class="{ 'border-danger': validate.acronym.$error }"
                  />
                  <template v-if="validate.acronym.$error">
                    <div
                      v-for="(error, index) in validate.acronym.$errors"
                      :key="index"
                      class="mt-2 text-danger"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>
                <Button variant="primary" type="submit" class="mt-5"> Salvar </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Notification id="success-notification-content" class="flex hidden">
      <Lucide icon="CheckCircle" class="text-success" />
      <div class="ml-4 mr-4">
        <div class="mt-1 text-slate-500">Cadastro realizado com sucesso!</div>
      </div>
    </Notification>
    <Notification id="failed-notification-content" class="flex hidden">
      <Lucide icon="XCircle" class="text-danger" />
      <div class="ml-4 mr-4">
        <div class="mt-1 text-slate-500">Por favor, verifique os campos do formulário.</div>
      </div>
    </Notification>
  </div>
</template>
