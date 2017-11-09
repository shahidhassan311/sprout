import Modal from "./../../partials/Modal/Modal.vue"

export default{
    created: function () {
        var self = this;

        console.log("this is some check");
        $(function () {
            $("#apply").click(function () {
                self.$validator.validateAll().then(result => {
                    if (!result) {
                    }
                    self.submit();
                    window.location.href = "../sales/salessettings";
                });
            });
        });

        this.select();

    },
    data(){
        return {
            title: 'Discuss',
            pro_pricing: '',
            product_name_drop: '',
            domain_alias_name: '',
            email: '',
            phone: '',
            mobile: '',
            alias_domain: '',
            lead_email: '',
            leads: '',
            product_variant: '',
            unit_measure: '',
            default_invoice: '',
            digital_product: '',
            sale_price: '',
            default_terms: '',
            adresses: '',
            incoterms: '',
            discount: '',
            margins: '',
            sales_layout: '',
            sales_modification: '',
            warning: '',
            tax_total: '',
            order_routing: '',
            date_no: '',
            online_quotations: '',
            sales_safety: '',
            shipping: '',
            default_shipping: '',

            v: true,

            options2:'',
            v1: false
        }
    },

    computed: {
        fullname: function () {
            return this.first + " " + this.last;
        }
    },
    methods: {

        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/domain_alias", {
                "id": self.$route.params.id,
            }).then(function(res){
                var parentdata = res.body.result[0];
                self.alias_domain = parentdata.alias_domain;
                console.log(parentdata);

            },function(err){
                alert(err);
            });

            self.$http.post("/sales/product_name", {"pro_name": self.name}).then(function(res){self.product_name_drop =res.body.result;},function(err){
                //alert(err);
            });

        },

        submit: function () {
            //alert("adasdsadsad");
            var self = this;
            //var ckeditor_value = CKEDITOR.instances.editor1.getData();
            //alert(self.current_company+ " ");
            self.$http.post("/sales/sales_settings", {
                "leads_emails": self.lead_email,
                "leads_name": self.leads,
                "pro_name": self.product_variant,
                "unit_name": self.unit_measure,
                "default_invo": self.default_invoice,
                "digital_name": self.digital_product,
                "sale_price_name": self.sale_price,
                "default_terms_name": self.default_terms,
                "address_name": self.adresses,
                "incoterms_name": self.incoterms,
                "discounts_name": self.discount,
                "margins_name": self.margins,
                "sales_layout_name": self.sales_layout,
                "sales_modi_name": self.sales_modification,
                "warning_name": self.warning,
                "tax_total_name": self.tax_total,
                "order_route_name": self.order_routing,
                "date_name": self.date_no,
                "online_quote_name": self.online_quotations,
                "sales_safety_name": self.sales_safety,
                "shipping_name": self.shipping,
                "default_ship_name": self.default_shipping,


            }).then(function(res){
                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
        validateBeforeSubmit() {
            this.$validator.validateAll().then(() => {
                // eslint-disable-next-line

                this.submit();
                alert('From Submitted!');
            }).catch(() => {
                // eslint-disable-next-line
                alert('Correct them errors!');
            });
        }
    },

    components: {
        Modal,

    }
}