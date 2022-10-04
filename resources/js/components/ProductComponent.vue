<template>
    <div class="container my-5">
        <div class="row justify-content-end mb-3">
            <div class="col-4">
                <button class="btn btn-primary">
                    Create
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <h4 class="card-header">Create</h4>
                    <div class="card-body">
                        <form action="">
                            <div class="form-group">
                                <label>Name: </label>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="form-group mt-3">
                                <label>Price: </label>
                                <input type="number" class="form-control" />
                            </div>
                            <button class="btn btn-primary mt-3">
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
                                <button class="btn btn-success btn-sm mx-2">
                                    Edit
                                </button>
                                <button class="btn btn-danger btn-sm">
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
            products: []
        }
    },
    created() {
        axios.get('api/product')
        .then(response => {
            this.products = response.data
        })
    }
};
</script>
