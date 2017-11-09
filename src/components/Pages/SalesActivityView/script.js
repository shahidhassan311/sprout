import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Tabledrag from "./../../partials/Tabledrag/Tabledrag.vue"

export default{
    created: function () {
        var self = this;
        self.select();
        $(function(){
            $("#num01").click(function () {
                self.nextsubmit();
                self.select();
            });
            $("#num10").click(function () {
                self.backsubmit();
            });
            $("#delete").click(function () {
                self.submit_inside();
                alert("are you sure delete the user");
                window.location.href = "../salesactivity";
            });
            $('.samobuttopcontroller2').off('click');
            $('.samobuttopcontroller2').on('click', function () {
                let check = $('#show1').css("display");
                if(check == "none"){
                    $('#show1').show();
                    $('#edit1').hide();
                }else{
                    $('#show1').hide();
                    $('#edit1').show();
                }

            });
            self.btnlinks.editbtnlink = "/sales/salesactivityedit/"+self.$route.params.id;
            self.btnlinks.duplicatebtnlink = "/sales/salesactivityduplicate/"+self.$route.params.id;
        });

    },
    data () {
        return {
            activities: "Activities / Email",
            btnlinks: {
                createbtnlink:"/sales/salesactivitycreate",
                importbtnlink:"/sales/app/imported",
                editbtnlink:"",
                duplicatebtnlink:"",
            },
            sales_name: '',
            no_of_days: '',
            type_message: '',
            desc: '',
            default_value: '',
            next_activity_id: '',
            message_type1: '',
            message_type_name: '',
            v: true,
            v1: false,
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
        nextsubmit: function () {
            var self = this;
            self.$http.post("/sales/sales_activity_form_next", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];
                self.$route.params.id = parentdata.id;
                self.type_message = parentdata.message_type;
                self.sales_name = parentdata.name;
                self.desc = parentdata.description;
                self.no_of_days = parentdata.number_of_days;
                self.default_value = parentdata.default.data[0];
                self.next_activity_id = parentdata.recomended_next_activity_id;
                console.log(parentdata);
                // console.log(res.body)
                //console.log(this.$route.query.id);

                self.$http.post("/sales/sales_activity_id", {"id": self.next_activity_id }).then(function (res) {

                    var parentdata1 = res.body.result[0];
                    self.message_type1 = parentdata1.message_type;

                    console.log("sameer",self.message_type1);



                }, function (err) {
                    // alert(err);
                });

            }, function (err) {

            });

        },
        backsubmit: function () {
            var self = this;
            self.$http.post("/sales/sales_activity_form_back", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.result[0];

                self.$route.params.id = parentdata.id;
                self.type_message = parentdata.message_type;
                self.sales_name = parentdata.name;
                self.desc = parentdata.description;
                self.no_of_days = parentdata.number_of_days;
                self.default_value = parentdata.default.data[0];
                self.next_activity_id = parentdata.recomended_next_activity_id;
                console.log(parentdata);
                // console.log(res.body)
                //console.log(this.$route.query.id);

                self.$http.post("/sales/sales_activity_id", {"id": self.next_activity_id }).then(function (res) {

                    var parentdata1 = res.body.result[0];
                    self.message_type1 = parentdata1.message_type;

                    console.log("sameer",self.message_type1);



                }, function (err) {
                    // alert(err);
                });


            }, function (err) {

            });
        },
        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/sales_activity_form", {"id": self.$route.params.id}).then(function (res) {

                var parentdata = res.body.result[0];
                self.type_message = parentdata.message_type;
                self.sales_name = parentdata.name;
                self.desc = parentdata.description;
                self.no_of_days = parentdata.number_of_days;
                self.default_value = parentdata.default.data[0];
                self.next_activity_id = parentdata.recomended_next_activity_id;
                console.log(parentdata);


                self.$http.post("/sales/sales_activity_id", {"id": self.next_activity_id }).then(function (res) {

                    var parentdata1 = res.body.result[0];
                    self.message_type1 = parentdata1.message_type;

                    console.log("sameer",self.message_type1);



                }, function (err) {
                    // alert(err);
                });


            }, function (err) {
                // alert(err);
            });


        },
        submit_inside: function () {
            var self = this;
            //alert(self.current_company+ " ");
            self.$http.post("/sales/delete_sales_activity_inside", {"id": self.$route.params.id }).then(function(res){
                console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
    },



    components: {
        DashboardController,
        Tabledrag
    }
}