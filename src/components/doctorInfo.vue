<template>
  <div class="doctor-info">
    <div class="doctor-info-1">
      <div class="di1-image"></div>
    </div>
    <div class="doctor-info-2">
      <div class="doctor-info-2-top">
        <span class="name">王医生</span><span class="info">内分泌科 | 主任医师</span>
      </div>
      <div class="doctor-info-2-bottom">
        <van-tag color="#677fff" class="tap" >三甲</van-tag><span class="hospital">积水潭医院</span>
      </div>
    </div>
    <div class="doctor-info-3">
      <div class="di3-btn">进入咨询</div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.doctor-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  

  &-1 {
    width: 50px;
  }

  .di1-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
  }

  &-2 {
    flex: 1;
    margin-left: 10px;
    &-top{
      margin-bottom: 4px;
      .name{
        font-weight: 700;
        font-size: 18px;
      }
      .info{
        color: var(--cp-tag);
        font-size: 12px;
        margin-left: 8px;
      }
    }
    &-bottom{
      display: flex;
      .hospital{
        font-size: 12px;
        margin-left: 4px;;
        
      }
      .tap{
        font-size: 10px;
       
      }
    }
  }

  &-3 {
    width: 80px;
  }

  .di3-btn {
    background-color: #16c2a322;
    color: var(--cp-primary);
    font-size: 13px;
    padding: 7px  8px ;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
  }
}</style>