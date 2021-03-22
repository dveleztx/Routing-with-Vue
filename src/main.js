import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';

const app = createApp(App);

// App will now be aware of the router object
app.use(router);

app.mount('#app');
