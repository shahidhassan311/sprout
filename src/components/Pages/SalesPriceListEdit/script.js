import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Tabledrag from "./../../partials/Tabledrag/Tabledrag.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"
import Modal from "./../../partials/Modal/Modal.vue"

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
                    window.location.href = "/sales/salespricelistsview/"+self.$route.params.id;
                });
            });
            $('#submitSaveBtn').on("click",function(){

            });
        });

    },
    data () {
        return {
            pricelists: "Pricelists / Public Pricelist (USD)",
            btnlinks: {
                createbtnlink:"/sales/salespricelistscreate",
                importbtnlink:"/sales/imported",
                discardbtnlink:"/sales/salespricelistsview",
                savebtnlink:''
            },
            price_name_list: '',
            dis_poli: '',
            tableheader: [
                "Name"


            ],
            tablefooter: [
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

            self.$http.post("/sales/sales_pricelist_edit", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                self.price_name_list = parentdata.name;
                self.dis_poli = parentdata.discount_policy;

                console.log(parentdata);



            }, function (err) {
                // alert(err);
            });


        },
        submit: function () {
            var self = this;
            self.$http.post("/sales/sales_pricelist_update", {
                "id": self.$route.params.id ,
                "price_name":self. price_name_list,
                "dis_policy":self. dis_poli,

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
        TableMain,
        Modal
    },
}