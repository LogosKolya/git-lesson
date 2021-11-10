$(document).ready(function(){

    const getS = selector => document.querySelector(selector);
    let mintervalID;
    let starting = true;
    let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    let check = true;

    function modalWindow () {
        $('#check').css('display', 'none');
        $('#preCheck').attr('disabled', true);
        $('.modalAnswer').css('display', 'none');
    }

    function checking (){
        for(let i=0; i<$('.number').length; i++){
            if($('.end').eq(i).children().text() != numbers[i]){
                check = false;
                break;
            }
        }
        if(check){
            $('.modalText').text('Woohoo, well done, you did it!');
            modalWindow();
            clearInterval(mintervalID);
        }
        else{
            $('.modalText').text('It\'s a pity, but you lost');
            modalWindow();
            clearInterval(mintervalID);
        }
        check = true;
    };

    function random() {
        $(function(){
            let $divs = $('.containStart .start');
            let arr = [];
            $divs.each(function(){
                arr.push($(this).detach());
            });
            arr.sort(function(a, b){
                return Math.random() - 0.5;
            });
            for (let index in arr) {
                $('.containStart').append(arr[index]);
            }
        })
    };

    function startum () {
        $('#preCheck').attr('disabled', false);
            let setD = new Date;
            let minute = 60000;
            function createStopwatch () {
                let currentD = new Date();
                let rizn = (setD.getTime()+minute) - currentD.getTime();
                let minutes = Math.floor((rizn % (1000 * 60 * 60 ))/(1000 * 60));
                let seconds = Math.floor((rizn % (1000 * 60))/1000);
                if (seconds >= 0) {
                    if (minutes < 10) minutes = '0' + minutes;
                    if (seconds < 10) seconds = '0' + seconds;
                    getS('.answer').innerHTML = `${minutes} : ${seconds}`;
                    getS('.modalAnswer').innerHTML = `${minutes} : ${seconds}`;
                }
                if (seconds == 0) {
                    $('#check').attr('disabled', true);
                    $('#preCheck').attr('disabled', true);
                    $('#check').css('display', `none`);
                    $('.modal').css('display', 'block');
                    checking();
                }
                else if (seconds <= 0) {
                    $('#preCheck').attr('disabled', true);
                    $('#check').css('display', `none`);
                }
                else {
                    $('.end').droppable({
                        drop: function () {
                            return 0
                        },
                    })
                    $('#preCheck').attr('disabled', false);
                }
            }
            mintervalID = setInterval(createStopwatch);
            $('.mstopwatch-start').attr('disabled', true);
            starting = false;
    }

    $('.mstopwatch-start').click (startum);
    $('.end').droppable({
        drop: function () {
            if(starting == true) {
                startum();
            }
        }
    });

    $('#preCheck').click(function () {
            $('.modal').css('display', 'block');
            $('#check').css('display', 'block');
            $('.modalText').text(`You still have time, you sure?`);
    })

    $('.close').click(function () {
            $('.modal').css('display', 'none');
    })

    $('#new').click(function () {
        location.reload();
    })

    $('.number-box').sortable({
        connectWith: '.start, .end',
    })

    $('#check').on('click', checking)
random();

})