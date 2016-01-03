<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
   Cykeldetektiven
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
   <div style="width: 500px; float: left;">
      <div id="searchBikeControl" class="topLevelControl">
         <%Html.RenderPartial("SearchBikeControl"); %></div>
      <div id="reportBikeControl" class="topLevelControl" style="display: none;">
      </div>
      <div id="myBikesControl" class="topLevelControl" style="display: none;">
      </div>
   </div>
   <div style="width: 300px; margin-left: 50px; float: left;">
      <div style="float: left;"><img src="/Content/Images/detective_hat_140.jpg" alt="Detektiveer" /></div>
      <div style="float: left;">Der er i alt <%=ItemRegisterWeb.Code.ContextManager.Current.NumberOfDetectives %> aktive detektiver.</div>
      <div style="clear: both;"></div>
   </div>
   <div style="clear: both;"></div>
</asp:Content>
