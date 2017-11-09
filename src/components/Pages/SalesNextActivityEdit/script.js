import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Tabledrag from "./../../partials/Tabledrag/Tabledrag.vue"
import Message from "./../../partials/Message/Message.vue"
import Modal from "./../../partials/Modal/Modal.vue"
import Request_Quotation_Lower from "./../../partials/Request_quotation_lower/Request_quotation_lower.vue"

export default{
    created: function () {
        var self = this;
        this.select();
        this.select5();
        $(function(){
            $("#inputhide").click(function(){
                $("#hidetr").toggle();
            });
            $("#save").click(function () {


                self.$validator.validateAll().then(result => {
                    if (!result) {
                        // validation failed.
                    }
                    self.submit();

                    window.location.href = "/sales/salesnextactivityview/"+self.$route.params.id;
                });
            });
            $('#submitSaveBtn').on("click",function(){

            });
            self.btnlinks.discardbtnlink = "/sales/salesnextactivityview/"+self.$route.params.id

        });

    },



    data () {
        return {
            activities: "Activities / Email",
            modal: "Open: Contacts",
            btnlinks: {
                createbtnlink:"/sales/newuser",
                importbtnlink:"/sales/imported",
                discardbtnlink:"",
                savebtnlink:""
            },
            opportunity_title_name:"",
            expected_revenue_num:"",
            probability_num:"",
            email_add:"",
            phone_num:"",
            next_activity_name:"",
            next_activity_date_date:"",
            next_activity_description_desc:"",
            expected_closing_date_date:"",
            sales_team_name:"",
            internal_notes_note:"",
            customer_name_name:"",
            street_one_num:"",
            street_two_num:"",
            city_name:"",
            state_name:"",
            zip_num:"",
            contact_name_name:"",
            job_position_name:"",
            mobile_num:"",
            fax_num:"",
            referred_by_name:"",
            sales_person_drop:"",
            customer_name_drop:"",
            salesteams_names_n:"",
            campaign_name_drop:"",
            tags_drop:"",
            medium_name_drop:"",
            source_name_drop:"",
            title_name_drop:"",
            state_name_drop:"",
            country_name_drop:"",
            product_name_drop:"",
            customer_name_id:"",
            tableheader: [
                "Pricelist Name",
                "Currency"

            ],
            tabledata: {
                "row": {
                    "data": [
                        "Public Pricelist",
                        "USD"
                    ],
                    "url": "/sales/salesactivityview"

                },
                "row1": {
                    "data": [
                        " Sales",
                        ""
                    ],
                    "url": "/sales/salesactivityview"

                },
                "row2": {
                    "data": [
                        " Sales",
                        ""

                    ],
                    "url": "/sales/salesactivityview"

                },

            }
        }
    },
    methods: {



        select5: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/contacts", {
                "current_company": self.current_company,
            }).then(function (res) {
                var parentdata = res.body.data[0];
                self.email = parentdata.email;
                self.phone = parentdata.phone_number;
                self.mobile_number = parentdata.mobile_number;
                self.fax_number = parentdata.fax_number;
                self.name = parentdata.name;
                self.street1 = parentdata.street1;
                self.street2 = parentdata.street2;
                self.city = parentdata.city;
                self.states = parentdata.states;
                self.zip = parentdata.zip;
                self.internal_reference_id = parentdata.internal_reference_id;
                self.country = parentdata.country;

            }, function (err) {
                alert(err);
            });
        },
        select: function () {
            var self = this;
            //alert(self.companyName);

            self.$http.post("/sales/sales_next_edit", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                self.opportunity_title_name = parentdata.opportunity_title;
                self.expected_revenue_num = parentdata.expected_revenue;
                self.probability_num = parentdata.probability;
                self.email_add = parentdata.email;
                self.phone_num = parentdata.phone;
                self.next_activity_name = parentdata.next_activity;
                self.next_activity_date_date = parentdata.next_activity_date;
                self.next_activity_description_desc = parentdata.next_activity_description;
                self.expected_closing_date_date = parentdata.expected_closing_date;
                self.sales_team_name = parentdata.sales_team;
                self.internal_notes_note = parentdata.internal_notes;
                self.customer_name_name = parentdata.customer_name;
                self.street_one_num = parentdata.street_one;
                self.street_two_num = parentdata.street_two;
                self.city_name = parentdata.city;
                self.state_name = parentdata.state;
                self.zip_num = parentdata.zip;
                self.contact_name_name = parentdata.contact_name;
                self.job_position_name = parentdata.job_position;
                self.mobile_num = parentdata.mobile;
                self.fax_num = parentdata.fax;
                self.referred_by_name = parentdata.referred_by;
                self.customer_name_id = parentdata.customer_id;

                console.log(parentdata);



            }, function (err) {
                // alert(err);
            });
            self.$http.post("/sales/saleactivitycreatetopbar", {"pipe_name": self.name}).then(function(res){self.pipeline_name_drop =res.body.result;},function(err){
                //alert(err);
            });

            self.$http.post("/sales/sales_team_id", {"salesteams_names": self.name}).then(function(res){self.salesteams_names_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/tags", {"tag_names": self.name}).then(function(res){self.tags_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/salesperson", {"sales_person": self.is_sales_person}).then(function(res){self.sales_person_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/custname", {"customer_name": self.name}).then(function(res){self.customer_name_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/campaign_name", {"camp_name": self.name}).then(function(res){self.campaign_name_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/medium_name", {"med_name": self.name}).then(function(res){self.medium_name_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/source_name", {"sourc_name": self.name}).then(function(res){self.source_name_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/title_name", {"tit_name": self.tittle}).then(function(res){self.title_name_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/state_name", {"stat_name": self.name}).then(function(res){self.state_name_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/country_name", {"count_name": self.country_name}).then(function(res){self.country_name_drop =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/product_name", {"pro_name": self.name}).then(function(res){self.product_name_drop =res.body.result;},function(err){
                //alert(err);
            });


        },
        submit: function () {
            var self = this;
            self.$http.post("/sales/sales_next_edit_update", {
                "id": self.$route.params.id ,
                "opportunity_title":self. opportunity_title_name,
                "expected_revenue":self. expected_revenue_num,
                "probability":self. probability_num,
                "email":self. email_add,
                "phone":self. phone_num,
                "next_activity":self. next_activity_name,
                "next_activity_date":self. next_activity_date_date,
                "next_activity_description":self. next_activity_description_desc,
                "expected_closing_date":self. expected_closing_date_date,
                "sales_team":self. sales_team_name,
                "internal_notes":self. internal_notes_note,
                "customer_name":self. customer_name_name,
                "street_one":self. street_one_num,
                "street_two":self. street_two_num,
                "city":self. city_name,
                "state":self. state_name,
                "zip":self. zip_num,
                "contact_name":self. contact_name_name,
                "job_position":self. job_position_name,
                "mobile":self. mobile_num,
                "fax":self. fax_num,
                "referred_by":self. referred_by_name,
                "customer_id":self. customer_name_id,
            }).then(function(res){
                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
    },


    components: {
        DashboardController,
        Tabledrag,
        Request_Quotation_Lower,
        Message,
        Modal
    }
}