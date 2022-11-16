<template>
  <div class="bg-neutral-300 grow flex flex-col justify-center items-center">
    <div class="flex flex-col">
      <h1 class="text-6xl text-center font-medium light-purple">Sign Up</h1>
      <h2 class="font-medium m-4 mt-10">
        Fill your information to sign up now!
      </h2>
      <UserField FieldType="Name" @fieldData="getNameInp" />
      <UserField FieldType="Email" @fieldData="getEmailInp" />
      <UserField FieldType="Password" @fieldData="getPasswdInp" />
      <button
        @click="checkFields()"
        class="drop-shadow-xl btn-gradient text-neutral-300 font-semibold rounded-xl p-4 m-5"
      >
        Sign Up
      </button>
      <div class="log-in-info-container flex justify-center mu-5">
        <p class="text-black">Do you have a account?</p>
        <a href="" class="">
          <p
            class="hover:underline underline-offset-4 light-purple font-medium"
          >
            Log in here
          </p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import UserField from "./UserField.vue";

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
    validateEmail() {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.emailData)) {
        alert("Please enter a valid email address!");
        return false;
      }
      return true;
    },
    validatePasswd() {
      if (this.passwdData === "") {
        alert("Password can't be empty!");
        return false;
      }
      return true;
    },
    validateName() {
      if (this.nameData === "") {
        alert("Name field can't be empty!");
        return false;
      }
      return true;
    },
    checkFields() {
      if ( this.validateName() && this.validateEmail() && this.validatePasswd()) {
        alert("Sign up success!");
        return true;
      }
      return false;
    },
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
