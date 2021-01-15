<template>
  <div class="dashboard-map">
    <div id="project-map"
         class="chart"></div>
  </div>
</template>

<script>
import Map from './map.js';

export default Map;
</script>

<style lang="scss" scoped>
.dashboard-map {
  position: absolute;
  height: 100%;
  width: 100vw;
  left: 0;
  top: 0;
  box-sizing: border-box;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
