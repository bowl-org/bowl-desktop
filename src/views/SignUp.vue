<template>
  <div class="bg-neutral-300 grow flex flex-col justify-center items-center">
      <h1 class="text-6xl text-center font-medium light-purple">Sign Up</h1>
      <h2 class="font-medium m-4 mt-10">
        Fill your information to sign up now!
      </h2>
      <div class="h-5">
        <h3 class="font-semibold " :class="responseStatus == 'FAILURE' ? 'text-red-500' : 'text-green-500' ">
          {{ infoMessage }}
        </h3>
      </div>
    <div class="flex flex-col w-96 ">
      <UserField FieldType="Name" @fieldData="getNameInp" />
      <UserField FieldType="Email" @fieldData="getEmailInp" />
      <UserField FieldType="Password" @fieldData="getPasswdInp" @keyup.enter="signUp"/>
      <button
        @click="signUp()"
        class="hover:contrast-125 drop-shadow-xl btn-gradient text-neutral-300 font-semibold rounded-xl p-4 m-5"
      >
        Sign Up
      </button>
      <div class="log-in-info-container flex justify-center mu-5 ">
        <p class="text-black ">Do you have an account?</p>
        <router-link to="/login">
          <p
            class="hover:underline underline-offset-4  ml-2 light-purple font-medium"
          >
            Log in here
          </p>
        </router-link>

      </div>
    </div>
  </div>
</template>
<script>
import UserField from "@/components/UserField.vue";
import signUpService from "@/services/signUpService"
export default {
  name: "SignUp",
  components: {
    UserField,
  },
  data() {
    return {
      emailData: "",
      nameData: "",
      passwdData: "",
      infoMessage: "",
      responseStatus: "",
    };
  },
  methods: {
    getEmailInp(emailInp) {
      this.emailData = emailInp;
    },
    getPasswdInp(passwdInp) {
      this.passwdData = passwdInp;
    },
    getNameInp(nameInp) {
      this.nameData = nameInp;
    },
    signUp() {
      let userData = {
        name: this.nameData,
        email: this.emailData,
        password: this.passwdData
      }
      signUpService.signUp(userData)
        .then((res) => {
          this.infoMessage = res.data.msg;
          this.responseStatus = res.data.status;
          console.log(res.data);
        }).catch((err) => {
          console.log("ERR:",err);
          this.infoMessage = err.response.data.msg;
          this.responseStatus = err.response.data.status;
          console.log(this.infoMessage, this.responseStatus);
        });
    }
  },
};
</script>
<style>
.light-purple {
  color: #7b7d9e;
}
.btn-gradient {
  background: linear-gradient(to right, #516088 20%, #3d4763 90%);
}
</style>
