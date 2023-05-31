<template>
  <div class="bg-neutral-300 grow flex flex-col justify-center items-center">
    <h1 class="text-6xl text-center font-medium light-purple">Log In</h1>
    <h2 class="font-medium m-3 mt-10">Fill your information to log in now!</h2>
    <div class="h-4">
      <h3
        class="font-semibold"
        :class="responseStatus == 'FAILURE' ? 'text-red-500' : 'text-green-500'"
      >
        {{ infoMessage }}
      </h3>
    </div>
    <div class="flex flex-col w-96">
      <UserField FieldType="Email" @fieldData="getEmailInp" />
      <UserField
        FieldType="Password"
        @fieldData="getPasswdInp"
        @keyup.enter="logIn"
      />
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
      <LoadingSpinner :showLoading="showLoading"/>
      <button
        @click="logIn()"
        class="hover:contrast-125 drop-shadow-xl btn-gradient text-neutral-300 font-semibold rounded-xl p-4 m-5"
        :class="showLoading ? 'contrast-50 hover:contrast-50' : ''"
        :disabled="showLoading"
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
        <p class="absolute text-red-500 font-semibold mt-3">
          {{ errorMsg }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import UserField from "@/components/UserField.vue";
import logInService from "@/services/logInService";
import User from "@/backend/models/user";
import authTokenService from "@/services/authTokenService";
import LoadingSpinner from "@/components/LoadingSpinner";
export default {
  name: "LogIn",
  data() {
    return {
      emailData: "",
      passwdData: "",
      errorMsg: "",
      rememberMe: false,
      infoMessage: "",
      responseStatus: "",
      showLoading: false
    };
  },
  components: {
    UserField,
    LoadingSpinner
  },
  created() {
    logInService
      .autoLogInCheck()
      .then(async (user) => {
        this.$store.dispatch("setUser", user);
        let token = await authTokenService.getToken();
        this.$store.dispatch("setToken", token);
        console.log("Store user:", this.$store.getters.user);
        console.log("Store token:", this.$store.getters.token);
        this.$router.push({
          path: "main/logo",
        });
      })
      .catch((err) => {
        console.log("Auto log in token not found!", err);
      });
  },
  methods: {
    getPasswdInp(passwdInp) {
      this.passwdData = passwdInp;
    },
    getEmailInp(emailInp) {
      this.emailData = emailInp;
    },
    logIn() {
      this.showLoading = true;
      let loginUser = User.userModel;
      loginUser.email = this.emailData;
      loginUser.password = this.passwdData;
      logInService
        .logIn(loginUser, this.rememberMe)
        .then((res) => {
          this.infoMessage = res.data.msg;
          this.responseStatus = res.data.status;
          let token = res.data.token;
          let user = res.data.user;

          console.log("RES USER: ", user);
          this.$store.dispatch("setUser", user);
          this.$store.dispatch("setToken", token);

          this.$router.push({
            path: "main/logo",
            //query: { rememberme: this.rememberMe },
            //params: { user, token },
          });
        })
        .catch((err) => {
          this.showLoading = false;
          console.log(err);
          this.infoMessage = err.response.data.msg;
          this.responseStatus = err.response.data.status;
          console.log(err.response.data);
        });
    },
  },
};
</script>

<style></style>
