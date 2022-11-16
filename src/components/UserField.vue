<template>
  <div
    class="user-field-container m-5 flex bg-slate-800 rounded-xl justify-center"
  >
    <div
      class="flex items-center justify-center pl-3 text-neutral-400 text-xl text-center"
    >
      <font-awesome-icon v-if="FieldType == 'Name'" icon="fa-solid fa-user" />
      <font-awesome-icon
        v-if="FieldType == 'Password'"
        icon="fa-solid fa-lock"
      />
      <font-awesome-icon
        v-if="FieldType == 'Email'"
        icon="fa-solid fa-envelope"
      />
    </div>
    <input
      v-model="fieldData"
      @change="$emit('fieldData', fieldData)"
      v-if="FieldType == 'Name'"
      type="text"
      placeholder="Name"
      class="rounded-r-xl bg-slate-800 text-neutral-300 p-3 grow"
    />
    <input
      v-model="fieldData"
      @change="$emit('fieldData', fieldData)"
      v-if="FieldType == 'Email'"
      type="email"
      placeholder="Email Address"
      class="rounded-r-xl bg-slate-800 text-neutral-300 p-3 grow"
    />
    <div v-if="FieldType == 'Password'" class="passwd-container">
      <input
        v-model="fieldData"
        @change="$emit('fieldData', fieldData)"
        :type="!showPasswd ? 'password' : 'text'"
        placeholder="•••••••••"
        class="bg-slate-800 text-neutral-300 rounded-r-xl p-3 grow"
      />
      <button class="rounded-xl mr-3 text-neutral-400 text-l w-5">
        <font-awesome-icon
          v-if="!showPasswd"
          @click="showPasswd = !showPasswd"
          icon="fa-solid fa-eye-slash"
        />
        <font-awesome-icon
          v-else
          @click="showPasswd = !showPasswd"
          icon="fa-solid fa-eye"
        />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserField",
  data() {
    return {
      showPasswd: false,
      fieldData: ''
    };
  },
  props: {
    FieldType: {
      required: true,
      type: String,
    },
  },
  methods: {
  },
};
</script>
