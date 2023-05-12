<template>
  <div class="bg-neutral-300 grow flex flex-col justify-center items-center">
    <h1 class="text-6xl text-center font-medium light-purple">
      Forgot Password?
    </h1>
    <h2 class="font-medium m-4 mt-10">
      Enter your email address to reset your password
    </h2>
    <div class="h-5">
      <h3 class="font-semibold " :class="responseStatus == 'FAILURE' ? 'text-red-500' : 'text-green-500' ">
        {{ infoMessage }}
      </h3>
    </div>
    <div class="flex flex-col w-96">
      <UserField class="" FieldType="Email" @fieldData="getEmailInp" @keyup.enter="resetPassword"/>
      <button
        @click="resetPassword()"
        class="hover:contrast-125 drop-shadow-xl btn-gradient text-neutral-300 font-semibold rounded-xl p-4 m-5"
      >
        Reset Password
      </button>
      <div class="log-in-info-container flex justify-center mu-5">
        <p class="text-black">Don't have an account?</p>
        <router-link to="/signup">
          <p
            class="hover:underline underline-offset-4 ml-2 light-purple font-medium"
          >
            Sign up here
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import UserField from "@/components/UserField.vue";
import * as forgotPasswordService from "@/services/forgotPasswordService"

export default {
  name: "ForgotPassword",
  data() {
    return {
      emailData: "",
      validEmail: false,
      invalidEmail: false,
      infoMessage: "",
      responseStatus: ""
    };
  },
  components: {
    UserField,
  },
  methods: {
    getEmailInp(emailInp) {
      this.emailData = emailInp;
    },
    resetPassword(){
      forgotPasswordService.resetPassword({email: this.emailData})
        .then((res) => {
          this.infoMessage = res.data.msg;
          this.responseStatus = res.data.status;
          console.log(res.data);
        }).catch((err) => {
          this.infoMessage = err.response.data.msg;
          this.responseStatus = err.response.data.status;
          console.log(this.infoMessage, this.responseStatus);
        });
    }
  },
};
</script>
