<template>
    <el-row>
        <el-col :span="2">
            <el-input-number
                controls-position="right"
                size="small"
                :value="filesRange[0]"
                @change="handleConfigurationStateUpdate({filesRange: [$event, filesRange[1]]})"
                :max="filesRange[1]"
            />
        </el-col>
        <el-col :span="2">
            <el-slider
                v-model="filesRange"
                :max="10"
                range
            />
        </el-col>
        <el-col :span="3">
            <spacer :size="20" />
            <el-input-number
                controls-position="right"
                size="small"
                :value="filesRange[1]"
                @change="handleConfigurationStateUpdate({filesRange: [filesRange[0], $event]})"
                :min="filesRange[0]"
            />
        </el-col>
    </el-row>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>