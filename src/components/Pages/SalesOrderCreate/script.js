import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"
import Modal from "./../../partials/Modal/Modal.vue"

export default{
    created: function () {
        var self = this;
        self.select();
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
            $(".txt_sum").each(function() {
                $(this).keyup(function(){
                    calculateSum();
                });
            });
            function calculateSum() {
                var sum = 0;
                $(".txt_sum").each(function() {
                    if(!isNaN(this.value) && this.value.length!=0) {
                        sum += parseFloat(this.value);
                    }
                });
                $(".sum").html(sum.toFixed(2));
            }
            // document.getElementsByClassName("del").addEventListener("click", function(e) {
            //
            //     var ch = e.target;
            //     while (ch && !ch.className.match(/\bch\b/)) {
            //         ch = ch.parentNode;
            //     }
            //     if (ch) {
            //         ch.parentNode.removeChild(ch);
            //     }
            // }, false);

            //$(".topm").hide();
            $(".adds").click(function () {
                $(".topm").show();
            });
            $(".trash1").click(function () {
                $(".topm").remove();
            });
            $('#save').click(function () {
                var r = confirm("Are you sure create quotation");
                if (r) {
                    // x="You pressed OK!";
                    console.log("Create Quotation");
                    // window.location.href = "../sales/quotation/";
                    self.submit();
                    if (self.status == "Cancelled") {
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
                    } else if (self.status == "SalesOrder") {
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
                    } else if (self.status == "Quotation") {
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
                    } else if (self.status == "QuotationSent") {
                        $("#sales_order_j").removeClass('active');
                        $("#quotation_j").removeClass('active');
                        $("#quotation_sent_j").addClass('active');
                        $("#cancelled_j").removeClass('active');
                        $("#locked_j").removeClass('active');
                    } else if (self.status == "Locked") {
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
                    } else {
                        $("#quotation_j").removeClass('active');
                        $("#quotation_sent_j").removeClass('active');
                        $("#sales_order_j").removeClass('active');
                        $("#cancelled_j").removeClass('active');
                    }
                }

            });
            $("#btn1").click(function(){

                $(".extraa").append(

                );
                var deleteLink = document.querySelectorAll('.trash1');
                for (var i = 0; i < deleteLink.length; i++) {
                    deleteLink[i].addEventListener('click', function(event) {
                        alert("sdas");
                        $(".trash1").parent().parent().parent().remove();
                    });
                }

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
            }).on('changeDate',showTestDate);
            function showTestDate() {
                var value = $('#datepicker').datepicker('getFormattedDate');
                self.dates_value = value;
                var value1 = $('#datepicker1').datepicker('getFormattedDate');
                self.dates_value1 = value1;
                //console.log(value);
            };
        });
    },
    data(){
        return {
            counter : 1,
            el: '.tablemain',
            links: [{
                textName: '',
            }],

            quotation: "Quotations / SO014",
            salesperson: "Open: Salesperson",
            btnlinks: {
                savebtnlink:"",
                discardbtnlink:"/sales/quotation"
            },
            title: 'Discuss',
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
            name_product_n: '',
            name_product: '',
            pro_description: '',
            pro_qty: '',
            pro_unitprice: '',
            pro_taxes: '',
            pro_subtotal: '',
            pro_names:'',
            status:'',

            // form data submit
            pricelist_id: "1",
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
            untaxed_amount_get: "2",
            taxed_get: "2",
            total_get: "2",
            customer_name_get1: "",
            v: true,
            v1: false,
        };
    },
    methods: {
        remove (index) {
            // this.todos.splice(index, 1)
            this.$delete(this.links, index)
        },
        tabLinks(textName) {
            this.links.push({
                textName: textName
            })
        },
        select_product: function () {
            var self = this;
            self.$http.post("/sales/sales_products_data", {
                "customer_name_get1": self.customer_name_get1,
            }).then(function(res){
                var parentdata1 = res.body.result[0];
                self.pro_names = parentdata1.name;
                self.pro_qty = "01.00";
                self.pro_unitprice = "00.00";
                console.log(parentdata1);
            },function(err){
                alert(err);
            });
        },
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
            self.$http.post("/sales/sales_product_all", {"name_product": self.name}).then(function(res){self.name_product_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/sales_product_order_line", {"alias_id": self.alias_id}).then(function (res) {
                //console.log(res.body);
                var parentdata = res.body.result[0];
                self.description = parentdata.description;
                self.product_name = parentdata.name;
                self.ordered_quantity = parentdata.ordered_quantity;
                self.unit_price = parentdata.unit_price;
                self.subtotal = parentdata.subtotal;
                self.id = parentdata.id;
                self.taxes_id = parentdata.taxes_id;
                self.amount = parentdata.amount;
            }, function (err) {
                //alert(err);
            });
            self.$http.post("/sales/sales_view", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                console.log("asdasdasdeas",parentdata);
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

            }, function (err) {
                // alert(err);
            });
        },
        submit: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/sales/sales_quotation_create", {
                "customer_name_get": self.customer_name_get,
                "payment_term_get": self.payment_term_get,
                "untaxed_amount_get": self.untaxed_amount_get,
                "taxed_get": self.taxed_get,
                "total_get": self.total_get,
                "order_date": self.dates_value,
                "expirition_date": self.dates_value1,
                "setup_default_get": self.setup_default_get,
                "Incoterms_get": self.Incoterms_get,
                "shipping_policy_get": self.shipping_policy_get,
                "tags_get": self.tags_get,
                "sales_team_get": self.sales_team_get,
                "customer_ref_get": self.customer_ref_get,
                "fiscal_pos_get": self.fiscal_pos_get,
                "pricelist_id": self.pricelist_id,
                "salesperson_get": self.salesperson_get,
                "customer_name_get1": self.customer_name_get1,
                "pro_description": self.pro_description,
                "pro_qty": self.pro_qty,
                "pro_unitprice": self.pro_unitprice,
                "pro_taxes": self.pro_taxes,
                "pro_subtotal": self.pro_subtotal,
                "pro_names": self.pro_names,

            }).then(function(res){
                if (res){
                    self.select();
                }
                console.log(res.body);
            },function(err){
                alert(err);
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
        Modal,
    }
}
