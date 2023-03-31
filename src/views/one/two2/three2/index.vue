<template>
  <div style="position: relative;">
    <input type="text" class="llp"><label class="llp-label">lplp</label>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.llp-label{
  position: absolute;
  left: 10px;
  top: 6px;
  line-height: 20px;
  pointer-events: none;
  background: #fff;
}
.llp{
  height: 32px;
}
.llp:focus{
  border-color: red;
}
.llp:focus + .llp-label{
  color: red;
  transition: all 0.1s;
  transform: translateY(-10px);
}
</style>