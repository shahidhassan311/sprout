import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Modal from "./../../partials/Modal/Modal.vue"
export default{
    created: function () {
        var self = this;
        this.select();

        $(function(){
            $("#inputhide").click(function(){
                $("#hidetr").toggle();
            });
            $("#save").click(function () {
                self.update();
                window.location.href = "/sales/salesactivityview/"+self.$route.params.id;
                // self.$validator.validateAll().then(result => {
                //     if (!result) {
                //         // validation failed.
                //     }
                //
                // });
            });
            $('#submitSaveBtn').on("click",function(){

            });
            self.btnlinks.discardbtnlink = "/sales/salesactivityview/"+self.$route.params.id;


        });

    },
    data(){
        return {
            quotation: "Sales Teams / Direct Sales",
            modal: "Add: Team Members",
            modal1: "Open: Sales Team",
            modal2: "Open: Company",
            btnlinks: {
                createbtnlink:"/sales/salesteamcreate",
                discardbtnlink:"",
                savebtnlink:"",
            },
            type_message: '',
            sales_name: '',
            desc: '',
            no_of_days: '',
            default_value: '',
            next_activity_id: '',
            recomended_next_activity_id: '',
            sales_activity_recommend: '',
            sales_team_drop: '',

            tableheader: [
                "Name",
                "Login",
                "Language",
                "Latest Connection",


            ],
            tabledata: {
                "row": {
                    "data": [
                        "Chao Wang",
                        "chao.wang@chinaexport.example.com",
                        "English",
                        "0.000",
                    ],
                    "url": ""

                },
                "row1": {
                    "data": [
                        "",
                        "",
                        "",
                        "",
                    ],
                    "url": ""

                },
                "row2": {
                    "data": [
                        "",
                        "",
                        "",
                        "",

                    ],
                    "url": ""

                },

            }
        }

    },
    methods: {
        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/sales_activity_edit", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                self.type_message = parentdata.message_type;
                self.sales_name = parentdata.sales_team_id;
                self.desc = parentdata.description;
                self.no_of_days = parentdata.number_of_days;
                self.default_value = parentdata.default_val;
                self.next_activity_id = parentdata.recomended_next_activity_id;

            }, function (err) {
                // alert(err);
            });
            self.$http.post("/sales/sale_activity_name", {"fname": self.name}).then(function(res){self.sales_team_drop =res.body.result;},function(err){
                //alert(err);
            })
            self.$http.post("/sales/sale_recommend_activity", {"activityname": self.message_type}).then(function(res){self.sales_activity_recommend =res.body.result;},function(err){
                //alert(err);
            });


        },
        update: function () {
            var self = this;
            self.$http.post("/sales/sales_activity_form_update", {
                "id": self.$route.params.id ,
                "message_type":self. type_message,
                "name":self. sales_name,
                "description":self. desc,
                "number_of_days":self. no_of_days,
                "default":self. default_value,
                "recomended_next_activity_id":self. next_activity_id,
            }).then(function(res){
                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
    },



    components: {
        DashboardController,
        Modal,
    }
}
