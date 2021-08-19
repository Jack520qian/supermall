<template>
  <div id="detail_params" v-if="Object.keys(paramInfo).length!=0">
    <table class="params_rule">
      <tbody>
      <tr v-for="(item,index) in paramInfo.sizes[0]" :key="index">
        <th>{{item[0]}}</th>
        <td v-for="(index) in item.length" :key="index">
          {{item[index]}}
        </td>
      </tr>
      </tbody>
    </table>
    <table class="params_set">
      <tbody>
      <tr v-for="(item,index) in paramInfo.infos" :key="index">
        <th>{{item.key}}</th>
        <td>{{item.value}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "DetailParams",
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  #detail_params {
    font-size: 13px;
    padding: .42rem .34rem;
    border-bottom: 0.3rem solid rgba(128, 128, 128, 0.2);
  }

  .params_rule,
  .params_set {
    border-bottom: .1rem solid rgba(128, 128, 128, .5);
    border-collapse: collapse;
    margin: 0 auto;
    margin-bottom: 27px;
    width: 90%;
  }

  .params_rule tr,
  .params_set tr {
    border-bottom: 0.04rem solid rgba(128, 128, 128, 0.5);
  }

  .params_rule th {
    text-align: left;
    padding-right: 1rem;
    white-space: nowrap;
  }

  .params_set th {
    text-align: left;
    padding: 0.5rem 3.5rem 0.5rem 0rem;
    white-space: nowrap;
  }

  .params_rule td {
    padding: .5rem;
  }

  .params_set td {
    color: var(--color-high-text);
  }

  .info_img img {
    width: 100%;
  }
</style>
