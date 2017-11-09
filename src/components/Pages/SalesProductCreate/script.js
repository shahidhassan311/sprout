import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import ProductEdit from "./../../partials/ProductEdit/ProductEdit.vue"
import Modal from "./../../partials/Modal/Modal.vue"

export default{
    created: function () {
        var self = this;
        self.select();
        var last_id = [];
        document.title = this.title;
        self.$watch('modal_category_name', function (val, oldVal) {
            self.pos_category_name_n.forEach(function (row) {
                if (row.category_name === val) {
                    self.modal_pos_category_get = row.id;
                }
            });
        });
        self.$watch('price_difference_account_id', function (val1, oldVal) {
            self.account_name_n.forEach(function (row1) {
                if (row1.id === val1) {
                    self.price_diff_account_get = row1.id;
                }
            });
        });
        self.$watch('income_account_id', function (val2, oldVal) {
            self.account_name_n.forEach(function (row2) {
                if(row2.id === val2){
                    self.income_account_get = row2.id;
                }
            });

        });
        self.$watch('expense_account_id', function (val3, oldVal) {
            self.account_name_n.forEach(function (row3) {
                if (row3.id === val3) {
                    self.expanece_account_get = row3.id;
                }
            });

        });
        self.$watch('stock_input_account_id', function (val4, oldVal) {
            self.account_name_n.forEach(function (row4) {
                if (row4.id === val4) {
                    self.stock_input_account_get = row4.id;
                }
            });

        });
        self.$watch('stock_output_account_id', function (val5, oldVal) {
            self.account_name_n.forEach(function (row5) {
                if (row5.id === val5) {
                    self.stock_output_account_get = row5.id;
                }
            });

        });
        self.$watch('stock_valuation_account_id', function (val6, oldVal) {
            self.account_name_n.forEach(function (row6) {
                if (row6.id === val6) {
                    self.stock_valuation_account_get = row6.id;
                }
            });

        });
        self.$watch('stock_journal_id', function (val7, oldVal) {
            self.select_all_journal_n.forEach(function (row7) {
                if (row7.id === val7) {
                    self.stock_journal_account_get = row7.id;
                }
            });
        });
        self.$watch('price_diff_account_type_id', function (val9, oldVal) {
            self.select_all_account_type_n.forEach(function (row9) {
                if (row9.id  === val9) {
                    self.dfa_account_type_get = row9.id;
                }
            });
        });
        self.$watch('price_diff_account_default_tax_id', function (val9, oldVal) {
            self.select_all_default_tax_n.forEach(function (row9) {
                if (row9.id  === val9) {
                    self.dfa_default_get = row9.id;
                }
            });
        });
        self.$watch('price_diff_account_tags_id', function (val9, oldVal) {
            self.select_all_tags_n.forEach(function (row9) {
                if (row9.id  === val9) {
                    self.dfa_tags_get = row9.id;
                }
            });
        });
        self.$watch('income_account_type_id', function (val10, oldVal) {
            self.select_all_account_type_n.forEach(function (row10) {
                if (row10.id  === val10) {
                    self.inca_account_type_get = row10.id;
                }
            });
        });
        self.$watch('income_account_default_tax_id', function (val11, oldVal) {
            self.select_all_default_tax_n.forEach(function (row11) {
                if (row11.id  === val11) {
                    self.inca_default_get = row11.id;
                }
            });
        });
        self.$watch('income_account_tags_id', function (val12, oldVal) {
            self.select_all_tags_n.forEach(function (row12) {
                if (row12.id  === val12) {
                    self.inca_tags_get = row12.id;
                }
            });
        });
        self.$watch('expense_account_type_id', function (val13, oldVal) {
            self.select_all_account_type_n.forEach(function (row13) {
                if (row13.id  === val13) {
                    self.expa_account_type_get = row13.id;
                }
            });
        });
        self.$watch('expense_account_default_tax_id', function (val14, oldVal) {
            self.select_all_default_tax_n.forEach(function (row14) {
                if (row14.id  === val14) {
                    self.expa_default_get = row14.id;
                }
            });
        });
        self.$watch('expense_account_tags_id', function (val15, oldVal) {
            self.select_all_tags_n.forEach(function (row15) {
                if (row15.id  === val15) {
                    self.expa_tags_get = row15.id;
                }
            });
        });
        self.$watch('stock_input_account_type_id', function (val16, oldVal) {
            self.select_all_account_type_n.forEach(function (row16) {
                if (row16.id  === val16) {
                    self.sia_account_type_get = row16.id;
                }
            });
        });
        self.$watch('stock_input_account_default_tax_id', function (val17, oldVal) {
            self.select_all_default_tax_n.forEach(function (row17) {
                if (row17.id  === val17) {
                    self.sia_default_get = row17.id;
                }
            });
        });
        self.$watch('stock_input_account_tags_id', function (val18, oldVal) {
            self.select_all_tags_n.forEach(function (row18) {
                if (row18.id  === val18) {
                    self.sia_tags_get = row18.id;
                }
            });
        });
        self.$watch('stock_output_account_type_id', function (val16, oldVal) {
            self.select_all_account_type_n.forEach(function (row16) {
                if (row16.id  === val16) {
                    self.soa_account_type_get = row16.id;
                }
            });
        });
        self.$watch('stock_output_account_default_tax_id', function (val17, oldVal) {
            self.select_all_default_tax_n.forEach(function (row17) {
                if (row17.id  === val17) {
                    self.soa_default_get = row17.id;
                }
            });
        });
        self.$watch('stock_output_account_tags_id', function (val18, oldVal) {
            self.select_all_tags_n.forEach(function (row18) {
                if (row18.id  === val18) {
                    self.soa_tags_get = row18.id;
                }
            });
        });
        self.$watch('stock_valuation_account_type_id', function (val19, oldVal) {
            self.select_all_account_type_n.forEach(function (row19) {
                if (row19.id  === val19) {
                    self.sva_account_type_get = row19.id;
                }
            });
        });
        self.$watch('stock_valuation_account_default_tax_id', function (val20, oldVal) {
            self.select_all_default_tax_n.forEach(function (row20) {
                if (row20.id  === val20) {
                    self.sva_default_get = row20.id;
                }
            });
        });
        self.$watch('stock_valuation_account_tags_id', function (val21, oldVal) {
            self.select_all_tags_n.forEach(function (row21) {
                if (row21.id  === val21) {
                    self.sva_tags_get = row21.id;
                }
            });
        });
        self.$watch('removal_strategy_acc_id', function (val21, oldVal) {
            self.select_all_force_removal_strategy_n.forEach(function (row21) {
                if (row21.id  === val21) {
                    self.force_removal_strategy_get = row21.id;
                }
            });
        });
        $(function () {
            $('.purpose').on('change', function() {
                if ( this.value == 'sale')
                {
                    $("#journal_t").show();
                    $("#adv_t").show();
                    $("#bnk_t").hide();
                    $("#pos_t").hide();
                    $(".saleshow").show();
                    $(".salehide").hide();

                }
            });
            $('.purpose').on('change', function() {
                if ( this.value == 'purchase')
                {
                    $("#journal_t").show();
                    $("#adv_t").show();
                    $("#bnk_t").hide();
                    $("#pos_t").hide();
                    $(".saleshow").show();
                    $(".salehide").hide();
                }
            });
            $('.purpose').on('change', function() {
                if ( this.value == 'cash')
                {
                    $("#journal_t").show();
                    $("#adv_t").show();
                    $("#bnk_t").hide();
                    $("#pos_t").show();
                    $(".saleshow").hide();
                    $(".salehide").show();
                }
            });
            $('.purpose').on('change', function() {
                if ( this.value == 'bank')
                {
                    $("#journal_t").show();
                    $("#adv_t").show();
                    $("#bnk_t").show();
                    $("#pos_t").show();
                    $(".bank_advanced_sett").show();
                    $(".saleshow").hide();
                    $(".salehide").show();
                    $(".loss_account").hide();
                    $(".profit_account").hide();
                }
            });
            $('.purpose').on('change', function() {
                if ( this.value == 'miscellaneous')
                {
                    $("#journal_t").show();
                    $("#adv_t").show();
                    $("#bnk_t").hide();
                    $("#pos_t").hide();
                    $(".saleshow").hide();
                    $(".salehide").hide();
                }
            });
            $('.pro_type').on('change', function() {
                if ( this.value == 1) {
                    $(".manufacturing").show();
                    $(".traceability").show();
                    $(".bill_materials").show();
                    $(".active_c").show();
                    $(".sale").show();
                    $(".purchases").show();
                }
            });
            $('.pro_type').on('change', function() {
                if ( this.value == 2)
                {
                    $(".forecasted").hide();
                    $(".on_hand").hide();
                    $(".reordering").hide();
                    $(".traceability").hide();
                    $(".manufacturing").hide();
                    $(".bill_materials").hide();

                }
            });
            $('.pro_type').on('change', function() {
                if ( this.value == 3)
                {
                    $(".forecasted").show();
                    $(".on_hand").show();
                    $(".reordering").show();
                    $(".traceability").show();
                    $(".manufacturing").show();
                    $(".bill_materials").show();
                    $(".active_c").show();
                    $(".sale").show();

                }
            });

            $('#myselect').change(function() {
                var opval = $(this).val();
                if(opval=="secondoption"){
                    $('.bd-example-modal-lg14').modal("show");
                    $('#routes_name_modal_get').val();
                }
            });
            $('#multi').picker({
                search : true,
            });
            var vl = $('#multi').picker('set');
            $("#multi").on('sp-change', function (md) {
                console.log(md);
                val.forEach(function(data){
                    console.log(data);
                });

            });
            var listarray = new Array();

            var select = document.getElementById('selecty');
            for(var i = 0; i < select.options.length; i++){
                listarray.push(select.options[i].value);
            }
            $('#save').click(function () {
                self.$validator.validateAll().then(result => {
                    if (!result) {
                        // validation failed.
                    }
                    self.submit();

                    //window.location.href = "../setting/users";
                });
                // var r = confirm("Are you sure create quotation");
                // if (r)
                // {
                //     self.submit();
                // }
                // else
                // {
                //     // x="You pressed Cancel!";
                // }
            });
            $('#discard').click(function () {
                    self.select1();
                    alert('asdf')
            });
            // $('#saveclose').click(function () {
            //     self.vendor();
            // });
            $('.select1').on('change', function() {
                $(".phuntaro").show();
                //alert( this.value );
            });
            $('.select2').on('change', function() {
                $(".phuntaro2").show();
                //alert( this.value );
            });
            $('.select3').on('change', function() {
                $(".phuntaro3").show();
                //alert( this.value );
            });
            $('#sold1').prop('checked', true);
            $('#sold1').on('change', function() {
                $(".sales_hide").toggle();
                if($(this).is(":checked")){

                }else {
                    $(".sales_hide_panel").removeClass('active');
                    $(".sales_hide_panel").removeClass('show');
                    $(".sales_redirect").addClass('active');
                    $(".sale_redirect_panel").addClass('show');
                }
                //alert( this.value );
            });
            $(".pos_avaliablity_hide").hide();
            $(".pos_avaliablity").click(function () {
                $(".pos_avaliablity_hide").toggle();
            });
            $('.expensed_h').on('change', function() {
                $(".re_invoice").toggle();
                //alert( this.value );
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
            nextactivity: "Products / New",
            quotation: "Quotations / SO014",
            salesperson: "Create: Vendors",
            modal1: "Open: Internal Category",
            modal2: "Open: Point of Sale Category",
            modal3: "Open: Income Account",
            modal4: "Open: Expense Account",
            modal5: "Open: Price Difference Account",
            modal6: "Open: Stock Input Account",
            modal7: "Open: Stock Output Account",
            modal8: "Open: Stock Valuation Account",
            modal9: "Open: Stock Journal",
            modal10: "Open: Force Removal Strategy",
            modal11: "Create: Routes",
            modal12: "Create: Push Rules",
            modal13: "Create: Procurement Rules",
            btnlinks: {
                createbtnlink: "/sales/salescustomeredit",
                discardbtnlink: "/sales/products",
                savebtnlink: "",
                importbtnlink: "/sales/imported",
                modalsavebtnlink: ""
            },
            title: 'Discuss',
            // modal1 values
            vendor_id_dave_array: [],
            category_name: "",
            modal_btn1: "Open: Point of Sale Categorys",
            modal_pos_category_get: "",
            sequence: "",
            // modal2 values
            internal_category_name: "",
            price_difference_account_id: "",
            income_account_id: "",
            expense_account_id: "",
            stock_input_account_id: "",
            stock_output_account_id: "",
            stock_valuation_account_id: "",
            stock_journal_id: "",
            category_type: "",
            pro_name_count: "",
            inventory_valuation_get: "",
            // modal3 values
            income_account_name: "",
            // modal4 values
            expense_account_name:"",
            // modal5 values
            price_difference_account_name:"",
            //modal6 values
            account_number: "",
            select_all_account_type_n: "",
            dfa_account_type_get: "",
            dfa_default_get: "",
            dfa_tags_get: "",
            price_diff_account_deprecated: "",
            price_diff_account_type_id: "",
            price_diff_account_allow_reconciliation: "",
            price_diff_account_default_tax_id: "",
            price_diff_account_tags_id: "",
            //modal7 values
            income_account_number: "",
            income_account_type_id: "",
            income_account_tags_id: "",
            income_account_default_tax_id: "",
            income_account_deprecated: "",
            income_account_allow_reconciliation: "",
            inca_account_type_get: "",
            inca_default_get: "",
            inca_tags_get: "",
            //modal8 values
            expense_account_number: "",
            expense_account_type_id: "",
            expense_account_tags_id: "",
            expense_account_default_tax_id: "",
            expense_account_deprecated: "",
            expense_account_allow_reconciliation: "",
            expa_account_type_get: "",
            // modal9 values
            stock_input_account_name : "",
            stock_input_account_number : "",
            stock_input_account_type_id : "",
            stock_input_account_tags_id : "",
            stock_input_account_default_tax_id : "",
            stock_input_account_deprecated : "",
            stock_input_account_allow_reconciliation : "",
            sia_account_type_get : "",
            sia_default_get : "",
            sia_tags_get : "",
            // modal10 values
            stock_output_account_name : "",
            stock_output_account_number : "",
            stock_output_account_type_id : "",
            stock_output_account_tags_id : "",
            stock_output_account_default_tax_id : "",
            stock_output_account_deprecated : "",
            stock_output_account_allow_reconciliation : "",
            soa_account_type_get : "",
            soa_default_get : "",
            soa_tags_get : "",
            // modal11 values
            stock_valuation_account_name : "",
            stock_valuation_account_number : "",
            stock_valuation_account_type_id : "",
            stock_valuation_account_tags_id : "",
            stock_valuation_account_default_tax_id : "",
            stock_valuation_account_deprecated : "",
            stock_valuation_account_allow_reconciliation : "",
            sva_account_type_get : "",
            sva_default_get : "",
            sva_tags_get : "",
            //modal12 values
            force_removal_strategy_name: "",
            force_removal_strategy_method: "",
            select_all_location_n: "",
            //modal13 values
            routes_name_modal_get: "",
            product_categ_modal_get: "",
            product_modal_get: "",
            warehouse_modal_get: "",
            sale_modal_get: "",
            // modal14 values
            operation_name_get : "",
            sequence_get : "",
            source_location_get : "",
            destination_location_get : "",
            automatic_move_get : "",
            picking_type_get : "",
            delay_get : "",

            options: '',
            name: '',
            product_category: '',
            pro_name: '',
            pos_category_name_n: '',
            account_name_n: '',
            taxes_name_n: '',
            custom_lead: '',
            vendor_name_n: '',
            vendor_product_name_n: [],
            //submit
            product_name_get: '',
            can_be_sold_get: '',
            can_be_prchased_get: '',
            can_be_expensed_get: '',
            product_type_get: '',
            internal_refrence_get: '',
            barcode_get: '',
            internal_category_get: '',
            sales_price_get: '',
            cost_get: '',
            control_purchase_bills_get: '',
            routes_get: '',
            routes_manufacture_get: '',
            routes_buy_get: '',
            routes_order_get: '',
            weight_get: '',
            volume_get: '',
            customer_lead_time_get: '',
            manufacturing_lead_time_get: '',
            pos_get: '',
            weigh_with_scale_get: '',
            ordered_quantities_get: '',
            re_invoice_expenses_get: '',
            description_for_quotations_get: '',
            description_for_vendor_get: '',
            description_for_picking_get: '',
            vendor_taxes_get: '',
            expanece_account_get: '',
            customer_taxes_get: '',
            income_account_get: '',
            price_diff_account_get: '',
            pos_category_get: '',
            removal_strategy_acc_id: '',
            //modal
            vendor_get: '',
            vendor_product_name_get: '',
            vendor_product_code_get: '',
            delivery_lead_time_get: '',
            minimal_quantity_get: '',
            price_get: '',
            pos_parent_name_n: '',
            product_id: 0,
            modal_category_name: "",
            select_all_journal_n: "",
            select_all_default_tax_n: "",
            select_all_tags_n: "",
            select_all_force_removal_strategy_n: "",
            force_removal_strategy_get: '',
            select_all_routes_n: '',
            select_all_picking_type_n: '',
            last_id: '',


            v: true,
            v1: false,
        };
    },

    methods: {
        checkTrigger: function(){
            var self = this;
            self.$http.post("/sales/pos_catergory_update", {
                "id": self.pos_category_get,
                "category_name": self.category_name,
                "sequence": self.sequence,
                "modal_pos_category_get": self.modal_pos_category_get

            }).then(function (res) {
            }, function (err) {
                //alert(err);
            });
            self.select();
        },
        checkTrigger1: function(){
            var self = this;
            self.$http.post("/sales/internal_category_update", {
            "id": self.internal_category_get,
                "internal_category_name": self.internal_category_name,
                "internal_category_get": self.internal_category_get,
                "category_type": self.category_type,
                "category_type_get": self.category_type_get,
                "inventory_valuation_get": self.inventory_valuation_get,
                "price_diff_account_get": self.price_diff_account_get,
                "income_account_get": self.income_account_get,
                "expanece_account_get": self.expanece_account_get,
                "stock_input_account_get": self.stock_input_account_get,
                "stock_output_account_get": self.stock_output_account_get,
                "stock_valuation_account_get": self.stock_valuation_account_get,
                "stock_journal_account_get": self.stock_journal_account_get,
                "force_removal_strategy_get": self.force_removal_strategy_get,

            }).then(function(res){
            },function(err){
                //alert(err);
            });
            self.select();
        },
        price_difference_account_trigger : function () {
            var self = this;
            alert("update");
            self.$http.post("/sales/price_difference_account_modal_update", {
                "id": self.price_diff_account_get,
                "account_number": self.account_number,
                "price_difference_account_name": self.price_difference_account_name,
                "dfa_account_type_get": self.dfa_account_type_get,
                "dfa_default_get": self.dfa_default_get,
                "dfa_tags_get": self.dfa_tags_get,
                "price_diff_account_allow_reconciliation": self.price_diff_account_allow_reconciliation,
                "price_diff_account_deprecated": self.price_diff_account_deprecated,

            }).then(function(res){
            },function(err){
                //alert(err);
            });
            self.select();

        },
        income_account_trigger : function () {
            var self = this;
            alert("update");
            self.$http.post("/sales/price_difference_account_modal_update", {
                "id": self.income_account_get,
                "account_number": self.income_account_number,
                "price_difference_account_name": self.income_account_name,
                "dfa_account_type_get": self.inca_account_type_get,
                "dfa_default_get": self.inca_default_get,
                "dfa_tags_get": self.inca_tags_get,
                "price_diff_account_allow_reconciliation": self.income_account_allow_reconciliation,
                "price_diff_account_deprecated": self.income_account_deprecated,

            }).then(function(res){
            },function(err){
                //alert(err);
            });
            self.select();
        },
        expense_account_trigger : function () {
            var self = this;
            alert("update");
            self.$http.post("/sales/price_difference_account_modal_update", {
                "id": self.expanece_account_get,
                "account_number": self.expense_account_number,
                "price_difference_account_name": self.expense_account_name,
                "dfa_account_type_get": self.expa_account_type_get,
                "dfa_default_get": self.expa_default_get,
                "dfa_tags_get": self.expa_tags_get,
                "price_diff_account_allow_reconciliation": self.expense_account_allow_reconciliation,
                "price_diff_account_deprecated": self.expense_account_deprecated,

            }).then(function(res){
            },function(err){
                //alert(err);
            });
            self.select();
        },
        stock_input_account_trigger : function () {
            var self = this;
            alert("update");
            self.$http.post("/sales/price_difference_account_modal_update", {
                "id": self.stock_input_account_get,
                "account_number": self.stock_input_account_number,
                "price_difference_account_name": self.stock_input_account_name,
                "dfa_account_type_get": self.sia_account_type_get,
                "dfa_default_get": self.sia_default_get,
                "dfa_tags_get": self.sia_tags_get,
                "price_diff_account_allow_reconciliation": self.stock_input_account_allow_reconciliation,
                "price_diff_account_deprecated": self.stock_input_account_deprecated,

            }).then(function(res){
            },function(err){
                //alert(err);
            });
            self.select();
        },
        stock_output_account_trigger : function () {
            var self = this;
            alert("update");
            self.$http.post("/sales/price_difference_account_modal_update", {
                "id": self.stock_output_account_get,
                "account_number": self.stock_output_account_number,
                "price_difference_account_name": self.stock_output_account_name,
                "dfa_account_type_get": self.soa_account_type_get,
                "dfa_default_get": self.soa_default_get,
                "dfa_tags_get": self.soa_tags_get,
                "price_diff_account_allow_reconciliation": self.stock_output_account_allow_reconciliation,
                "price_diff_account_deprecated": self.stock_output_account_deprecated,

            }).then(function(res){
            },function(err){
                //alert(err);
            });
            self.select();
        },
        stock_valuation_account_trigger : function () {
            var self = this;
            alert("update");
            self.$http.post("/sales/price_difference_account_modal_update", {
                "id": self.stock_valuation_account_get,
                "account_number": self.stock_valuation_account_number,
                "price_difference_account_name": self.stock_valuation_account_name,
                "dfa_account_type_get": self.sva_account_type_get,
                "dfa_default_get": self.sva_default_get,
                "dfa_tags_get": self.sva_tags_get,
                "price_diff_account_allow_reconciliation": self.stock_valuation_account_allow_reconciliation,
                "price_diff_account_deprecated": self.stock_valuation_account_deprecated,

            }).then(function(res){
            },function(err){
                //alert(err);
            });
            self.select();
        },
        stock_journal_account_trigger : function () {
            alert("9trigger");
        },
        force_removal_strategy_trigger : function () {
            var self = this;
            alert("update");
            self.$http.post("/sales/force_removal_strategy_modal_update", {
                "id": self.force_removal_strategy_get,
                "force_removal_strategy_name": self.force_removal_strategy_name,
                "force_removal_strategy_method": self.force_removal_strategy_method,

            }).then(function(res){
            },function(err){
                //alert(err);
            });
            self.select();
        },
        routes_trigger : function () {
            var self = this;
            self.$http.post("/sales/routes_create_modal", {
                "routes_name_modal_get": self.routes_name_modal_get,
                "product_categ_modal_get": self.product_categ_modal_get,
                "product_modal_get": self.product_modal_get,
                "warehouse_modal_get": self.warehouse_modal_get,
                "sale_modal_get": self.sale_modal_get,

            }).then(function(res){
                if(res) {
                    alert("create routess");
                    $(".bd-example-modal-lg14").modal("hide");
                }
            },function(err){
                //alert(err);
            });
            self.select();
        },
        push_rules_trigger: function () {
            var self = this;
            alert("create");
            self.$http.post("/sales/push_rules_modal", {
                "operation_name_get": self.operation_name_get,
                "sequence_get": self.sequence_get,
                "source_location_get": self.source_location_get,
                "destination_location_get": self.destination_location_get,
                "automatic_move_get": self.automatic_move_get,
                "picking_type_get": self.picking_type_get,
                "delay_get": self.delay_get,

            }).then(function(res){
                if(res) {
                    alert("create routess");
                    $(".bd-example-modal-lg15").modal("hide");
                }
            },function(err){
                //alert(err);
            });
            self.select();
        },
        remove (index) {
            // this.todos.splice(index, 1)
            this.$delete(this.vendor_product_name_n, index)
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
            },function(err){
                alert(err);
            });
        },
        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/select_all_product_type", {"name": self.name}).then(function(res){self.options =res.body.result;},function(err){
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
            self.$http.post("/sales/select_all_journal", {"select_all_journal": self.name}).then(function(res){self.select_all_journal_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/all_account_type_by_id", {"select_all_account_type": self.name}).then(function(res){self.select_all_account_type_n =res.body.result;},function(err){
                //alert(err);
            });
             self.$http.post("/sales/all_default_tax_by_id", {"select_all_default_tax": self.tax}).then(function(res){self.select_all_default_tax_n =res.body.result;},function(err){
                //alert(err);
            });
             self.$http.post("/sales/tags", {"select_all_tags": self.name}).then(function(res){self.select_all_tags_n =res.body.result;},function(err){
                //alert(err);
            });
             self.$http.post("/sales/all_force_removal_strategy_by_id", {"select_all_force_removal_strategy": self.name}).then(function(res){self.select_all_force_removal_strategy_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/all_routes", {"select_all_routes": self.name}).then(function(res){self.select_all_routes_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/all_location", {"select_all_location": self.Location_name}).then(function(res){self.select_all_location_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/all_picking_type", {"select_all_picking_type": self.name}).then(function(res){self.select_all_picking_type_n =res.body.result;},function(err){
                //alert(err);
            });


        },
        select1: function () {
            var self = this;
            self.$http.post("/sales/select_all_product_vendor", {"vendor_product_name_n": self.vendor_product_name}).then(function(res){
                self.vendor_product_name_n =res.body.result;
                var parentdata = res.body.result;
                // self.last_id = parentdata.id;
                parentdata.forEach(function (ls_id) {
                    console.log(ls_id);
                    last_id.push(ls_id.id);
                });
                console.log("lastid"+last_id);
                console.log("last_id"+self.last_id);

                },function(err){
                //alert(err);
            });
        },
        submit: function () {
            var self = this;
            alert("adasdsadsad");
            //var ckeditor_value = CKEDITOR.instances.editor1.getData();
            //alert(self.routes_order_get+ " "+ self.routes_buy_get+"");
            self.$http.post("/sales/add_products", {
                "product_name_get": self.product_name_get,
                "product_id": self.product_id,
                "can_be_sold_get": self.can_be_sold_get,
                "can_be_prchased_get": self.can_be_prchased_get,
                "can_be_expensed_get": self.can_be_expensed_get,
                "product_type_get": self.product_type_get,
                "internal_refrence_get": self.internal_refrence_get,
                "barcode_get": self.barcode_get,
                "internal_category_get": self.internal_category_get,
                "sales_price_get": self.sales_price_get,
                "cost_get": self.cost_get,
                "control_purchase_bills_get": self.control_purchase_bills_get,
                "routes_get": self.routes_get,
                "routes_manufacture_get": self.routes_manufacture_get,
                "routes_buy_get": self.routes_buy_get,
                "routes_order_get": self.routes_order_get,
                "weight_get": self.weight_get,
                "volume_get": self.volume_get,
                "customer_lead_time_get": self.customer_lead_time_get,
                "manufacturing_lead_time_get": self.manufacturing_lead_time_get,
                "price_diff_account_get": self.price_diff_account_get,
                "pos_get": self.pos_get,
                "weigh_with_scale_get": self.weigh_with_scale_get,
                "ordered_quantities_get": self.ordered_quantities_get,
                "re_invoice_expenses_get": self.re_invoice_expenses_get,
                "description_for_quotations_get": self.description_for_quotations_get,
                "description_for_vendor_get": self.description_for_vendor_get,
                "description_for_picking_get": self.description_for_picking_get,
                "vendor_taxes_get": self.vendor_taxes_get,
                "expanece_account_get": self.expanece_account_get,
                "customer_taxes_get": self.customer_taxes_get,
                "income_account_get": self.income_account_get,
                "pos_category_get": self.pos_category_get,

            }).then(function(res){
            },function(err){
                //alert(err);
            });
        },
        vendor_create_trigger: function () {
            //alert("adasdsadsad");
            var self = this;
            //var ckeditor_value = CKEDITOR.instances.editor1.getData();
            alert("create");
            self.$http.post("/sales/add_products_vendor", {
                "vendor_get": self.vendor_get,
                "vendor_product_name_get": self.vendor_product_name_get,
                "vendor_product_code_get": self.vendor_product_code_get,
                "delivery_lead_time_get": self.delivery_lead_time_get,
                "minimal_quantity_get": self.minimal_quantity_get,
                "price_get": self.price_get,
                "validate": self.dates_value,
                "to": self.dates_value1,

            }).then(function(res){
                var parentdata = res.body.result;
                // self.last_id = parentdata.id;
                parentdata.forEach(function (ls_id) {
                    console.log(ls_id.id);
                    console.log(ls_id);
                    last_id.push(ls_id.id);
                });
                console.log("lastid"+last_id);
                console.log("last_id"+self.last_id);
            },function(err){

                //alert(err);
            });
            self.select1();
            self.select();
        },
        vendor_create_close_trigger: function () {
            //alert("adasdsadsad");
            var self = this;
            //var ckeditor_value = CKEDITOR.instances.editor1.getData();
            alert("create");
            self.$http.post("/sales/add_products_vendor", {
                "vendor_get": self.vendor_get,
                "vendor_product_name_get": self.vendor_product_name_get,
                "vendor_product_code_get": self.vendor_product_code_get,
                "delivery_lead_time_get": self.delivery_lead_time_get,
                "minimal_quantity_get": self.minimal_quantity_get,
                "price_get": self.price_get,
                "validate": self.dates_value,
                "to": self.dates_value1,

            }).then(function(res){
                if(res){
                    $(".bd-example-modal-lg").modal('hide');
                }
            },function(err){
                //alert(err);
            });
            self.select1();
            self.select();
        },
        pos_category_modal: function () {
            var self = this;
            self.$http.post("/sales/select_all_pos_category_id", {"id": self.pos_category_get}).then(function(res){
                var parentdata = res.body.result[0];
                self.category_name = parentdata.category_name;
                self.sequence = parentdata.sequence;
            },function(err){
            });
            self.$http.post("/sales/pos_catergory_parent_name", {"id":self.pos_category_get}).then(function(res){
                var parentdata1 = res.body.result[0];
                self.modal_category_name = parentdata1.category_name;
            },function(err){
            });
        },
        internal_category_modal: function () {
            var self = this;
            self.$http.post("/sales/product_count", {"id": self.$route.params.id}).then(function(res){
                var parentdata1 = res.body.result[0];
                self.pro_name_count = parentdata1.pro_name;

            },function(err){
            });

            self.$http.post("/sales/select_all_product_category_id", {"id": self.internal_category_get}).then(function(res){
                var parentdata = res.body.result[0];
                self.internal_category_name = parentdata.name;
                self.parent_category_id = parentdata.parent_category_id;
                self.category_type = parentdata.category_type;
                self.inventory_valuation = parentdata.inventory_valuation.data;
                self.price_difference_account_id = parentdata.price_difference_account_id;
                self.income_account_id = parentdata.income_account_id;
                self.expense_account_id = parentdata.expense_account_id;
                self.stock_input_account_id = parentdata.stock_input_account_id;
                self.stock_output_account_id = parentdata.stock_output_account_id;
                self.stock_valuation_account_id = parentdata.stock_valuation_account_id;
                self.stock_journal_id = parentdata.stock_journal_id;
                self.removal_strategy_acc_id = parentdata.removal_strategy;
            },function(err){
            });
        },
        income_account_modal: function () {
            var self = this;
            self.$http.post("/sales/select_all_account_id", {"id": self.income_account_get}).then(function(res){
                var parentdata = res.body.result[0];
                self.income_account_name = parentdata.name;
                self.income_account_number = parentdata.account_number;
                self.income_account_type_id = parentdata.type_id;
                self.income_account_tags_id = parentdata.tags_id;
                self.income_account_default_tax_id = parentdata.default_tax_id;
                self.income_account_deprecated = parentdata.deprecated.data[0];
                self.income_account_allow_reconciliation= parentdata.allow_reconciliation.data[0];
            },function(err){
            });
        },
        expense_account_modal: function () {
            var self = this;
            self.$http.post("/sales/select_all_account_id", {"id": self.expanece_account_get}).then(function(res){
                var parentdata = res.body.result[0];
                self.expense_account_name = parentdata.name;
                self.expense_account_number = parentdata.account_number;
                self.expense_account_type_id = parentdata.type_id;
                self.expense_account_tags_id = parentdata.tags_id;
                self.expense_account_default_tax_id = parentdata.default_tax_id;
                self.expense_account_deprecated = parentdata.deprecated.data[0];
                self.expense_account_allow_reconciliation= parentdata.allow_reconciliation.data[0];
            },function(err){
            });
        },
        price_difference_account_modal: function () {
            var self = this;
            self.$http.post("/sales/select_all_account_id", {"id": self.price_diff_account_get}).then(function(res){
                var parentdata = res.body.result[0];
                self.price_difference_account_name = parentdata.name;
                self.account_number = parentdata.account_number;
                self.price_diff_account_type_id = parentdata.type_id;
                self.price_diff_account_tags_id = parentdata.tags_id;
                self.price_diff_account_default_tax_id = parentdata.default_tax_id;
                self.price_diff_account_deprecated = parentdata.deprecated.data[0];
                self.price_diff_account_allow_reconciliation= parentdata.allow_reconciliation.data[0];
            },function(err){
            });
            self.select();
        },
        stock_input_account_modal : function () {
            var self = this;
            self.$http.post("/sales/select_all_account_id", {"id": self.stock_input_account_get}).then(function(res){
                var parentdata = res.body.result[0];
                self.stock_input_account_name = parentdata.name;
                self.stock_input_account_number = parentdata.account_number;
                self.stock_input_account_type_id = parentdata.type_id;
                self.stock_input_account_tags_id = parentdata.tags_id;
                self.stock_input_account_default_tax_id = parentdata.default_tax_id;
                self.stock_input_account_deprecated = parentdata.deprecated.data[0];
                self.stock_input_account_allow_reconciliation= parentdata.allow_reconciliation.data[0];
            },function(err){
            });
        },
        stock_output_account_modal : function () {
            var self = this;
            self.$http.post("/sales/select_all_account_id", {"id": self.stock_output_account_get}).then(function(res){
                var parentdata = res.body.result[0];
                self.stock_output_account_name = parentdata.name;
                self.stock_output_account_number = parentdata.account_number;
                self.stock_output_account_type_id = parentdata.type_id;
                self.stock_output_account_tags_id = parentdata.tags_id;
                self.stock_output_account_default_tax_id = parentdata.default_tax_id;
                self.stock_output_account_deprecated = parentdata.deprecated.data[0];
                self.stock_output_account_allow_reconciliation= parentdata.allow_reconciliation.data[0];
            },function(err){
            });
        },
        stock_valuation_account_modal : function () {
            var self = this;
            self.$http.post("/sales/select_all_account_id", {"id": self.stock_valuation_account_get}).then(function(res){
                var parentdata = res.body.result[0];
                self.stock_valuation_account_name = parentdata.name;
                self.stock_valuation_account_number = parentdata.account_number;
                self.stock_valuation_account_type_id = parentdata.type_id;
                self.stock_valuation_account_tags_id = parentdata.tags_id;
                self.stock_valuation_account_default_tax_id = parentdata.default_tax_id;
                self.stock_valuation_account_deprecated = parentdata.deprecated.data[0];
                self.stock_valuation_account_allow_reconciliation= parentdata.allow_reconciliation.data[0];
            },function(err){
            });

        },
        stock_journal_account_modal : function () {
            var self = this;
            self.$http.post("/sales/select_all_account_id", {"id": self.stock_valuation_account_get}).then(function(res){
                var parentdata = res.body.result[0];
                self.stock_valuation_account_name = parentdata.name;
                self.stock_valuation_account_number = parentdata.account_number;
                self.stock_valuation_account_type_id = parentdata.type_id;
                self.stock_valuation_account_tags_id = parentdata.tags_id;
                self.stock_valuation_account_default_tax_id = parentdata.default_tax_id;
                self.stock_valuation_account_deprecated = parentdata.deprecated.data[0];
                self.stock_valuation_account_allow_reconciliation= parentdata.allow_reconciliation.data[0];
            },function(err){
            });
        },
        force_removal_strategy_modal : function () {
            var self = this;
            self.$http.post("/sales/all_force_removal_strategy_by_id_modal", {"id": self.force_removal_strategy_get}).then(function(res){
                var parentdata = res.body.result[0];
                self.force_removal_strategy_name = parentdata.name;
                self.force_removal_strategy_method = parentdata.method;

            },function(err){
            });
        },



    },
    components: {
        DashboardController,
        ProductEdit,
        Modal

    },

}