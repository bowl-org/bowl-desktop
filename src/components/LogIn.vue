<template>
  <div class="bg-neutral-300 grow flex flex-col justify-center items-center">
    <h1 class="text-6xl text-center font-medium light-purple">Log In</h1>
    <h2 class="font-medium m-4 mt-10">Fill your information to log in now!</h2>
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
        <a href="" class="">
          <p
            class="hover:underline underline-offset-4 ml-2 light-purple font-medium"
          >
            Forgot password?
          </p>
        </a>
      </div>
      <button
        @click="validateFields()"
        class="hover:contrast-125 drop-shadow-xl btn-gradient text-neutral-300 font-semibold rounded-xl p-4 m-5"
      >
        Log In
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
      <p class="text-red-500 font-semibold mt-3">
        {{ errorMsg }}
      </p>
    </div>
  </div>
</template>

<script>
import UserField from "./UserField.vue";
export default {
  name: "LogIn",
  data() {
    return {
      emailData: "",
      passwdData: "",
      errorMsg: "",
      rememberMe: false
    };
  },
  components: {
    UserField,
  },
  methods: {
    getPasswdInp(passwdInp) {
      this.passwdData = passwdInp;
    },
    getEmailInp(emailInp) {
      this.emailData = emailInp;
    },
    validateEmail() {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.emailData)) {
        return true;
      }
      this.errorMsg = "Please enter a valid email address!";
      return false;
    },
    validatePasswd() {
      if (this.passwdData !== "") {
        return true;
      }
        this.errorMsg = "Password can't be empty!";
        return false;
    },
    validateFields() {
      let flag = this.checkFields();
      if (flag) {
        alert("Redirecting to chat page...")
      }
      console.log("Error msg: ", this.errorMsg);
      console.log("Remember me: ",this.rememberMe);
      //Not implemented yet
      return flag;
    },
    checkFields() {
      return this.validateEmail() && this.validatePasswd() ? true : false;
    },
  },
};
</script>

<style></style>
