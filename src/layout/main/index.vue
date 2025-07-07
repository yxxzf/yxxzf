<template>
    <div>
        <router-view v-slot="{ Component }" v-if="flag">
            <transition class="fade">
                <component :is="Component" v-if="flag" :key="layOutSettingStore.refresh"></component>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//@ts-ignore
import useLayOutSettingStore from '@/store/moudules/setting';
const layOutSettingStore = useLayOutSettingStore()
let flag = ref<boolean>(true)
</script>
<script lang="ts">
export default {
    name: 'Main'
}
</script>
<style scoped lang="scss">
.fade-enter-from {
    opacity: 0;
    scale: 0;
}

.fade-enter-active {
    transition: 0.3s;
}

.fade-enter-to {
    opacity: 1;
    scale: 1;
}
.fade_component-enter-from {
    opacity: 0;
    scale: 0;
}

.fade_component-enter-active {
    transition: 0.3s;
}

.fade_component-enter-to {
    opacity: 1;
    scale: 1;
}
</style>