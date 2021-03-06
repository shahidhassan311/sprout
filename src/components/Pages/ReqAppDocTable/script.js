import DashboardController from "./../../partials/DashboardController/DashboardController.vue"

export default{
    created: function () {
        $(function () {
            $(".colorbg").on("click", function (e) {
                e.preventDefault();
                var col = $(this).css("backgroundColor");
                var parent = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent();
                parent.css({"backgroundColor":col});
                var subparent = $(this).parent().parent().parent().parent().parent();
                subparent.css({"backgroundColor":col});
            });
        });


    },
    data () {
        return {
            nextactivity: "Job Positions/Attachments",
            dashboard: "Dashboard",
            btnlinks: {
                createbtnlink: "#/app/Recruitment/ReqCreateTable",
                discardbtnlink: "#/app/sales/Salesnextactivityview",
                importbtnlink: "#/app/Recruitment/ReqAppDocImport",
                firstbtnlink: "#/app/Recruitment/ReqAppDoc",
            },

        }
    },

    components: {
        DashboardController



    }

}