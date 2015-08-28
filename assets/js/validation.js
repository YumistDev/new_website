

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

      				url = 'mail_to.php';
      				var data = $("#contact_us_form").serialize();
              console.log(data);
              //
      				// $(".btn").attr("disabled", true);
              //
      				// $.ajax({
      				// 	type: "POST",
      				// 	url: url,
      				// 	data: data,
      				// 	success : function(data){
              //
      				// 	data = $.parseJSON(data);
              //
      				// 		$(".btn").attr("disabled", false);
      				// 		if(data.code == 200)
      				// 		{
      				// 			$("#errors").hide();
      				// 			$("#errors").show();
      				// 			$("#errors").append(data.message);
      				// 		}
      				// 		else
      				// 		{
      				// 			$("#errors").text(''); //TO NULLIFY PREVIOUS ERRORS
      				// 			$.each(data.message,function(key1,value1)
      				// 			{
      				// 				$.each(value1, function(key2, value2){
      				// 				$("#errors").append(value2+"<br>");
      				// 				$("#errors").show();
      				// 				});
      				// 			});
              //
      				// 		}
      				// 	},

      				//})
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

                        $("#download_submit_button").text('SENT!');
                        console.log(data);
             					},

             				})
                  }
              });
