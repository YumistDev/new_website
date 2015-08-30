

$("#contact_us_form").validate({

           focusInvalid: false,
           ignore: ":hidden",
           rules: {
						 full_name : {
							 required: true,
               maxlength : 50
						 },
             phone_number : {
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
               phone_number: { min: "Enter your 10 digit phone number" }
           },
           submitHandler: function (form) {

      				url = 'message.php';
      				var data = $("#contact_us_form").serialize();

      				$.ajax({
      					type: "POST",
      					url: url,
      					data: data,
      					success : function(data){
                  $("#contact_submit_button").text('SENT!');
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


             				$.ajax({
             					type: "POST",
             					url: url,
             					data: data,
             					success : function(data){

                        data = $.parseJSON(data);

                        if(data.code == 900){
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