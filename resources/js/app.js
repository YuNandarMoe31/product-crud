import './bootstrap';

import { createApp } from 'vue';
const app = createApp({});

import ExampleComponent from './components/ExampleComponent.vue';
import ProductComponent from './components/ProductComponent.vue';
app.component('example-component', ExampleComponent);
app.component('product-component', ProductComponent);

app.mount('#app');
