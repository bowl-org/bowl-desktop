<template>
  <div class="bg-neutral-200 overflow-auto max-h-screen">
    <button v-for="emoji in emojiList" :key="emoji" class="m-2" @click="selectEmoji(emoji.char)">
      {{ emoji.char }}
    </button>
  </div>
</template>
<script>
import Emoji from "emoji.json";
export default {
  name: "EmojiSelection",
  data() {
    return {
      emojiList: [],
    };
  },
  created() {
    Emoji.forEach((x) => {
      let emoji = {
        char: "",
        name: "",
      };
      emoji.char = x.char;
      emoji.name = x.name;
      this.emojiList.push(emoji);
    });
  },
  methods:{
    selectEmoji(emojiChar){
      this.$emit("selectEmoji", emojiChar);
    }
  }
};
</script>
<style></style>
