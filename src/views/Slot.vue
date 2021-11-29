<template>
  <div>
    <router-link to="/slot/1">11111</router-link>
    <Company :a="scope.a3">
      <template v-slot:header="scopes">
        <header>[header]hahahaha {{ scopes.a3 }}</header>
      </template>
      <!-- 使用简写 # ，default 不能省略 -->
      <template #default="{ sc }">
        <section>
          <aside>content</aside>
          <article>
            {{ sc.lpl }}
          </article>
          <button type="button" @click="sett">ddd</button>
        </section>
      </template>

      <template #footer>
        <footer>[footer] {{ scope.a3 }}</footer>
      </template>
    </Company>
    <span>{{ scope.a2 }}</span>
  </div>
</template>

<script>
  import Company from './Company';
  import events from '@/utils/EventBus';

  export default {
    name: 'SlotTest',
    props: {
      id: {
        type: [String, Number],
        default: '',
      },
    },
    components: {
      Company,
    },
    data() {
      return {
        scope: {
          a1: 10,
          a2: 20,
          a3: 30,
        },
      };
    },
    watch: {
      id() {
        // console.log('uo')
      },
    },
    methods: {
      sett() {
        console.log(90);
        this.scope.a1 = 90;
      },
    },
    beforeCreate() {
      console.log('beforeCreate');
    },
    created() {
      console.log('created');
      events.on('name', function (name) {
        console.log(name);
      });
    },
    beforeMount() {
      console.log('beforeMount');
    },
    mounted() {
      console.log('mounted');
      console.log(this.id);
      events.emit('name', 'lplp');
    },
    beforeUpdate() {
      console.log('beforeUpdate');
    },
    updated() {
      console.log('updated');
    },
    beforeDestroy() {
      console.log('beforeDestroy');
    },
    destroyed() {
      console.log('destroyed');
    },
    activated() {
      console.log('activated');
    },
    deactivated() {
      console.log('deactivated');
    },
    beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter');
      next();
    },
    beforeRouteUpdate(to, from, next) {
      console.log('beforeRouteUpdate');
      console.log(this.id);
      next();
    },
    beforeRouteLeave(to, from, next) {
      console.log('beforeRouteLeave');
      next();
    },
  };
</script>

<style></style>
