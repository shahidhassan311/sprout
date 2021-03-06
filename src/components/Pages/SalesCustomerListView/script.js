import Emptyform from "./../../partials/Emptyform/Emptyform.vue"
import Tabs from "./../../partials/Tabs/Tabs.vue"
import ModelDescription from "./../../partials/Modeldescription/Modeldescription.vue"
import Componame from "./../../partials/Componame/Componame.vue"
import Tableview from "./../../partials/Tableview/Tableview.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"
import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Pin from "./../../partials/Pin/Pin.vue"
export default{
    created: function () {
        var self = this;
        this.select();
        this.select1();
        var del = [];
        document.title = this.title;
        $(function(){
            $("#action").hide();
            var oldtext;
            $('.note.btn.btn-primary').hover(function(){
                oldtext = $(this).text();
                $(this).text("Unfollow");
            }, function(){
                $(this).text(oldtext)
            });
            $(".checkBoxClass").click(function () {
                if($(this).prop('checked')){
                    $("#action").show();
                }else{
                    $("#action").hide();
                }
            });
            $("#delete").click(function () {
                $(".checkBoxClass:checked").each(function(){
                    del.push($(this).val());

                });
                alert("Are you sure customer delete");
                console.log(del);
                self.delete(del);
                self.select();
            });
        });



    },
    data(){
        return {
            btnlinks: {

                createbtnlink:"/sales/salescustomercreate",
                importbtnlink:"/sales/salescustomerImport",
                editbtnlink:"#/app/attendance/Pin",
                firstbtnlink:"/sales/customers",
                secondbtnlink:"",
                deletedropbtnlink:"",
                duplicatebtnlink:"/sales/salescustomerduplicate",
                planorderbtnlink:"",
            },
            tableheader: [
                " id",
                " Name",
                " Phone",
                " Email",
            ],
            tablefooter:[
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
                    ],
                    "url": "/recruitment/ReqDep"
                },
            },
            r: true,
            p: false,
            k: true,

            manager: '',
            counter: 1,
            managername: '',
            parentdep: '',
            num: '',
            parentdepname: '',
            title : "Customer - Sprout",
            counter: 0,
            m: 'Log an internal note which will not be sent to followers, but which can be read by users accessing this document.',
            message: 'To: Followers of "PO00007: 637."',
            v: false,
        }
    },
    methods: {
        delete: function (del) {
            var self = this;
            //alert(self.current_company+ " ");
            console.log("a"+del);
            self.$http.post("/sales/delete_contact", {"delete_items": del}).then(function(res){

                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
        select3: function () {
            var self = this;
            self.counter+=1;

            self.$http.post("/sales/contacttablenext", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.j = data.name;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.name,
                                val.phone_number,
                                val.email,
                            ],
                            "url": "/sales/salescustomerview/"+val.id,

                        });
                        console.log(data);
                    });
                }
            },function(err){
            });
        },
        select4: function () {
            var self = this;
            self.counter-=1;
            self.$http.post("/sales/contacttableback", {
                "counter": self.counter,
            }).then(function(res){
                var data = res.body.data;
                self.j = data.name;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.name,
                                val.phone_number,
                                val.email,
                            ],
                            "url": "/sales/salescustomerview/"+val.id,

                        });
                        console.log(data);
                    });
                }

            },function(err){

            });
        },
        select: function () {
            var self = this;
            self.$http.post("/sales/contacttable", {
                "name": self.options,
            }).then(function(res){
                var data = res.body.data;
                self.j = data.name;
                self.tabledata = [];
                if(data.length > 0){
                    data.forEach(function(val) {
                        self.tabledata.push({
                            "data": [
                                val.id,
                                val.name,
                                val.phone_number,
                                val.email,
                            ],
                            "url": "/sales/salescustomerview/"+val.id,

                        });
                        console.log(data);
                    });
                }

            },function(err){

            });
        },
        select1: function () {
            var self = this;
            self.$http.post("/sales/numcontact", {"id": self.$route.params.id}).then(function (res) {
                var parentdata = res.body.data[0];
                self.num = parentdata.count;
            }, function (err) {

            });
        },

        validateBeforeSubmit() {
            this.$validator.validateAll().then(() => {
                // eslint-disable-next-line
                // this.submiting();

            }).catch(() => {
                // eslint-disable-next-line
                //  alert('Correct them errors!');
            });
        }
    },
    components: {
        Emptyform,
        Tabs,
        ModelDescription,
        Componame,
        Pin,
        Tableview,
        TableMain,
        DashboardController

    }

}







