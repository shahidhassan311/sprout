import DashboardController from "./../../partials/DashboardController/DashboardController.vue"

import Message from "./../../partials/Message/Message.vue"
import Modal from "./../../partials/Modal/Modal.vue"
import jobs from "./../../partials/Jobs/Jobs.vue"
import Request_quotation_lower from "./../../partials/Request_quotation_lower/Request_quotation_lower.vue"



export default{
    created: function () {
        $(function() {
            //use this method to add new colors to pallete
            //$.fn.colorPicker.addColors(['000', '000', 'fff', 'fff']);

            $('#color1').colorPicker();

            $('#color2').colorPicker();

            $('#color3').colorPicker({pickerDefault: "ffffff", colors: ["ffffff", "000000", "111FFF", "C0C0C0", "FFF000"], transparency: true});

            $('#color4').colorPicker();

            $('#color5').colorPicker({showHexField: false});

            //fires an event when the color is changed
            //$('#color1').change(function(){
            //alert("color changed");
            //});

            $("#button1").click(function(){
                $("#color1").val("#ffffff");
                $("#color1").change();
            });

            $("#button2").click(function(){
                $("#color2").val("#000000");
                $("#color2").change();
            });

        });
        $(function(){
            $('.samobuttopcontroller1').off('click');
            $('.samobuttopcontroller1').on('click', function () {
                let check = $('#createform').css("display");
                if(check == "none"){
                    $('#createform').show();
                    $('#createedit').hide();
                }else{
                    $('#createform').hide();
                    $('#createedit').show();
                }

            });
        });
        $(function(){
            $('.samobuttopcontroller2').off('click');
            $('.samobuttopcontroller2').on('click', function () {
                let check = $('#createform').css("display");
                if(check == "none"){
                    $('#createform').show();
                    $('#createedit').hide();
                }else{
                    $('#createform').hide();
                    $('#createedit').show();
                }

            });
        });


    },
    props: [
        "edit",

    ],
    data () {
        return {
            nextactivity: "Job Positions/New",
            modal2: "Open: Department",
            modal3: "Open: Job Title",
            modal4: "Open: Currency",
            modal5: "Open: Recruitment Responsible",
            modal6: "Open: Job Location",
            modal7: "Create: Contacts",
            modal8: "Open: Title",
            modal9: "Open: Account Receivable",
            modal10: "Open: Account Payable",
            modal11: "Open: Working Address",
            modal12: "Warning",
            modal50: "Open:Manager",
            modal60: "Open:Manager",
            modal61: "Open:Manager",
            btnlinks: {
                createbtnlink: "#/app/attendance/InsideHrTwo",
                discardbtnlink: "#/app/Recruitment/ReqPosition",
                editbtnlink:"#/app/attendance/InsideHrTwo",
                importbtnlink: "#/app/imported"
            },
        }
    },
    components: {
        DashboardController,
        Request_quotation_lower,
        Modal,
        Message,
        jobs,
    },


}