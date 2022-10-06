<template>
  <v-app>
    <v-app-bar
      app
      color="light-blue"
      dark
      dense
    > 
    <v-spacer></v-spacer> 
    <!-- FIXME: EL icono no cambia cuando se da click fuera del boton  -->
    <v-menu
      transition="slide-y-transition"
      bottom
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="black"
          text
          plain
          class="font-weight-bold"
          v-bind="attrs"
          v-on="on"
          @click="changeIcon"
        >
          Secciones
          <v-icon>mdi-menu-{{ down ? 'down' : 'up'}}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>  
    <v-btn
      color="black"
      text
      plain
      class="font-weight-bold"
    >
      <v-icon class="pr-2">mdi-account-lock</v-icon>
      Administrar
    </v-btn> 
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    items: [
        { title: 'ARMAS' },
        { title: 'CIENCIAS NATURALES' },
      ],
      down: true,
  }),
  methods: {
    changeIcon() {
      this.down = !this.down;
    }
  }
};
</script>
