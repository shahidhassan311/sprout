import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Tabledrag from "./../../partials/Tabledrag/Tabledrag.vue"

export default{
    created: function () {
        var self = this;
        var del = [];
        self.select();
        document.title = this.title;
        $(function () {

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

                });
                console.log(del);
                self.delete(del);
                self.select();
                alert(del);
            });
        });
    },
    data () {
        return {
            pricelists: "Pricelists",
            title: "Pricelists -Sprout",
            counter: 1,
            btnlinks: {
                createbtnlink:"/sales/salespricelistscreate",
                importbtnlink:"/sales/salespricelistsimport",
                exportbtnlink:"",
                deletebtnlink:"",
            },
            tableheader: [
                "Id",
                "Pricelist Name",
                "Discount Policy",


            ],
            tablefooter: [
                "",
                "",
                "",
                "",
                "",

            ],
            tabledata: {
                "row": {
                    "data": [
                        "Email",
                        "",

                    ],
                    "url": "/sales/salespricelistsview"

                },
                "row1": {
                    "data": [
                        "Indirect Sales",
                        "",

                    ],
                    "url": "/sales/salespricelistsview"

                },
                "row2": {
                    "data": [
                        "Website Sales",
                        "",


                    ],
                    "url": "/sales/salespricelistsview"

                },

            }
        }
    },
    methods: {
        select3: function () {
            var self = this;
            self.counter+=4;
            self.$http.post("/sales/salespricelist_table_next", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        var j_date = new Date(val.created_at);
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.name,
                                val.discount_policy,
                            ],
                            "url": "/sales/salespricelistsview/"+val.id,

                        });
                    });
                    console.log(self.tabledata);
                }

            },function(err){
                alert(err);
            });
        },
        select4: function () {
            var self = this;
            self.counter-=4;
            self.$http.post("/sales/salespricelist_table_back", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        var j_date = new Date(val.created_at);
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.name,
                                val.discount_policy,
                            ],
                            "url": "/sales/salespricelistsview/"+val.id,

                        });
                    });
                    console.log(self.tabledata);
                }

            },function(err){
                alert(err);
            });

        },

        select: function () {
            var self = this;

            self.$http.post("/sales/sales_table_pricelist", {
                "username": self.options,
            }).then(function(res){
                var data = res.body.data;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        var j_date = new Date(val.created_at);
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.name,
                                val.discount_policy,
                            ],
                            "url": "/sales/salespricelistsview/"+val.id,

                        });
                    });
                    console.log(self.tabledata);
                }
                //self.options =res.body.data;

            },function(err){
                //alert(err);
            });
        },

        delete: function (del) {
            var self = this;
            //alert(self.current_company+ " ");
            console.log("a"+del);
            self.$http.post("/sales/salespricelisttabledelete", {"delete_items": del}).then(function(res){
                if(res){
                    self.select();
                }else {
                    alert("something went wrong");
                }

                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
    },




    components: {
        DashboardController,
        Tabledrag
    }
}