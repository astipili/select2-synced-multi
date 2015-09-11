( function($) {

    $.fn.sync_select2_multi = function(options) {

        opt = {
            data: options.data ,
            placeholder: (typeof options.placeholder != 'undefined')? options.placeholder : '-- Select Item --',
            sync: (typeof options.sync != 'undefined')? options.sync: [],
        }

        var id = $(this).id;

        //this function will be responsible for syncing input and output selected values,
        //so if some value was selected as an input, then it should be disabled for output selection
        function syncInputOutput(data) {
            var newData = data;
            //contains all selected key items
            var selected_in_this = $(this).select2("data");

            //contains the OTHER select2
            var other = $('input.columns').not('#' + $(this).attr('id'));
            var selected_in_other = other.select2("data");

            //removing already selected output items by filtering two arrays
            //works as a _.differenece for simple arrays
            newData = _.filter(newData, function (obj) {
                return !_.findWhere(selected_in_other, obj);
            });

            //disableing items selected as input(key)
            for (var i = 0; i < selected_in_this.length; i++) {
                for (var j = 0; j < newData.length; j++) {
                    if (newData[j].id === selected_in_this[i].id) {
                        newData[j].disabled = true;
                    }
                }
            }
            return newData;
        }

        //parsing data to make it select2 readable
        var o_data = opt.data.map(function (value, index) {
            return {
                id: index,
                text: value
            };
        });

        //cloning an object
        var first = JSON.parse(JSON.stringify(o_data));
        var second = JSON.parse(JSON.stringify(o_data));

        //initiating select2  
        $(this).select2({
            data: function () {
                return {
                    results: first
                };
            },
            multiple: true,
            placeholder: "-- Select Keys --",
            processResults: function (data) {
                return data.text;
            }
        }).on('change', function (e) {
            second = syncInputOutput.call(this, JSON.parse(JSON.stringify(o_data)));
        });

       //this event would be triggered when selected input value gets unselected
        $(id + '.select2-search-choice-close').click(function () {
            first = syncInputOutput.call(document.getElementById(id), JSON.parse(JSON.stringify(o_data)));
        });

        //putting column output values in select2 dropdown
        $(opt.sync[0]).select2({
            data: function () {
                return {
                    results: second
                };
            },
            multiple: true,
            placeholder: "-- Select Values --",
            processResults: function (data) {
                return data.text;
            }
        }).on('change', function (e) {
            first = syncInputOutput.call(this, JSON.parse(JSON.stringify(o_data)));
        });

       //this event would be triggered when selected output value gets unselected
        $(opt.sync[0] + '.select2-search-choice-close').click(function () {
            second = syncInputOutput.call(document.getElementById(id), JSON.parse(JSON.stringify(o_data)));
        });
    }
}(jQuery));