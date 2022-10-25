<template>
    <div>
        <div class="d-flex justify-end">
            <v-btn
                color="#217345"
                class="mt-5 mr-5 font-weight-bold"
                dark
                @click="exportTable"
            >
                <v-icon class="mr-1">mdi-file-excel</v-icon>
                Exportar
            </v-btn>
        </div>
        <v-simple-table class="mt-5" id="estadistica">
            <template v-slot:default>
                <tbody>
                    <tr class="gray">
                        <th rowspan="2" class="bt-gray br-gray">SECCIONES</th>
                        <th colspan="3" class="text-center bt-gray br-gray">
                            VALOR I
                        </th>
                        <th colspan="3" class="text-center bt-gray br-gray">
                            VALOR II
                        </th>
                        <th colspan="3" class="text-center bt-gray">
                            VALOR III
                        </th>
                        <th class="text-center bt-gray bl-gray" rowspan="2">
                            Totales
                        </th>
                        <th class="text-center bt-gray bl-gray" rowspan="2">
                            Excepcional
                        </th>
                        <th class="text-center bt-gray bl-gray" rowspan="2">
                            En Sala
                        </th>
                        <th class="text-center bt-gray bl-gray" rowspan="2">
                            En Exposición
                        </th>
                    </tr>
                    <tr class="gray">
                        <th class="text-center">B</th>
                        <th class="text-center">R</th>
                        <th class="br-gray text-center">M</th>
                        <th class="text-center">B</th>
                        <th class="text-center">R</th>
                        <th class="br-gray text-center">M</th>
                        <th class="text-center">B</th>
                        <th class="text-center">R</th>
                        <th class="text-center">M</th>
                    </tr>

                    <tr v-for="item in estadistica" :key="item.name">
                        <td class="br-gray">{{ item.name }}</td>
                        <td class="text-center">{{ item.gradoIB }}</td>
                        <td class="text-center">{{ item.gradoIR }}</td>
                        <td class="text-center br-gray">
                            {{ item.gradoIM }}
                        </td>
                        <td class="text-center">{{ item.gradoIIB }}</td>
                        <td class="text-center">{{ item.gradoIIR }}</td>
                        <td class="text-center br-gray">
                            {{ item.gradoIIM }}
                        </td>
                        <td class="text-center">{{ item.gradoIIIB }}</td>
                        <td class="text-center">{{ item.gradoIIIR }}</td>
                        <td class="text-center">{{ item.gradoIIIM }}</td>
                        <td class="text-center bl-gray">
                            {{ item.total }}
                        </td>
                        <td class="text-center bl-gray">
                            {{ item.excep }}
                        </td>
                        <td class="text-center bl-gray">{{ item.sala }}</td>
                        <td class="text-center bl-gray">{{ item.expo }}</td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold br-gray">TOTALES</td>
                        <td class="font-weight-bold text-center">
                            {{ totalGradoIB }}
                        </td>
                        <td class="font-weight-bold text-center">
                            {{ totalGradoIR }}
                        </td>
                        <td class="font-weight-bold text-center br-gray">
                            {{ totalGradoIM }}
                        </td>
                        <td class="font-weight-bold text-center">
                            {{ totalGradoIIB }}
                        </td>
                        <td class="font-weight-bold text-center">
                            {{ totalGradoIIR }}
                        </td>
                        <td class="font-weight-bold text-center br-gray">
                            {{ totalGradoIIM }}
                        </td>
                        <td class="font-weight-bold text-center">
                            {{ totalGradoIIIB }}
                        </td>
                        <td class="font-weight-bold text-center">
                            {{ totalGradoIIIR }}
                        </td>
                        <td class="font-weight-bold text-center">
                            {{ totalGradoIIIM }}
                        </td>
                        <td class="font-weight-bold text-center bl-gray">
                            {{ total }}
                        </td>
                        <td class="font-weight-bold text-center bl-gray">
                            {{ totalExcep }}
                        </td>
                        <td class="font-weight-bold text-center bl-gray">
                            {{ totalSala }}
                        </td>
                        <td class="font-weight-bold text-center bl-gray">
                            {{ totalExpo }}
                        </td>
                    </tr>
                    <tr>
                        <td class="bb-gray br-gray font-weight-bold">
                            TOTAL GENERAL
                        </td>
                        <td
                            class="bb-gray br-gray font-weight-bold text-center"
                            colspan="3"
                        >
                            {{ totalGradoI }}
                        </td>
                        <td
                            class="bb-gray br-gray font-weight-bold text-center"
                            colspan="3"
                        >
                            {{ totalGradoII }}
                        </td>
                        <td
                            class="bb-gray font-weight-bold text-center"
                            colspan="3"
                        >
                            {{ totalGradoIII }}
                        </td>
                        <td
                            class="bb-gray bl-gray font-weight-bold text-center"
                            colspan="4"
                        >
                            {{ total }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import requests from '../helpers/requests';
import { utils, writeFile } from 'xlsx';
export default {
    name: 'Home',
    data() {
        return {
            estadistica: [0],
        };
    },
    mounted() {
        this.getEstadistica();
    },
    methods: {
        getEstadistica() {
            requests
                .getEstadistica()
                .then((data) => {
                    this.estadistica = data.estadistica;
                })
                .catch((err) => {
                    console.log(err);
                    // TODO: Poner imagen de error de conexion.
                });
        },
        exportTable() {
            const table = document.querySelector('#estadistica table');
            const wb = utils.table_to_book(table);

            writeFile(wb, 'Estadistica.xlsx');
        },
    },
    computed: {
        totalGradoIB() {
            return this.estadistica.reduce(
                (prev, curr) => prev.gradoIB + curr.gradoIB
            );
        },
        totalGradoIR() {
            return this.estadistica.reduce(
                (prev, curr) => prev.gradoIR + curr.gradoIR
            );
        },
        totalGradoIM() {
            return this.estadistica.reduce(
                (prev, curr) => prev.gradoIM + curr.gradoIM
            );
        },
        totalGradoIIB() {
            return this.estadistica.reduce(
                (prev, curr) => prev.gradoIIB + curr.gradoIIB
            );
        },
        totalGradoIIR() {
            return this.estadistica.reduce(
                (prev, curr) => prev.gradoIIR + curr.gradoIIR
            );
        },
        totalGradoIIM() {
            return this.estadistica.reduce(
                (prev, curr) => prev.gradoIIM + curr.gradoIIM
            );
        },
        totalGradoIIIB() {
            return this.estadistica.reduce(
                (prev, curr) => prev.gradoIIIB + curr.gradoIIIB
            );
        },
        totalGradoIIIR() {
            return this.estadistica.reduce(
                (prev, curr) => prev.gradoIIIR + curr.gradoIIIR
            );
        },
        totalGradoIIIM() {
            return this.estadistica.reduce(
                (prev, curr) => prev.gradoIIIM + curr.gradoIIIM
            );
        },
        total() {
            return this.estadistica.reduce(
                (prev, curr) => prev.total + curr.total
            );
        },
        totalExcep() {
            return this.estadistica.reduce(
                (prev, curr) => prev.excep + curr.excep
            );
        },
        totalSala() {
            return this.estadistica.reduce(
                (prev, curr) => prev.sala + curr.sala
            );
        },
        totalExpo() {
            return this.estadistica.reduce(
                (prev, curr) => prev.expo + curr.expo
            );
        },
        totalGradoI() {
            return this.totalGradoIB + this.totalGradoIR + this.totalGradoIM;
        },
        totalGradoII() {
            return this.totalGradoIIB + this.totalGradoIIR + this.totalGradoIIM;
        },
        totalGradoIII() {
            return (
                this.totalGradoIIIB + this.totalGradoIIIR + this.totalGradoIIIM
            );
        },
    },
};
</script>

<style scoped>
.bt-gray {
    border-top: 1px solid #e0e0e0;
}
.br-gray {
    border-right: 1px solid #e0e0e0;
}
.bl-gray {
    border-left: 1px solid #e0e0e0;
}
.bb-gray {
    border-bottom: 1px solid #e0e0e0;
}
.gray {
    color: #424242;
}
</style>
