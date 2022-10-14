<template>
    <v-card>
        <v-stepper v-model="e1" width="full">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                    Tipo de préstamo
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">
                    Sección
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 3" step="3">
                    Seleccionar o crear
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="4"> Datos Prestamo </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <div class="d-flex justify-center">
                        <v-radio-group
                            v-model="prestamo"
                            row
                            class="font-weight-bold"
                        >
                            <v-radio
                                label="Prestar Artículo"
                                :value="true"
                                :color="prestamo ? 'success' : ''"
                                class="ma-4 rounded-xl pa-6"
                                :class="prestamo ? 'radio-green' : 'radio-gray'"
                            ></v-radio>
                            <v-radio
                                label="Recibir Artículo"
                                :value="false"
                                :color="prestamo ? '' : 'success'"
                                class="ma-4 rounded-xl pa-6"
                                :class="prestamo ? 'radio-gray' : 'radio-green'"
                            ></v-radio>
                        </v-radio-group>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">
                            Cancelar
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="e1 = 2">
                            Siguiente
                        </v-btn>
                    </v-card-actions>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card
                        class="mb-12"
                        color="grey lighten-1"
                        height="200px"
                    ></v-card>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">
                            Cancelar
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="e1 = 3">
                            Siguiente
                        </v-btn>
                    </v-card-actions>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                        class="mb-12"
                        color="grey lighten-1"
                        height="200px"
                    ></v-card>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">
                            Cancelar
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="e1 = 4">
                            Siguiente
                        </v-btn>
                    </v-card-actions>
                </v-stepper-content>

                <v-stepper-content step="4">
                    <v-card
                        class="mb-12"
                        color="grey lighten-1"
                        height="200px"
                    ></v-card>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">
                            Cancelar
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                            Salvar
                        </v-btn>
                    </v-card-actions>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            e1: 1,
            prestamo: true,
            section: 'armas',
        };
    },
    methods: {
        cancel() {
            this.e1 = 1;
            this.$emit('close');
        },
        save() {},
    },
};
</script>

<style scoped>
.radio-green {
    border: 2px solid #4caf50;
}

.radio-gray {
    border: 2px solid #9e9e9e;
}
</style>
