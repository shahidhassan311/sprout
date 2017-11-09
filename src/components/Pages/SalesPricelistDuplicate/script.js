import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Tabledrag from "./../../partials/Tabledrag/Tabledrag.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"

export default{
    created: function () {
        var self = this;
        self.select();
        $(function(){
            $("#save").click(function () {

                self.$validator.validateAll().then(result => {
                    if (!result) {
                        // validation failed.
                    }
                    self.submit();
                    window.location.href = "/sales/salespricelists";
                });
            });
            $('#submitSaveBtn').on("click",function(){

            });
        });

    },
    data () {
        return {
            pricelists: "Pricelists / New",
            btnlinks: {
                createbtnlink:"/sales/newuser",
                importbtnlink:"/sales/imported",
                discardbtnlink:"/sales/salespricelists",
                savebtnlink:""
            },
            pricelist_name: '',
            discount_poli: '',
            tableheader: [
                "Name"


            ],
            tablefooter:[
                "",
                "",
            ],
            tabledata: {
                "row": {
                    "data": [
                        "Add an Items",

                    ],
                    "url": "/sales/request_quotation_inner"

                },
                "row1": {
                    "data": [
                        "",

                    ],
                    "url": "/sales/request_quotation_inner"

                },
                "row2": {
                    "data": [
                        "",


                    ],
                    "url": "/sales/request_quotation_inner"

                },

            }
        }
    },
    methods: {

        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/domain_alias", {
                "id": self.$route.params.id,
            }).then(function(res){
                var parentdata = res.body.result[0];
                self.alias_domain = parentdata.alias_domain;
                console.log(parentdata);

            },function(err){
                alert(err);
            });

            self.$http.post("/sales/sale_activity_name", {"fname": self.name}).then(function(res){self.sales_team_drop =res.body.result;},function(err){
                //alert(err);
            })
            self.$http.post("/sales/sale_recommend_activity", {"activityname": self.message_type}).then(function(res){self.sales_activity_recommend =res.body.result;},function(err){
                //alert(err);
            });

        },
        submit: function () {
            //alert("adasdsadsad");
            var self = this;
            //var ckeditor_value = CKEDITOR.instances.editor1.getData();
            //alert(self.current_company+ " ");
            self.$http.post("/sales/sales_pricelist_create", {
                "price_name": self.pricelist_name,
                "discount_poli": self.discount_poli,



            }).then(function(res){
                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },

    },


    components: {
        DashboardController,
        Tabledrag,
        TableMain
    }
}