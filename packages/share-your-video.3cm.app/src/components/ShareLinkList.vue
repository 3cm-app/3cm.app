<script setup>
import AddLinkDialog from "@/components/AddLinkDialog.vue";
import UpdateLinkDialog from "@/components/UpdateLinkDialog.vue";
</script>
<template>
  <DataTable :value="records" dataKey="id" size="small" :rows="rows" :rowHover="true" :filters="filters"
    filterDisplay="menu" :loading="loading" :globalFilterFields="['description', 'url']" responsiveLayout="scroll"
    :paginator="true" :lazy="true" showGridlines stripedRows :rowsPerPageOptions="rowsPerPageOptions"
    :totalRecords="totalRecords" @page="onPage($event)" @sort="onSort($event)" @filter="onFilter($event)">
    <template #header>
      <div class="flex justify-between">
        <!-- <IconField>
          <InputIcon>
              <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['all'].value" placeholder="Search" />
        </IconField> -->
        <template v-if="isAdmin">
          <Button label="Add Link" icon="pi pi-plus p-button-secondary" @click="showAddDialog = true" />
          <AddLinkDialog v-model:visible="showAddDialog" v-model:loading="loading" @submit="add"></AddLinkDialog>
          <UpdateLinkDialog v-model:visible="showUpdateDialog" v-model:loading="loading" @submit="update"
            :link="selectedUpdateData"></UpdateLinkDialog>
        </template>
      </div>
    </template>
    <template #empty> No links found. </template>
    <template #loading> Loading data. Please wait. </template>
    <Column field="id" header="ID" :sortable="sortable" style="min-width: 4rem">
      <template #body="{ data }">
        {{ data.id }}
      </template>
    </Column>
    <Column field="uploadedAt" header="Uploaded Date" :sortable="sortable" dataType="date" style="min-width: 5rem">
      <template #body="{ data }">
        {{ formatDate(data.uploadedAt) }}
      </template>
    </Column>
    <Column field="description" header="Description" :sortable="sortable" filterMatchMode="contains"
      style="min-width: 12rem">
      <template #body="{ data }">
        <span class="image-text">{{ data.description }}</span>
      </template>
    </Column>
    <Column field="isVR" header="VR" :sortable="sortable" style="min-width: 3rem">
      <template #body="{ data }">
        <span>{{ data.isVR ? "Yes" : "No" }}</span>
      </template>
    </Column>
    <Column field="url" header="URL" :sortable="sortable" filterMatchMode="contains" style="min-width: 12rem">
      <template #body="{ data }">
        <a :href="data.url" target="_blank" v-text="data.url"></a>
        <Button icon="pi pi-external-link" class="p-button-sm p-button-rounded p-button-text"
          @click="openURL(data.url)" />
      </template>
    </Column>
    <Column v-if="isAdmin" headerStyle="min-width: 4rem; text-align: center"
      bodyStyle="text-align: center; overflow: visible">
      <template #body="{ data }">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <Button size="small" type="button" icon="pi pi-user-edit" @click="showUpdate(data)"></Button>
          <Button size="small" type="button" icon="pi pi-times" class="p-button-danger" :loading="loading"
            @click="del(data)"></Button>
        </div>
      </template>
    </Column>
    <!-- <template #paginatorLeft>
      <Button type="button" icon="pi pi-refresh" />
    </template>
    <template #paginatorRight>
      <Button type="button" icon="pi pi-cloud" />
    </template> -->
  </DataTable>
</template>
<script>
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'
import { state, getters, actions } from "@/store.js";
import { formatDate } from "@/util.js";
export default {
  data() {
    const rows = 25
    return {
      totalRecords: state.total,
      records: [],
      loading: true,
      sortable: false, // TODO: implement sort event
      rows: rows,
      rowsPerPageOptions: [10, 25, 50, 100],
      filters: {
        all: { value: null, matchMode: FilterMatchMode.CONTAINS },
        url: { value: null, matchMode: FilterMatchMode.CONTAINS },
        description: { value: null, matchMode: FilterMatchMode.CONTAINS }
      },
      lazyParams: {
        first: 0,
        rows: rows, // initial value should same as rows.
        sortField: null,
        sortOrder: null,
        filters: {}
      },
      // add dialog
      showAddDialog: false,
      selectedUpdateData: null,
      showUpdateDialog: false
    };
  },
  computed: {
    isAdmin() {
      return getters.isAdmin();
    }
  },
  async created() {
    this.lazyParams.rows = this.rows;
    this.totalRecords = await actions.getTotal();
    await this.getRecords();
    this.loading = false;
  },
  methods: {
    async onPage(event) {
      this.lazyParams = event;
      await this.getRecords();
    },
    onSort(event) {
      this.lazyParams = event;
    },
    onFilter() {
      this.lazyParams.filters = this.filters;
    },
    async getRecords() {
      let list = await actions.getLinks(this.lazyParams)
      this.records = list;
    },
    formatDate(value) {
      return formatDate(value);
    },
    async add(data) {
      this.loading = true;
      try {
        await actions.addLink(data);
        await this.getRecords();
        this.showAddDialog = false;
      } finally {
        this.loading = false;
      }
    },
    async update(data) {
      this.loading = true;
      try {
        await actions.addLink(data);
        await this.getRecords();
        this.showUpdateDialog = false;
      } finally {
        this.loading = false;
      }
    },
    showUpdate(data) {
      this.selectedUpdateData = data;
      this.showUpdateDialog = true;
    },
    async del(data) {
      this.loading = true;
      try {
        await actions.delLink(data);
        let i = this.records.findIndex(row => row.url === data.url);
        this.records.splice(i, 1);
      } finally {
        this.loading = false;
      }
    },
    openURL(url) {
      window.open(url);
    }
  }
};
</script>
