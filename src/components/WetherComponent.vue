<template>
  <div ref="infoBox" :style="{ left: left + 'px', top: top + 'px'}" class="wether__container">
    <button @mousedown.prevent="someMethod" @mouseup.prevent = "mouseup"
    @mousemove.prevent = "mousemove">Move</button>
    <div class="settings__list">
      <div class="settings">
        <button @click="isHidden = !isHidden" class="settings__btn"><SettingsIcon /></button>
      </div>
      <div v-show='isHidden' >
        <draggable class="citys__list" v-model="addNewCity">
            <transition-group>
                <div class="citys__item" v-for='item in addNewCity' :key="item.id">
                  <div>{{item.name}}, {{item.sys.country}}</div>
                  <button class="btn_delete" @click="deleteCity(item.id)"><DeleteSvg/></button>
                </div>
            </transition-group>
        </draggable>
        <form class="form" method="POST" @submit.prevent="addCity">
          <label name="location" for="location">
            <div>Add location:</div>
            <div class="flex">
              <input v-model="location" :placeholder="errorMessage"
              type="text" name="location" for="location">
              <button class="form__btn"></button>
            </div>
          </label>
        </form>
      </div>
    </div>
    <div class="item__citys" v-for='item in addNewCity' :key="item.id">
      <div>{{item.name}}, {{item.sys.country}}</div>
      <div class="flex-centre">
        <SkyImage :icon="item.weather[0].icon"/>
        <div>{{item.main.temp | numberFormat}} <span>°C</span></div>
      </div>
      <span>Feels like {{item.main.feels_like | numberFormat}} <span>°C</span>,
        {{item.weather[0].description}}
      </span>
      <div>
        <div class="flex">
            <div class="flex">
              <WindSvg :deg="item.wind.deg"/>
              <WindText :deg="item.wind.deg" :speed="item.wind.speed"/>
            </div>
            <div>{{item.main.pressure}} hPa</div>
        </div>
        <div class="flex">
          <div>Humidity:{{item.main.humidity}} %</div>
          <div>
            Visibility: {{item.visibility / 1000}} km
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapActions, mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import WindSvg from '@/components/WindSvg.vue';
import WindText from '@/components/WindText.vue';
import SkyImage from '@/components/SkyImage.vue';
import SettingsIcon from '@/components/SettingsIcon.vue';
import DeleteSvg from '@/components/DeleteSvg.vue';

export default {
  data() {
    return {
      mousePosition: '',
      offset: [0, 0],
      isDown: false,
      newLat: '',
      newLon: '',
      location: '',
      citys: [],
      isHidden: false,
      left: 0,
      top: 0,
    };
  },
  components: {
    WindSvg, WindText, SkyImage, SettingsIcon, draggable, DeleteSvg,
  },
  filters: { numberFormat },
  computed: {
    addNewCity: {
      get() {
        return this.$store.state.citys;
      },
      set(value) {
        this.$store.commit('updateList', value);
      },
    },
    errorMessage() {
      return this.$store.state.errorMessage;
    },
  },
  methods: {
    someMethod(event) {
      this.isDown = true;
      this.offset = [
        this.$refs.infoBox.offsetLeft - event.clientX,
        this.$refs.infoBox.offsetTop - event.clientY,
      ];
    },
    mouseup() {
      this.isDown = false;
    },
    mousemove(event) {
      if (this.isDown) {
        this.mousePosition = {
          x: event.clientX,
          y: event.clientY,
        };
        this.left = this.mousePosition.x + this.offset[0];
        this.top = this.mousePosition.y + this.offset[1];
      }
    },
    addCity() {
      this.loadCity(this.location);
      this.location = '';
    },
    ...mapMutations(['deleteCity', 'saveConfig', 'updatecityId']),
    ...mapActions(['loadWether', 'loadCity', 'loadMemmoryCity']),
    success(pos) {
      const crd = pos.coords;
      this.newLat = crd.latitude;
      this.newLon = crd.longitude;
      this.$store.dispatch('loadWether', { lat: this.newLat, lon: this.newLon });
    },
    error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },
    loadPlace() {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(this.success, this.error, options);
    },
  },
  created() {
    const citysId = JSON.parse(localStorage.getItem('citysId'));
    if (citysId) {
      this.updatecityId(citysId);
      citysId.forEach((item) => this.$store.dispatch('loadMemmoryCity', item));
    }
    this.loadPlace();
  },
};
</script>

<style>
.btn_delete {
  cursor: pointer;
  background-color: gainsboro;
  border: unset;
  background-size: 100%;
}
.citys__list {
  margin-bottom: 30px;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wether__container {
  position: absolute;
  z-index: 10000;
  background-color: white;
  border: 1px solid gray;
  border-radius: 20px;
  text-align: left;
  max-width: 320px;
  padding: 15px;
}
.flex-centre {
  display: flex;
  align-items: center;
  justify-content: center;
}

.item__citys {
  padding: 10px;
  border: 1px solid grey;
  border-radius: 20px;
  margin-bottom: 10px;
}
.settings__btn {
  background-color: unset;
  border: unset;
  cursor: pointer;
  display: block;
  margin-left: auto;
}

.citys__item {
  justify-content: space-between;
  display: flex;
  align-items: center;
  background-color: gainsboro;
  border-radius: 20px;
  margin-bottom: 15px;
  padding: 10px;
}

.form {
  width: 100%;
}

.form input {
  width: 100%;
  height: 30px;
}

.settings__list {
  margin-bottom: 30px;
}
.form__btn {
  cursor: pointer;
  background-color: gray;
  height: 30px;
  width: 30px;
  background-image: url('../assets/pngwing.com.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
