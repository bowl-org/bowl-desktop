<template>
  <div class="bg-neutral-200 overflow-auto max-h-screen">
    <button
      v-for="emoji in emojiList"
      :key="emoji"
      class="m-2"
      @click="selectEmoji(emoji.char)"
    >
      {{ emoji.char }}
    </button>
  </div>
</template>
<script>
const EmojiJson = () => require("emoji.json");
export default {
  name: "EmojiSelection",
  data() {
    return {
      emojiList: [],
    };
  },
  mounted() {
    EmojiJson().forEach((x) => {
      this.emojiList.push({
        char: x.char,
        name: x.name,
      });
    });
  },
  created() {},
  methods: {
    selectEmoji(emojiChar) {
      this.$emit("selectEmoji", emojiChar);
    },
  },
};
</script>
<style></style>
