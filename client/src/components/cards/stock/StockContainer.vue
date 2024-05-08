<template>
   <div class="container rounded border bg-light shadow p-3 mt-5 mb-3">
      <h4>Stock</h4>
      <hr>
      <!-- Products -->
      <div class="row">
         <div v-for="(stockProduct, index) in filteredStockProducts" :key="index" class="col-md-4 col-sm-6">
            <ProductInformation :canEdit="canEdit" :stockProduct="stockProduct" :index="index"
               @updateProductInStockEvent="handleProductInStock" />
            <br />
         </div>
      </div>
      <!-- Send Stock, check pages for canEdit -->
      <div v-if="canEdit">
         <div class="row justify-content-center mb-3">
            <button @click="updateStock" class="btn btn-primary text-dark bg-white col col-3">Save</button>
         </div>
      </div>
   </div>
</template>

<script>
import { ref } from "vue";
import ProductInformation from "./ProductInformation.vue";
import { getStock, updateStock } from "@/apiConfig";
var listOfStockProducts = ref([]);
export default {
   name: 'StockContainer',
   components: {
      ProductInformation,
   },
   methods: {
      // Test function, logs all products in stock
      logStockProducts() {
         this.products.forEach((product) => {
            console.log(product.ID, product.name, product.kilosInStock);
         });
      },
      // When the ProductInformation.vue container values change, the array is updated
      handleProductInStock(product) {
         this.products[product.index] = { ID: product.ID, name: product.name, kilosInStock: product.kilosInStock };
         // this.logStockProducts();
      },
      updateStock() {
         // Get values, instead of references or objects
         // const stockProductsWithoutName = this.stockProducts.map(s => ({ ID: s.ID, kilosInStock: s.kilosInStock }))
         // this.logStockProducts();
         updateStock(this.products)
            .then(() => {
               console.log("test: stock saved!");
            })
            .catch(() => {
               console.log("test: stock failed!");
            });
      }
   },
   props: {
      canEdit: {
         type: Boolean,
         required: true
      }
   },
   setup() {
      // Set a default for the stockProducts value in return data
      getStock().then((products) => {
         console.log("retrieved stock products: ", products);
         listOfStockProducts.value = products;
      });
   },
   data() {
      return {
         products: listOfStockProducts,
      }
   },
   computed: {
      // If you can't edit the values, don't show products that aren't present, otherwise, show all products
      filteredStockProducts() {
         return this.products.filter((product) => {
            return (!this.canEdit && product.kilosInStock !== 0) || this.canEdit;
         });
      },
   },
}
</script>