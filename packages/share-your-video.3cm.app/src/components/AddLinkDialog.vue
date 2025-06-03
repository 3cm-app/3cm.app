<template>
  <Dialog :header="title" :visible="visible" :style="{ width: '50vw' }" :dismissableMask="true" :modal="true"
    @update:visible="$emit('update:visible', false)">
    <div class="dialog-row">
      <label for="url">URL</label>
      <InputText id="url" class="flex-auto" type="text" v-model="url" placeholder="https://" />
    </div>
    <div class="dialog-row">
      <label for="date">Uploaded Date</label>
      <InputMask id="date" mask="99/99/9999" v-model="uploadedAt" placeholder="mm/dd/yyyy" slotChar="mm/dd/yyyy" />
    </div>
    <div class="dialog-row">
      <label for="description">Description</label>
      <InputText id="description" type="text" v-model="description" />
    </div>
    <div class="dialog-row">
      <Checkbox id="isVR" v-model="isVR" :binary="true" />
      <label for="isVR">VR</label>
    </div>
    <div class="dialog-row">
      <Checkbox id="checkUrlExist" v-model="checkUrlExist" :binary="true" />
      <label for="checkUrlExist">Check URL Exist</label>
    </div>
    <div class="dialog-row">
      <Checkbox id="findDownloadUrl" v-model="findDownloadUrl" :binary="true" />
      <label for="findDownloadUrl">Find download URL</label>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" @click="$emit('update:visible', false)" class="p-button-text" />
      <Button label="Submit" icon="pi pi-check" @click="submit" autofocus :loading="loading" />
    </template>
  </Dialog>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    loading: Boolean,
    title: {
      default: "Add link",
      type: String
    }
  },
  data() {
    return {
      url: "",
      uploadedAt: null,
      description: "",
      isVR: false,
      // options
      checkUrlExist: false,
      findDownloadUrl: false
    };
  },
  methods: {
    submit() {
      this.$emit("submit", {
        url: this.url,
        uploadedAt: this.uploadedAt,
        description: this.description,
        isVR: this.isVR,
        checkUrlExist: this.checkUrlExist,
        findDownloadUrl: this.findDownloadUrl
      });
    }
  }
};
</script>
<style scoped>
@reference "../main.css";
.dialog-row {
  @apply flex items-center gap-4 mb-4;
}
</style>
