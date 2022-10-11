<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6">
                <v-img
                    :src="`http://localhost:3000/images/${editedItem.imageUrl}`"
                ></v-img>
            </v-col>
            <v-col cols="12" md="6">
                <property-element
                    :items="[
                        {
                            title: 'INST/PROPIETARIO',
                            value: editedItem.propietario,
                        },
                        {
                            title: 'CODIGO',
                            value: editedItem.codigo,
                        },
                        {
                            title: 'NO.INVENTARIO',
                            value: editedItem.noInventario,
                        },
                    ]"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <property-element
                    :items="[
                        {
                            title: 'CANTIDAD',
                            value: editedItem.cantidad,
                        },
                        {
                            title: 'REGISTRO DE ENTRADA',
                            value: editedItem.registroEntrada,
                        },
                        {
                            title: 'DENOMINACIÓN',
                            value: editedItem.denominacion,
                        },
                        {
                            title: 'FÁBRICA',
                            value: editedItem.fabrica,
                        },
                        {
                            title: 'NO. DE SERIE',
                            value: editedItem.noSerie,
                        },
                        {
                            title: 'CIUDAD Y PAÍS',
                            value: editedItem.ciudadPais,
                        },
                        {
                            title: 'AÑO',
                            value: editedItem.anio,
                        },
                        {
                            title: 'ÉPOCA',
                            value: editedItem.epoca,
                        },
                        {
                            title: 'ALTO',
                            value: editedItem.alto,
                        },
                        {
                            title: 'ANCHO',
                            value: editedItem.ancho,
                        },
                        {
                            title: 'PROFUNDIDAD',
                            value: editedItem.profundidad,
                        },
                        {
                            title: 'CALIBRE',
                            value: editedItem.calibre,
                        },
                        {
                            title: 'MATERIALES',
                            value: editedItem.materiales,
                        },
                    ]"
                />
                <list-element
                    :title="'DESCRIPTORES'"
                    :list="[
                        {
                            title: '1. (MAR/MOD)',
                            value: editedItem.mar,
                        },
                        {
                            title: '2. (ANX)',
                            value: editedItem.anx,
                        },
                        {
                            title: '3. (SIS)',
                            value: editedItem.sis,
                        },
                        {
                            title: '4. (DEC)',
                            value: editedItem.dec,
                        },
                    ]"
                />
            </v-col>
            <v-col cols="12" md="6">
                <property-element
                    :items="[
                        {
                            title: 'UBICACIÓN',
                            value: editedItem.ubicacion,
                        },
                    ]"
                />
                <list-element
                    :title="'TIPO DE REPRODUCCIÓN'"
                    :list="[
                        {
                            title: 'ESTADO',
                            value: editedItem.estado,
                        },
                        {
                            title: 'VALOR',
                            value: editedItem.valor,
                        },
                        {
                            title: 'GRADO DE VALOR',
                            value: editedItem.gradoDeValor,
                        },
                        {
                            title: 'ORIGEN',
                            value: editedItem.origen,
                        },
                    ]"
                />
                <list-element
                    :title="'RELACIONADO CON'"
                    :list="[
                        {
                            title: 'PERSONALIDAD',
                            value: editedItem.personalidad,
                        },
                        {
                            title: 'ACONTECIMIENTO',
                            value: editedItem.acontecimiento,
                        },
                        {
                            title: 'TASACIÓN',
                            value: editedItem.tasacion,
                        },
                        {
                            title: 'EXPEDIENTE CIENTÍFICO',
                            value: editedItem.expediente,
                        },
                    ]"
                />
                <property-element
                    :items="[
                        {
                            title: 'NOTAS',
                            value: editedItem.notas,
                        },
                    ]"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PropertyElement from '@/components/PropertyElement.vue';
import ListElement from '@/components/ListElement.vue';
export default {
    props: {
        editedItem: Object,
    },
    components: { PropertyElement, ListElement },
};
</script>

<style></style>
