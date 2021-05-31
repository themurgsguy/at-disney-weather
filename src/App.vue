<template>
  <div id="app">
    <b-container>
      <b-row class="p-4" align-h="between">
        <b-link href="https://shop.americantourister.com/disney-kids" target="_blank">
          <b-img class="sponsor-logo" src="@/assets/img/at-logo.svg"/>
        </b-link>
        <b-link href="https://www.disneylandparis.com/" target="_blank">
          <b-img class="sponsor-logo" src="@/assets/img/disneyland-paris.svg"/>
        </b-link>
      </b-row>

      <b-row class="my-5 text-light text-shadow">
        <b-col md="5" offset-md="7">
          <b-media>
            <template #aside>
              <b-img height="128" :src="`http://openweathermap.org/img/wn/${forcast.current.weather[0].icon}@2x.png`"/>
            </template>
            <h1 class="display-3">{{ Math.round(forcast.current.temp) }}º</h1>
            <h3>{{ forcast.current.weather[0].main }}</h3>
          </b-media>
          <h4 class="mt-5">{{ forcast.current.weather[0].description }} above Disneylad Paris!</h4>
          <h5 class="mt-5">{{ recomendCurrent }}</h5>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="mt-auto bg-light px-0" fluid>
      <b-container>
        <b-card-group class="calender" deck>
          <b-card class="shadow" v-for="(day, index) in calendar" :key="index">
            <b-media class="align-items-center">
              <template #aside>
                <b-img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" height="64"/>
              </template>
              <h4>
                <b-icon-thermometer-half></b-icon-thermometer-half>
                {{ Math.round(day.temp.max) }}º
              </h4>
              <h4 class="text-primary">
                <b-icon-thermometer></b-icon-thermometer>
                {{ Math.round(day.temp.min) }}º
              </h4>
            </b-media>

            <h4 class="mt-3">{{ day.weather[0].main }}</h4>
            <p class="text-muted">{{ day.weather[0].description }}</p>
            <p class="text-muted">{{ recomend(day.weather[0].icon) }}</p>
          </b-card>
        </b-card-group>
      </b-container>

      <b-container class="footer" fluid>
        <b-row class="footer p-4" align-h="center">
          <p class="text-muted">© Disney • Pixar &amp; © Samsonite IP Holdings S.AR.L. All rights reserved</p>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'App',
  async mounted () {
    const request = {
      exclude: 'minutely,hourly',
      lat: '48.871900',
      lon: '2.776623',
      key: process.env.VUE_APP_API_KEY
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${request.lat}&lon=${request.lon}&units=metric&exclude=${request.exclude}&appid=${request.key}`
      )
      if(response.ok) {
        this.forcast = await response.json()
      } else {
        const message = await response.json()
        console.error(message.message)
      }
    } catch (e) {
      console.error('error', e)
    }
  },
  computed: {
    calendar () {
      return this.forcast.daily.slice(3,8)
    },
    recomendCurrent () {
      return this.recomend(this.forcast.current.weather[0].icon)
    },
    recomendDaily (index) {
      return this.recomend(this.forcast.daily[index].weather[0].icon)
    }
  },
  data: () =>({
    selected: 0,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    forcast: {}
  }),
  methods: {
    recomend (icon) {
      let feedback = ""

      switch (icon) {
        case '01d':
          feedback = "We recomend you pack plenty tee shirts. And don't forget your sun screen!"
          break
        case '02d':
          feedback = "Pack plenty tee shirts and clothes you like!"
          break
        case '03d':
          feedback = "Make sure to pack a coat it case it gets cold!"
          break
        case '04d':
        case '09d':
        case '10d':
          feedback = "Make sure to pack a raincoat and an unbrella!"
          break
        case '11d':
        case '13d':
          feedback = "Make sure to pack warm clothes and a raincoat just in case!"
          break
        case '50d':
          feedback = "Make sure to pack a raincoat! And keep your parents close by!"
          break
        default:
          feedback = "Pack plenty of tee shirts and a warm jacket!"
      }
      return feedback
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(195deg, lightblue, blue);
  // background: url('https://media.disneylandparis.com/d4th/pt-pt/images/n033395_2025aug10_world_enter-the-magic-mickey-mouse-sleeping-beauty-castle_5-1_tcm851-214769.jpg?w=1920, https://media.disneylandparis.com/d4th/pt-images/n033395_2025aug10_world_enter-the-magic-mickey-mouse-sleeping-beauty-castle_5-1_tcm851-214769.jpg?w=3840');
  background-position: left bottom;
  background-size: cover;
  background-repeat: no-repeat;

  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.calender {
  margin-top: 2rem;

  @media (min-width: 768px) {
    margin-top: 0;
    position: relative;
    top: -3rem;
  }
}

.card {
  border: 0;
}

.sponsor-logo {
  height: 2.5rem;
}
</style>
