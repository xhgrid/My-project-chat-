<template>
    <div class="revisepassword">
        <table class="publicTab">
            <tr>
                <td>
                    原密码
                </td>
                <td class="inputBox">
                    <input @input="oldPassword" type="password" v-model.trim="passwordData.old_password" placeholder="请输入原密码">
                    <i @click="deleteOldPassword" v-show="inputDelete.old_password" class="iconfont icon-shanchuguanbicha"></i>
                </td>
            </tr>
            <tr>
                <td>
                    新密码
                </td>
                <td class="inputBox">
                    <input @input="password" type="password" v-model.trim="passwordData.password" placeholder="请输入新密码">
                    <i @click="deletePassword" v-show="inputDelete.password" class="iconfont icon-shanchuguanbicha"></i>
                </td>
            </tr>
            <tr>
                <td>
                    确认密码
                </td>
                <td class="inputBox">
                    <input @input="passwordConfirmation" type="password" v-model.trim="passwordData.password_confirmation" placeholder="请再次输入新密码">
                    <i @click="deleteConfirmation" v-show="inputDelete.password_confirmation" class="iconfont icon-shanchuguanbicha"></i>
                </td>
            </tr>
        </table>
        <div class="btn" @click="$emit('confirmRevise')">
            <span>{{btnName}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            btnName:window.Glod.revisePasswordBtn,
            inputDelete:{
                old_password:false,
                password:false,
                password_confirmation:false,
            }
        }
    },
    props:{
        passwordData:Object
    },
    methods: {
        // 监听原密码输入框
        oldPassword(){
            if(this.passwordData.old_password.length > 0){
                this.inputDelete.old_password = true
            }else{
                this.inputDelete.old_password = false
            }
        },
        //监听新密码输入框
        password(){
            if(this.passwordData.password.length > 0){
                this.inputDelete.password = true
            }else{
                this.inputDelete.password = false
            }
        },
        //监听确认密码输入框
        passwordConfirmation(){
            if(this.passwordData.password_confirmation.length > 0){
                this.inputDelete.password_confirmation = true
            }else{
                this.inputDelete.password_confirmation = false
            }
        },
        // 删除原密码
        deleteOldPassword(){
            this.passwordData.old_password = ''
            this.inputDelete.old_password = false
        },
        // 删除新密码
        deletePassword(){
            this.passwordData.password = ''
            this.inputDelete.password = false
        },
        // 删除确认密码
        deleteConfirmation(){
            this.passwordData.password_confirmation = ''
            this.inputDelete.password_confirmation = false
        }
    },
}
</script>

<style scoped lang="less">
</style>
