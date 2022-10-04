<template>
    <div class="container my-5">
        <div class="row justify-content-end mb-3">
            <div class="col-4">
                <button class="btn btn-primary" @click="create">
                    Create
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <h4 class="card-header">{{ isEditMode ? "Edit" : "Create" }}</h4>
                    <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label>Name: </label>
                                <input v-model="product.name" type="text" class="form-control" />
                            </div>
                            <div class="form-group mt-3">
                                <label>Price: </label>
                                <input v-model="product.price" type="number" class="form-control" />
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <button class="btn btn-success btn-sm mx-2" @click="edit(product)">
                                    Edit
                                </button>
                                <button class="btn btn-danger btn-sm" @click="destroy(product.id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isEditMode: false,
            products: [],
            product: {
                id: '',
                name: '',
                price: ''
            }
        }
    },
    methods: {
        view() {
            axios.get('api/product')
            .then(response => {
                this.products = response.data
            })
        },
        create() {
            this.isEditMode = false;
            this.product.id = '';
            this.product.name = '';
            this.product.price = '';
        },
        store() {
            axios.post('api/product', this.product)
            .then(response => {
                this.view();
                this.create();
            })
        },
        edit(product) {
            this.isEditMode = true;
            this.product.id = product.id;
            this.product.name = product.name;
            this.product.price = product.price;
        },
        update() {
            axios.put(`api/product/${this.product.id}`, this.product)
            .then(response => {
                this.product.id = '';
                this.product.name = '';
                this.product.price = '';
            })
        },
        destroy(id) {
            axios.delete(`/api/product/${id}`)
            .then(response => this.view());
        }
    },
    created() {
        this.view();
    }
};
</script>
