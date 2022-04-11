<template>
  <div>
    <el-form-item label="provice" prop="address.provice" :rules="provice">
      <el-input v-model="address.provice" />
    </el-form-item>
    <el-form-item label="city" prop="address.city" :rules="city">
      <el-input v-model="address.city" />
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          provice: '',
          city: '',
        };
      },
    },
  },
  data() {
    return {
      provice: { required: true, message: 'provice', trigger: 'blur' },
      city: { required: true, message: 'city', trigger: 'blur' },
    };
  },
  computed: {
    address: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style></style>
