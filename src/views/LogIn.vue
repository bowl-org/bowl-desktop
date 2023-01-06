<template>
  <div class="bg-neutral-300 grow flex flex-col justify-center items-center">
    <h1 class="text-6xl text-center font-medium light-purple">Log In</h1>
    <h2 class="font-medium m-3 mt-10">Fill your information to log in now!</h2>
    <div class="h-4">
      <h3 class="font-semibold " :class="responseStatus == 'FAILURE' ? 'text-red-500' : 'text-green-500' ">
        {{ infoMessage }}
      </h3>
    </div>
    <div class="flex flex-col w-96">
      <UserField FieldType="Email" @fieldData="getEmailInp" />
      <UserField FieldType="Password" @fieldData="getPasswdInp" />
      <div class="flex justify-between mx-8">
        <div class="flex justify-between items-center">
          <div
            class="checkbox-container bg-slate-800 rounded flex justify-center p-1.5"
          >
            <input
              type="checkbox"
              @change="rememberMe = !rememberMe"
              class="p-1.5 rounded-sm appearance-none cursor-pointer bg-slate-800 checked:bg-slate-400"
            />
          </div>
          <p class="ml-3 font-medium text-slate-800">Remember me</p>
        </div>
        <router-link to="/forgotpassword">
          <p
            class="hover:underline underline-offset-4 ml-2 light-purple font-medium"
          >
            Forgot password?
          </p>
        </router-link>
      </div>
      <button
        @click="logIn()"
        class="hover:contrast-125 drop-shadow-xl btn-gradient text-neutral-300 font-semibold rounded-xl p-4 m-5"
      >
        Log In
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
      <div class="flex justify-center">
        <p class="absolute  text-red-500 font-semibold mt-3">
          {{ errorMsg }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import UserField from "@/components/UserField.vue";
import * as logInService from "@/services/logInService";
export default {
  name: "LogIn",
  data() {
    return {
      emailData: "",
      passwdData: "",
      errorMsg: "",
      rememberMe: false,
      infoMessage: "",
      responseStatus: ""
    };
  },
  components: {
    UserField,
  },
  created() {
      //DEV
      //Redirect directly to chat window 
      this.$router.push({path: 'main', query: {rememberme: this.rememberMe}})
  },
  methods: {
    getPasswdInp(passwdInp) {
      this.passwdData = passwdInp;
    },
    getEmailInp(emailInp) {
      this.emailData = emailInp;
    },
    logIn(){
      logInService
        .logIn({email: this.emailData, password: this.passwdData})
        .then((res) => {
          this.infoMessage = res.data.msg;
          this.responseStatus = res.data.status;
          console.log(res.data);
          this.$router.push({path: 'main', query: {rememberme: this.rememberMe}})
        }).catch((err) => {
          this.infoMessage = err.response.data.msg;
          this.responseStatus = err.response.data.status;
          console.log(err.response.data);
        });
    }
  },
};
</script>

<style></style>
