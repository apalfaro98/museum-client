<template>
    <v-app>
        <v-app-bar app color="light-blue" dark dense>
            <router-link to="/">
                <div class="image-container">
                    <v-img src="@/assets/images/logo-small.png" />
                </div>
            </router-link>
            <v-spacer></v-spacer>
            <router-link to="/prestamos">
                <v-btn color="black" text plain class="font-weight-bold">
                    <v-icon class="pr-2">mdi-hand-coin</v-icon>
                    Prestamos
                </v-btn>
            </router-link>
            <!-- FIXME: EL icono no cambia cuando se da click fuera del boton  -->
            <v-menu
                transition="slide-y-transition"
                bottom
                offset-y
                rounded="br-xl tl-xl"
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
                        <v-icon class="pr-2">mdi-file-document</v-icon>
                        Secciones
                        <v-icon>mdi-menu-{{ down ? 'down' : 'up' }}</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, i) in items" :key="i">
                        <router-link
                            :to="item.route"
                            class="grey--text text--darken-4"
                        >
                            <v-list-item-title @click="changeIcon">
                                {{ item.title }}
                            </v-list-item-title>
                        </router-link>
                    </v-list-item>
                </v-list>
            </v-menu>
            <router-link to="/login">
                <v-btn color="black" text plain class="font-weight-bold">
                    <v-icon class="pr-2">mdi-account-lock</v-icon>
                    Administrar
                </v-btn>
            </router-link>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({
        items: [
            { title: 'ARMAS', route: '/armas' },
            { title: 'CIENCIAS NATURALES', route: '/naturales' },
        ],
        down: true,
    }),
    methods: {
        changeIcon() {
            this.down = !this.down;
        },
    },
};
</script>

<style scoped>
a {
    text-decoration: none;
}
.image-container {
    width: 27px;
    height: 27px;
}
</style>
