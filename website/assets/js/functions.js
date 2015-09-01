$( document ).ready(function() {
  $("#areas").on('click',function(){
          $("#map_view").load('map_test.html');
          $("#map_view").show();
          $("#main").hide();
  })

  $("#home").on('click',function(){
          $("#main").show();
          $("#map_view").hide();
  })

  $.ajax({
    type: "GET",
    url: 'cities.php',
    success : function(data){
      data = $.parseJSON(data);

      $.each( data, function( key1, value1 ) {
        $.each( value1, function( key2, value2 ) {
            $("#"+key2).append("<div class='col-md-3'>" + value2 +"</div>");
        });
      });
   }
  })

});

console.log('Love coding? We\'re hiring!');
console.log('https://yumist.recruiterbox.com/');

$("#contact_us_form").validate({

           focusInvalid: false,
           ignore: ":hidden",
           rules: {
						 full_name : {
							 required: true,
               maxlength : 50
						 },
             phone : {
               maxlength: 10,
               minlength: 10
             },
             email : {
               required: true,
               email: true
             },
             message: {
               required: true,
               minlength: 10,
             }
           },
           messages:
           {
               phone_number: "Enter your 10 digit phone number"
           },
           submitHandler: function (form) {

      				url = 'message.php';
      				var data = $("#contact_us_form").serialize();

              $("#contact_submit_button").text('SUBMITTING..');

      				$.ajax({
      					type: "POST",
      					url: url,
      					data: data,
      					success : function(data){
                  $("#contact_submit_button").text('SUBMITTED');
                  console.log(data);
               }
      				})
           }
       });

 $("#phone_app_download_form").validate({

                  focusInvalid: false,
                  ignore: ":hidden",
                  rules: {
       						 phone_number : {
       							 required: true,
                      maxlength : 10,
                      minlength: 10,
                      number: true
       						 }
                  },
                  messages:
                  {
                      phone_number : "Enter your 10 digit phone number",
                  },
                  submitHandler: function (form) {

             				url = 'message.php';
             				var data = $("#phone_app_download_form").serialize();

                    $("#download_submit_button").text('SENDING...');

             				$.ajax({
             					type: "POST",
             					url: url,
             					data: data,
             					success : function(data){

                        data = $.parseJSON(data);

                        if(data.code == 900){
                          $("#download_submit_button").text('GET THE APP');
                          $("#phone_number-error").show();
                          $("#phone_number-error").text(data.message);
                        }else if(data.code == 200)
                        {
                          $("#download_submit_button").text('SENT!');
                          $("#phone_number-error").hide();
                        }

             					},

             				})
                  }
              });
