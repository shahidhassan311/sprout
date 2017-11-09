import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import SalesProductInner from "./../../partials/SalesProductInner/SalesProductInner.vue"
import SalesProductInnerEdit from "./../../partials/SalesProductInnerEdit/SalesProductInnerEdit.vue"
import Request_quotation_lower from "./../../partials/Request_quotation_lower/Request_quotation_lower.vue"
import ProductEdit from "./../../partials/ProductEdit/ProductEdit.vue"
import Modal from "./../../partials/Modal/Modal.vue"
export default{
    created: function () {
        var self = this;
        self.$watch('product_name', function (val, oldVal) {
            self.product_type_options_n.forEach(function (row) {
                if(row.name === val){
                    self.product_name_k = row.id;
                }
            });
        });
        self.$watch('product_category_name', function (val1, oldVal) {
            self.product_category.forEach(function (row1) {
                if(row1.name === val1){
                    self.product_category_get = row1.id;
                }
            });

        });
        self.$watch('category_name', function (val2, oldVal) {
            self.pos_category_name_n.forEach(function (row2) {
                if(row2.category_name === val2){
                    self.pos_category_get = row2.id;
                }
            });
        });
        self.$watch('account_name', function (val3, oldVal) {
            self.account_name_n.forEach(function (row3) {
                if(row3.name === val3){
                    self.income_account_get = row3.id;
                }
            });

        });
        self.$watch('customer_taxes_name', function (val4, oldVal) {
            self.taxes_name_n.forEach(function (row4) {
                if(row4.name === val4){
                    self.customer_taxes_get = row4.id;
                }
            });

        });
        self.$watch('expance_account_name', function (val5, oldVal) {
            console.log("asdasdasdasdas", self.account_name_n);
            self.account_name_n.forEach(function (row5) {
                if (row5.name === val5) {
                    self.expanece_account_get = row5.id;
                }
            });

        });
        self.$watch('vendor_taxes_name', function (val6, oldVal) {
            self.taxes_name_n.forEach(function (row6) {
                if (row6.name === val6) {
                    self.vendor_taxes_get = row6.id;
                }
            });

        });
        self.$watch('price_diff_account_name', function (val7, oldVal) {
            self.account_name_n.forEach(function (row7) {
                if (row7.name === val7) {
                    self.price_diff_account_get = row7.id;
                }
            });

        });
        self.select();
        $(function(){
            $('#ckbCheckAll1').attr('disabled', true);
            $('.checkBoxClass').attr('disabled', true);
            $("#save").click(function () {
                var r = confirm("Are you sure update product");
                if (r) {
                    // window.location.href = "../salesproductview/"+self.$route.params.id;
                    self.update();
                } else
                {
                    // x="You pressed Cancel!";
                }
            });
            $('#saveclose').click(function () {
                self.vendor();
            });
            $('#discard').click(function () {
                self.select1();
                alert('asdf')
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

            self.btnlinks.discardbtnlink = "/sales/salesproductview/"+self.$route.params.id;

        });

    },
    data(){
        return {
            counter : 1,
            el: '.tablemain',
            links: [{
                textName: '',
            }],
            quotation: "Products / [AT] Air Flight",
            modal: "Open: Salesperson",
            modal1: "Open: Sales Team",
            validity_start_loop: [],
            validity_end_loop: [],
            name: "",
            sold: "",
            purchase: "",
            expense: "",
            product_name_k: "",
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
            pro_id: "",
            income_account_get: "",
            price_diff_account_get: "",
            product_category_get: "",
            pos_category_get: "",
            // tabledata
            vendor_product_name: "",
            vendor_product_code: "",
            delivery_lead_time: "",
            minimal_quantity: "",
            price: "",
            validity_start: "",
            validity_end: "",
            options: "",
            product_type_options_n: "",
            product_category: "",
            pos_category_name_n: "",
            account_name_n: "",
            taxes_name_n: "",
            vendor_name_n: "",
            product_type_name: "",
            customer_taxes_get: "",
            expanece_account_get: "",
            vendor_taxes_get: "",
            pickings_description: "",
            vendors_description: "",
            quotation_description: "",
            //modal
            vendor_get: '',
            vendor_product_name_get: '',
            vendor_product_code_get: '',
            delivery_lead_time_get: '',
            minimal_quantity_get: '',
            price_get: '',
            product_id: 0,

            v: true,
            v1: false,
            btnlinks: {
                createbtnlink:"/sales/salesproductcreate",
                discardbtnlink:"",
                savebtnlink:""
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
        remove (index) {
            // this.todos.splice(index, 1)
            this.$delete(this.vendor_product_name_n, index)
        },
        tabLinks(textName) {
            this.links.push({
                textName: textName
            })
        },
        select1: function () {
            var self = this;
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
        vendor: function () {
            //alert("adasdsadsad");
            var self = this;
            //var ckeditor_value = CKEDITOR.instances.editor1.getData();
            alert("asdas");
            self.$http.post("/sales/vendor_product_update", {
                 "id": self.$route.params.id,
                "vendor_get": self.vendor_get,
                "vendor_product_name_get": self.vendor_product_name_get,
                "vendor_product_code_get": self.vendor_product_code_get,
                "delivery_lead_time_get": self.delivery_lead_time_get,
                "minimal_quantity_get": self.minimal_quantity_get,
                "price_get": self.price_get,
                "validate": self.dates_value,
                "to": self.dates_value1,

            }).then(function(res){
                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
        select: function () {

            var self = this;
            self.$http.post("/sales/select_all_product_type", {"product_type_name": self.name}).then(function(res){self.product_type_options_n =res.body.result; console.log(res) },function(err){
                //alert(err);
            });
            self.$http.post("/sales/select_all_product_category", {"pro_name": self.name}).then(function(res){self.product_category =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/select_all_pos_category", {"pos_category_name": self.category_name}).then(function(res){self.pos_category_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/select_all_account", {"account_name": self.name}).then(function(res){self.account_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/select_all_taxes", {"taxes_name": self.name}).then(function(res){self.taxes_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/select_all_vendor", {"vendor_name_n": self.vendor_product_name}).then(function(res){self.vendor_name_n =res.body.result;},function(err){
                //alert(err);
            });
            //alert(self.companyName);
            self.$http.post("/sales/show_product_view", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                console.log("parentdata",parentdata);
                self.pro_id = parentdata.id;
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
        update: function () {
            var self = this;
            self.$http.post("/sales/show_product_view", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                console.log("parentdata",parentdata);
                self.description_quotation_id = parentdata.description_quotation_id;
                self.description_vendors_id = parentdata.description_vendors_id;
                self.description_pickings_id = parentdata.description_pickings_id;


                self.$http.post("/sales/sales_product_update", {
                    "id": self.pro_id,
                    "name" : self.name,
                    "sold" : self.sold,
                    "purchase" : self.purchase,
                    "expense" : self.expense,
                    "account_name" : self.account_name,
                    "product_name_k" : self.product_name_k,
                    "customer_taxes_name" : self.customer_taxes_name,
                    "expance_account_name" : self.expance_account_name,
                    "vendor_taxes_name" : self.vendor_taxes_name,
                    "price_diff_account_name" : self.price_difference_account_name,
                    "invoicing_policy" : self.invoicing_policy,
                    "re_invoice_expenses" : self.re_invoice_expenses,
                    "customer_lead_time" : self.customer_lead_time,
                    "manufacturing_lead_time" : self.manufacturing_lead_time,
                    "avaliablity_in_pos" : self.avaliablity_in_pos,
                    "pos_category_id" : self.pos_category_id,
                    "scale_weight" : self.scale_weight,
                    "manufacture" : self.manufacture,
                    "buy" : self.buy,
                    "make_to_order" : self.make_to_order,
                    "volume" : self.volume,
                    "weight" : self.weight,
                    "product_category_name" : self.product_category_name,
                    "bill_type" : self.bill_type,
                    "cost" : self.cost,
                    "sale_price" : self.sale_price,
                    "barcode" : self.barcode,
                    "internal_reference" : self.internal_reference,
                    "product_name" : self.product_name,
                    "income_account_get" : self.income_account_get,
                    "price_diff_account_get" : self.price_diff_account_get,
                    "product_category_get" : self.product_category_get,
                    "pos_category_get" : self.pos_category_get,
                    "customer_taxes_get" : self.customer_taxes_get,
                    "expanece_account_get" : self.expanece_account_get,
                    "vendor_taxes_get" : self.vendor_taxes_get,
                    "description_quotation_id" : self.description_quotation_id,
                    "description_vendors_id" : self.description_vendors_id,
                    "description_pickings_id" : self.description_pickings_id,
                    "pickings_description" : self.pickings_description,
                    "vendors_description" : self.vendors_description,
                    "quotation_description" : self.quotation_description,


                }).then(function(res){
                    console.log(self.product_name_k+"");
                },function(err){
                    alert(err);
                });

            }, function (err) {
                // alert(err);
            });




        },
        delete_product_vendors: function (id) {
            var self = this;
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
            self.$http.post("/sales/product_vendor_delete_from_product_edit", {"id": id}).then(function(res){
                alert("are you sure delete the user");
            },function(err){
                //alert(err);
            });
        },
    },




    components: {
        DashboardController,
        SalesProductInner,
        SalesProductInnerEdit,
        ProductEdit,
        Modal,
        Request_quotation_lower
    }
}
