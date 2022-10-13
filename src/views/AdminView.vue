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
                    <v-list-item-group color="primary">
                        <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            @click="selectNav(i)"
                        >
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title
                                    v-text="item.text"
                                ></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                    <v-list-group
                        :value="true"
                        prepend-icon="mdi-file-document"
                        no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-title>Secciones</v-list-item-title>
                        </template>
                        <v-list-item-group class="pl-6" color="primary">
                            <v-list-item
                                v-for="(item, i) in sections"
                                :key="i"
                                link
                                @click="selectSection(i)"
                            >
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title
                                        v-text="item.text"
                                    ></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>
                </v-list>
            </v-navigation-drawer>
        </v-card>
        <div class="ml-14">
            <home-view v-if="selectedItem === 0" />
            <prestamos-admin v-else-if="selectedItem === 1" />
            <armas-admin v-if="selectedSection === 0" />
            <naturales-admin v-else-if="selectedSection === 1" />
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
        selectedItem: 0,
        selectedSection: -1,
        items: [
            { text: 'Estadistica', icon: 'mdi-chart-line' },
            { text: 'Prestamos', icon: 'mdi-hand-coin' },
        ],
        sections: [
            { text: 'Armas', icon: 'mdi-sword-cross' },
            { text: 'Ciencias Naturales', icon: 'mdi-sprout' },
        ],
    }),
    methods: {
        selectNav(i) {
            this.selectedItem = i;
            this.selectedSection = -1;
        },

        selectSection(i) {
            this.selectedSection = i;
            this.selectedItem = -1;
        },
    },
};
</script>

<style scoped>
.back {
    z-index: 1;
}
</style>
