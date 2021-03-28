<template>
  <div class="app-container">
    <el-row>
      <el-col :span="16">
        <div
          class="grid-content bg-purple"
          style="margin-top: 15px; margin-left: 20px"
        >
          <el-button type="primary" @click="go2add">+新建权益卡</el-button>
        </div>
      </el-col>
      <!-- <el-col :span="8">
        <div style="margin-top: 15px">
          <el-input
            style="width: 65%"
            prefix-icon="el-icon-search"
            placeholder="请输入内容"
            v-model="input3"
            clearable
            @keydown.enter.native="search"
          >
          </el-input>
          <el-button slot="append" @click="search">搜索</el-button>
          <el-button slot="append" @click="reset">重置</el-button>
        </div>
      </el-col> -->
    </el-row>
    <el-table
      center
      :data="tableData"
      border
      style="width: 100%; margin-top: 30px"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item v-if="props.row.discountFlag == 1" label="折扣">
              <span>{{ props.row.discount }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.discountFlag == 1" label="打折开始日期" >
                <span>{{props.row.discountStartTime}}</span>
            </el-form-item>
            <el-form-item v-if="props.row.discountFlag == 1" label="打折持续天数">
              <span>{{ props.row.discountContinuousTime }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.newFlag == 1" label="新人权益持续天数">
              <span>{{ props.row.newContinuousTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="权益卡名" align="center">
      </el-table-column>
      <el-table-column label="售价" align="center">
        <template slot-scope="props">
          <span>{{ props.row.price / 100 }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" style="width: 20%" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span :class="{ red: scope.row.status != 1 }">{{
              scope.row.status == 1 ? "正常" : "停售"
            }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="是否推荐" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span :class="{ red: scope.row.recommend == 1 }">{{
              scope.row.recommend == 1 ? "推荐" : "正常"
            }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定停售此权益卡吗？"
            @onConfirm="handleBan(scope.$index, scope.row)"
          >
            <el-button slot="reference" size="mini" type="warning"
              >停售</el-button
            >
          </el-popconfirm>
          <el-popconfirm
            title="确定删除此权益卡吗？"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button slot="reference" size="mini" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pagination } from "@/api/coupon";

export default {
  data() {
    return {
      page: 1,
      tableData: [],
      List: [],
      discountFlag: 0,
      newFlag: 0,

      //   tableData: [
      //     {
      //       price: 115,
      //       name: "180天无限卡",
      //       status: 1,
      //       recommend: 1,
      //     },
      //     {
      //       price: 60,
      //       name: "60次次数卡卡",
      //       status: 1,
      //       recommend: 0,
      //     },
      //     {
      //       price: 85,
      //       name: "60天无限卡",
      //       status: 1,
      //       recommend: 0,
      //     },
      //     {
      //       price: 30,
      //       name: "7次体验卡",
      //       status: 0,
      //       recommend: 1,
      //     },
      //   ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    go2add() {
      this.$router.push({ name: "CouponAdd" });
      console.log("go to add coupon page");
    },
    getData() {
      pagination(this.page).then((res) => {
        console.log(res);
        this.tableData = res.data.results;
        this.List = res.data;
      });
    },
    formatDate(row) {
        console.log(row)
      const date = new Date(parseInt(row.discountStartTime));
      const Y = date.getFullYear() + "-";
      const M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      const D =
        date.getDate() < 10 ? "0" + date.getDate() + "" : date.getDate() + "";
      const h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      const m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      const s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + " " + h + m + s;
    }
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  min-width: 1500px;
}

.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.red {
  color: red;
}
</style>
