<template>
	<div class="container">
        <div class="row">
            <div class="selectors col-3">
                <button class="btn btn-outline-danger" type="button" @click="resetFilter">
                    필터 초기화
                </button>

                <div class="select">
                    <label> Fab </label>
                    <Selector :label="'Area'" :items="filteredFields.fab" :selected="filter.fab" @change="filterFab"/>
                </div>
                <div class="select">
                    <label> Area </label>
                    <Selector :label="'Area'" :items="filteredFields.area" :selected="filter.area" @change="filterArea"/>
                </div>
                <div class="select">
                    <label> Band </label>
                    <Selector :label="'Band'" :items="filteredFields.band" :selected="filter.band" @change="filterBand"/>
                </div>
                <div class="select">
                    <label> Process </label>
                    <Selector :label="'Process'" :items="filteredFields.process" :selected="filter.process" @change="filterProcess"/>
                </div>
                <div class="select">
                    <label> Chamber </label>
                    <Selector :label="'Process'" :items="filteredFields.chamber" :selected="filter.chamber" @change="filterChamber"/>
                </div>
                <div class="select">
                    <label> Defect Type </label>
                    <Selector :label="'Defect Type'" :items="filteredFields.type" :selected="filter.type" @change="filterType"/>
                </div>
                <div class="select">
                    <label> Defect Style </label>
                    <Selector :label="'Defect Style'" :items="filteredFields.style" :selected="filter.style" @change="filterStyle"/>
                </div>
                <div class="select">
                    <label> Defect Map </label>
                    <Selector :label="'Defect Map'" :items="filteredFields.map" :selected="filter.map" :showImage="true" @change="filterMap"/>
                </div>

                <button class="btn btn-danger" id="lookup" type="button" @click="lookupActions">
                    조회
                </button>
            </div>
            <div class="col-9">
                <div v-for="defect in filteredDefects" :key="defect">
                    <div v-for="action in defect.actions" :key="action">
                        <div class="action btn card-header" data-toggle="collapse" :href="'#collapse_' + action.Id" role="button" aria-expanded="false" :aria-controls="'collapse_' + action.Id">
                            {{ action.subject }}
                            <span class="float-right">
                                 <i class="fas fa-angle-down"></i>
                            </span>

                        </div>
                        <div class="collapse" :id="'collapse_' + action.Id">
                            <pre class="card card-body action_content" v-html="action.content">
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Selector from '../components/Selector.vue';
    import { Defect, Action } from '../models/Defect';
    import PapaParse from 'papaparse';

    @Component({
        name: 'home',
        components: {Selector},
    })
    export default class Home extends Vue {
        private defects: Defect[] = [];
        private filteredDefects: Defect[] = [];
        private filter = {
            fab: 'all',
            area: 'all',
            band: 'all',
            process: 'all',
            chamber: 'all',
            type: 'all',
            style: 'all',
            map: 'all',
        };

        private filterFab(val: string) {
            this.filter.fab = val;
        }

        private filterArea(val: string) {
            this.filter.area = val;
        }

        private filterBand(val: string) {
            this.filter.band = val;
        }

        private filterProcess(val: string) {
            this.filter.process = val;
        }

        private filterChamber(val: string) {
            this.filter.chamber = val;
        }

        private filterType(val: string) {
            this.filter.type = val;
        }

        private filterStyle(val: string) {
            this.filter.style = val;
        }

        private filterMap(val: string) {
            this.filter.map = val;
        }

        private isFiltered(x: string, filterName: string) {
            return filterName === 'all' || x === filterName;
        }

        private resetFilter() {
            this.filter = {
                fab: 'all',
                area: 'all',
                band: 'all',
                process: 'all',
                chamber: 'all',
                type: 'all',
                style: 'all',
                map: 'all',
            };
        }

        private lookupActions() {
            this.filteredDefects = this.filteredFields.defects;
        }

        private get filteredFields() {
            const fields = {
                fab: new Set<string>(),
                area: new Set<string>(),
                band: new Set<string>(),
                process: new Set<string>(),
                chamber: new Set<string>(),
                type: new Set<string>(),
                style: new Set<string>(),
                map: new Set<string>(),
                defects: new Array<Defect>(),
            };
            for (const defect of this.defects) {
                if (this.isFiltered(defect.fab, this.filter.fab) &&
                    this.isFiltered(defect.area, this.filter.area) &&
                    this.isFiltered(defect.band, this.filter.band) &&
                    this.isFiltered(defect.process, this.filter.process) &&
                    this.isFiltered(defect.chamber, this.filter.chamber) &&
                    this.isFiltered(defect.type, this.filter.type) &&
                    this.isFiltered(defect.style, this.filter.style) &&
                    this.isFiltered(defect.map, this.filter.map)) {
                        fields.fab.add(defect.fab);
                        fields.area.add(defect.area);
                        fields.band.add(defect.band);
                        fields.process.add(defect.process);
                        fields.chamber.add(defect.chamber);
                        fields.type.add(defect.type);
                        fields.style.add(defect.style);
                        fields.map.add(defect.map);
                        fields.defects.push(defect);
                }
            }
            return fields;
        }

        private created() {
            this.fetch('data.csv');
        }

        private fetch(sheetUrl: string) {
            this.$http.get(sheetUrl).then((result) => {
                const parsed = PapaParse.parse(result.data);
                this.defects = [];
                for (let i = 0; i < parsed.data.length; i++) {
                    const row = parsed.data[i];
                    if (row.length < 6) {
                        continue;
                    }

                    const actions: Action[] = [];
                    for (let j = 8; j < row.length; j++) {
                        const action = row[j];
                        if (!action || action.length === 0) {
                            continue;
                        }
                        const subject = action.split('\n', 1)[0];
                        let content = action.substr(subject.length + 1);
                        if (content.startsWith('\n')) {
                            content = content.substr(1);
                        }

                        const actionId = `action_${i}_${j}`;
                        actions.push({ Id: actionId, subject, content });
                    }

                    this.defects.push({
                        fab: row[0],
                        area: row[1],
                        band: row[2],
                        process: row[3],
                        chamber: row[4],
                        type: row[5],
                        style: row[6],
                        map: row[7],
                        actions,
                    });
                }
            });
        }
    }
</script>

<style scoped>
.select {
    width: 100%;
    padding: 10px 5px;
    margin-top: 5px;
    text-align: left;
}

.select > label {
    margin: 0;
    color: #ea002c;
}

.selectors {
    margin-top: -61px;
}

.action {
    margin-top: 15px;
    width: 100%;
    color: whitesmoke;
    background: #ff7a00;
}

.container {
    margin-top: 100px;
}

.card-header.collapsed i.fas:before {
    content: "\f107";    /* angle-down */
}

.card-header[aria-expanded="true"] i.fas:before {
    content: "\f106";    /* angle-up */
}

#lookup {
    margin-top: 26px;
    width: 70%;
}

.action_content {
    text-align: left;
}

</style>
