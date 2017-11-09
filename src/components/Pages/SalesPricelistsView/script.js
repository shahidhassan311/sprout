import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Tabledrag from "./../../partials/Tabledrag/Tabledrag.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"
import Modal from "./../../partials/Modal/Modal.vue"

export default{
    created: function () {
        var self = this;
        this.select();
        $(function(){
            $("#num01").click(function () {
                self.nextsubmit();

            });
            $("#num10").click(function () {
                self.backsubmit();
            });
            $("#delete").click(function () {
                self.submit_inside();
                alert("are you sure delete the user");
                window.location.href = "../salespricelists";
            });
            $('.samobuttopcontroller2').off('click');
            $('.samobuttopcontroller2').on('click', function () {
                let check = $('#pshow').css("display");
                if(check == "none"){
                    $('#pshow').show();
                    $('#pedit').hide();
                }else{
                    $('#pshow').hide();
                    $('#pedit').show();
                }

            });
            self.btnlinks.editbtnlink = "/sales/salespricelistedit/"+self.$route.params.id;
            self.btnlinks.duplicatebtnlink = "/sales/salespricelistduplicate/" + self.$route.params.id;

        });
    },
    data () {
        return {
            pricelists: "Pricelists / Public Pricelist (USD)",
            btnlinks: {
                createbtnlink:"/sales/salespricelistscreate",
                importbtnlink:"/sales/imported",
                editbtnlink:"",
                discardbtnlink:"/sales/salespricelists",
                deletebtnlink:"",
                duplicatebtnlink:"",
            },
            price_name: '',
            discount_poli: '',
            tableheader: [
                "Name",


            ],
            tablefooter: [
                "",
                "",
            ],
            tabledata: {
                "row": {
                    "data": [
                        "Direct Sales",

                    ],
                    "url": "/sales/salesteamview"

                },
                "row1": {
                    "data": [
                        "Indirect Sales",

                    ],
                    "url": "/sales/salesteamview"

                },
                "row2": {
                    "data": [
                        "Website Sales",


                    ],
                    "url": "/sales/salesteamview"

                },

            }
        }
    },
    methods: {
        nextsubmit: function () {
            var self = this;
            self.$http.post("/sales/sales_pricelist_form_next", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                self.$route.params.id = parentdata.id;
                self.price_name = parentdata.name;
                self.discount_poli = parentdata.discount_policy;
                console.log(parentdata);
                // console.log(res.body)
                //console.log(this.$route.query.id);

            }, function (err) {

            });




        },
        backsubmit: function () {
            var self = this;
            self.$http.post("/sales/sales_pricelist_form_back", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                self.$route.params.id = parentdata.id;
                self.price_name = parentdata.name;
                self.discount_poli = parentdata.discount_policy;
                console.log(parentdata);
                // console.log(res.body)
                //console.log(this.$route.query.id);

            }, function (err) {

            });
        },
        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/sales_pricelist_form", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                self.price_name = parentdata.name;
                self.discount_poli = parentdata.discount_policy;
                console.log(parentdata);



            }, function (err) {
                // alert(err);
            });


        },

        submit_inside: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/sales/delete_sales_pricelists_inside", {"id": self.$route.params.id }).then(function(res){
                console.log(res.body);
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
    }
}