<template>
  <main class="container mt-md-5">

    <!-- Loading spinner -->
    <div v-if="isLoading" class="spinner-border" />

    <template v-else>
      <div v-if="isCached" class="alert alert-success text-start">
        <h4 class="alert-heading">Data was cached!</h4>
        <p>You can clear cache and load data again.</p>
        <hr/>
        <button class="btn btn-sm btn-primary mr-auto" @click="clearCache">
          Clear cache
        </button>
      </div>

      <data-table
        :rows="data"
        :columns="columns"
      />
    </template>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { setCache } from '@/utils';

export default {

  name: 'AppContent',

  data: () => ({
    columns: [
      {
        label: 'ID',
        prop: 'id',
        width: '15%',
      },
      {
        label: 'Date',
        prop: 'date',
        width: '20%',
      },
      {
        label: 'Name',
        prop: 'name',
        width: '30%',
      },
      {
        label: 'Amount',
        prop: 'amount',
        width: '35%',
      },
    ],
  }),

  computed: {
    ...mapState([
      'isLoading',
      'isCached',
      'data',
    ]),
  },

  watch: {
    data(value) {
      setCache(value);
    },
  },

  created() {
    this.load();
  },

  methods: {
    ...mapActions([
      'load',
      'clearCache',
    ]),
  },
};
</script>
