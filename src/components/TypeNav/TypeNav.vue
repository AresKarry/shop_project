<template>
     <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过度动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key='c1.categroyId' :class="{cur:currentIndex==index}">
                                <h3 @mousemove="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->

                                </h3>
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import  throttle from "lodash/throttle"

export default {
    name:'TypeNav',
    data() {
        return {
            // 添加响应式数据，存储用户鼠标移入一级分类的索引
            currentIndex:-1,
            show:true
        }
    },
    methods: {
        // 鼠标进入，修改响应式数据currentIndex
        // changeIndex(index){
        //     this.currentIndex=index
        // },
        // throttle的回调函数不要用箭头函数，可能出现上下文this问题
        changeIndex:throttle(function(index){
            this.currentIndex=index
        },50),
        // 进行路由跳转的方法
        // 最好的解决方法：事件委派+编程式导航
        goSearch(event){
            // console.log(event)
            let element = event.target;
            // 节点有一个dataset属性，该属性可以获取节点的自定义属性和属性值
            let {categoryname,category1id,category2id,category3id} = element.dataset;
            if(categoryname){
                // 整理路由跳转的参数
                let location={name:'search'}
                let query ={categoryName:categoryname}
                if(category1id){
                    query.category1Id=category1id;
                }else if(category2id){
                    query.category2Id=category2id;
                }else{
                    query.category3Id=category3id;
                }
                // 如果路由跳转时，带有params参数，也要传递过去
                if(this.$route.params){
                    location.params=this.$route.params
                    location.query = query;
                    // 
                    this.$router.push(location)
                }
                
            }
        },
        // 当鼠标移入时，让商品分类列表展示
        enterShow(){
            if(this.$route.path!='/home'){
                this.show=true
            }
        },
        leaveShow(){
            this.currentIndex=-1
            if(this.$route.path!='/home'){
                
                this.show=false
            }
        }
    },
    // 组件挂载完毕，可以向服务器发请求
    mounted(){
        // 通知vuex发请求，获取数据，存储在仓库中
        // this.$store.dispatch('categoryList')
        // 当组件挂载完毕，将show变为false
        // 如果不是home组件，则将typeNav隐藏
        if(this.$route.path!='/home'){
            this.show = false;
        }
    },
    computed:{
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
            // 注入一个参数state，其实即为大仓库中的数据
            categoryList:(state)=>{
                return state.home.categoryList
            }
        })
    }
}
</script>

<style scoped lang='less'>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .cur{
                        background-color: skyblue;
                    }
                }
            }
            // 过度动画的样式
            // 过渡动画开始状态（进入）
            .sort-enter{
                height: 0px;
                // transform: rotate(0);
            }
            // 过渡动画的结束状态（进入）
            .sort-enter-to{
                height: 461px;
            }
            // 定义动画时间、速率
            .sort-enter-active{
                transition: all 0.3s linear;
            }
        }
    }
</style>