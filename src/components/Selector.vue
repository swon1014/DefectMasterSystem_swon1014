<template>
	<div>
        <div class="dropdown">
            <button class="btn btn-outline-danger dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img v-if="showImage && selected != 'all'" :src="`/images/${selected}`" />
                <span v-else v-text="selected" /> 
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" :class="{'active': 'all' === selected }" href="#" name="all" @click="onSelectionChanged">all</a>
                <div v-for="item in items" :key="item">
                    <a class="dropdown-item" :class="{'active': item === selected }" href="#" :name="item"  @click="onSelectionChanged">
                       <img v-if="showImage" :src="`/images/${item}`" />
                       <span v-else v-text="item"> 
                       </span>
                    </a>
                </div>

            </div>
        </div>
	</div>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Emit} from 'vue-property-decorator';

    @Component
    export default class Select extends Vue {
        @Prop() private readonly items!: string[];
        @Prop({ default: false }) private readonly showImage!: boolean;
        @Prop({ default: 'all' }) private selected!: string;

        private onSelectionChanged(e?: Event) {
            // this.selected = e!.currentTarget!.name;
            this.$emit('change', (e!.currentTarget! as HTMLInputElement).name);
        }
    }
</script>

<style scoped>
 img {
     max-width: 200px;
     max-height: 200px;
 }

 button {
     margin: 0;
     width: 100%;
 }

</style>