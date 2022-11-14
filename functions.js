// pull json code and add to dropdowns in html
$( document ).ready(function() {
    $.get("https://frontend-take-home.fetchrewards.com/form", function(data, status){
        console.log(data);
        var occupat = data["occupations"];
        var states = data["states"];

        $.each(occupat, function(i, val){
            $('#occupation').append(`<option value="${val}">
            ${val}</option>`);
        });
        $.each(states, function(i, val){
            $('#state').append(`<option value="${val["name"]}">
            ${val["name"]}</option>`);
        });
    });
});

$(document).on('submit', '#register-form', function (e){
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var occupation = $('#occupation').val();
    var state = $('#state').val();
    var check_name = name.indexOf(" ");
    console.log(check_name);  
    console.log(name);  
    console.log(occupation);  

    var data = {
        "name" : name,
        "email" : email,
        "password" : password,
        "occupation" : occupation,
        "state" : state
    }
    console.log(data)

    // checks for first and last name by looking for a space
    if (check_name != -1 && password.length > 8){
        $("#register-form").css({ display: "none" });
        $("#title").css({ display: "none" });
        $("#title2").css({ display: "block" }).append(name + "!");
        $.ajax({
            type: "POST",
            url: "https://frontend-take-home.fetchrewards.com/form",
            data: data,
        });
    } 
    if (check_name == -1){
        $("#error-box-name").css({ display: "block" });
    } else{
        $("#error-box-name").css({ display: "none" });
    }

    if (password.length < 8){
        $("#error-box-pass").css({ display: "block" });
    } else{
        $("#error-box-pass").css({ display: "none" });
    }
    
});
