import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"

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
            salesteams: "Sales Teams",
            title: "Sales Teams -Sprout",
            counter: 1,
            btnlinks: {
                createbtnlink:"/sales/salesteamcreate",
                importbtnlink:"/sales/salesteamimport",
                exportbtnlink:"",
                archivebtnlink:"",
                unarchivebtnlink:"",
                deletebtnlink:"",
            },
            tableheader: [
                "Id",
                "Sales Team",
                "Team Leader"

            ],
            tablefooter: [
                "",
                "",
                "",
                "",
            ],
            tabledata: {
                "row": {
                    "data": [
                        "Direct Sales",
                        ""
                    ],
                    "url": "/sales/salesteamview"

                },
                "row1": {
                    "data": [
                        "Indirect Sales",
                        ""
                    ],
                    "url": "/sales/salesteamview"

                },
                "row2": {
                    "data": [
                        "Website Sales",
                        ""

                    ],
                    "url": "/sales/salesteamview"

                },

            }
        }
    },

    methods: {
        select3: function () {
            var self = this;
            self.counter+=4;
            self.$http.post("/sales/salesteam_tablenext", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.j = data.name;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.name,
                                val.username,
                            ],
                            "url": "/sales/salesteamview/"+val.id,

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
            self.counter-=4;
            self.$http.post("/sales/salesteam_tableback", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.j = data.name;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.name,
                                val.username,
                            ],
                            "url": "/sales/salesteamview/"+val.id,

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

            self.$http.post("/sales/sales_table_call", {
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
                                val.name,
                                val.username,
                            ],
                            "url": "/sales/salesteamview/"+val.id,

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
            self.$http.post("/sales/salesteamtabledelete", {"delete_items": del}).then(function(res){
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