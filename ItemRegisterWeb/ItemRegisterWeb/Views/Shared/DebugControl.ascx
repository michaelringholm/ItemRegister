<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%=ViewData["debug"]%>
<hr />
<%Dictionary<String, Object> aa = (Dictionary<String, Object>)ViewData["jsondic"];%>
<%=aa["id"] %>