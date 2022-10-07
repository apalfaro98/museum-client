<template>
    <div>
        <armas-section v-if="section === 'armas'" />
    </div>
</template>

<script>
import requests from '@/helpers/requests';
import ArmasSection from '@/components/ArmasSection.vue';
export default {
    data() {
        return {
            section: this.$route.params.idSection,
        };
    },
    components: { ArmasSection },
    methods: {
        requestData(section) {
            switch (section) {
                case 'armas':
                    break;

                default:
                    requests
                        .getNaturales()
                        .then((data) => {
                            this.datos = data;
                        })
                        .catch((err) => console.log);
                    break;
            }
        },
    },
};
</script>

<style></style>
