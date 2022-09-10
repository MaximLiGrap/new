<template>
  <div>{{speed}} m/s
    <span v-if="(0 <= deg && deg < 10)">N</span>
    <span v-else-if="(10 <= deg && deg < 80)">NE</span>
    <span v-else-if="(80 <= deg && deg < 100)">E</span>
    <span v-else-if="(100 <= deg && deg < 170)">SE</span>
    <span v-else-if="(170 <= deg && deg < 190)">S</span>
    <span v-else-if="(190 <= deg && deg < 260)">SW</span>
    <span v-else-if="(260 <= deg && deg < 280)">W</span>
    <span v-else-if="(280 <= deg && deg < 350)">NW</span>
    <span v-else-if="(350 <= deg && deg <= 360)">N</span>
  </div>
</template>

<script>
export default {
  props: {
    deg: Number,
    speed: Number,
  },
};
</script>
