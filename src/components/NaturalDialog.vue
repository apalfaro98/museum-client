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
                            title: 'CÓDIGO',
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
                            title: 'MANIFESTACIÓN',
                            value: editedItem.manifestacion,
                        },
                        {
                            title: 'CATEGORIA CLASIFICATORIA',
                            value: editedItem.categoria,
                        },
                        {
                            title: 'NOMBRE COMUN',
                            value: editedItem.comun,
                        },
                        {
                            title: 'NOMBRE TECNICO',
                            value: editedItem.tecnico,
                        },
                        {
                            title: 'LOC. DE COLECTA',
                            value: editedItem.locColecta,
                        },
                        {
                            title: 'PAIS',
                            value: editedItem.pais,
                        },
                        {
                            title: 'FECHA DE COLECTA',
                            value: editedItem.fechaColecta,
                        },
                        {
                            title: 'COLECTOR',
                            value: editedItem.colector,
                        },
                    ]"
                />
                <list-element
                    :title="'IDENTIFICADOR TÉCNICO'"
                    :list="[
                        {
                            title: 'FECHA',
                            value: editedItem.fecha,
                        },
                        {
                            title: 'LOTE',
                            value: editedItem.lote,
                        },
                    ]"
                />
            </v-col>
            <v-col cols="12" md="6">
                <list-element
                    :title="'ORIGINAL'"
                    :list="[
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
                    ]"
                />
                <property-element
                    :items="[
                        {
                            title: 'UBICACIÓN',
                            value: editedItem.ubicacion,
                        },
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
                            title: 'PROCEDENCIA',
                            value: editedItem.procedencia,
                        },
                        {
                            title: 'REL. ACONTECIMIENTO',
                            value: editedItem.acontecimiento,
                        },
                        {
                            title: 'EXPEDIENTE',
                            value: editedItem.expediente,
                        },
                    ]"
                />
                <property-element
                    :items="[
                        {
                            title: 'ENTREGADO POR',
                            value: editedItem.entregadoPor,
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
