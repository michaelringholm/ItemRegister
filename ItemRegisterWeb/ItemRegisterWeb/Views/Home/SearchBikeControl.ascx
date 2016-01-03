<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<h2>
   Find din cykel</h2>
<div>
   Har du mistet din cykel kan du lede efter den her. Hvis den findes vil du straks få besked om dette.
</div>
<div style="line-height: 20px; margin-top: 30px;">
   <div style="float: left; font-size: 12pt; margin-right: 10px;">
      Stelnr.:
   </div>
   <div style="float: left;">
      <%=Html.TextBox("serial_no", null, new { @class = "textBox" } ) %>
   </div>
   <div style="float: left; margin-left: 12px;">
      <div id="btnSearchBike" class="link">
         Søg</div>
   </div>
</div>
<div style="clear: both;">
</div>
<div style="margin-top: 30px;" id="searchResult">
</div>
