import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import ProductEdit from "./../../partials/ProductEdit/ProductEdit.vue"
import Modal from "./../../partials/Modal/Modal.vue"

export default{
    created: function () {
        document.title = this.title;
        var self = this;
        $(function () {
            self.select();
            self.select1();
            self.select2();
            self.select51();
            $("#one").click(function () {
                if($(this).prop('checked')){
                    self.individual=1;
                }else{
                    self.individual=0;
                }
            });
            $("#save").click(function () {
                var r = confirm("Are you sure duplicate the user");
                if (r)
                {
                    // x="You pressed OK!";
                    //window.location.href = "/contact";
                    self.insert();
                }
                else
                {
                    // x="You pressed Cancel!";
                }
            });
            self.select();

            $("#saves").click(function () {
                self.insert2();
                self.new();
                // self.select2();

            });
            $("#savesn").click(function () {
                self.insert2();
                self.new();
                self.select2();

            });
            $("#discard").click(function () {
                self.select2();
            });
            $("#num01").click(function () {
                self.ssubmit();
            });
            $("#num10").click(function () {
                self.psubmit();
            });
            $(".contact_invoice").click(function () {
                $(".contact_pro").hide();
            });
            $(".contact_invoice1").click(function () {
                $(".contact_pro").show();
            });
            self.btnlinks.discardbtnlink = "/contact/contactinfo/"+self.$route.params.id;
        });
    },
    data () {
        return {
            title: '',
            num: '',
            counter: 1,
            name: '',
            company: '',
            individual: 1,
            street1: '',
            street2: '',
            company_name: '',
            options:'',
            options1:'',
            options2:'',
            options3:'',
            options4:'',
            options5:'',
            job_position:'',
            phone_number:'',
            mobile_number:'',
            fax_number:'',
            email:'',
            language:'',
            is_Customer:'',
            account_payable:'',
            account_reciveable:'',
            notes_id:'',
            pid:'',
            names:[],
            names1:[],
            is_sales_person:'',
            sale_pricelist:'',
            internal_reference_id:'',
            bank_account_id:'',
            credit_card_id:'',
            is_vendor:'',
            barcode:'',
            states:'',
            customer_payment_terms:'',
            degree_of_trust:'',
            vendor_payment_terms:'',
            aname:'',
            bname:'',
            zip:'',
            country:'',
            website:'',
            //modals
            mname: '',
            mcompany: '',
            mindividual: '',
            mstreet1: '',
            mstreet2: '',
            mcompany_name: '',
            moptions:'',
            moptions1:'',
            moptions2:'',
            moptions3:'',
            moptions4:'',
            moptions5:'',
            mjob_position:'',
            mphone_number:'',
            mmobile_number:'',
            mfax_number:'',
            memail:'',
            mcity:'',
            mzip:'',
            mlanguage:'',
            mis_Customer:'',
            mis_sales_person:'',
            msale_pricelist:'',
            minternal_reference_id:'',
            mbank_account_id:'',
            mcredit_card_id:'',
            mis_vendor:'',
            mcountry:'',
            mbarcode:'',
            maddress:'',
            names: [],
            mnotes_id:'',
            ids:'',
            mnotes:'',
            mtitle:'',
            maccount_reciveable:'',
            maccount_payable:'',
            mcustomer_payment_terms:'',
            mdegree_of_trust:'',
            mvendor_payment_terms:'',



            nextactivity: "Customers",
            modal: "Create: Contacts",
            btnlinks: {
                savebtnlink:"",
                createbtnlink: "/sales/salescustomeredit",
                discardbtnlink: "",
                importbtnlink: "/sales/imported"
            },
        }
    },
    methods: {
        insert: function () {
            var self = this;
            self.$http.post("/sales/createcontact", {
                "name": self.name,
                "tags": self.tags,
                "individual": self.individual,
                "company": self.company,
                "address": self.address,
                "street1": self.street1,
                "street2": self.street2,
                "city": self.city,
                "states": self.states,
                "zip": self.zip,
                "last": self.last,
                "country": self.country,
                "title": self.title,
                "website": self.website,
                "account_payable": self.account_payable,
                "job_position": self.job_position,
                "phone_number": self.phone_number,
                "mobile_number": self.mobile_number,
                "fax_number": self.fax_number,
                "email": self.email,
                "language": self.language,
                "notes_id": self.notes_id,
                "is_Customer": self.is_Customer,
                "is_sales_person": self.is_sales_person,
                "sale_pricelist": self.sale_pricelist,
                "internal_reference_id": self.internal_reference_id,
                "bank_account_id": self.bank_account_id,
                "credit_card_id": self.credit_card_id,
                "is_vendor": self.is_vendor,
                "barcode": self.barcode,
                "account_reciveable": self.account_reciveable,
                "customer_payment_terms": self.customer_payment_terms,
                "degree_of_trust": self.degree_of_trust,
                "vendor_payment_terms": self.vendor_payment_terms,
            }).then(function(res){
                console.log(res.body);
            },function(err){
                if(!(typeof res.body.detail === 'undefined')){

                    window.location.href = "/customer";
                }
                else {
                    window.location.href = "/customer";
                }

            });
        },
        new: function () {
            var self = this;
            self.mname= self.null,
                self.mtitle= self.null,
                self.mstreet1= self.null,
                self.mstreet2= self.null,
                self.mjob_position=self.null,
                self.mphone_number=self.null,
                self.mmobile_number=self.null,
                self.mfax_number=self.null,
                self.memail=self.null,
                self.mcity=self.null,
                self.mzip=self.null,
                self.mlanguage=self.null,
                self.mis_Customer=self.null,
                self.mis_sales_person=self.null,
                self.msale_pricelist=self.null,
                self.minternal_reference_id=self.null,
                self.mbank_account_id=self.null,
                self.mcountry=self.null,
                self.maddress=self.null,
                self.mnotes_id=self.null
        },
        insert2: function () {
            var self = this;
            self.$http.post("/sales/createcontactmodal", {
                "name": self.mname,
                "individual": self.mindividual,
                "company": self.mcompany,
                "address": self.maddress,
                "lasting": self.lasting,
                "street1": self.mstreet1,
                "street2": self.mstreet2,
                "city": self.mcity,
                "states": self.mstates,
                "zip": self.mzip,
                "country": self.mcountry,
                "title": self.mtitle,
                "website": self.mwebsite,
                "account_payable": self.maccount_payable,
                "job_position": self.mjob_position,
                "phone_number": self.mphone_number,
                "mobile_number": self.mmobile_number,
                "fax_number": self.mfax_number,
                "email": self.memail,
                "language": self.mlanguage,
                "notes_id": self.mnotes_id,
            }).then(function(res){
                console.log(res.body);
            },function(err){
            });
        },
        select1: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/company_name", {
                "name": self.name,
            }).then(function(res){
                self.options =res.body.data;
                console.log(res.body);
            },function(err){
            });
            self.$http.post("/sales/state", {
                "name": self.name,
            }).then(function(res){
                self.options1 =res.body.data;
                console.log(res.body);
            },function(err){

            });
            self.$http.post("/sales/country", {
                "name": self.name,
            }).then(function(res){
                self.options2 =res.body.data;
                console.log(res.body);
            },function(err){

            });
            self.$http.post("/sales/tags", {
                "name": self.name,
            }).then(function(res){
                self.options3 =res.body.data;
                console.log(res.body);
            },function(err){

            });
            self.$http.post("/sales/selectacoount", {
                "name": self.name,
            }).then(function(res){
                self.options5 =res.body.data;
                console.log(res.body);
            },function(err){

            });
            self.$http.post("/sales/selectuser", {
                "name": self.name,
            }).then(function(res){
                self.options4 =res.body.data;
                console.log(res.body);
            },function(err){

            });
        },
        ssubmit: function () {

            var self = this;
            self.$http.post("/sales/contactpage2", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.name = parentdata.name;
                self.company = parentdata.company;
                self.individual = parentdata.individual;
                self.street1 = parentdata.street1;
                self.street2 = parentdata.street2;
                self.city = parentdata.city;
                self.states = parentdata.states;
                self.zip = parentdata.zip;
                self.$route.params.id = parentdata.id;
                self.country = parentdata.country;
                self.title = parentdata.title;
                self.website = parentdata.website;
                self.job_position = parentdata.job_position;
                self.phone_number = parentdata.phone_number;
                self.mobile_number = parentdata.mobile_number;
                self.fax_number = parentdata.fax_number;
                self.email = parentdata.email;
                self.language = parentdata.language;
                self.notes_id = parentdata.notes_id;
                self.notes = parentdata.notes;
                self.is_Customer = parentdata.is_Customer.data;
                self.is_sales_person = parentdata.is_sales_person;
                self.sale_pricelist = parentdata.sale_pricelist;
                self.internal_reference_id = parentdata.internal_reference_id;
                self.account_reciveable = parentdata.account_reciveable;
                self.account_payable = parentdata.account_payable;
                self.is_vendor = parentdata.is_vendor.data;
                self.barcode = parentdata.barcode;
                self.customer_payment_terms = parentdata.customer_payment_terms;
                self.degree_of_trust = parentdata.degree_of_trust;
                self.vendor_payment_terms = parentdata.vendor_payment_terms;
                console.log(parentdata);
                self.$http.post("/sales/selectnote", {"notes_id":self.notes_id}).then(function (res) {
                        var data = res.body.data[0];
                        self.notes = data.notes;
                        //console.log(self.job_tittle);
                        self.$http.post("/sales/selectchild", {"id":self.$route.params.id}).then(function (res) {
                                self.names = res.body.data;
                                console.log(self.names);
                                self.$http.post("/sales/mycontact", {"child_contact_id": self.child_contact_id}).then(function (res) {


                                        // console.log(res.body);
                                        self.$http.post("/sales/selectaccount", {"account_reciveable":self.account_reciveable}).then(function (res) {
                                                var data1 = res.body.data[0];
                                                self.aname = data1.aname;

                                                console.log(data1);

                                                // console.log(res.body);
                                                self.$http.post("/sales/account_payable", {"account_payable":self.account_payable}).then(function (res) {
                                                        var data1 = res.body.data[0];
                                                        self.bname = data1.bname;

                                                        console.log(data1);

                                                        // console.log(res.body);

                                                    },


                                                    function (err) {

                                                    });
                                            },
                                            function (err) {

                                            });
                                    },
                                    function (err) {

                                    });
                            },
                            function (err) {

                            });
                    },

                    function (err) {

                    });
            }, function (err) {

            });

        },
        psubmit: function () {
            var self = this;
            self.$http.post("/sales/contactpage", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.name = parentdata.name;
                self.company = parentdata.company;
                self.individual = parentdata.individual;
                self.street1 = parentdata.street1;
                self.street2 = parentdata.street2;
                self.city = parentdata.city;
                self.states = parentdata.states;
                self.zip = parentdata.zip;
                self.$route.params.id = parentdata.id;
                self.country = parentdata.country;
                self.title = parentdata.title;
                self.website = parentdata.website;
                self.job_position = parentdata.job_position;
                self.phone_number = parentdata.phone_number;
                self.mobile_number = parentdata.mobile_number;
                self.fax_number = parentdata.fax_number;
                self.email = parentdata.email;
                self.language = parentdata.language;
                self.notes_id = parentdata.notes_id;
                self.notes = parentdata.notes;
                self.is_Customer = parentdata.is_Customer.data;
                self.is_sales_person = parentdata.is_sales_person;
                self.sale_pricelist = parentdata.sale_pricelist;
                self.internal_reference_id = parentdata.internal_reference_id;
                self.account_reciveable = parentdata.account_reciveable;
                self.account_payable = parentdata.account_payable;
                self.is_vendor = parentdata.is_vendor.data;
                self.barcode = parentdata.barcode;
                self.customer_payment_terms = parentdata.customer_payment_terms;
                self.degree_of_trust = parentdata.degree_of_trust;
                self.vendor_payment_terms = parentdata.vendor_payment_terms;
                console.log(parentdata);
                self.$http.post("/sales/selectnote", {"notes_id":self.notes_id}).then(function (res) {
                        var data = res.body.data[0];
                        self.notes = data.notes;
                        //console.log(self.job_tittle);
                        self.$http.post("/sales/selectchild", {"id":self.$route.params.id}).then(function (res) {
                                self.names = res.body.data;
                                console.log(self.names);
                                self.$http.post("/sales/mycontact", {"child_contact_id": self.child_contact_id}).then(function (res) {


                                        // console.log(res.body);
                                        self.$http.post("/sales/selectaccount", {"account_reciveable":self.account_reciveable}).then(function (res) {
                                                var data1 = res.body.data[0];
                                                self.aname = data1.aname;

                                                console.log(data1);

                                                // console.log(res.body);
                                                self.$http.post("/sales/account_payable", {"account_payable":self.account_payable}).then(function (res) {
                                                        var data1 = res.body.data[0];
                                                        self.bname = data1.bname;

                                                        console.log(data1);

                                                        // console.log(res.body);

                                                    },


                                                    function (err) {

                                                    });
                                            },
                                            function (err) {

                                            });
                                    },
                                    function (err) {

                                    });
                            },
                            function (err) {

                            });
                    },

                    function (err) {

                    });
            }, function (err) {

            });

        },
        select3: function () {
            var self = this;
            self.$http.post("/sales/selectchilds", {"ids":self.ids}).then(function (res) {
                self.names1 = res.body.data;
                console.log(self.names1);
            },function(err){

            });
            //alert(self.companyName);
        },
        select2: function () {
            var self = this;
            self.$http.post("/sales/numcontact", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.num = parentdata.count;

            }, function (err) {

            });




        },
        select51: function (id) {
            var self = this;
            self.ids=id;
            self.$http.post("/sales/selectcontactinfo1", {"id": id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.mname = parentdata.name;
                self.mcompany = parentdata.company;
                self.mindividual = parentdata.individual;
                self.mstreet1 = parentdata.street1;
                self.mstreet2 = parentdata.street2;
                self.mcity = parentdata.city;
                self.mstates = parentdata.states;
                self.mzip = parentdata.zip;
                self.mcountry = parentdata.country;
                self.mtitle = parentdata.title;
                self.mwebsite = parentdata.website;
                self.mjob_position = parentdata.job_position;
                self.mphone_number = parentdata.phone_number;
                self.mmobile_number = parentdata.mobile_number;
                self.mfax_number = parentdata.fax_number;
                self.memail = parentdata.email;
                self.mlanguage = parentdata.language;
                self.mnotes_id = parentdata.notes_id;
                console.log(self.mname);
                self.$http.post("/sales/selectnote1", {"notes_id":self.mnotes_id}).then(function (res) {
                        var data = res.body.data[0];
                        self.mnotes = data.notes;
                        //console.log(self.job_tittle);
                    },

                    function (err) {

                    });
            }, function (err) {

            });
        },
        select: function () {
            var self = this;
            self.$http.post("/sales/selectcontactinfo", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.name = parentdata.name;
                self.pid = parentdata.id;
                self.company = parentdata.company;
                self.individual = parentdata.individual;
                self.street1 = parentdata.street1;
                self.street2 = parentdata.street2;
                self.city = parentdata.city;
                self.states = parentdata.states;
                self.zip = parentdata.zip;
                self.country = parentdata.country;
                self.title = parentdata.title;
                self.website = parentdata.website;
                self.job_position = parentdata.job_position;
                self.phone_number = parentdata.phone_number;
                self.mobile_number = parentdata.mobile_number;
                self.fax_number = parentdata.fax_number;
                self.email = parentdata.email;
                self.language = parentdata.language;
                self.notes_id = parentdata.notes_id;
                self.notes = parentdata.notes;
                self.is_Customer = parentdata.is_Customer.data;
                self.is_sales_person = parentdata.is_sales_person;
                self.sale_pricelist = parentdata.sale_pricelist;
                self.internal_reference_id = parentdata.internal_reference_id;
                self.account_reciveable = parentdata.account_reciveable;
                self.account_payable = parentdata.account_payable;
                self.is_vendor = parentdata.is_vendor.data;
                self.barcode = parentdata.barcode;
                self.customer_payment_terms = parentdata.customer_payment_terms;
                self.degree_of_trust = parentdata.degree_of_trust;
                self.vendor_payment_terms = parentdata.vendor_payment_terms;
                console.log(parentdata);
                self.$http.post("/sales/selectnote", {"notes_id":self.notes_id}).then(function (res) {
                        var data = res.body.data[0];
                        self.notes = data.notes;
                        //console.log(self.job_tittle);
                        self.$http.post("/sales/selectchild", {"id":self.$route.params.id}).then(function (res) {
                                self.names = res.body.data;
                                console.log(self.names);
                                self.$http.post("/sales/mycontact", {"child_contact_id": self.child_contact_id}).then(function (res) {


                                        // console.log(res.body);
                                        self.$http.post("/sales/selectaccount", {"account_reciveable":self.account_reciveable}).then(function (res) {
                                                var data1 = res.body.data[0];
                                                self.aname = data1.aname;

                                                console.log(data1);

                                                // console.log(res.body);
                                                self.$http.post("/sales/account_payable", {"account_payable":self.account_payable}).then(function (res) {
                                                        var data1 = res.body.data[0];
                                                        self.bname = data1.bname;
                                                        console.log(data1);
                                                        // console.log(res.body);
                                                    },
                                                    function (err) {

                                                    });
                                            },
                                            function (err) {

                                            });
                                    },
                                    function (err) {

                                    });
                            },
                            function (err) {

                            });
                    },

                    function (err) {

                    });
            }, function (err) {

            });
        },
    },
    components: {
        DashboardController,
        ProductEdit,
        Modal

    },

}