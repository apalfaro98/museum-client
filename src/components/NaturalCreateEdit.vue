<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="editedItem.propietario"
                            label="INST/PROPIETARIO"
                            outlined
                            class="mt-5"
                            :disabled="!isNew"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.codigo"
                            label="CODIGO"
                            outlined
                            :disabled="!isNew"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.noInventario"
                            label="NO.INVENTARIO"
                            outlined
                            :disabled="!isNew"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.cantidad"
                            label="CANTIDAD"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.manifestacion"
                            label="MANIFESTACIÓN"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.categoria"
                            label="CATEGORIA CLASIFICATORIA"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.comun"
                            label="NOMBRE COMUN"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.tecnico"
                            label="NOMBRE TECNICO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.locColecta"
                            label="LOC. DE COLECTA"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.pais"
                            label="PAIS"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.fechaColecta"
                            label="FECHA DE COLECTA"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.colector"
                            label="COLECTOR"
                            outlined
                        ></v-text-field>
                        <span>IDENTIFICADOR TECNICO:</span>
                        <v-text-field
                            v-model="editedItem.fecha"
                            label="FECHA"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.lote"
                            label="LOTE"
                            outlined
                        ></v-text-field>
                        <span>ORIGINAL:</span>
                        <v-text-field
                            v-model="editedItem.alto"
                            label="ALTO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.ancho"
                            label="ANCHO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.profundidad"
                            label="PROFUNDIDAD"
                            outlined
                        ></v-text-field>
                        <v-file-input
                            v-model="image"
                            show-size
                            label="IMAGEN"
                            accept="image/png, image/jpeg, image/jpg"
                            outlined
                            prepend-inner-icon="mdi-camera"
                            prepend-icon=""
                            :disabled="!isNew"
                        ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="editedItem.ubicacion"
                            label="UBICACIÓN"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.estado"
                            label="ESTADO"
                            outlined
                            class="mt-1"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.valor"
                            label="VALOR"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.gradoDeValor"
                            label="GRADO DE VALOR"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.procedencia"
                            label="PROCEDENCIA"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.acontecimiento"
                            label="REL. ACONTECIMIENTO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.expediente"
                            label="EXPEDIENTE"
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('close')">
                Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import requests from '@/helpers/requests';
export default {
    data() {
        return {
            image: undefined,
        };
    },
    props: {
        formTitle: String,
        editedItem: Object,
        isNew: Boolean,
    },
    methods: {
        save() {
            if (this.isNew) {
                requests
                    .createArma(this.editedItem, this.image)
                    .then((data) => {
                        console.log(data);
                        this.$emit('close');
                        this.$emit('reload');
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            } else {
                requests
                    .updateArma(this.editedItem)
                    .then((data) => {
                        console.log(data);
                        this.$emit('close');
                        this.$emit('reload');
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            }
        },
    },
};
</script>

<style></style>
