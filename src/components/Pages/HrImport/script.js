
import DashboardController from "./../../partials/DashboardController/DashboardController.vue"
import Imported from "./../../Pages/Imported/Imported.vue"

export default{
    created: function () {
        $(document).ready(function() {
            $('.dateRangePicker')
                .datepicker({
                    format: 'mm/dd/yyyy',
                    startDate: '01/01/2010',
                    endDate: '12/30/2020'
                })
        });

        $(document).ready(function() {
            $('.dateRangePicker1')
                .datepicker({
                    format: 'mm/dd/yyyy ',
                    startDate: '01/01/2010',
                    endDate: '12/30/2020'
                });
            $('.datetimepicker1').datetimepicker();
        });

        $('#openBtn').click(function(){
            $('#myModal').modal({show:true})
        });


    },
    data(){
        return{

            nextactivity: "Employees/Import a File",
            btnlinks: {
                createbtnlink: "#/app/attendance/Grids",
                discardbtnlink: "#/app/attendance/Grids",
                importbtnlink: "#app/attendance/Manage",
                cancelbtnlink:"#app/Employees/TableHr"

            },
        }
    },
    components: {

        dashconterller: DashboardController,
        Imported: Imported


    }
}