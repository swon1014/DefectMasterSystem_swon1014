<template>
	<div id="app">
        <div class="header" style="height: 80px;"> </div>
        <div class="header" style="height: 130px;">
            <h1> Defect Master System </h1>
        </div>
		<component :is="layout">
			<router-view/>
		</component>
	</div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {SupportedLocale} from './store/modules/LocalizationModule';

    const defaultLayout = 'default';

    @Component
    export default class App extends Vue {
        get locale(): SupportedLocale {
            return this.$store.getters.currentLocale;
        }

        get layout() {
            return ((this.$route.meta as any).layout || defaultLayout) + '-layout';
        }

        public mounted() {
            this.$i18n.locale = this.locale;
        }

        @Watch('locale')
        public onLocaleChange(locale: SupportedLocale) {
            this.$i18n.locale = locale;
        }
    }
</script>

<style lang="scss">
	@import './style/theme';

    .header {
        background: -moz-linear-gradient(left, #ea002c, #ff7a00);
        background: -webkit-linear-gradient(left, #ea002c, #ff7a00);
        background: -moz-linear-gradient(left, #ea002c, #ff7a00);
        background: -o-linear-gradient(left, #ea002c, #ff7a00);
        background: linear-gradient(to right, #ea002c, #ff7a00);
    }

    h1 {
        color: whitesmoke;
        font-size: 4.5em;
    }
</style>
