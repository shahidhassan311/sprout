import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
// import Request_Quotation_Lower from "./../../partials/Request_Quotation_Lower/Request_Quotation_Lower.vue"
import Request_Quotation_Lower from "./../../partials/Request_quotation_lower/Request_quotation_lower.vue"
import Topcontroller from "./../../partials/Topcontroller/Topcontroller.vue"
import Modal from "./../../partials/Modal/Modal.vue"
import Message from "./../../partials/Message/Message.vue"

export default{
    created: function () {
        var self = this;
        self.select();
        $(function(){
            $("#delete").click(function () {
                self.form_delete();
                alert("are you sure delete the user");
                window.location.href = "../nextactivities";
            });
            $("#num01").click(function () {
                self.nextsubmit();
                self.select();
            });
            $("#num10").click(function () {
                self.backsubmit();
            });
            $(function() {
                var links = $('a.link').click(function() {
                    links.removeClass('active');
                    $(this).addClass('active');
                });
            });
            self.btnlinks.editbtnlink = "/sales/salesnextactivityedit/"+self.$route.params.id;
            self.btnlinks.duplicatebtnlink = "/sales/salesnextactivityduplicate/"+self.$route.params.id;
        });

    },
    props: [
        "edit",

    ],
    data () {
        return {
            nextactivity: "Next ActivitiesNeed / to customize the solution",
            modal: "Log an Activity",
            btnlinks: {
                createbtnlink: "/sales/salesnextactivitiescreate",
                discardbtnlink: "/sales/customers",
                importbtnlink: "/sales/imported",
                editbtnlink: "",
                deletebtnlink: "",
                duplicatebtnlink: ""
            },
            opp_title: '',
            pipeline_name_drop: '',
            pipeline_name: 9,

        }
    },
    methods: {
        select2: function (id) {
            var self = this
            self.pipeline_name=id;
            alert(self.pipeline_name);


        },
        nextsubmit: function () {
            var self = this;
            self.$http.post("/sales/sales_next_activity_view_next", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                self.$route.params.id = parentdata.id;
                self.opp_title = parentdata.opportunity_title;
                self.cus_email = parentdata.email;
                self.exp_rev = parentdata.expected_revenue;
                self.rate = parentdata.rating;
                self.prob = parentdata.probability;
                self.phone_num = parentdata.phone;
                self.next_act = parentdata.next_activity;
                self.next_act_date = parentdata.next_activity_date;
                self.next_act_desc = parentdata.next_activity_description;
                self.expect_close_date = parentdata.expected_closing_date;
                self.sale_team_name = parentdata.sales_team;
                self.int_note = parentdata.internal_notes;
                self.cust_name = parentdata.customer_name;
                self.steet_one = parentdata.street_one;
                self.street_two = parentdata.street_two;
                self.city_name = parentdata.city;
                self.state_name = parentdata.state;
                self.zip_num = parentdata.zip;
                self.cont_name = parentdata.contact_name;
                self.job_position = parentdata.job_position;
                self.mobile_num = parentdata.mobile;
                self.fax_num = parentdata.fax;
                self.ref_by = parentdata.referred_by;
                self.sales_person = parentdata.is_sales_person;
                self.pipeline_name = parentdata.pipe_name;
                self.sour_name = parentdata.source_name;
                self.campain_name = parentdata.camp_name;
                self.med_name = parentdata.medium_name;
                self.title_name = parentdata.tittle;
                self.country_name = parentdata.country_name;
                self.customer_name_name = parentdata.name;
                console.log(parentdata);
                // console.log(res.body)
                //console.log(this.$route.query.id);

            }, function (err) {

            });




        },
        backsubmit: function () {
            var self = this;
            self.$http.post("/sales/sales_next_activity_view_back", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                self.$route.params.id = parentdata.id;
                self.opp_title = parentdata.opportunity_title;
                self.cus_email = parentdata.email;
                self.exp_rev = parentdata.expected_revenue;
                self.rate = parentdata.rating;
                self.prob = parentdata.probability;
                self.phone_num = parentdata.phone;
                self.next_act = parentdata.next_activity;
                self.next_act_date = parentdata.next_activity_date;
                self.next_act_desc = parentdata.next_activity_description;
                self.expect_close_date = parentdata.expected_closing_date;
                self.sale_team_name = parentdata.sales_team;
                self.int_note = parentdata.internal_notes;
                self.cust_name = parentdata.customer_name;
                self.steet_one = parentdata.street_one;
                self.street_two = parentdata.street_two;
                self.city_name = parentdata.city;
                self.state_name = parentdata.state;
                self.zip_num = parentdata.zip;
                self.cont_name = parentdata.contact_name;
                self.job_position = parentdata.job_position;
                self.mobile_num = parentdata.mobile;
                self.fax_num = parentdata.fax;
                self.ref_by = parentdata.referred_by;
                self.sales_person = parentdata.is_sales_person;
                self.pipeline_name = parentdata.pipe_name;
                self.sour_name = parentdata.source_name;
                self.campain_name = parentdata.camp_name;
                self.med_name = parentdata.medium_name;
                self.title_name = parentdata.tittle;
                self.country_name = parentdata.country_name;
                self.customer_name_name = parentdata.name;
                console.log(parentdata);
                // console.log(res.body)
                //console.log(this.$route.query.id);

            }, function (err) {

            });
        },
        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/sales_next_activity_view", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                self.opp_title = parentdata.opportunity_title;
                self.cus_email = parentdata.email;
                self.exp_rev = parentdata.expected_revenue;
                self.rate = parentdata.rating;
                self.prob = parentdata.probability;
                self.phone_num = parentdata.phone;
                self.next_act = parentdata.next_activity;
                self.next_act_date = parentdata.next_activity_date;
                self.next_act_desc = parentdata.next_activity_description;
                self.expect_close_date = parentdata.expected_closing_date;
                self.sale_team_name = parentdata.sales_team;
                self.int_note = parentdata.internal_notes;
                self.cust_name = parentdata.customer_name;
                self.steet_one = parentdata.street_one;
                self.street_two = parentdata.street_two;
                self.city_name = parentdata.city;
                self.state_name = parentdata.state;
                self.zip_num = parentdata.zip;
                self.cont_name = parentdata.contact_name;
                self.job_position = parentdata.job_position;
                self.mobile_num = parentdata.mobile;
                self.fax_num = parentdata.fax;
                self.ref_by = parentdata.referred_by;
                self.sales_person = parentdata.is_sales_person;
                self.pipeline_name = parentdata.pipe_name;
                self.sour_name = parentdata.source_name;
                self.campain_name = parentdata.camp_name;
                self.med_name = parentdata.medium_name;
                self.title_name = parentdata.tittle;
                self.country_name = parentdata.country_name;
                self.customer_name_name = parentdata.name;
                self.pipeline_name = parentdata.pipeline_name;
                console.log(parentdata)




            }, function (err) {
                // alert(err);
            });

            self.$http.post("/sales/saleactivitycreatetopbar", {"pipeline_na": self.name}).then(function(res){self.pipeline_name_drop =res.body.result;},function(err){
            });

        },
        form_delete: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/sales/delete_next_activities_form_delete", {"id": self.$route.params.id }).then(function(res){
                console.log(res.body);
            },function(err){
                //alert(err);
            });
        },

    },
    components: {
        DashboardController,
        Request_Quotation_Lower,
        Topcontroller,
        Modal,
        Message
    },


}