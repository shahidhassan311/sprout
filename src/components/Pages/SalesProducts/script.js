import Product_Boxes from "./../../partials/Product_Boxes/Product_Boxes.vue"
import DashboardController from "./../../partials/DashboardController/DashboardController.vue"


export default{
    created: function(){
        document.title = this.title;
        var self = this;
        self.select();
        $(function () {

        });
    },
    data () {
        return {
            salesproducts: "Products",
            title: "Products - Sprout",
            name: '',
            cost: '',
            counter: 1,
            options: [],
            btnlinks: {
                createbtnlink: "/sales/salesproductcreate",
                importbtnlink: "/sales/imported",
                firstbtnlink:"/sales/products",
                secondbtnlink:"/sales/salesproductlistview"
            },
        }
    },
    methods: {
        select: function () {
            var self = this;
            self.$http.post("/sales/select_all_product", {"name": self.name }).then(function(res){self.options =res.body.result;},function(err){
                //alert(err);
            });
            // self.$http.post("/sales/select_all_product", {"id": self.$route.params.id}).then(function (res) {
            //     self.name = res.body.result;
            //     console.log(self.name);
            // }, function (err) {
            //     // alert(err);
            // });
        },
        select3: function () {
            var self = this;
            self.counter+=1;
            self.$http.post("/sales/select_all_productnext", {"counter": self.counter}).then(function(res){self.options =res.body.result;},function(err){
                //alert(err);
            },function(err){
                alert(err);
            });
        },
        select4: function () {
            var self = this;
            self.counter-=1;
            self.$http.post("/sales/select_all_productback", {"counter": self.counter}).then(function(res){self.options =res.body.result;},function(err){
                //alert(err);
            },function(err){
                alert(err);
            });
        },

        validateBeforeSubmit() {

            var self = this;
            this.$validator.validateAll().then(() => {
                // eslint-disable-next-line

                //this.submit();
                //this.tags();
                //this.insert();
                //this.select();
                //this.insert();

                // this.submiting();


            }).catch(() => {
                // eslint-disable-next-line
                //  alert('Correct them errors!');
            });
        }
    },

    components: {
        DashboardController,
        Product_Boxes


    }

}