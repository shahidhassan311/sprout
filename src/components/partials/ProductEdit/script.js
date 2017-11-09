import DashboardController from "./../DashboardController/DashboardController.vue"
import Request_quotation_lower from "./../Request_quotation_lower/Request_quotation_lower.vue"

export default{
    created: function () {
        document.title = this.title;
        $(function () {
           // $(".company_btn_click").click(function () {
           //     $(".company_btn").hide();
           // }) ;
           //  $(".individual_btn_click").click(function () {
           //      $(".company_btn").show();
           //  }) ;
           //
           //  self.select();
        });
    },

    components: {
        DashboardController,
        Request_quotation_lower
    }
}