import DashboardController from "./../../partials/DashboardController/DashboardController.vue";
import TableMain from "./../../partials/TableMain/TableMain.vue";


export default{
    created: function () {
        var self = this;
        var del = []; // initialize empty array
        document.title = this.title;
        this.select();
        $(function () {
            $("#action").hide();
            $("#changepassword").click(function () {
                self.pwd_update();
                window.location.href = "/setting/users";
            });
            $(".checkBoxClass").click(function () {
                if($(this).prop('checked')){
                    $("#action").show();
                }else{
                    $("#action").hide();
                }
                // alert("check it");
            });

            $("#num01").click(function () {
                self.ssubmit();

            });
            $("#num10").click(function () {
                self.psubmit();
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
    data(){
        return {
            head: "Users",
            title: 'Sales Ordert',
            options: '',
            username: '',
            v: true,
            v1: false,
            btnlinks: {
                createbtnlink: "/sales/salesordercreate",
                importbtnlink: "/sales/salesorderimport",
                deletebtnlink: "",
                exportbtnlink: "",
                changepasswordbtnlink: "",
                changepasswordbtnlink_modal: "",
            },
            tableheader: [
                "Quotation Number",
                "Order Date",
                "Customer",
                "Salespersons",
                "Total",
                "Status",

            ],
            tablefoot: [
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

                    ],
                    "url": ""


                },

            },
        };
    },
    methods: {
        select: function () {
            var self = this;

            self.$http.post("/sales/sales_order_table", {
                "username": self.options,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        var j_date = new Date(val.order_date);
                        self.tabledata.push({
                            "data": [
                                "SN"+val.id,
                                j_date.getDate()+"-"+j_date.getMonth()+"-"+j_date.getFullYear(),
                                val.username,
                                val.name,
                                val.total,
                                val.status
                            ],
                            "url": "/sales/salesorderview/"+val.id,

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
            self.$http.post("/sales/user_pwd_update", {"id": self.$route.params.id ,"status": self.status}).then(function(res){
                console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
        delete: function (del) {
            var self = this;
            //alert(self.current_company+ " ");
            console.log("a"+del);
            self.$http.post("/sales/delete_sales_quotation", {"delete_items": del}).then(function(res){

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
};

