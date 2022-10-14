<template>
    <div>
        <v-card>
            <v-navigation-drawer
                bottom
                mobile-breakpoint="768"
                fixed
                class="back pt-16"
                expand-on-hover
            >
                <v-list nav dense>
                    <v-list-item-group color="primary" v-model="selectedItem">
                        <router-link
                            v-for="(item, i) in items"
                            :key="i"
                            :to="item.route"
                            class="link"
                        >
                            <v-list-item @click="selectNav()">
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title
                                        v-text="item.text"
                                    ></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </router-link>
                    </v-list-item-group>
                    <v-list-group
                        :value="true"
                        prepend-icon="mdi-file-document"
                        no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-title>Secciones</v-list-item-title>
                        </template>
                        <v-list-item-group
                            class="pl-6"
                            color="primary"
                            v-model="selectedSection"
                        >
                            <router-link
                                v-for="(item, i) in sections"
                                :key="i"
                                :to="item.route"
                                class="link"
                            >
                                <v-list-item @click="selectSection()">
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            v-text="item.text"
                                        ></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </router-link>
                        </v-list-item-group>
                    </v-list-group>
                </v-list>
            </v-navigation-drawer>
        </v-card>
        <div class="ml-14">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HomeView from '@/views/HomeView.vue';
import PrestamosAdmin from '@/components/PrestamosAdmin.vue';
import ArmasAdmin from '@/components/ArmasAdmin.vue';
import NaturalesAdmin from '@/components/NaturalesAdmin.vue';
export default {
    components: {
        HomeView,
        PrestamosAdmin,
        ArmasAdmin,
        NaturalesAdmin,
    },
    data: () => ({
        selectedItem: -1,
        selectedSection: -1,
        items: [
            {
                text: 'Estadistica',
                icon: 'mdi-chart-line',
                route: '/admin/estadistica',
            },
            {
                text: 'Prestamos',
                icon: 'mdi-hand-coin',
                route: '/admin/prestamos',
            },
        ],
        sections: [
            { text: 'Armas', icon: 'mdi-sword-cross', route: '/admin/armas' },
            {
                text: 'Ciencias Naturales',
                icon: 'mdi-sprout',
                route: '/admin/naturales',
            },
        ],
    }),
    mounted() {
        if (this.$route.path.includes('estadistica')) {
            this.selectedItem = 0;
            return;
        }
        if (this.$route.path.includes('prestamos')) {
            this.selectedItem = 1;
            return;
        }
        if (this.$route.path.includes('armas')) {
            this.selectedSection = 0;
            return;
        }
        if (this.$route.path.includes('naturales')) {
            this.selectedSection = 1;
            return;
        }
    },
    methods: {
        selectNav() {
            this.selectedSection = -1;
        },

        selectSection() {
            this.selectedItem = -1;
        },
    },
};
</script>

<style scoped>
.back {
    z-index: 1;
}
.link {
    text-decoration: none;
}
</style>
