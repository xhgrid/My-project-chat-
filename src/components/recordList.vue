<template>
    <div class="recordList">
        <div class="nav">
            <ul>
                <li v-for="(title, index) in tabTitle" :key="index" @click="$emit('clkTab',index)" :class="{active:cur==index}">{{title}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { List } from 'vant'
export default {
    props:{
        tabTitle: Array,
        cur:{
            type:Number,
            default:0
        }
    }
}
</script>

<style scoped lang="less">
    .active{
        color: #dc3b40;
        border-bottom: 2px solid #dc3b40;
    }
    .recordList{
        .nothing{
            font-size: 16px;
            padding-top: 120px;
            text-align: center;
            color: #999;
        }
        .nav{
            background: #f6f6f6;
            line-height: 38px;
            font-size: 14px;
            position: fixed;
            top: 50px;
            z-index: 2;
            ul{
                display: table;
                table-layout: fixed;
                width: 100%;
                li{
                    display: table-cell;
                    text-align: center;
                }
            }
        }
    }
</style>
