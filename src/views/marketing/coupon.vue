<template>
  <div class="div">
    <el-form
      ref="form"
      :model="form"
      label-width="160px"
      style="margin: 20px 0; font-size: 13px"
    >
      <el-form-item label="权益卡名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="权益卡描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item label="权益卡类型">
        <el-switch
          v-model="frequency_flag"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="次数卡"
          inactive-text="月卡"
        >
        </el-switch>
      </el-form-item>

      <el-form-item v-if="frequency_flag === true" label="持续天数">
        <el-input-number
          v-model="continuous"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="售卖价格" prop="price" style="width: 500px">
        <el-input v-model="price" type="number"></el-input>
      </el-form-item>

      <el-form-item label="是否推荐">
        <el-switch v-model="recommend"></el-switch>
      </el-form-item>

      <el-form-item label="是否打折">
        <el-switch v-model="discount_flag"></el-switch>
      </el-form-item>

      <el-form-item v-if="discount_flag === true" label="打折开始日期">
        <el-date-picker
          v-model="discountStartTime"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="discount_flag === true" label="打折持续天数">
        <el-input-number
          v-model="discountContinuousTime"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item v-if="discount_flag === true" label="打折折扣">
        <el-select v-model="value" placeholder="请选择折扣">
          <el-option
            v-for="item in discount"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新人权益">
        <el-switch v-model="new_flag"></el-switch>
      </el-form-item>

      <el-form-item v-if="new_flag === true" label="新人权益持续天数">
        <el-input-number
          v-model="newContinuousTime"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      frequency_flag: false,
      continuous: -1,
      recommend: false,
      discount_flag: false,
      new_flag: false,
      discountStartTime: "",
      discountContinuousTime: 0,
      newContinuousTime: 0,
      price: 0,
      discount: [
        {
          value: "5",
          label: "九五折",
        },
        {
          value: "10",
          label: "九折",
        },
        {
          value: "15",
          label: "八五折",
        },
        {
          value: "20",
          label: "八折",
        },
        {
          value: "25",
          label: "七五折",
        },
        {
          value: "30",
          label: "七折",
        },
        {
          value: "35",
          label: "牛五折",
        },
        {
          value: "40",
          label: "六折",
        },
        {
          value: "45",
          label: "五五折",
        },
        {
          value: "50",
          label: "五折",
        },
      ],
      value: "",
      form: {
        name: "",
        desc: "",
      },
    };
  },

  methods: {
    goback() {
      this.$router.push({ name: "Coupon" });
      console.log("back");
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss" scoped>
.div {
  width: 100%;
  min-width: 1200px;
  padding: 6px 20px;
}
</style>
