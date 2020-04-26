<template>
    <Company>
        <template v-slot:header="scope">
            <header>[header]hahahaha {{ scope.a1 }}</header>
        </template>
        <template v-slot="{ sc }">
            <section>
                <aside>content</aside>
                <article>
                    {{ sc.lpl }}
                </article>
            </section>
        </template>

        <template #footer>
            <footer>[footer]</footer>
        </template>
    </Company>
</template>

<script>
import Company from "./Company";
export default {
    name: "SlotTest",
    components: {
        Company
    },
    data() {
        return {
            scope: {
                a1: 10,
                a2: 20,
                a3: 30
            }
        };
    }
};
</script>

<style></style>
