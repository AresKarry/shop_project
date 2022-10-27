<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name:"IndexCarousel",
    props:['list'],
    watch:{
        list:{
            // 立即监听，不管数据有没有变化
            immediate:true,
            handler(){
                this.$nextTick(()=>{
                    var mySwiper = new Swiper(this.$refs.cur, {
                        //设置轮播图防线
                        direction: "horizontal",
                        //开启循环模式
                        loop: true,
                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            //分页器类型
                            type: "bullets",
                            //点击分页器，切换轮播
                            clickable: true,
                        },
                        //自动轮播
                        autoplay: {
                            delay: 1000,
                            //新版本的写法：目前是5版本
                            // pauseOnMouseEnter: true,
                            //如果设置为true，当切换到最后一个slide时停止自动切换
                            stopOnLastSlide: true,
                            //用户操作swiper之后，是否禁止autoplay
                            disableOnInteraction: false,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        //切换效果
                        // effect: "cube",
                    });
                })
            }
        }
    }
}
</script>

<style>

</style>