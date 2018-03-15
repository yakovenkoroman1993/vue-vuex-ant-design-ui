import Vue from 'vue';
import Element from 'element-ui';
import DataTables from 'vue-data-tables'

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale'
locale.use(lang);

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element, {locale});
Vue.use(DataTables);