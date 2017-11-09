import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"
import Message from "./../../partials/Message/Message.vue"
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
            var links = $('a.link').click(function(){
                links.removeClass('active');
                $(this).addClass('active');

            });
            // alert("asdsa");
            $("#delete").click(function () {
                self.delete_inside();
                alert("are you sure delete the customer");
                window.location.href = "../quotation";
            });
            $(function(){
                CKEDITOR.replace('editor1');
            });
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

            self.btnlinks.editbtnlink = "/sales/salesquotationedit/"+self.$route.params.id;
        });

    },
    data(){
        return {
            quotation: "Quotations / SO014",
            modal: "Open: Projects",
            modal1: "Sprout",
            modal2: "Invoice Order",
            btnlinks: {
                createbtnlink:"/sales/salesquotationcreate",
                editbtnlink:"",
                deletebtnlink: "",
                exportbtnlink: "",
                changepasswordbtnlink: "",
                changepasswordbtnlink_modal: "",
                savebtnlink: "",
                modalsavebtnlink: ""
            },
            id: "",
            username: "",
            name: "",
            total: "",
            status: "",
            expiration_date: "",
            order_date: "",
            untaxed_amount: "",
            taxes: "",
            terms_conditions: "",
            incoterms: "",
            shiping_policy: "",
            customer_reference: "",
            pricelist_name: "",
            payment_terms: "",
            fiscal_position_name: "",
            sales_team_name: "",
            status_send: "QuotationSent",
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
            self.$http.post("/sales/sales_view", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                console.log(parentdata);
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

            self.$http.post("/sales/sales_product_order_line", {
                "username": self.options,
            }).then(function(res){
                var data = res.body.result;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.name,
                                val.description,
                                val.subtotal,
                                val.ordered_quantity,
                                val.amount,
                                val.subtotal,
                            ],
                            "url": "/sales/salesquotationview/"+val.id,

                        });
                    });
                }
                //self.options =res.body.data;

            },function(err){
                //alert(err);
            });

        },
        delete_inside: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/sales/delete_sales_quotation_inside", {"id": self.$route.params.id }).then(function(res){
                console.log(res.body);
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
        Modal,
        Message
    }
}
