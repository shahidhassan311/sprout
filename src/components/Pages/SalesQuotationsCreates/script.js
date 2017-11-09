import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import TableMain from "./../../partials/TableMain/TableMain.vue"
import Modal from "./../../partials/Modal/Modal.vue"
export default{
    created: function () {
        var self = this;
        self.select();

        $(function(){
            $('#save').click(function () {
                alert("adasdas");
            });
            $("#btn1").click(function(){
                $(".extraa").append(
                    '<tr class="topm" >' +
                    '<th width="1" style="padding: 0px;" class="o_list_record_selector samotableheadborder"> ' +
                    '<div style="line-height: 3em;padding-left: 10px;" class="o_checkbox">' +
                    ' <i class="fa fa-arrows"></i>' +
                    '<span></span>' +
                    '</div> ' +
                    '</th> ' +
                    '<td style="padding: 0px;">' +
                    '<select style="width: 80%;height: 35px;border-radius: 8px;background-color: #d2d2ff;">' +
                    '<option value="tesr">test 1</option>' +
                    '<option value="tesr">test 1</option>' +
                    '<option value="tesr">test 1</option>' +
                    '</select>' +
                    '<div draggable="false" tabindex="-1" class="fa fa-external-link btn btn-default o_external_button" data-toggle="modal" data-target=".bd-example-modal-lg1" style="padding: 0px"></div>'+
                    '</td> ' +
                    '<td style="padding: 0px;">' +
                    '<textarea cols="5" rows="3" style="    width: 100%;background-color: #d2d2ff;border-radius: 6px;"></textarea>'+
                    '</td> ' +
                    '<td style="padding: 0px;">' +
                    '<input type="text" value="" style="    background-color: #d2d2ff;width: 100%;height: 35px;border-radius: 7px;">'+
                    '</td>' +
                    '<td style="padding: 0px;">' +
                    '<input type="text" value="" style="width: 100%;height: 35px;border-radius: 8px;background-color: #d2d2ff;" >'+
                    '</td>' +
                    ' <td style="padding: 0px;">' +
                    '<select style="width: 100%;height: 35px;border-radius: 4px;">' +
                    '<option value="tesr">test 1</option>' +
                    '<option value="tesr">test 1</option>' +
                    '<option value="tesr">test 1</option>' +
                    '</select>' +
                    '</td>' +
                    '<td style="padding: 0px;">' +
                    '<p style="text-align: right;">total</p>'+
                    '</td> ' +
                    '<td style="padding: 0px;">' +
                    '<i class="fa fa-trash-o trash1" style="    float: right;font-size: 13px;padding-top: 1px;"></i>'+
                    '</td> ' +
                    '</tr>');
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


        });
    },
    data(){
        return {
            quotation: "Quotations / SO014",
            salesperson: "Open: Salesperson",
            btnlinks: {
                savebtnlink:"",
                discardbtnlink:"/sales/quotation"
            },
            title: 'Discuss',
            customer_name: '',
            name: '',
            options: '',
            dates_value: '',
            dates_value1: '',
            payment_terms: '',
            payment_n: '',
            incoterms_n: '',
            incotermss: '',
            user_names: '',
            user_name_n: '',
            tags_name_n: '',
            tags_names: '',
            fiscial_name_n: '',
            fiscial_names: '',

            // form data submit
            customer_name_get: "",
            payment_term_get: "",
            setup_default_get: "",
            Incoterms_get: "",
            shipping_policy_get: "",
            salesperson_get: "",
            tags_get: "",
            sales_team_get: "",
            customer_ref_get: "",
            fiscal_pos_get: "",
            v: true,
            v1: false,
        };
    },

    methods: {
        select: function () {
            var self = this;
            //alert(self.companyName);
            self.$http.post("/sales/customers_name", {"name": self.name}).then(function(res){self.options =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/payment_terms", {"payment_terms": self.payment_terms}).then(function(res){self.payment_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/users", {"user_names": self.username}).then(function(res){self.user_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/tags", {"tags_names": self.name}).then(function(res){self.tags_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/fiscial", {"fiscial_names": self.name}).then(function(res){self.fiscial_name_n =res.body.result;},function(err){
                //alert(err);
            });
            self.$http.post("/sales/sales_quotations", {"incotermss": self.incoterms}).then(function(res){self.incoterms_n =res.body.result;},function(err){
                //alert(err);
            });
        },
        submit: function () {
            //alert("adasdsadsad");
            var self = this;
            //var ckeditor_value = CKEDITOR.instances.editor1.getData();
            //alert(self.current_company+ " ");
            self.$http.post("/setting/add_user", {
                "customer_name_get": self.username,
                "payment_term_get": self.username,
                "setup_default_get": self.username,

            }).then(function(res){
                //console.log(res.body);
            },function(err){
                //alert(err);
            });
        },
    },

    components: {
        DashboardController,
        TableMain,
        Modal,
    }
}
