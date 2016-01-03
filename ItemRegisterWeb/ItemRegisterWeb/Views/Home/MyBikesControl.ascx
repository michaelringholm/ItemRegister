<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ItemRegisterWeb.Models.MyBikesModel>" %>
<h2>
   Mine cykler</h2>
<div>
   Her kan du registrere dine cykler.
</div>
<div style="line-height: 20px; margin-top: 30px;">
   <div style="float: left; font-size: 12pt; margin-right: 10px; width: 80px;">
      Stelnr.:
   </div>
   <div style="float: left;">
      <%=Html.TextBox("serial_no", null, new { @class = "textBox" } ) %>
   </div>
</div>
<div style="clear: both;">
</div>
<div style="line-height: 20px; margin-top: 6px;">
   <div style="float: left; font-size: 12pt; margin-right: 10px; width: 80px;">
      Kendenavn:
   </div>
   <div style="float: left;">
      <%=Html.TextBox("title", null, new { @class = "textBox" } ) %>
   </div>
   <div style="float: left; margin-left: 12px;">
      <div id="btnRegisterBike" class="link">
         Registrér</div>
   </div>
</div>
<div style="clear: both;">
</div>
<div style="margin-top: 20px;" id="searchResult">
</div>
<div style="margin-top: 20px; overflow: auto; height: 250px; width: 350px;" id="bikeList">
   <%Html.RenderPartial("BikeListControl");%>
</div>
