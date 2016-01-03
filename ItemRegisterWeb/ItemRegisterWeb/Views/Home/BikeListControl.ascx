<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ItemRegisterWeb.Models.MyBikesModel>" %>
<%foreach (var bike in Model.Bikes)
     { %>
<div style="height: 32px; line-height: 32px; width: 300px; border-top: solid 1px #0D8E06; display: inline-table;">
   <%=Html.Hidden("id", bike.id)%>
   <div style="float: left;">
      <img alt="cykel" style="width: 32px; height: 32px;" src="/Content/Images/Cykeldetektiven logo.png" />
   </div>
   <div style="float: left; margin-left: 12px;">
      Stelnr.:
   </div>
   <div style="float: left; margin-left: 12px;">
      <%=bike.serial_no%>
   </div>
   <%if (!String.IsNullOrEmpty(bike.title))
     { %>
   <div style="float: left; margin-left: 12px;">
      Kendenavn:
   </div>
   <div style="float: left; margin-left: 12px;">
      <%=bike.title%>
   </div>
   <%} %>
   <div style="float: left; margin-left: 12px;">
      <div onclick="DeleteBike(<%=bike.id%>)" class="link">
         Slet</div>
   </div>
</div>
<div style="clear: both;">
</div>
<%} %>