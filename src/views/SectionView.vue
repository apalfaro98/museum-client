<template>
    <div>
        <armas-section v-if="$route.params.idSection === 'armas'" />
        <naturales-section
            v-else-if="$route.params.idSection === 'naturales'"
        />
    </div>
</template>

<script>
import ArmasSection from '@/components/ArmasSection.vue';
import NaturalesSection from '@/components/NaturalesSection.vue';
export default {
    components: { ArmasSection, NaturalesSection },
};
</script>

<style></style>
