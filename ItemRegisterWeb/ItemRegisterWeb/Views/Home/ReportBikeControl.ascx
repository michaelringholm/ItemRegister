<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<h2>
   Indrapporter cykel</h2>
<div>
   Her kan du indrapportere cykler du har fundet.
</div>
<div style="line-height: 20px; margin-top: 30px;">
   <div style="float: left; font-size: 12pt; margin-right: 10px; width: 90px;">
      Stelnr.:
   </div>
   <div style="float: left;">
      <%=Html.TextBox("serial_no", null, new { @class = "textBox" } ) %>
   </div>
   <div style="clear: both;">
   </div>
   <div style="margin-top: 24px;">
      Hvor fandt du cyklen?
   </div>
   <div style="margin-top: 6px;">
      <div style="float: left; font-size: 12pt; margin-right: 10px; width: 90px;">
         Adresse:
      </div>
      <div style="float: left;">
         <%=Html.TextBox("address_line1", null, new { @class = "textBox" } ) %>
      </div>
   </div>
   <div style="clear: both;">
   </div>
   <div style="margin-top: 6px;">
      <div style="float: left; font-size: 12pt; margin-right: 10px; width: 90px;">
         Postnr.:
      </div>
      <div style="float: left;">
         <%=Html.TextBox("postal_code", null, new { @class = "textBox" } ) %>
      </div>
   </div>
   <div style="clear: both;">
   </div>
   <div style="margin-top: 24px;">
      Har du evt. cyklens GPS koordinator?
   </div>
   <div style="margin-top: 6px;">
      <div style="float: left; font-size: 12pt; margin-right: 10px; width: 90px;">
         Breddegrad:
      </div>
      <div style="float: left;">
         <%=Html.TextBox("latitude", null, new { @class = "textBox" } ) %>
      </div>
   </div>
   <div style="clear: both;">
   </div>
   <div style="margin-top: 6px;">
      <div style="float: left; font-size: 12pt; margin-right: 10px; width: 90px;">
         Længdegrad:
      </div>
      <div style="float: left;">
         <%=Html.TextBox("longitude", null, new { @class = "textBox" } ) %>
      </div>
   </div>
   <div style="clear: both;">
   </div>
   <div style="float: left; margin-left: 0px; margin-top: 12px;">
      <div id="btnReportBike" class="link">
         Indraportér</div>
   </div>
</div>
<div style="clear: both;">
</div>
<div style="margin-top: 20px;" id="searchResult">
</div>
