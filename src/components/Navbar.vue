<template>
    <div class="navbar is-link">
        <div class="navbar-start">
            <router-link :to="{ name: 'Index'}">
                <div class="navbar-brand is-size-3 navbar-item has-text-white">Ninja Smoothies</div>
            </router-link>
        </div>
        <div class="navbar-end">
            <div class="plus-button">
                <button class="button is-rounded is-danger is-medium ">
                    <router-link :to="{name: 'AddSmoothie'}">
                        <i class="fas fa-plus has-text-white"></i>
                    </router-link>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data (){
        return{
        }
    }
}
</script>

<style scoped>
    .plus-button{
        position: absolute;
        margin-top: 40px;
        padding-right: 20px;
    }

</style>