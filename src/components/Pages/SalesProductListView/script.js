import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
// import TableDrag from "./../../partials/TableDrag/TableDrag.vue"
import TableDrag from "./../../partials/Tabledrag/Tabledrag.vue"

export default{
    created: function () {
        var self = this;
        self.select();
        var del = [];
        $(function(){
            $(".checkBoxClass").click(function () {
                if($(this).prop('checked')){
                    $("#action").show();
                }else{
                    $("#action").hide();
                }
                // alert("check it");
            });
            $("#delete").click(function () {
                $(".checkBoxClass:checked").each(function(){
                    del.push($(this).val());
                    // self.btnlinks.deletebtnlink = "/setting/users/"+del;
                    // self.delete();
                });
                console.log(del);
                self.delete(del);
                alert(del);
            });
        });

    },
    data () {
        return {
            customers: "Products",
            options: '',
            username: '',
            del: '',
            btnlinks: {
                createbtnlink:"/sales/salesproductcreate",
                importbtnlink: "/sales/salesproductsimport",
                firstbtnlink:"/sales/products",
                secondbtnlink:"/sales/salesproductlistview"
            },
            tableheader: [
                "Id",
                "Internal Refrence",
                "Name",
                "Sales Price",
                "Cost",
                "Internal Catories",
                "Product Type",
                "Quantity On Hand",
                "Forecasted Quality",

            ],
            tabledata: {
                "row": {
                    "data": [
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                    ],
                    "url": "/sales/salesproductview"

                },
            }
        }
    },
    methods: {
        select: function () {
            var self = this;

            self.$http.post("/sales/select_all_product_table_view", {
                "username": self.options,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.internal_reference,
                                val.name,
                                val.sale_price,
                                val.cost,
                                val.product_category_name,
                                val.producttype_name,
                                val.on_hand,
                                val.forecasted_quality,
                            ],
                            "url": "/sales/salesproductview/"+val.id,

                        });
                    });
                    console.log(self.tabledata);
                }
                //self.options =res.body.data;

            },function(err){
                //alert(err);
            });
        },
        pwd_update: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/setting/user_pwd_update", {"id": self.$route.params.id ,"status": self.status}).then(function(res){
                console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
        delete: function (del) {
            var self = this;
            //alert(self.current_company+ " ");
            console.log("a"+del);
            self.$http.post("/sales/delete_products", {"delete_items": del}).then(function(res){

                //console.log(res.body);
            },function(err){
                //alert(err);
            });
            self.select();
        },
    },


    components: {
        DashboardController,
        TableDrag
    }
}