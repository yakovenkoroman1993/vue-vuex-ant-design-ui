import Vue from 'vue';
import ApplicationLayout from './ApplicationLayout';
import ClientLayout from './ClientLayout';
import GuestLayout from './GuestLayout';
import Spacer from './Spacer';
import Select from './Select';
import UploadDialog from './UploadDialog';
import DialogShower from './DialogShower';
import ListDialog from './ListDialog';
import Footer from './Footer';

Vue.component('guest-layout', GuestLayout);
Vue.component('app-layout', ApplicationLayout);
Vue.component('client-layout', ClientLayout);

Vue.component('spacer', Spacer);
Vue.component('app-select', Select);
Vue.component('app-upload-dialog', UploadDialog);
Vue.component('app-dialog-shower', DialogShower);
Vue.component('app-list-dialog', ListDialog);
Vue.component('app-footer', Footer);
