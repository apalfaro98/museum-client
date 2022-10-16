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
                                :class="
                                    prestamo
                                        ? 'radio-green green--text'
                                        : 'radio-gray'
                                "
                            ></v-radio>
                            <v-radio
                                label="Recibir Artículo"
                                :value="false"
                                :color="prestamo ? '' : 'success'"
                                class="ma-4 rounded-xl pa-6"
                                :class="
                                    prestamo
                                        ? 'radio-gray'
                                        : 'radio-green green--text'
                                "
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
                    <h3 class="text-center">
                        ¿A qué sección pertenece el artículo que desea prestar o
                        recibir?
                    </h3>
                    <div class="d-flex justify-center">
                        <v-radio-group
                            v-model="section"
                            row
                            class="font-weight-bold"
                        >
                            <v-radio
                                label="Armas"
                                value="armas"
                                :color="section === 'armas' ? 'success' : ''"
                                class="ma-4 rounded-xl pa-6"
                                :class="
                                    section === 'armas'
                                        ? 'radio-green green--text'
                                        : 'radio-gray'
                                "
                            ></v-radio>
                            <v-radio
                                label="Ciencias Naturales"
                                value="naturales"
                                :color="section === 'armas' ? '' : 'success'"
                                class="ma-4 rounded-xl pa-6"
                                :class="
                                    section === 'armas'
                                        ? 'radio-gray'
                                        : 'radio-green green--text'
                                "
                            ></v-radio>
                        </v-radio-group>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="cancel">
                            Cancelar
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="mostrar">
                            Siguiente
                        </v-btn>
                    </v-card-actions>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <arma-create-edit
                        v-if="!prestamo && section === 'armas'"
                        :formTitle="'Registrar Arma'"
                        :editedItem="arma"
                        :isNew="true"
                        @close="cancel"
                        @getId="getId"
                        @reload="e1 = 4"
                    />
                    <natural-create-edit
                        v-else-if="!prestamo && section === 'naturales'"
                        :formTitle="'Registrar Artículo'"
                        :editedItem="natural"
                        :isNew="true"
                        @close="cancel"
                        @getId="getId"
                        @reload="e1 = 4"
                    />
                    <select-articulo
                        v-else-if="prestamo && ver"
                        :section="section"
                        @close="cancel"
                        @getId="getId"
                        @reload="e1 = 4"
                    />
                </v-stepper-content>

                <v-stepper-content step="4">
                    <prestamo-create-edit
                        :isNew="true"
                        :editedItem="editedItem"
                        :formTitle="formTitle"
                        @close="cancel"
                        @reload="reload"
                    />
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-card>
</template>

<script>
import ArmaCreateEdit from '@/components/ArmaCreateEdit.vue';
import NaturalCreateEdit from '@/components/NaturalCreateEdit.vue';
import PrestamoCreateEdit from '@/components/PrestamoCreateEdit.vue';
import SelectArticulo from '@/components/SelectArticulo.vue';
export default {
    data() {
        return {
            e1: 1,
            prestamo: true,
            section: 'armas',
            ver: false,
            arma: {
                propietario: '',
                codigo: '',
                noInventario: '',
                cantidad: 1,
                manifestacion: '',
                denominacion: '',
                fabrica: '',
                noSerie: '',
                ciudadPais: '',
                anio: 0,
                epoca: '',
                alto: '',
                ancho: '',
                profundidad: '',
                calibre: '',
                materiales: '',
                mar: '',
                anx: '',
                sis: '',
                dec: '',
                ubicacion: '',
                estado: '',
                valor: '',
                gradoDeValor: '',
                origen: '',
                personalidad: '',
                acontecimiento: '',
                tasacion: '',
                expediente: '',
                notas: '',
                prestado: false,
                recibido: true,
            },
            natural: {
                propietario: '',
                codigo: '',
                noInventario: '',
                cantidad: 1,
                manifestacion: '',
                categoria: '',
                comun: '',
                tecnico: '',
                locColecta: '',
                pais: '',
                fechaColecta: '',
                colector: '',
                fecha: '',
                lote: '',
                alto: '',
                ancho: '',
                profundidad: '',
                ubicacion: '',
                estado: '',
                valor: '',
                gradoDeValor: '',
                procedencia: '',
                acontecimiento: '',
                expediente: '',
                prestado: false,
                recibido: true,
            },
        };
    },
    props: {
        formTitle: String,
        editedItem: Object,
        isNew: Boolean,
    },
    components: {
        ArmaCreateEdit,
        NaturalCreateEdit,
        PrestamoCreateEdit,
        SelectArticulo,
    },
    methods: {
        cancel() {
            this.e1 = 1;
            this.$emit('close');
        },
        getId(id) {
            this.editedItem.elementId = id;
            this.editedItem.seccion = this.section;
            this.editedItem.prestado = this.prestamo;
        },
        reload() {
            this.$emit('reload');
        },
        mostrar() {
            this.e1 = 3;
            this.ver = true;
        },
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

.green--text /deep/ label {
    color: #4caf50;
}
</style>
