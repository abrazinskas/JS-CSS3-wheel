//constructor function
function Wheel(arg) {

    this.initialized = false;
    this.initialize = function () {

        if (this.initialized) return;
        this.initialized = true;

        this.build();
        this.events();

    };


    //start vars
    var slice_deg,
        slices,  //passed from arg object
        total_slices,
        wheel, //passed from arg object
        circle_radius, //passed from arg object
        viewport_deg, //passed from arg object
    //presentational_slices_index=2,
        trigger; //passed from arg object


    // applying values to variables from received object
    if (typeof arg != "undefined") {
        if (typeof arg.slices != "undefined") slices = arg.slices;
        if (typeof arg.wheel != 'undefined') wheel = arg.wheel;
        if (typeof arg.circle_radius != 'undefined') circle_radius = parseInt(arg.circle_radius);
        if (typeof arg.viewport_deg != 'undefined') viewport_deg = parseInt(arg.viewport_deg);
        if (typeof arg.trigger != 'undefined') trigger = arg.trigger;
    }
    total_slices = $(slices).size();
    slice_deg = 360 / total_slices;


    //wheel assembler function
    this.build = function () {

        $(slices).each(function (i) {
            $(this).attr('data-index', i);
            if ($(this).hasClass('viewport')) {
                presentational_slices_index = i;
            }
            positionSlice($(this));
            rotateSlice($(this));
        });


        //prevent default behaviour of links if it's not a viewport
        /*$(document).on("click", ".slice:not('.viewport') a", function (event) {

            event.preventDefault();
        });*/


        //prevent default behaviour of links if it's not a viewport
        $('a.content-link').click(function (e) {

            var triggered_slice=$(this).closest(slices);

            console.log(triggered_slice.hasClass('viewport'));
            if (!triggered_slice.hasClass('viewport')) {
                e.preventDefault();
            }

            //removing classes from all slices with .viewport slices and adding only to the triggered one
            $('.viewport').removeClass('viewport');
            $(triggered_slice).addClass('viewport');
        });
    };

    //wheel events - for example spin the wheel on trigger click
    this.events = function () {



        $(trigger).bind('click', function (event) {

            var triggered_slice = $(this).closest(slices);
            var index = $(triggered_slice).attr('data-index');
            var rotate_deg = getRotateDegree(index);
            spinWheel(rotate_deg);
        });

        //hover header - container get's hover class
        $("header", slices).hover(function () {
            $(this).closest(".container").addClass("hover");
        }, function () {
            $(this).closest(".container").removeClass("hover");
        })

    };


    //support functions

    function positionSlice(slice) {

        var index = slice.attr('data-index');


        var radians = 2 * Math.PI * (index / total_slices);
        var x = -(Math.sin(radians) * circle_radius);
        var y = -(Math.cos(radians) * circle_radius);
        $(slice).animate({
            top: x + 'px',
            left: y + 'px'
        }, 200);
    };

    function rotateSlice(slice) {
        var index = slice.attr('data-index');
        var cur_slice_deg = slice_deg * index;
        slice.css({
            "transform": "rotate(" + cur_slice_deg + "deg)",
            "-moz-transform": "rotate(" + cur_slice_deg + "deg)",
            "-webkit-transform": "rotate(" + cur_slice_deg + "deg)",
            "-ms-transform": "rotate(" + cur_slice_deg + "deg)",
            "-o-transform": "rotate(" + cur_slice_deg + "deg)"});
    }

    //event support functions

    function getRotateDegree(clicked_index) {
        var moves = total_slices - clicked_index + presentational_slices_index;
        return moves * slice_deg + viewport_deg;
    }

    function spinWheel(deg) {
        wheel.css({
            "transform": "rotate(" + deg + "deg)",
            "-moz-transform": "rotate(" + deg + "deg)",
            "-webkit-transform": "rotate(" + deg + "deg)",
            "-ms-transform": "rotate(" + deg + "deg)",
            "-o-transform": "rotate(" + deg + "deg)"});
    }
}