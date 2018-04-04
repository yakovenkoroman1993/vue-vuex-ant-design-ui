import Vue from 'vue';
import DataTables from 'vue-data-tables'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/display.css';

Vue.use(ElementUI, {
    locale,
    size: 'small',
});

Vue.use(DataTables);
