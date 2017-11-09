import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"
import Modal from "./../../partials/Modal/Modal.vue"
export default{
    created: function () {
        var self = this;
        self.select();
        self.selectmodaltable();
        var del = [];
        var user_p2 = [];
        $(function(){
            $("#inputhide").click(function(){
                $("#hidetr").toggle();
            });
            $("#save").click(function () {


                self.$validator.validateAll().then(result => {
                    if (!result) {
                        // validation failed.
                        alert("error");
                    }else{
                        self.submit();
                        window.location.href = "/sales/salesteamview/"+self.$route.params.id;
                    }
                });
            });
            $('#add_p').on("click",function(){
                // alert("asdas");
                del.length = 0;
                console.log(del);
            });

            $("#selectbtn").click(function () {
                $(".checkBoxClass:checked").each(function(){
                    del.push($(this).val());
                });
                self.select_value(del);
            });
            self.btnlinks.discardbtnlink = "/sales/salesteamview/"+self.$route.params.id;
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
            sales_team_name: '',
            team_leader: '',
            alias: '',
            team_leader_drop: '',
            alias_email: '',
            team_leader_get: '',
            alias_name: '',
            invoices: '',
            opportunities: '',
            quotations: '',
            id: '',
            ids: '',
            phone_no: '',
            email: '',
            username: '',

            fname: '',
            team_lead_id: '',
            name_field: '',
            sales_team_quotation: '',
            sales_team_invoices: '',
            sales_team_opportunities: '',
            username_name: '',
            us_name_p: '',
            username_p: [],
            id_p: [],
            main_array: [],
            sales_team_team_member_name: '',
            tableheader: [
                "Name",
                "Login",
                "Language",
                "Latest Connection",


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
                        "",
                        "",
                        "",
                        "",
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

            },
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

            self.$http.post("/sales/sales_form_edit", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                console.log(parentdata);
                self.sales_team_name = parentdata.name;
                self.team_leader_get = parentdata.team_leader_id;
                self.alias_name = parentdata.email_alias;
                self.invoices = parentdata.invoices.data[0];
                self.opportunities = parentdata.opportunities.data[0];
                self.quotations = parentdata.quotations.data[0];



            }, function (err) {
                // alert(err);
            });
            self.$http.post("/sales/team_leader", {"leader_name": self.username}).then(function(res){self.team_leader_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/sales_team_team_member", {"id": self.$route.params.id}).then(function(res){
                self.sales_team_team_member_name =res.body.result;
            },function(err){
                //alert(err)
            });


        },
        submit51:function (id, index) {
            var self = this;
            alert(index);
            self.$delete(self.username_p, index);
            console.log(self.username_p);
        },
        modal_tm: function (id) {
            var self = this;
            self.id = id;
            self.$http.post("/sales/users_team_m", {"id": self.id}).then(function (res) {

                var parentdata = res.body.result[0];
                console.log(parentdata);
                self.phone_no = parentdata.phone_no;
                self.email = parentdata.email;
                self.username = parentdata.username;

            }, function (err) {
                // alert(err);
            });
        },
        select_value: function (del) {
            var self = this;
            self.$http.post("/sales/team_leader_id_table", {"id": del}).then(function(res){
                var parentdata = res.body.result;
                for(var i = 0 ; i < parentdata.length; i++ ) {
                    parentdata[i].forEach(function (val) {
                        self.username_p.push(val)
                    });
                }
            },function(err){
            });
            console.log(del);
            // del.length = 0;
        },
        selectmodaltable: function () {
            var self = this;

            self.$http.post("/sales/sales_team_modal_table", {
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
                                val.username,
                                val.email,
                                val.language,
                            ],
                            "url": "/sales/salesteamview/"+val.id,

                        });
                    });
                }
                //self.options =res.body.data;

            },function(err){
                //alert(err);
            });
        },
        team_leader_Trigger : function () {

        },
        delete_sales_team_member: function (id) {
            var self = this;
            self.id = id;
            alert(self.id);
            self.$http.post("/sales/users_team_m_delete", {
                "id": self.id,
                "ids": self.$route.params.id ,
            }).then(function(res){
                //console.log(res.body);
            },function(err){
                //alert(err);
            });
            self.select();

        },
        submit: function () {
            var self = this;
            self.$http.post("/sales/sales_form_update", {
                "id": self.$route.params.id ,
                "sales_name":self. sales_team_name,
                "team_lead_name":self. team_leader_get,
                "email_name":self. alias_name,
                "invoices":self. invoices,
                "opportunities":self. opportunities,
                "quotations":self. quotations,
            }).then(function(res){
                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
    },



    components: {
        DashboardController,
        TableMain,
        Modal
    }
}
