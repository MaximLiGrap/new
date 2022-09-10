<template>
  <div>
    <ClearSky v-if="icon === '01d'"/>
    <ClearSkyNight v-else-if="icon === '01n'"/>
    <LightRain v-else-if="icon === '02d'"/>
    <LightRain v-else-if="icon === '10d'"/>
    <LightRain v-else-if="icon === '02n'"/>
    <ScaterredSky v-else-if="icon === '03d'"/>
    <ScaterredSky v-else-if="icon === '03n'"/>
    <BrocenCound v-else-if="icon === '04d'"/>
    <BrocenCound v-else-if="icon === '04n'"/>
  </div>
</template>

<script>
import BrocenCound from '@/components/BrocenCound.vue';
import LightRain from '@/components/LightRain.vue';
import ScaterredSky from '@/components/ScaterredSky.vue';
import ClearSky from '@/components/ClearSky.vue';
import ClearSkyNight from '@/components/ClearSkyNight.vue';

export default {
  components: {
    BrocenCound,
    ClearSky,
    LightRain,
    ScaterredSky,
    ClearSkyNight,
  },
  props: {
    icon: String,
  },
};
</script>
