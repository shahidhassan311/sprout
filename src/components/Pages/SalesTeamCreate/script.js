import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"
import Modal from "./../../partials/Modal/Modal.vue"
export default{
    created: function () {
        var self = this;
        self.select();
        var del = [];
        self.selectmodaltable();
        self.select2();
        $(function(){
            function validate()
            {
                return (verifyNull() && verifyEmail());
            }

            $("#inputhide").click(function(){
                $("#hidetr").toggle();
            });
            $("#save").click(function () {
                self.submit(del);
                window.location.href = "/sales/salesteams";
            });
            $('#submitSaveBtn').on("click",function(){

            });
            $("#selectbtn").click(function () {
                $(".checkBoxClass:checked").each(function(){
                    del.push($(this).val());
                });
                self.select_value(del);
            });
            $('#add_btn').removeAttr('checked');
        });
    },

    data(){
        return {

            title: 'Discuss',
            team_leader_drop: '',
            fname: '',
            team_lead_id: '',
            name_field: '',
            alias_email: '',
            sales_team_quotation: '',
            sales_team_invoices: '',
            sales_team_opportunities: '',
            username_name: '',
            us_name_p: '',
            username_p: [],
            id_p: [],
            main_array: [],
            v: true,
            options2:'',
            v1: false,
            quotation: "Sales Teams / Direct Sales",
            modal: "Add: Team Members",
            modal1: "Open: Sales Team",
            modal2: "Open: Company",
            name: 'delay-example',
            btnlinks: {
                discardbtnlink:"/sales/salesteams",
                savebtnlink:"",
                modalcreatebtnlink:"/sales/salesteams"
            },
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
    computed: {
        fullname: function () {
            return this.first + " " + this.last;
        }
    },
    methods: {
        select_value: function (del) {
            var self = this;
            self.$http.post("/sales/team_leader_id_table", {"id": del}).then(function(res){
                var parentdata = res.body.result;
                for(var i = 0 ; i < parentdata.length; i++ ) {
                    parentdata[i].forEach(function (val) {
                        self.username_p.push(val);
                    });
                }
            },function(err){
            });
            // del.length = 0;s
        },
        select2: function () {
            var self = this;

            self.$http.post("/sales/sales_team_modal_outside", {
                "id": self.$route.params.id,
            }).then(function(res){
                var parentdata = res.body.data[0];




            },function(err){
                alert(err);
            });



        },
        update: function (del) {
            var self = this;

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
        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/domain_alias", {
                "id": self.$route.params.id,
            }).then(function(res){
                var parentdata = res.body.result[0];
                self.alias_domain = parentdata.alias_domain;
            },function(err){
            });

            self.$http.post("/sales/team_leader", {"leader_name": self.username}).then(function(res){self.team_leader_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/sales_team_modal_outside", {"us_name": self.name}).then(function(res){self.us_name_p =res.body.data;},function(err){
                //alert(err);
            });
        },
        submit: function (del) {
            var self = this;
            alert(self.sales_team_opportunities+""+ self.sales_team_invoices+""+ self.sales_team_quotation);
            //var ckeditor_value = CKEDITOR.instances.editor1.getData();
            // alert(self.sales_team_quotation);
            self.$http.post("/sales/sales_team", {
                "email": self.alias_email,
                "name": self.name_field,
                "team_lead": self.team_lead_id,
                "team_quotation": self.sales_team_quotation,
                "team_invoices": self.sales_team_invoices,
                "team_opportunities": self.sales_team_opportunities,
                "lp_value": del,

            }).then(function(res){
            },function(err){
            });
        },
        submit2: function () {
            var self = this;
            //var ckeditor_value = CKEDITOR.instances.editor1.getData();
            // alert(self.sales_team_quotation);
            self.$http.post("/sales/sales_team_team", {

                "team_lead": self.team_lead_id,


            }).then(function(res){
            },function(err){
            });
        },
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    // eslint-disable-next-line
                    alert('From Submitted!');
                    return;
                }
                e.preventDefault();
                alert('Correct them errors!');
            });
        }

    },


    components: {
        DashboardController,
        TableMain,
        Modal
    }
}
