Parse.Cloud.define('pushNotificationGeneral', function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user
  var params = request.params;
  var user = request.user;

  var newData = params.newData;
  var receiverPackage = params.receiver;
  var receiver = JSON.parse(receiverPackage).receiverId;

  // set audience of push notification and data
  var pushQuery = new Parse.Query(Parse.Installation);
  if (receiver) {
    pushQuery.equalTo("currentUserId", receiver);
  } else {
    pushQuery.equalTo("deviceType", "android");
  }

  var payload = {};

  if (newData) {
      payload.mydata = newData;
  }

  Parse.Push.send({
  where: pushQuery,      // for sending to a specific channel
  data: payload,
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});
