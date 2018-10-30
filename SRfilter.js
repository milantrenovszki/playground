var app = angular.module('httpApp', []);

app.controller("httpAppCtrlr", ["$scope", "$http", function($scope, $http) {
  $http.get("https://next.json-generator.com/api/json/get/Ny4okBbhB").then(function(response) {

    // This outside forEach is only needed to have more test data, in the real scenario there is only one Service Request (service event)
    angular.forEach(response.data, function(serviceRequest) {

      // This is the actual list that we have to filter based on the criteria in the emails
      // If the activity under iteration fulfills the requirements then push it into a new array
      
      var srType = serviceRequest.reportType;
      var whiteList;
      
      switch (srType) {
      	case "Corrective Repair":
        	whiteList = ["Asset Swap", "Tech Support", "Field Support"];          
        	break;
        case "Planned Maintenance":
        	whiteList = ["Asset Swap", "Tech Support", "PM (Planned Maintenance)"];          
        	break;
        case "Installation":
        	whiteList = ["Installation", "Field Support", "Deinstall", "Software Update/Fix", "Software Upgrade/Enhancement"];       
          break;
        case "Tech Support":
        	whiteList = ["Tech Support"];       
          break;
        case "Field Modification":
        case "FMI":
        	whiteList = ["Field Support", "Tech Support", "Software Update/Fix"];       
          break;
        case "Remote PM":
        	whiteList = ["Remote PM", "Software Update/Fix"];       
          break;
        case "Sales Support":
        	whiteList = ["Deinstall", "Sales Support"];       
          break;
        case "Clinical Applications":
        	whiteList = ["Clinical Applications", "Sales Support"];       
          break;
        default:
        	console.log('Unknown SRtype: ', serviceRequest.reportType, ' -->', serviceRequest.listOfActivity);
					whiteList = ["Asset Swap", "Field Support", "Tech Support", "PM (Planned Maintenance)", "Sales Support"];	
      }
      
      let filteredActivityList = [];
      angular.forEach(serviceRequest.listOfActivity, function(activity) {
        
        // TODO Logic goes here
        var allowed = whiteList.indexOf(activity.activityType) >= 0;
                
        //activity fulfills the needs
        if (allowed) {
        	filteredActivityList.push(activity);
        }
      });
      
      console.log('filteredActivityList for ',srType,':', filteredActivityList);
    });
  });
}]);
