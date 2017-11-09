import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Tabledrag from "./../../partials/Tabledrag/Tabledrag.vue"

export default{
    created: function () {
        var self = this;
        self.select();
        $(function(){
            $("#save").click(function () {

                self.$validator.validateAll().then(result => {
                    if (!result) {
                        // validation failed.
                    }
                    self.submit();
                    window.location.href = "/sales/salesactivity";
                });
            });
            $('#submitSaveBtn').on("click",function(){

            });
        });

    },
    data () {
        return {
            sales_team_drop: '',
            type_message: '',
            name_desc: '',
            number_days: '',
            value_default: '',
            team_id: '',
            sales_activity_recommend: '',
            recommended_activity_id: '',

            activities: "Activities / Email",
            btnlinks: {
                createbtnlink:"/sales/newuser",
                discardbtnlink:"/sales/salesactivity",
                savebtnlink:""
            },

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

            self.$http.post("/sales/sale_activity_name", {"fname": self.name}).then(function(res){self.sales_team_drop =res.body.result;},function(err){
                //alert(err);
            })
            self.$http.post("/sales/sale_recommend_activity", {"activityname": self.message_type}).then(function(res){self.sales_activity_recommend =res.body.result;},function(err){
                //alert(err);
            });

        },
        submit: function () {
            //alert("adasdsadsad");
            var self = this;
            //var ckeditor_value = CKEDITOR.instances.editor1.getData();
            //alert(self.current_company+ " ");
            self.$http.post("/sales/sales_activity_create", {
                "message_type": self.type_message,
                "description_name": self.name_desc,
                "days_number": self.number_days,
                "default_value": self.value_default,
                "sales_id_team": self.team_id,
                "recommended_activity": self.recommended_activity_id,


            }).then(function(res){
                //console.log(res.body);
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