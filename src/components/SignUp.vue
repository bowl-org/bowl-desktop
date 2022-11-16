<template>
  <div class="bg-neutral-300 grow flex flex-col justify-center items-center">
    <div class="flex flex-col">
      <h1 class="text-6xl text-center font-medium light-purple">Sign Up</h1>
      <h2 class="font-medium m-4 mt-10 ">Fill your information to sign up now!</h2>
      <UserField FieldType="Name" />
      <UserField FieldType="Email" @fieldData="getEmailInp" />
      <UserField FieldType="Password" />
      <button
        @click="validateEmail()"
        class="drop-shadow-xl btn-gradient  text-neutral-300 font-semibold rounded-xl p-4 m-5"
      >
      Sign Up
      </button>
      <div class="log-in-info-container flex justify-center mu-5">
        <p class="text-black">Do you have a account?</p>
        <a href="" class=""> <p class="hover:underline underline-offset-4 light-purple font-medium">Log in here</p> </a>
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
  data(){
    return {
      emailData: {
        type: String
      }
    }
  },
  methods: {
    getEmailInp(emailInp){
      this.emailData = emailInp ;
    },
    validateEmail() {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.emailData)) {
        alert("Email address is valid...")
      } else {
        alert("Please enter a valid email address!");
      }
    },
  }
};
</script>
<style>
.light-purple {
  color: #7b7d9e;
}
.btn-gradient{
  background: linear-gradient(to right, #516088 20%, #3D4763 90% )
}
</style>
