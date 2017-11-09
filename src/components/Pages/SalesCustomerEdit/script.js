import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import ProductEdit from "./../../partials/ProductEdit/ProductEdit.vue"
import Modal from "./../../partials/Modal/Modal.vue"

export default{
    created: function () {
        document.title = this.title;
        var self = this;
        self.$watch('tags', function (val18, oldVal) {
            self.options3.forEach(function (row18) {
                if (row18.id  === val18) {
                    self.tags = row18.id;
                }
            });
        });
        $(function () {
            self.select();
            self.select1();
            self.select2();
            self.select51();
            $("#discard").click(function () {
                self.new();
            });
            $("#save").click(function () {
                var r = confirm("Are you sure customer update");
                if (r)
                {
                    self.submit1();
                    // window.location.href = "../salescustomerview/"+self.$route.params.id;
                }
                else
                {
                    // x="You pressed Cancel!";
                }
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
            $(".company_btn_click").click(function () {
                $(".company_btn").hide();
            }) ;
            $(".individual_btn_click").click(function () {
                $(".company_btn").show();
            }) ;
            self.btnlinks.discardbtnlink = "/sales/salescustomerview/"+self.$route.params.id;
        });
    },
    data () {
        return {
            title: '',
            num: '',
            counter: 1,
            name: '',
            company: '',
            individual: '',
            street1: '',
            tags: '',
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
            mnotes_id:'',
            ids:'',
            mnotes:'',
            mtitle:'',
            maccount_reciveable:'',
            maccount_payable:'',
            mcustomer_payment_terms:'',
            mdegree_of_trust:'',
            mvendor_payment_terms:'',
            //createmodal
            nname: '',
            ncompany: '',
            nindividual: '',
            nstreet1: '',
            nstreet2: '',
            ncompany_name: '',
            njob_position:'',
            nphone_number:'',
            nmobile_number:'',
            nfax_number:'',
            nemail:'',
            ncity:'',
            nzip:'',
            nlanguage:'',

            ncountry:'',
            nbarcode:'',
            naddress:'',

            nnotes_id:'',

            nnotes:'',
            ntitle:'',
            naccount_reciveable:'',
            naccount_payable:'',
            ncustomer_payment_terms:'',
            ndegree_of_trust:'',
            nvendor_payment_terms:'',
            unique:'',


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
                self. maddress=self.null,
                self.mnotes_id=self.null


        },
        // delete
        submit51: function (id) {
            alert("Are you sure delete contact");
            var self = this;
            self.$http.post("/sales/contactdeletes1", {"id": id}).then(function(res){
            },function(err){

            });
            self.select();


        },
       // main update
        submit1: function () {
            var self = this;
            self.$http.post("/sales/createcontactedit", {
                "name": self.name,
                "lasting": self.lasting,
                "individual": self.individual,
                "tags": self.tags,
                "company": self.company,
                "address": self.address,
                "street1": self.street1,
                "street2": self.street2,
                "city": self.city,
                "states": self.states,
                "zip": self.zip,
                "notes": self.notes,
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
                "id": self.$route.params.id,
                "vendor_payment_terms": self.vendor_payment_terms,

            }).then(function(res){
                // self.unique =res;
                self.unique =res.body.datareturn;
                // console.log("as"+res);
                // console.log("as"+res.body.datareturn);
                // console.log("ress"+ self.unique);
                if (self.unique.length > 0){
                    console.log("good");
                    // update
                    self.$http.post("/sales/tag_res_good_update", {
                        "tags": self.tags,
                        "id": self.$route.params.id,
                    }).then(function(res){

                    },function(err){

                    });
                }else{
                    console.log("bad");
                    // insert
                    self.$http.post("/sales/tag_res_bad_insert", {
                        "tags": self.tags,
                        "id": self.$route.params.id,
                    }).then(function(res){

                    },function(err){

                    });
                }
            },function(err){

            });

        },
        // all loop data
        select1: function () {
            var self = this;
            self.$http.post("/sales/company_name", {
                "name": self.name,
            }).then(function(res){
                self.options =res.body.data;
            },function(err){

            });
            self.$http.post("/sales/state", {
                "name": self.name,
            }).then(function(res){
                self.options1 =res.body.data;
            },function(err){

            });
            self.$http.post("/sales/country", {
                "name": self.name,
            }).then(function(res){
                self.options2 =res.body.data;
            },function(err){

            });
            self.$http.post("/sales/tags", {
                "name": self.name,
            }).then(function(res){
                self.options3 =res.body.data;
            },function(err){

            });
            self.$http.post("/sales/selectacoount", {
                "name": self.name,
            }).then(function(res){
                self.options5 =res.body.data;
            },function(err){

            });
            self.$http.post("/sales/selectuser", {
                "name": self.name,
            }).then(function(res){
                self.options4 =res.body.data;
            },function(err){

            });
        },
        // next pagination
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
                self.$http.post("/sales/selectnote", {"notes_id":self.notes_id}).then(function (res) {
                        var data = res.body.data[0];
                        self.notes = data.notes;
                        self.$http.post("/sales/selectchild", {"id":self.$route.params.id}).then(function (res) {
                                self.names = res.body.data;
                                self.$http.post("/sales/mycontact", {"child_contact_id": self.child_contact_id}).then(function (res) {
                                        self.$http.post("/sales/selectaccount", {"account_reciveable":self.account_reciveable}).then(function (res) {
                                                var data1 = res.body.data[0];
                                                self.aname = data1.aname;
                                                self.$http.post("/sales/account_payable", {"account_payable":self.account_payable}).then(function (res) {
                                                        var data1 = res.body.data[0];
                                                        self.bname = data1.bname;
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
        // back pagination
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
                self.$http.post("/sales/selectnote", {"notes_id":self.notes_id}).then(function (res) {
                        var data = res.body.data[0];
                        self.notes = data.notes;
                        self.$http.post("/sales/selectchild", {"id":self.$route.params.id}).then(function (res) {
                                self.names = res.body.data;
                                self.$http.post("/sales/mycontact", {"child_contact_id": self.child_contact_id}).then(function (res) {
                                        self.$http.post("/sales/selectaccount", {"account_reciveable":self.account_reciveable}).then(function (res) {
                                                var data1 = res.body.data[0];
                                                self.aname = data1.aname;
                                                self.$http.post("/sales/account_payable", {"account_payable":self.account_payable}).then(function (res) {
                                                        var data1 = res.body.data[0];
                                                        self.bname = data1.bname;
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
        // pagination number
        select2: function () {
            var self = this;
            self.$http.post("/sales/numcontact", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.num = parentdata.count;

            }, function (err) {

            });




        },
        // contact create and runtime fatch
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
                self.$http.post("/sales/selectnote1", {"notes_id":self.mnotes_id}).then(function (res) {
                        var data = res.body.data[0];
                        self.mnotes = data.notes;
                    },

                    function (err) {

                    });
            }, function (err) {

            });
            self.select();
        },
        // main selects
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
                self.$http.post("/sales/selectnote", {"notes_id":self.notes_id}).then(function (res) {
                        var data = res.body.data[0];
                        self.notes = data.notes;
                        self.$http.post("/sales/selectchild", {"id":self.$route.params.id}).then(function (res) {
                                self.names = res.body.data;
                                self.$http.post("/sales/mycontact", {"child_contact_id": self.child_contact_id}).then(function (res) {
                                        self.$http.post("/sales/selectaccount", {"account_reciveable":self.account_reciveable}).then(function (res) {
                                                var data1 = res.body.data[0];
                                                self.aname = data1.aname;
                                                self.$http.post("/sales/account_payable", {"account_payable":self.account_payable}).then(function (res) {
                                                        var data1 = res.body.data[0];
                                                        self.bname = data1.bname;
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
        contact_create_trigger : function () {
            alert("Are you sure create contact contact_create_trigger");
            var self = this;
            self.$http.post("/sales/createcontactmodal_create", {
                "id": self.$route.params.id,
                "name": self.nname,
                "individual": self.nindividual,
                "company": self.ncompany,
                "address": self.naddress,
                "street1": self.nstreet1,
                "street2": self.nstreet2,
                "city": self.ncity,
                "states": self.nstates,
                "zip": self.nzip,
                "country": self.ncountry,
                "title": self.ntitle,
                "website": self.nwebsite,
                "job_position": self.njob_position,
                "phone_number": self.nphone_number,
                "mobile_number": self.nmobile_number,
                "fax_number": self.nfax_number,
                "email": self.nemail,
                "language": self.nlanguage,
                "notes_id": self.nnotes_id,
            }).then(function(res){

            },function(err){

            });
            self.select();
            self.new();
        },
        contact_edit_trigger: function () {
            alert("Are you sure edit contact");
            self.$http.post("/sales/createcontacteditmodal", {
                "name": self.mname,
                "id": self.ids,
                "individual": self.mindividual,
                "company": self.mcompany,
                "address": self.maddress,
                "street1": self.mstreet1,
                "street2": self.mstreet2,
                "city": self.mcity,
                "states": self.mstates,
                "zip": self.mzip,
                "notes": self.mnotes,
                "country": self.mcountry,
                "title": self.mtitle,
                "website": self.mwebsite,
                "account_payable": self.account_payable,
                "job_position": self.mjob_position,
                "phone_number": self.mphone_number,
                "mobile_number": self.mmobile_number,
                "fax_number": self.mfax_number,
                "email": self.memail,
                "language": self.language,
                "notes_id": self.mnotes_id,
            }).then(function(res){
            },function(err){

            });
            self.select();
            self.select3();
            self.new();
        },
        contact_create_saveclose_trigger: function () {
            alert("Are you sure create contact contact_create_saveclose_trigger");
            var self = this;
            self.$http.post("/sales/createcontactmodal_create", {
                "id": self.$route.params.id,
                "name": self.nname,
                "individual": self.nindividual,
                "company": self.ncompany,
                "address": self.naddress,
                "street1": self.nstreet1,
                "street2": self.nstreet2,
                "city": self.ncity,
                "states": self.nstates,
                "zip": self.nzip,
                "country": self.ncountry,
                "title": self.ntitle,
                "website": self.nwebsite,
                "job_position": self.njob_position,
                "phone_number": self.nphone_number,
                "mobile_number": self.nmobile_number,
                "fax_number": self.nfax_number,
                "email": self.nemail,
                "language": self.nlanguage,
                "notes_id": self.nnotes_id,
            }).then(function(res){

            },function(err){

            });
            $(".bd-example-modal-lg2").modal('hide');
            self.new();
            self.select();
        },
    },
    components: {
        DashboardController,
        ProductEdit,
        Modal

    },

}