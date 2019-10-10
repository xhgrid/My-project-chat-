<template>
    <nav class="bottom">
        <ul>
            <li v-for="(item, index) of bottomNav" :key="index">
                <router-link :to="item.path">
                    <i :class="'iconfont '+item.icon"></i>
                    <span>{{item.name}}</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            bottomNav:window.Glod.bottomNav
        }
    }
}
</script>

<style scoped lang="less">
    .bottom{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 54px;
        background: #f9f9f9;
        // border-top: 1px solid #c9c9ca;
        z-index: 100;
        ul{
            width: 100%;
            display: flex;
            li{
                width: 25%;
                height: 54px;
                text-align: center;
                a{
                    display: inline-block;
                    width: 100%;
                    height: 54px;
                }
                .router-link-active {
                    display: block;
                    width: 100%;
                    height: 54px;
                    color: #ea2222;
                    i{
                        color: #ea2222;
                    }
                    span{
                        color: #ea2222;
                    }
                }
                a{
                    cursor: pointer;
                }
                i{
                    font-size: 22px;
                    color: #7a7a7a;
                }
                span{
                    display: block;
                    font-size: 14px;
                    color: #7a7a7a;
                    line-height: 10px;
                }
            }
        }
    }
</style>
