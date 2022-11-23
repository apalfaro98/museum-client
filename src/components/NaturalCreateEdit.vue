<template>
    <v-card elevation="0">
        <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-slide-x-transition>
                    <v-alert
                        v-if="error"
                        dense
                        text
                        outlined
                        type="error"
                        class="mb-6"
                    >
                        {{ error }}
                    </v-alert>
                </v-slide-x-transition>
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
                            type="number"
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
                            label="NOMBRE TÉCNICO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.locColecta"
                            label="LOC. DE COLECTA"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.pais"
                            label="PAÍS"
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
                    </v-col>
                    <v-col cols="12" sm="6">
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
                        <v-text-field
                            v-model="editedItem.ubicacion"
                            label="UBICACIÓN"
                            outlined
                        ></v-text-field>
                        <v-combobox
                            v-model="editedItem.estado"
                            :items="estados"
                            label="ESTADO"
                            outlined
                            class="mt-1"
                        ></v-combobox>
                        <v-text-field
                            v-model="editedItem.valor"
                            label="VALOR"
                            outlined
                        ></v-text-field>
                        <v-combobox
                            v-model="editedItem.gradoDeValor"
                            :items="grados"
                            label="GRADO DE VALOR"
                            outlined
                        ></v-combobox>
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
                Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import requests from '@/helpers/requests';
export default {
    data() {
        return {
            image: undefined,
            error: '',
            show: false,
            estados: ['B', 'R', 'M'],
            grados: ['I', 'II', 'III'],
        };
    },
    props: {
        formTitle: String,
        editedItem: Object,
        isNew: Boolean,
    },
    methods: {
        showErrors(err) {
            if (err.response.status === 400) {
                this.error = err.response.data.errors[0].msg;
            } else if (err.response.status === 401) {
                this.error = err.response.data.error.msg;
            } else {
                this.error =
                    'No se pudo establecer la conexión con el servidor.';
            }
        },
        save() {
            if (this.editedItem.codigo === '') {
                this.error = 'El código es obligatorio.';
                return;
            }
            if (this.editedItem.noInventario === '') {
                this.error = 'El número de Inventario es obligatorio.';
                return;
            }
            if (this.editedItem.cantidad === '') {
                this.error = 'La cantidad es obligatoria.';
                return;
            }
            if (this.editedItem.manifestacion === '') {
                this.error = 'La manifestación es obligatoria.';
                return;
            }
            if (this.editedItem.comun === '') {
                this.error = 'El nombre común es obligatorio.';
                return;
            }
            if (this.editedItem.locColecta === '') {
                this.error = 'La localización de colecta es obligatoria.';
                return;
            }
            if (this.editedItem.pais === '') {
                this.error = 'El país es obligatorio.';
                return;
            }
            if (this.editedItem.fechaColecta === '') {
                this.error = 'La fecha de colecta es obligatoria.';
                return;
            }
            if (this.editedItem.alto === '') {
                this.error = 'El alto es obligatorio.';
                return;
            }
            if (this.editedItem.ancho === '') {
                this.error = 'El ancho es obligatorio.';
                return;
            }
            if (this.editedItem.profundidad === '') {
                this.error = 'La profundidad es obligatoria.';
                return;
            }
            if (this.editedItem.ubicacion === '') {
                this.error = 'La ubicacion es obligatoria.';
                return;
            }
            if (this.editedItem.estado === '') {
                this.error = 'El estado es obligatorio.';
                return;
            }
            if (this.editedItem.gradoDeValor === '') {
                this.error = 'El Grado de Valor es obligatorio.';
                return;
            }
            if (this.editedItem.procedencia === '') {
                this.error = 'La procedencia es obligatoria.';
                return;
            }
            if (this.editedItem.acontecimiento === '') {
                this.error = 'El acontecimiento es obligatorio.';
                return;
            }
            if (this.editedItem.expediente === '') {
                this.error = 'El Expediente es obligatorio.';
                return;
            }
            if (this.isNew) {
                requests
                    .createNatural(this.editedItem, this.image)
                    .then((data) => {
                        this.$emit('reload');
                        this.$emit('getId', data._id);
                    })
                    .catch(this.showErrors);
            } else {
                requests
                    .updateNatural(this.editedItem)
                    .then(() => {
                        this.$emit('reload');
                    })
                    .catch(this.showErrors);
            }
        },
    },
};
</script>

<style></style>
