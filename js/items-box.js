function Items_Box(arg) {


    var trigger,
        content,
        container_box;

    if (typeof arg != "undefined") {
        if (typeof arg.trigger != "undefined") trigger = arg.trigger;
        if (typeof arg.content != "undefined") content = arg.content;
        if (typeof arg.container_box != "undefined") container_box = arg.container_box;
    }

    this.initialized = false;
    this.initialize = function () {

        if (this.initialized) return;
        this.initialized = true;

        //start build of the box
        this.build();

        this.events();



    }


   function insert_items(trigger) {

       //triggers content
       var triggers_content=$(trigger).text().trim();

       //getting slices class
       var slice_class=$(trigger).closest('.slice').attr('class').split(' ')[1];

       var all_items = $(trigger).closest(content).clone();
       console.log(all_items);


       //adding triggers text
      // $(container_box).find('header').html(triggers_content);

       $(container_box).removeAttr('class').addClass('items-box').addClass(slice_class).find('.content').html(all_items);
    }
    this.events = function () {
        $(trigger).click(function () {
            insert_items(this);
           // console.log(all_items);
        });

    }

    this.build=function(){

        //when page loads fill the box with viewport items
        insert_items('.viewport .trigger');
    }



}