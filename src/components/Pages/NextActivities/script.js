import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"

export default{
    created: function () {
        var self = this;
        self.select();
        var del = [];
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
            head: "Next Activities",
            title: "Next Activity - Sprout",
            counter: 1,
            btnlinks: {
                createbtnlink:"/sales/salesnextactivitiescreate",
                importbtnlink:"/sales/salesnextactivityimport",
                firstbtnlink:"/sales/nextactivities",
                secondbtnlink:"/sales/salesnextactivitylistview",
                deletebtnlink:"",
            },
            tableheader: [
                "Id",
                "Opportunity",
                "Customer",
                "Next Activity Date",
                "Next Activity",
                "Next Activity Summary",
                "Stage",
                "Expected Revenue",
                "Expected closing",

            ],
            tablefooter: [
                "",
                "",
                "",
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
                        "Need 20 Days of Consultancy",
                        "Demo",
                        "Need 20 Days of Consultancy",
                        "Need 20 Days of Consultancy",
                        "test",
                        "Proposition",
                        "60,000.00",
                        "30,23"
                    ],
                    "url": ""

                },
                "row1": {
                    "data": [
                        "Need 20 Days of Consultancy",
                        "Demo",
                        "Need 20 Days of Consultancy",
                        "Need 20 Days of Consultancy",
                        "test",
                        "Proposition",
                        "60,000.00",
                        "30,23"
                    ],
                    "url": ""

                },
                "row2": {
                    "data": [
                        "Need 20 Days of Consultancy",
                        "Demo",
                        "Need 20 Days of Consultancy",
                        "Need 20 Days of Consultancy",
                        "test",
                        "Proposition",
                        "60,000.00",
                        "30,23"
                    ],
                    "url": ""

                },

            }
        }
    },
    methods: {
        select3: function () {
            var self = this;
            self.counter+=4;
            self.$http.post("/sales/next_activity_table_next", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        var j_date = new Date(val.created_at);
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.opportunity_title,
                                val.customer_name,
                                val.next_activity_date,
                                val.next_activity,
                                val.next_activity_description,
                                val.name,
                                val.expected_revenue,
                                val.expected_closing_date,

                            ],
                            "url": "/sales/salesnextactivityview/"+val.id,

                        });
                    });
                    console.log(self.tabledata);
                }
                //self.options =res.body.data;

            },function(err){
                alert(err);
            });
        },
        select4: function () {
            var self = this;
            self.counter-=4;
            self.$http.post("/sales/next_activity_table_back", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        var j_date = new Date(val.created_at);
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.opportunity_title,
                                val.customer_name,
                                val.next_activity_date,
                                val.next_activity,
                                val.next_activity_description,
                                val.name,
                                val.expected_revenue,
                                val.expected_closing_date,

                            ],
                            "url": "/sales/salesnextactivityview/"+val.id,

                        });
                    });
                    console.log(self.tabledata);
                }
                //self.options =res.body.data;

            },function(err){
                alert(err);
            });

        },
        select: function () {
            var self = this;

            self.$http.post("/sales/next_activity_table", {
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
                                val.opportunity_title,
                                val.customer_name,
                                val.next_activity_date,
                                val.next_activity,
                                val.next_activity_description,
                                val.name,
                                val.expected_revenue,
                                val.expected_closing_date,

                            ],
                            "url": "/sales/salesnextactivityview/"+val.id,

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
            self.$http.post("/sales/salesnnextactivitytabledelete", {"delete_items": del}).then(function(res){
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
        TableMain
    }
}