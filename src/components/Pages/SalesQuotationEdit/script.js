import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"
import Modal from "./../../partials/Modal/Modal.vue"
export default{
    created: function () {
        var self = this;
        self.select();
        self.$watch('customername', function (val16, oldVal) {
            self.options.forEach(function (row16) {
                if (row16.id  === val16) {
                    self.customer_name_get = row16.id;
                }
            });
        });
        self.$watch('payment_terms_id', function (val1, oldVal) {
            self.payment_n.forEach(function (row1) {
                if (row1.id  === val1) {
                    self.payment_term_get = row1.id;
                }
            });
        });
        self.$watch('sales_person_id', function (val1, oldVal) {
            self.user_name_n.forEach(function (row1) {
                if (row1.id  === val1) {
                    self.salesperson_get = row1.id;
                }
            });
        });
        self.$watch('sales_team_id', function (val1, oldVal) {
            self.salesteams_names_n.forEach(function (row1) {
                if (row1.id  === val1) {
                    self.sales_team_get = row1.id;
                }
            });
        });
        self.$watch('fiscal_position_id', function (val1, oldVal) {
            self.fiscial_name_n.forEach(function (row1) {
                if (row1.id  === val1) {
                    self.fiscal_pos_get = row1.id;
                }
            });
        });


        $(function(){
            if(self.status == "Cancelled"){
                $("#sales_order_j").removeClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#cancelled_j").addClass('active');
                $("#cancel").hide();
                $("#sendbyemail").hide();
                $("#print").hide();
                $("#create_invoice").hide();
                $("#confirmsales").hide();
                $("#settoquotation").show();
                $("#lock").hide();
                $("#cancelled_j").addClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#sales_order_j").removeClass('active');
                $("#locked_j").removeClass('active');
            }else if(self.status == "SalesOrder"){
                $("#sales_order_j").addClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#cancelled_j").removeClass('active');
                $("#confirmsales").hide();
                $("#sendbyemail").show();
                $("#cancel").show();
                $("#print").show();
                $("#create_invoice").hide();
                $("#create_invoice").show();
                $("#settoquotation").hide();
                $("#lock").show();
                $("#cancelled_j").removeClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#sales_order_j").addClass('active');
                $("#locked_j").removeClass('active');
            }else if(self.status == "Quotation"){
                $("#sales_order_j").removeClass('active');
                $("#quotation_j").addClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#cancelled_j").removeClass('active');
                $("#settoquotation").hide();
                $("#sendbyemail").show();
                $("#cancel").show();
                $("#print").show();
                $("#confirmsales").show();
                $("#settoquotation").hide();
                $("#cancelled_j").removeClass('active');
                $("#quotation_j").addClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#sales_order_j").removeClass('active');
                $("#locked_j").removeClass('active');
            }else if(self.status == "QuotationSent"){
                $("#sales_order_j").removeClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").addClass('active');
                $("#cancelled_j").removeClass('active');
                $("#locked_j").removeClass('active');
            }else if(self.status == "Locked"){
                $("#cancelled_j").removeClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#sales_order_j").removeClass('active');
                $("#locked_j").addClass('active');
                $("#locked_j").show();
                $("#sendbyemail").hide();
                $("#print").hide();
                $("#create_invoice").hide();
                $("#confirmsales").hide();
                $("#cancel").hide();
                $("#settoquotation").hide();
            }else{
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#sales_order_j").removeClass('active');
                $("#cancelled_j").removeClass('active');
            }

            $("#cancel").click(function () {
                $(this).hide();
                $("#sendbyemail").hide();
                $("#print").hide();
                $("#create_invoice").hide();
                $("#confirmsales").hide();
                $("#settoquotation").show();
                $("#lock").hide();
                $("#cancelled_j").addClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#sales_order_j").removeClass('active');
            });
            $("#settoquotation").click(function () {
                $(this).hide();
                $("#sendbyemail").show();
                $("#cancel").show();
                $("#print").show();
                $("#confirmsales").show();
                $("#settoquotation").hide();
                $("#cancelled_j").removeClass('active');
                $("#quotation_j").addClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#sales_order_j").removeClass('active');
            });
            $("#confirmsales").click(function () {
                $(this).hide();
                $("#sendbyemail").show();
                $("#cancel").show();
                $("#print").show();
                $("#create_invoice").hide();
                $("#create_invoice").show();
                $("#settoquotation").hide();
                $("#lock").show();
                $("#cancelled_j").removeClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#sales_order_j").addClass('active');
            });
            $(".savebtn").click(function () {
                $("#cancelled_j").removeClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").addClass('active');
                $("#sales_order_j").removeClass('active');
            });
            $("#lock").click(function () {
                $(this).hide();
                $("#locked_j").show();
                $("#sendbyemail").hide();
                $("#print").hide();
                $("#create_invoice").hide();
                $("#confirmsales").hide();
                $("#cancel").hide();
                $("#settoquotation").hide();
                $("#cancelled_j").removeClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#sales_order_j").removeClass('active');
                $("#locked_j").addClass('active');
            });
            $("#o_field_input_86").on('change',function(){
                var value = $(this).val();
                if(value=="Create and Edit"){
                    $(".bd-example-modal-lg1").modal('show');
                }
            });

            $("#save").click(function () {
               alert("insert");
               self.submit();
            });
            $('#datepicker').datepicker({
                format: "dd.mm.yyyy",
                todayBtn: "linked",
                language: "de",
                daysOfWeekDisabled: "0,6",
                daysOfWeekHighlighted: "4",
                todayHighlight: true,
            }).on('changeDate',showTestDate);
            $('#datepicker1').datepicker({
                format: "dd.mm.yyyy",
                todayBtn: "linked",
                language: "de",
                daysOfWeekDisabled: "0,6",
                daysOfWeekHighlighted: "4",
                todayHighlight: true,
            }).on('changeDate',second_date);
            function showTestDate() {
                var value = $('#datepicker').datepicker('getFormattedDate');
                self.dates_value = value;

                //console.log(value);
            };
            function second_date() {
                var value1 = $('#datepicker1').datepicker('getFormattedDate');
                self.dates_value1 = value1;
            }


            self.btnlinks.discardbtnlink = "/sales/salesquotationview/"+self.$route.params.id;
        });


    },
    data(){
        return {
            quotation: "Quotations / SO014",
            modal: "Open: Salesperson",
            modal1: "Open: Sales Team",
            btnlinks: {
                createbtnlink:"/sales/salesnextactivitiescreate",
                savebtnlink:"",
                discardbtnlink:"/",
                deletebtnlink: "",
                exportbtnlink: "",
                changepasswordbtnlink: "",
                changepasswordbtnlink_modal: "",
            },
            customer_name: '',
            name: '',
            options: '',
            dates_value: '',
            dates_value1: '',
            payment_terms: '',
            payment_n: '',
            incoterms_n: '',
            incotermss: '',
            user_names: '',
            user_name_n: '',
            tags_name_n: '',
            tags_names: '',
            fiscial_name_n: '',
            fiscial_names: '',
            salesteams_names: '',
            salesteams_names_n: '',
            salesproduct_names: '',
            salesproduct_names_n: '',
            terms_conditions: '',
            quotation_id: '',
            customername: '',
            order_date: '',
            order_ddate_get: '',
            expiration_date: '',
            expiration_date_get: '',
            payment_terms_id: '',
            sales_person_id: '',
            incoterms: '',
            sales_team_id: '',
            customer_reference: '',
            fiscal_position_id: '',
            leader_name_n: '',
            status: '',
            sales_pricelists_name_n: '',
            customer_id: '',

            // form data submit
            pricelist_id: "",
            customer_name_get: "",
            payment_term_get: "",
            setup_default_get: "",
            Incoterms_get: "",
            shipping_policy_get: "",
            salesperson_get: "",
            tags_get: "",
            sales_team_get: "",
            customer_ref_get: "",
            fiscal_pos_get: "",
            untaxed_amount_get: "",
            taxed_get: "",
            total_get: "",

            // modal value
            alias_email: "",
            name_field: "",
            team_lead_id: "",
            sales_team_quotation: "",
            sales_team_invoices: "",
            sales_team_opportunities: "",


            tableheader: [
                "Product",
                "Description",
                "Ordered Qty",
                "Unit Price",
                "Taxes",
                "Subtotal"

            ],
            tablefooter:[
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
                        "",
                        "",
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
            self.$http.post("/sales/customers_name", {"name": self.name}).then(function(res){self.options =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/payment_terms", {"payment_terms": self.payment_terms}).then(function(res){self.payment_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/users", {"user_names": self.username}).then(function(res){self.user_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/tags", {"tags_names": self.name}).then(function(res){self.tags_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/fiscial", {"fiscial_names": self.name}).then(function(res){self.fiscial_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/sales_team_id", {"salesteams_names": self.name}).then(function(res){self.salesteams_names_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/sales_product_name", {"salesproduct_names": self.name}).then(function(res){self.salesproduct_names_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/sales_quotations", {"incotermss": self.incoterms}).then(function(res){self.incoterms_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/selectuser", {"leader_name": self.username}).then(function(res){self.leader_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/sales_pricelists_all_data", {"sales_pricelists_name": self.name}).then(function(res){self.sales_pricelists_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/sales_view", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                var j_date = new Date(parentdata.expiration_date);
                self.id = parentdata.id;
                self.username = parentdata.username;
                self.name = parentdata.name;
                self.total = parentdata.total;
                self.order_date = parentdata.order_date;
                self.status = parentdata.status;
                self.expiration_date = j_date.getDate()+"-"+j_date.getMonth()+"-"+j_date.getFullYear();
                self.untaxed_amount = parentdata.untaxed_amount;
                self.taxes = parentdata.taxes;
                self.terms_conditions = parentdata.terms_conditions;
                self.incoterms = parentdata.incoterms;
                self.shiping_policy = parentdata.shiping_policy;
                self.customer_reference = parentdata.customer_reference;
                self.pricelist_name = parentdata.pricelist_name;
                self.payment_terms = parentdata.payment_terms;
                self.fiscal_position_name = parentdata.fiscal_position_name;
                self.sales_team_name = parentdata.sales_team_name;
                self.pricelist_id = parentdata.pricelist_id;
                self.customer_name_get = parentdata.customer_id;

            }, function (err) {
                // alert(err);
            });
            self.$http.post("/sales/sales_quotation_all_data", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                self.terms_conditions = parentdata.terms_conditions;
                self.quotation_id = parentdata.id;
                self.customername = parentdata.customer_id;
                self.payment_terms_id = parentdata.payment_terms_id;
                self.sales_person_id = parentdata.sales_person_id;
                self.Incoterms_get = parentdata.incoterms;
                self.shipping_policy_get = parentdata.shiping_policy;
                self.fiscal_position_id = parentdata.fiscal_position_id;
                self.sales_team_id = parentdata.sales_team_id;
                self.customer_ref_get = parentdata.customer_reference;
                self.status = parentdata.status;
                self.order_date = parentdata.order_date;
                var date = new Date(self.order_date);
                self.order_ddate_get = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
                self.expiration_date = parentdata.expiration_date;
                var date = new Date(self.expiration_date);
                self.expiration_date_get = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();



            }, function (err) {
                // alert(err);
            });

        },
        submit: function () {
            //alert("adasdsadsad");
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/sales/sales_quotaion_update", {
                "id": self.$route.params.id,
                "customer_name_get": self.customer_name_get,
                "payment_term_get": self.payment_term_get,
                "untaxed_amount_get": self.untaxed_amount_get,
                "taxed_get": self.taxed_get,
                "total_get": self.total_get,
                "order_date": self.dates_value,
                "expirition_date": self.dates_value1,
                "Incoterms_get": self.Incoterms_get,
                "shipping_policy_get": self.shipping_policy_get,
                "tags_get": self.tags_get,
                "sales_team_get": self.sales_team_get,
                "customer_ref_get": self.customer_ref_get,
                "fiscal_pos_get": self.fiscal_pos_get,
                "pricelist_id": self.pricelist_id,
                "salesperson_get": self.salesperson_get,
                "terms_conditions": self.terms_conditions,

            }).then(function(res){
                console.log(res.body);
            },function(err){
                alert(err);
            });
        },
        salesperson_trigger: function () {
          alert("sadas");
        },
        salesteam_trigger: function () {
            alert("sadas");
            var self = this;
            // alert(self.sales_team_quotation);
            self.$http.post("/sales/sales_team_modal_create", {
                "email": self.alias_email,
                "name": self.name_field,
                "team_lead": self.team_lead_id,
                "team_quotation": self.sales_team_quotation,
                "team_invoices": self.sales_team_invoices,
                "team_opportunities": self.sales_team_opportunities,

            }).then(function(res){
                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
        confirmsales: function (status) {
            var self = this;
            self.status = status;
            alert(self.status+ " ");
            self.$http.post("/sales/sales_quotaion_status_update", {
                "id": self.$route.params.id,
                "status": self.status,
            }).then(function(res){
                if(res){
                    self.select();
                }
            },function(err){
                //alert(err);
            });
        },
        cancelsales: function (status) {
            var self = this;
            self.status = status;
            alert(self.status+ " ");
            self.$http.post("/sales/sales_quotaion_status_update", {
                "id": self.$route.params.id,
                "status": self.status,
            }).then(function(res){
                if(res){
                    self.select();
                }
            },function(err){
                //alert(err);
            });
        },
        settoquotation: function (status) {
            var self = this;
            self.status = status;
            alert(self.status+ " ");
            self.$http.post("/sales/sales_quotaion_status_update", {
                "id": self.$route.params.id,
                "status": self.status,
            }).then(function(res){
                if(res){
                    self.select();
                }
            },function(err){
                //alert(err);
            });
        },
        locked: function (status) {
            var self = this;
            self.status = status;
            alert(self.status+ " ");
            self.$http.post("/sales/sales_quotaion_status_update", {
                "id": self.$route.params.id,
                "status": self.status,
            }).then(function(res){
                if(res){
                    self.select();
                }
            },function(err){
                //alert(err);
            });
        },
        sendbyemail_trigger: function () {
            var self = this;
            self.$http.post("/sales/sales_quotaion_status_update", {
                "id": self.$route.params.id,
                "status": self.status_send,
            }).then(function(res){
                if(res){
                    $(".bd-example-modal-lg").modal('hide');
                    self.select();
                }

            },function(err){
                //alert(err);
            });
            if(self.status == "Cancelled"){
                $("#sales_order_j").removeClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#cancelled_j").addClass('active');
            }else if(self.status == "SalesOrder"){
                $("#sales_order_j").addClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#cancelled_j").removeClass('active');
            }else if(self.status == "Quotation"){
                $("#sales_order_j").removeClass('active');
                $("#quotation_j").addClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#cancelled_j").removeClass('active');
            }else if(self.status == "QuotationSent"){
                $("#sales_order_j").removeClass('active');
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").addClass('active');
                $("#cancelled_j").removeClass('active');
            }else{
                $("#quotation_j").removeClass('active');
                $("#quotation_sent_j").removeClass('active');
                $("#sales_order_j").removeClass('active');
                $("#cancelled_j").removeClass('active');
            }
        },
        createviewinvoices_trigger: function () {
            alert("CreateandViewInvoices_trigger");

        },
        Createinvoices_trigger: function () {
            alert("Createinvoices_trigger");
        },


    },


    components: {
        DashboardController,
        TableMain,
        Modal
    }
}
