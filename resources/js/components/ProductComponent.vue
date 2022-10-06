<template>
    <div class="container my-5">
        <div class="row justify-content-end mb-3">
            <div class="col-4">
                <button class="btn btn-primary" @click="create">Create</button>
            </div>
            <div class="col-4">
                <form @submit.prevent="searchProduct">
                    <div class="input-group">
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Search"
                            class="form-control"
                        />
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary">
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <h4 class="card-header">
                        {{ isEditMode ? "Edit" : "Create" }}
                    </h4>
                    <div class="card-body">
                        <form @submit.prevent="isEditMode ? update() : store()">
                            <div class="form-group">
                                <label>Name: </label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    class="form-control"
                                />
                                <template v-if="errors.name">
                                    <p
                                        v-text="errors.name"
                                        class="text-danger text-sm"
                                    ></p>
                                </template>
                            </div>
                            <div class="form-group mt-3">
                                <label>Price: </label>
                                <input
                                    v-model="form.price"
                                    type="number"
                                    class="form-control"
                                />
                                <template v-if="errors.price">
                                    <p
                                        v-text="errors.price"
                                        class="text-danger text-sm"
                                    ></p>
                                </template>
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
                        <tr v-for="product in products.data" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <button
                                    class="btn btn-success btn-sm mx-2"
                                    @click="edit(product)"
                                >
                                    Edit
                                </button>
                                <button
                                    class="btn btn-danger btn-sm"
                                    @click="destroy(product.id)"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pagination
                    :data="products"
                    @pagination-change-page="view"
                ></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import LaravelVuePagination from "laravel-vue-pagination";

export default {
    name: "ProductComponent",
    components: {
        Pagination: LaravelVuePagination,
    },
    data() {
        return {
            isEditMode: false,
            products: {},
            search: "",
            form: {
                id: "",
                name: "",
                price: "",
            },
            errors: {},
        };
    },
    methods: {
        searchProduct() {
            axios.get("api/product?search=" + this.search).then((response) => {
                this.products = response.data;
            });
        },
        view(page = 1) {
            axios.get("api/product?page=" + page).then((response) => {
                this.products = response.data;
            });
        },
        create() {
            this.errors = {};
            this.isEditMode = false;
            this.form.id = "";
            this.form.name = "";
            this.form.price = "";
        },
        store() {
            this.errors = {};
            axios
                .post("api/product", this.form)
                .then((response) => {
                    this.view();
                    this.form.id = "";
                    this.form.name = "";
                    this.form.price = "";
                })
                .catch((error) => {
                    if (error.response) {
                        let errors = error.response.data.errors;
                        for (let key in errors) {
                            this.errors[key] = errors[key][0];
                        }
                    }
                });
        },
        edit(product) {
            this.errors = {};
            this.isEditMode = true;
            this.form.id = product.id;
            this.form.name = product.name;
            this.form.price = product.price;
        },
        update() {
            axios
                .put(`api/product/${this.form.id}`, this.form)
                .then((response) => {
                    this.view();
                    this.form.id = "";
                    this.form.name = "";
                    this.form.price = "";
                })
                .catch((error) => {
                    if (error.response) {
                        let errors = error.response.data.errors;
                        for (let key in errors) {
                            this.errors[key] = errors[key][0];
                        }
                    }
                });
        },
        destroy(id) {
            axios.delete(`/api/product/${id}`).then((response) => {
                this.view();
            });
        },
    },
    created() {
        this.view();
    },
};
</script>
