import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"
import Modal from "./../../partials/Modal/Modal.vue"
import Message from "./../../partials/Message/Message.vue"
export default{
    created: function () {
        var self = this;
        self.select();
        $(function () {
            $("#num01").click(function () {
                self.nextsubmit();
                self.select();
            });
            $("#num10").click(function () {
                self.backsubmit();
            });
            $("#delete").click(function () {
                self.submit_inside();
                alert("are you sure delete the user");
                window.location.href = "../salesteams";
            });
            $('.samobuttopcontroller2').off('click');
            $('.samobuttopcontroller2').on('click', function () {
                let check = $('#show1').css("display");
                if (check == "none") {
                    $('#show1').show();
                    $('#edit1').hide();
                } else {
                    $('#show1').hide();
                    $('#edit1').show();
                }

            });
            self.btnlinks.editbtnlink = "/sales/salesteamedit/" + self.$route.params.id;
            self.btnlinks.duplicatebtnlink = "/sales/salesteamduplicate/" + self.$route.params.id;

        });

    },
    data(){
        return {
            quotation: "Sales Teams / Direct Sales",
            modal: "open: Team Members",
            modal1: "Open: Sales Team",
            modal2: "Open: Company",
            counter:1,
            btnlinks: {
                createbtnlink: "/sales/salesteamcreate",
                duplicatebtnlink: "",
                deletebtnlink: "",
                editbtnlink: ""
            },
            sales_team_name: '',
            team_leader: '',
            alias: '',
            phone_no: '',
            email: '',
            username: '',
            id: '',
            sales_team_team_member_name: [],
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
        nextsubmit: function () {
            var self = this;
            self.$http.post("/sales/sales_team_form_next", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.$route.params.id = parentdata.id;
                self.sales_team_name = parentdata.name;
                self.team_leader = parentdata.username;
                self.alias = parentdata.email_alias;
                console.log(parentdata);
                // console.log(res.body)
                //console.log(this.$route.query.id);

            }, function (err) {

            });




        },
        backsubmit: function () {
            var self = this;
            self.$http.post("/sales/sales_team_form_back", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.$route.params.id = parentdata.id;
                self.sales_team_name = parentdata.name;
                self.team_leader = parentdata.username;
                self.alias = parentdata.email_alias;
                console.log(parentdata);
                // console.log(res.body)
                //console.log(this.$route.query.id);

            }, function (err) {

            });
        },
        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/sales_form_call", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                self.sales_team_name = parentdata.name;
                self.team_leader = parentdata.username;
                self.alias = parentdata.email_alias;
                self.invoices = parentdata.invoices.data[0];
                self.opportunities = parentdata.opportunities.data[0];
                self.quotations = parentdata.quotations.data[0];

            }, function (err) {
                // alert(err);
            });

            self.$http.post("/sales/sales_team_team_member", {"id": self.$route.params.id}).then(function(res){
                self.sales_team_team_member_name =res.body.result;
                },function(err){
                //alert(err)
            });
        },

        submit_inside: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/sales/delete_sales_team_inside", {"id": self.$route.params.id }).then(function(res){
                console.log(res.body);
            },function(err){
                //alert(err);
            });
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
        }
    },

    components: {
        DashboardController,
        TableMain,
        Modal,
        Message
    }
}
