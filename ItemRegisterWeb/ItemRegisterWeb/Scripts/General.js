$(function()
{
   $("#btnSearchBike").click(function() { SearchBike(); });

   $("#btnShowMyBikesControl").click(function() { ShowMyBikesControl(); });
   $("#btnShowReportBikeControl").click(function() { ShowReportBikeControl(); });

   $("#btnShowFindBikeControl").click(function()
   {
      $(".topLevelControl").hide("slide");
      $("#searchBikeControl").show("slide");
   });

   $("#title").click(function() { location.href = "/Home/" });

   //GetFacebookInfo();
});


function ShowReportBikeControl()
{
   $(".topLevelControl").hide("slide");
   $("#reportBikeControl").show("slide");

   $.ajax(
    {
       url: '/Home/ShowReportBikeControl',
       cache: false,
       dataType: 'html',
       beforeSend: function()
       {
          $("#reportBikeControl").html('<div style="font-style: italic;">Henter oplysninger...<img src="/Content/Images/ajax-loader2.gif" alt="" /></div>');
       },
       success: function(result)
       {
          $("#reportBikeControl").html(result);
          $("#btnReportBike").click(function() { ReportBike(); });
       },
       error: function(request, textStatus, errorThrown) { $("#reportBikeControl").html("Fejl"); showError(request.responseText, "ShowMyBikesControl"); },
       complete: function(request, textStatus)
       {
       }
    }
    );
}

function ShowMyBikesControl()
{
   $(".topLevelControl").hide("slide");
   $("#myBikesControl").show("slide");

   $.ajax(
    {
       url: '/Home/ShowMyBikesControl',
       cache: false,
       dataType: 'html',
       beforeSend: function()
       {
          $("#myBikesControl").html('<div style="font-style: italic;">Henter oplysninger...<img src="/Content/Images/ajax-loader2.gif" alt="" /></div>');
       },
       success: function(result)
       {
          $("#myBikesControl").html(result);
          $("#btnRegisterBike").click(function() { StoreBike(); });
       },
       error: function(request, textStatus, errorThrown) { showError(request.responseText, "ShowMyBikesControl"); },
       complete: function(request, textStatus)
       {
       }
    }
    );
}


function ValidateReportBike()
{
   var isValid = true;

   var serialNo = $("#reportBikeControl #serial_no").val();
   $("#reportBikeControl #searchResult").html("");

   if (serialNo == null || serialNo == "")
   {
      $("#reportBikeControl #searchResult").html("Du skal udfylde stelnr.");
      $("#reportBikeControl #serial_no").focus();
      isValid = false;
   }

   return isValid;
}

function ReportBike()
{
   if (ValidateReportBike())
   {
      $.ajax(
    {
       url: '/Home/ReportBike',
       type: "post",
       cache: false,
       dataType: 'json',
       data: $("#reportBikeControl *").serialize(),
       beforeSend: function()
       {
          $("#reportBikeControl #searchResult").html('<div style="font-style: italic;">Indrapporterer funden cykel...<img src="/Content/Images/ajax-loader2.gif" alt="" /></div>');
       },
       success: function(result)
       {
          if (result.Success == true)
          {
             $("#reportBikeControl #searchResult").html("Cykel oprettet!");
             ReloadBikeList();
          }
          else
             $("#reportBikeControl #searchResult").html("Der skete en fejl!");
       },
       error: function(request, textStatus, errorThrown) { $("#myBikesControl #searchResult").html(""); showError(request.responseText, "SearchBike"); },
       complete: function(request, textStatus)
       {
       }
    }
    );
   }
}

function ValidateStoreBike()
{
   var isValid = true;

   var serialNo = $("#myBikesControl #serial_no").val();
   $("#myBikesControl #searchResult").html("");

   if (serialNo == null || serialNo == "")
   {
      $("#myBikesControl #searchResult").html("Du skal udfylde stelnr.");
      $("#myBikesControl #serial_no").focus();
      isValid = false;
   }

   return isValid;
}

function StoreBike()
{
   if (ValidateStoreBike())
   {
      $.ajax(
    {
       url: '/Home/StoreBike',
       type: "post",
       cache: false,
       dataType: 'json',
       data: $("#myBikesControl *").serialize(),
       beforeSend: function()
       {
          $("#myBikesControl #searchResult").html('<div style="font-style: italic;">Registrerer din cykel...<img src="/Content/Images/ajax-loader2.gif" alt="" /></div>');
       },
       success: function(result)
       {
          if (result.Success == true)
          {
             $("#myBikesControl #searchResult").html("Cykel oprettet!");
             ReloadBikeList();
          }
          else
             $("#myBikesControl #searchResult").html("Der skete en fejl!");
       },
       error: function(request, textStatus, errorThrown) { $("#myBikesControl #searchResult").html(""); showError(request.responseText, "SearchBike"); },
       complete: function(request, textStatus)
       {
       }
    }
    );
   }
}

function DeleteBike(id)
{
   $.ajax(
    {
       url: '/Home/DeleteBike',
       type: "post",
       cache: false,
       dataType: 'json',
       data: "id=" + id,
       beforeSend: function()
       {
          $("#myBikesControl #searchResult").html('<div style="font-style: italic;">Registrerer din cykel...<img src="/Content/Images/ajax-loader2.gif" alt="" /></div>');
       },
       success: function(result)
       {
          if (result.Success == true)
          {
             $("#myBikesControl #searchResult").html("Cykel slettet!");
             ReloadBikeList();
          }
          else
             $("#myBikesControl #searchResult").html("Der skete en fejl!");
       },
       error: function(request, textStatus, errorThrown) { $("#myBikesControl #searchResult").html(""); showError(request.responseText, "SearchBike"); },
       complete: function(request, textStatus)
       {
       }
    }
    );
}

function ReloadBikeList()
{
   $.ajax(
    {
       url: '/Home/ReloadBikeList',
       cache: false,
       dataType: 'html',
       beforeSend: function()
       {
          $("#bikeList").html('<div style="font-style: italic;">Opdaterer...<img src="/Content/Images/ajax-loader2.gif" alt="" /></div>');
       },
       success: function(result)
       {
          $("#bikeList").html(result);
       },
       error: function(request, textStatus, errorThrown) { showError(request.responseText, "ReloadBikeList"); },
       complete: function(request, textStatus)
       {
       }
    }
    );
}

function SearchBike()
{
   $.ajax(
    {
       url: '/Home/SearchBike',
       type: "post",
       cache: false,
       dataType: 'json',
       data: 'serialNo=' + $("#serial_no").val(),
       beforeSend: function()
       {
          $("#searchBikeControl #searchResult").html('<div style="font-style: italic;">Søger...<img src="/Content/Images/ajax-loader2.gif" alt="" /></div>');
       },
       success: function(result)
       {
          if (result.Found == true)
             $("#searchBikeControl #searchResult").html("Cykel fundet!");
          else
             $("#searchBikeControl #searchResult").html("Cyklen er ikke registreret!");
       },
       error: function(request, textStatus, errorThrown) { $("#searchBikeControl #searchResult").html(""); showError(request.responseText, "SearchBike"); },
       complete: function(request, textStatus)
       {
       }
    }
    );
}


function ListMyItems()
{
   $.ajax(
    {
       url: '/Home/ListMyItems',
       cache: false,
       dataType: 'html',
       data: 'serial_no=' + $("#serial_no").val(),
       success: function(result)
       {
          $("#leftMenuControl").html(result);
       },
       error: function(request, textStatus, errorThrown) { showError(request.responseText, "ListMyItems"); },
       complete: function(request, textStatus)
       {
       }
    }
    );
}

function GetFacebookInfo()
{
   try
   {
      //alert('GetFriends');
      var accessToken = $("#fbAccessToken").val();  //"105719222863801|2.AQCD6XI_j2S9dmRH.3600.1315150508.0-672079753|MtMi0Vbz-ilrvL-tls9Sbx2mals";
      //alert(accessToken);
      //jQuery.support.cors = true;

      if (accessToken != null && accessToken != "")
      {
         $.ajax({
            type: "GET",
            url: "https://graph.facebook.com/me/",
            cache: false,
            dataType: 'JSONP',
            data: "access_token=" + accessToken,
            error: function(xhr, status, error)
            {
               alert(error);
            },
            success: function(response)
            {
               if (response.error == null)
               {
                  //alert(response);
                  $("#facebookInfoControl").html("(" + response.name + ")");
               }
               else
                  alert(response.error.message);

               //alert(response["error"]["type"]);
               //alert(response["error"]["message"]);
            },
            complete: function(request, textStatus)
            {
               //alert('NewBet_Save RESPONSETEXT: ' + request.responseText);
               //alert('COMPLETE: ' + textStatus);
            }
         });
      }
   }
   catch (Error)
   {
      alert(Error);
   }
}


function showError(html, title)
{
   $("#errorMessageDiv").html(html);
   $("#errorMessageDiv").dialog({ title: title, width: "620", height: "520" });
   $("#errorMessageDiv").dialog("open");
}