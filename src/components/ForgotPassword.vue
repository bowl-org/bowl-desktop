<template>
  <div class="bg-neutral-300 grow flex flex-col justify-center items-center">
    <h1 class="text-6xl text-center font-medium light-purple">
      Forgot Password?
    </h1>
    <h2 class="font-medium m-4 mt-10">
      Enter your email address to reset your password
    </h2>
    <div class="flex flex-col w-96">
      <UserField class="" FieldType="Email" @fieldData="getEmailInp" />
      <button
        @click="checkFields()"
        class="hover:contrast-125 drop-shadow-xl btn-gradient text-neutral-300 font-semibold rounded-xl p-4 m-5"
      >
        Reset Password
      </button>
      <div class="log-in-info-container flex justify-center mu-5">
        <p class="text-black">Don't have an account?</p>
        <a href="" class="">
          <p
            class="hover:underline underline-offset-4 ml-2 light-purple font-medium"
          >
            Sign up here
          </p>
        </a>
      </div>
      <p v-if="validEmail" class="text-green-500 font-semibold mt-3">Password reset link has been sent to {{emailData}} address</p>
      <p v-if="invalidEmail" class="text-red-500 font-semibold mt-3">Please enter a valid email address!</p>
    </div>
  </div>
</template>
<script>
import UserField from "./UserField.vue";
export default {
  name: "ForgotPassword",
  data() {
    return { 
      emailData: "",
      validEmail: false,
      invalidEmail: false
    };
  },
  components: {
    UserField,
  },
  methods: {
    getEmailInp(emailInp) {
      this.emailData = emailInp;
    },
    validateEmail() {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.emailData)) {
        this.validEmail = true;
        this.invalidEmail = !this.validEmail;
      }else{
        this.validEmail = false;
        this.invalidEmail = !this.validEmail;
      }
      return this.validEmail;
    },
    checkFields() {
      if (this.validateEmail()) {
        return
      }
    },
  },
};
</script>
