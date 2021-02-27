<template>
  <div class="data-table">

    <div class="data-table-wrapper">
      <div class="data-table-header">
        <div
          class="data-table-header-column"
          v-for="(column, index) in columns"
          :key="`data-table-header-column-${index}`"
          :style="{flexBasis: column.width}"
        >
          {{ column.label }}
        </div>
      </div>
      <div class="data-table-rows">
        <div
          class="data-table-row"
          v-for="(row) in slice"
          :key="row.id"
        >
          <div
            class="data-table-row-column"
            v-for="(column) in columns"
            :key="`data-table-row-${row.id}-column-${column.prop}`"
            :style="{flexBasis: column.width}"
            :data-th="column.label"
          >
            <div class="data-table-row-column-th">
              {{ column.label }}
            </div>
            {{ getAndParseValue(row, column.prop) }}
          </div>
        </div>
      </div>
    </div>

    <div class="data-table__paginator">
      <data-paginator
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import { getAndParseValue } from '@/utils';

export default {
  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
    slice() {
      const start = (this.page - 1) * this.pageSize;
      const end = this.page * this.pageSize;

      return this.rows.slice(start, end);
    },
  },

  methods: {
    getAndParseValue,
  },
};
</script>

<style type="text/scss" lang="scss" scoped>
  .data-table {
    &-wrapper {
      margin-bottom: 16px;

      text-align: center;

      @include desktop {
        border: 1px solid lightgrey;
      }

      @include phone {
        margin-top: 16px;

        text-align: left;
      }
    }

    &-header {
      display: flex;

      border-bottom: 1px solid lightgrey;

      @include phone {
        display: none;
      }

      &-column {
        padding: 8px 10px;

        font-weight: bold;

        & + & {
          border-left: 1px solid lightgrey;
        }
      }
    }

    &-rows {

    }

    &-row {
      display: flex;

      @include desktop {
        & + & {
          border-top: 1px solid lightgrey;
        }
      }

      @include phone {
        flex-direction: column;

        border: 1px solid lightgrey;

        & + & {
          margin-top: 8px;
        }
      }
      &-column {
        padding: 8px 10px;

        &-th {
          font-weight: bold;

          @include desktop {
            display: none;
          }
        }

        @include desktop {
          & + & {
            border-left: 1px solid lightgrey;
          }
        }
      }
    }
  }
</style>
