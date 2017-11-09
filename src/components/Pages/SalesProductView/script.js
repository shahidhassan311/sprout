import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import SalesProductInner from "./../../partials/SalesProductInner/SalesProductInner.vue"
import SalesProductInnerEdit from "./../../partials/SalesProductInnerEdit/SalesProductInnerEdit.vue"
import Request_quotation_lower from "./../../partials/Request_quotation_lower/Request_quotation_lower.vue"
import ProductEdit from "./../../partials/ProductEdit/ProductEdit.vue"
import Message from "./../../partials/Message/Message.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue";

export default{
    created: function () {
        var self = this;
        self.select();
        $(function(){
            $('#ckbCheckAll1').attr('disabled', true);
            $('#num10').click(function () {
                self.pselect();
            });
            $('#num01').click(function () {
                self.nselect();
            });
            $('.checkBoxClass').attr('disabled', true);
            self.btnlinks.editbtnlink = "/sales/salesproductedit/"+self.$route.params.id;
        });
    },
    data(){
        return {
            quotation: "Products / [AT] Air Flight",
            modal: "Open: Salesperson",
            modal1: "Open: Sales Team",
            options: [],
            validity_start_loop: [],
            validity_end_loop: [],
            name: "",
            sold: "",
            counter: 1,
            purchase: "",
            expense: "",
            account_name: "",
            customer_taxes_name: "",
            expance_account_name: "",
            vendor_taxes_name: "",
            price_diff_account_name: "",
            invoicing_policy: "",
            re_invoice_expenses: "",
            customer_lead_time: "",
            manufacturing_lead_time: "",
            category_name: "",
            scale_weight: "",
            avaliablity_in_pos: "",
            quotation_description: "",
            vendors_description: "",
            pickings_description: "",
            pos_category_id: "",
            manufacture: "",
            volume: "",
            weight: "",
            buy: "",
            make_to_order: "",
            product_category_name: "",
            bill_type: "",
            cost: "",
            sale_price: "",
            barcode: "",
            internal_reference: "",
            product_name: "",
            // tabledata
            vendor_product_name: "",
            vendor_product_code: "",
            delivery_lead_time: "",
            minimal_quantity: "",
            price: "",
            validity_start: "",
            validity_end: "",
            v: true,
            v1: false,
            btnlinks: {
                createbtnlink:"/sales/salesproductcreate",
                editbtnlink:"",
                firstbtnlink:"/sales/products",
                secondbtnlink:"/sales/salesproductlistview"
            },
            tableheader: [
                "Vendor",
                "Minimal Quantity",
                "Price",
                "Start Date",
                "End Date",
            ],
            tablefoot: [
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
                    "url": "/recruitment/ReqDep"


                },

            },
        }
    },
    methods: {
        pselect: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/product_pagination_next", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                console.log(parentdata);
                self.name = parentdata.name;
                self.sold = parentdata.sold.data[0];
                self.purchase = parentdata.purchase.data[0];
                self.expense = parentdata.expense.data[0];
                self.account_name = parentdata.account_name;
                self.customer_taxes_name = parentdata.customer_taxes_name;
                self.expance_account_name = parentdata.expance_account_name;
                self.vendor_taxes_name = parentdata.vendor_taxes_name;
                self.price_diff_account_name = parentdata.price_difference_account_name;
                self.invoicing_policy = parentdata.invoicing_policy;
                self.re_invoice_expenses = parentdata.re_invoice_expenses;
                self.customer_lead_time = parentdata.customer_lead_time;
                self.manufacturing_lead_time = parentdata.manufacturing_lead_time;
                self.quotation_description = parentdata.quotation_description;
                self.vendors_description = parentdata.vendors_description;
                self.pickings_description = parentdata.pickings_description;
                self.avaliablity_in_pos = parentdata.avaliablity_in_pos;
                self.pos_category_id = parentdata.pos_category_id;
                self.scale_weight = parentdata.scale_weight.data[0];
                self.manufacture = parentdata.manufacture;
                self.buy = parentdata.buy;
                self.make_to_order = parentdata.make_to_order;
                self.volume = parentdata.volume;
                self.weight = parentdata.weight;
                self.product_category_name = parentdata.product_category_name;
                self.bill_type = parentdata.bill_type;
                self.cost = parentdata.cost;
                self.sale_price = parentdata.sale_price;
                self.barcode = parentdata.barcode;
                self.internal_reference = parentdata.internal_reference;
                self.product_name = parentdata.product_name;
                self.$route.params.id = parentdata.id;
                console.log("internal_reference",parentdata);


            }, function (err) {
                // alert(err);
            });
        },
        nselect: function () {
            var self = this;
            self.$http.post("/sales/product_pagination_previous", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                self.name = parentdata.name;
                self.sold = parentdata.sold.data[0];
                self.purchase = parentdata.purchase.data[0];
                self.expense = parentdata.expense.data[0];
                self.account_name = parentdata.account_name;
                self.customer_taxes_name = parentdata.customer_taxes_name;
                self.expance_account_name = parentdata.expance_account_name;
                self.vendor_taxes_name = parentdata.vendor_taxes_name;
                self.price_diff_account_name = parentdata.price_difference_account_name;
                self.invoicing_policy = parentdata.invoicing_policy;
                self.re_invoice_expenses = parentdata.re_invoice_expenses;
                self.customer_lead_time = parentdata.customer_lead_time;
                self.manufacturing_lead_time = parentdata.manufacturing_lead_time;
                self.quotation_description = parentdata.quotation_description;
                self.vendors_description = parentdata.vendors_description;
                self.pickings_description = parentdata.pickings_description;
                self.avaliablity_in_pos = parentdata.avaliablity_in_pos;
                self.pos_category_id = parentdata.pos_category_id;
                self.scale_weight = parentdata.scale_weight.data[0];
                self.manufacture = parentdata.manufacture;
                self.buy = parentdata.buy;
                self.make_to_order = parentdata.make_to_order;
                self.volume = parentdata.volume;
                self.weight = parentdata.weight;
                self.product_category_name = parentdata.product_category_name;
                self.bill_type = parentdata.bill_type;
                self.cost = parentdata.cost;
                self.sale_price = parentdata.sale_price;
                self.barcode = parentdata.barcode;
                self.internal_reference = parentdata.internal_reference;
                self.product_name = parentdata.product_name;
                self.$route.params.id = parentdata.id;

                console.log("internal_reference",parentdata);


            }, function (err) {
                // alert(err);
            });

            // self.$http.post("/sales/show_product_table_view_2", {"id": self.$route.params.id}).then(function (res) {
            //
            //     self.options= res.body.result;
            //     self.options.forEach(function (lop) {
            //         var date = new Date(lop.validity_start);
            //         var new_date = date.getMonth()+'/'+date.getDate()+'/'+date.getYear();
            //         self.validity_start_loop.push(new_date);
            //         self.$route.params.id = parentdata.id;
            //         // console.log(self.validity_start_loop);
            //
            //         var date1 = new Date(lop.validity_end);
            //         var new_date1 = date1.getMonth()+'/'+date1.getDate()+'/'+date1.getYear();
            //         self.validity_end_loop.push(new_date1);
            //     });
            //
            //     //console.log(self.options);
            //
            //
            //
            // }, function (err) {
            //     // alert(err);
            // });
        },
        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/show_product_view", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                console.log(parentdata);
                self.name = parentdata.name;
                self.sold = parentdata.sold.data[0];
                self.purchase = parentdata.purchase.data[0];
                self.expense = parentdata.expense.data[0];
                self.account_name = parentdata.account_name;
                self.customer_taxes_name = parentdata.customer_taxes_name;
                self.expance_account_name = parentdata.expance_account_name;
                self.vendor_taxes_name = parentdata.vendor_taxes_name;
                self.price_diff_account_name = parentdata.price_difference_account_name;
                self.invoicing_policy = parentdata.invoicing_policy;
                self.re_invoice_expenses = parentdata.re_invoice_expenses;
                self.customer_lead_time = parentdata.customer_lead_time;
                self.manufacturing_lead_time = parentdata.manufacturing_lead_time;
                self.quotation_description = parentdata.quotation_description;
                self.vendors_description = parentdata.vendors_description;
                self.pickings_description = parentdata.pickings_description;
                self.avaliablity_in_pos = parentdata.avaliablity_in_pos;
                self.pos_category_id = parentdata.pos_category_id;
                self.scale_weight = parentdata.scale_weight.data[0];
                self.manufacture = parentdata.manufacture;
                self.buy = parentdata.buy;
                self.make_to_order = parentdata.make_to_order;
                self.volume = parentdata.volume;
                self.weight = parentdata.weight;
                self.product_category_name = parentdata.product_category_name;
                self.bill_type = parentdata.bill_type;
                self.cost = parentdata.cost;
                self.sale_price = parentdata.sale_price;
                self.barcode = parentdata.barcode;
                self.internal_reference = parentdata.internal_reference;
                self.product_name = parentdata.product_name;


                self.$http.post("/sales/show_product_view_1", {"id": self.pos_category_id}).then(function (res) {
                    var parentdata1 = res.body.result[0];
                    self.category_name = parentdata1.category_name;


                }, function (err) {
                     alert(err);
                });
            }, function (err) {
                // alert(err);
            });
            self.$http.post("/sales/show_product_table_view_2", {"id": self.$route.params.id}).then(function (res) {

                self.options= res.body.result;
                self.options.forEach(function (lop) {
                    var date = new Date(lop.validity_start);
                    var new_date = date.getMonth()+'/'+date.getDate()+'/'+date.getYear();
                    self.validity_start_loop.push(new_date);
                    // console.log(self.validity_start_loop);

                    var date1 = new Date(lop.validity_end);
                    var new_date1 = date1.getMonth()+'/'+date1.getDate()+'/'+date1.getYear();
                    self.validity_end_loop.push(new_date1);

                });

                //console.log(self.options);



            }, function (err) {
                // alert(err);
            });
        },
    },
    components: {
        DashboardController,
        SalesProductInner,
        SalesProductInnerEdit,
        ProductEdit,
        Request_quotation_lower,
        Message,
        TableMain
    }
}
