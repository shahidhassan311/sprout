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
            activities: "Activities",
            title: "Activities - Sprout",
            counter: 1,
            btnlinks: {
                createbtnlink:"/sales/salesactivitycreate",
                importbtnlink:"/sales/salesactivityimport"
            },
            tableheader: [
                "Id",
                "Message Type",
                "Number of days",
                "Sales Team"

            ],
            tablefooter : [
                "",
                "",
                "",
                "",
                "",
                "",
            ],
            tabledata: {
                "row": {
                    "data": [
                        "id",
                        "Public Pricelist",
                        "USD",
                        "USD"
                    ],
                    "url": "/sales/salesactivityview"

                },
                "row1": {
                    "data": [
                        " Sales",
                        "",
                        ""
                    ],
                    "url": "/sales/salesactivityview"

                },
                "row2": {
                    "data": [
                        " Sales",
                        "",
                        ""

                    ],
                    "url": "/sales/salesactivityview"

                },
                "row2": {
                    "data": [
                        " Sales",
                        " Sales",
                        ""

                    ],
                    "url": "/sales/salesactivityview"

                },

            }
        }
    },
    methods: {
        select3: function () {
            var self = this;
            self.counter+=1;
            self.$http.post("/sales/sales_activity_table_next", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.result;
                self.j = data.name;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.message_type,
                                val.number_of_days,
                                val.name,
                            ],
                            "url": "/sales/salesactivityview/"+val.id,

                        });
                        console.log(data);
                    });
                }

            },function(err){
                alert(err);
            });
        },
        select4: function () {
            var self = this;
            self.counter-=1;
            self.$http.post("/sales/sales_activity_table_back", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.result;
                self.j = data.name;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.message_type,
                                val.number_of_days,
                                val.name,
                            ],
                            "url": "/sales/salesactivityview/"+val.id,

                        });
                        console.log(data);
                    });
                }

            },function(err){
                alert(err);
            });

        },
        select: function () {
            var self = this;

            self.$http.post("/sales/sales_activity_table", {
                "username": self.options,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        var j_date = new Date(val.created_at);
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.message_type,
                                val.number_of_days,
                                val.name,
                            ],
                            "url": "/sales/salesactivityview/"+val.id,

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
            self.$http.post("/sales/salesactivitytabledelete", {"delete_items": del}).then(function(res){
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