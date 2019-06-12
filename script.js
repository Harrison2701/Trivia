$(document).ready(function(){
    $("#button").hide()
    $('#buttonGo').on('click',function(){
        var category = $('#selectCategory').val();
        var number = $('#numberQuestions').val();
        var difficulty = $('#difficulty').val();
        var design = $('#design').val();
        $("#button").show();
        $.ajax({
            url: "https://opentdb.com/api.php?amount=" + number + "&category=" + category + "&difficulty=" + difficulty + "&type=multiple",
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function(result) {
                console.log(result);
                process(result,number,design);
            },
            error: function() { alert('Failed!'); }
        });
    });

});

function process(result,number,d){
    $("#TABLE").empty();
    $("#message").empty();
    globalResult = result;
    globalNumber = number;
        for(var i = 0; i < number; i++) {
            var que = result.results[i];
            $("#TABLE").append("<tr><td><div id='question" + i + "'></div></td></tr>")
            //$("#TABEL").append("<tr><td><div id='trackName" + i + "'></div></td><td><img id='picture" + i + "' src=''" + "'</img></td><td><audio controls='true' + id='audio"+ i + "' type='audio/m4a'"+"'</audio></td></tr>")
            for (var j = 0; j < result.results[i].question.length; j++) {
                var question = result.results[i].question;
                var replacement = question.replace("&quot;", '"');
                result.results[i].question = replacement;
                var replacement2 = result.results[i].question.replace("&#039;", "'")
                result.results[i].question = replacement2;
            }

            var array = buildArray(result.results[i].correct_answer,result.results[i].incorrect_answers);
            if(d=="verticle"){
                $("TABLE").append("<tr><td><input type='radio' name='question" + i + "' id='option1' value='" + array[0] + "'>" + array[0] + "</td></tr><tr><td><input type='radio' name='question" + i +"'id='option2' value='" + array[1] + "'>"+array[1]+"</td></tr><tr><td><input type='radio' name='question"+i+"' id='option3' value='" + array[2] + "'>"+array[2]+"<td></tr><tr><td><input type='radio' name='question" + i + "' id='option4' value='" + array[3] + "'>"+array[3]+"</tr><td></tr>")
            }else{
                $("TABLE").append("<tr><td><input type='radio' name='question" + i + "' id='option1' value='" + array[0] + "'>" + array[0] + "</td><td><input type='radio' name='question" + i +"'id='option2' value='" + array[1] + "'>"+array[1]+"</td><td><input type='radio' name='question"+i+"' id='option3' value='" + array[2] + "'>"+array[2]+"<td><td><input type='radio' name='question" + i + "' id='option4' value='" + array[3] + "'>"+array[3]+"</td></tr>")

            }
            $("#question" + i).text(result.results[i].question)
        }

}

function check(){
    var result = globalResult;
    var number = globalNumber;
    var correct = 0;
    var arr = []

    for(var i=0;i<result.results.length;i++){
           var selected = $('input[name=question' + i + ']:checked').val();
            if(selected == result.results[i].correct_answer)    {
                correct += 1;
        }
    }
    console.log(correct);
    document.getElementById("message") .innerHTML = "<p>You got <b>" +correct + "</b> out of <b>" + number +"</b> correct</p> "

}



function buildArray(x,y){
    y.push(x);
    shuffle(y);
    return y
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}