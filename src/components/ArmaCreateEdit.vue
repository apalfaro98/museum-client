<template>
    <v-card>
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
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.noInventario"
                            label="NO.INVENTARIO"
                            outlined
                            :disabled="!isNew"
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.cantidad"
                            label="CANTIDAD"
                            outlined
                            :rules="[rules.required]"
                            type="number"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.manifestacion"
                            label="MANIFESTACIÓN"
                            outlined
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.denominacion"
                            label="DENOMINACIÓN"
                            outlined
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.fabrica"
                            label="FÁBRICA"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.noSerie"
                            label="NO. DE SERIE"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.ciudadPais"
                            label="CIUDAD Y PAÍS"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.anio"
                            label="AÑO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.epoca"
                            label="ÉPOCA"
                            outlined
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.alto"
                            label="ALTO"
                            outlined
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.ancho"
                            label="ANCHO"
                            outlined
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.profundidad"
                            label="PROFUNDIDAD"
                            outlined
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.calibre"
                            label="CALIBRE"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.materiales"
                            label="MATERIALES"
                            outlined
                            :rules="[rules.required]"
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
                            :rules="[rules.required]"
                        ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <span>DESCRIPTORES:</span>
                        <v-text-field
                            v-model="editedItem.mar"
                            label="MAR/MOD"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.anx"
                            label="ANX"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.sis"
                            label="SIS"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.dec"
                            label="DEC"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.ubicacion"
                            label="UBICACIÓN"
                            outlined
                            :rules="[rules.required]"
                        ></v-text-field>
                        <span>TIPO DE REPRODUCCIÓN:</span>
                        <v-text-field
                            v-model="editedItem.estado"
                            label="ESTADO"
                            outlined
                            class="mt-1"
                            :rules="[rules.required]"
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
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.origen"
                            label="ORIGEN"
                            outlined
                            :rules="[rules.required]"
                        ></v-text-field>
                        <span>RELACIONADO CON:</span>
                        <v-text-field
                            v-model="editedItem.personalidad"
                            label="PERSONALIDAD"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.acontecimiento"
                            label="ACONTECIMIENTO"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.tasacion"
                            label="TASACIÓN"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem.expediente"
                            label="EXPEDIENTE"
                            outlined
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-textarea
                            outlined
                            label="NOTAS"
                            v-model="editedItem.notas"
                        ></v-textarea>
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
            error: '',
            show: false,
            rules: {
                required: (value) => !!value || 'Requerido.',
            },
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
            if (this.isNew) {
                requests
                    .createArma(this.editedItem, this.image)
                    .then((data) => {
                        console.log(data);
                        this.$emit('close');
                        this.$emit('reload');
                    })
                    .catch(this.showErrors);
            } else {
                requests
                    .updateArma(this.editedItem)
                    .then((data) => {
                        console.log(data);
                        this.$emit('close');
                        this.$emit('reload');
                    })
                    .catch(this.showErrors);
            }
        },
    },
};
</script>

<style></style>
