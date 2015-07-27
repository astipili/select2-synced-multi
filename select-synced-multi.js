//this function will be responsible for syncing input and output selected values,
//so if some value was selected as an input, then it should be disabled for output selection
function syncInputOutput(data, mode) {
    var newData = data;
    //contains all selected key items
    var selected_in_this = $(this).select2("data");

    //updateing api model with selected items 
    self.apiModel.set(mode + ".list", _.pluck(selected_in_this, "text"));

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

//cleaning select2 dropdown for new data
$('.columns').select2('data', null);

if (this.value() !== self.comboLabel && this.value() !== '') {
    self.apiModel.tableName = this.value();
    $.get(self.url.hive + '/' + this.value() + '/columns', function (columns) {
        var keys = columns.map(function (value, index) {
            return {
                id: index,
                text: value
            };
        });
        //cloning an object
        newKeys = JSON.parse(JSON.stringify(keys));

        var values = columns.map(function (value, index) {
            return {
                id: index,
                text: value
            };
        });
        //cloning an object
        newValues = JSON.parse(JSON.stringify(values));

        //putting column input values in select2 dropdown   
        $('#keysGrid').prop("disabled", false).select2({
            data: function () {
                return {
                    results: newKeys
                };
            },
            multiple: true,
            placeholder: "-- Select Keys --",
            processResults: function (data) {
                return data.text;
            }
        }).on('change', function (e) {
            newValues = syncInputOutput.call(this, JSON.parse(JSON.stringify(values)), "keys");
        });

        //this event would be triggered when selected input value gets unselected
        $('#keysGrid .select2-search-choice-close').click(function () {
            newValues = syncInputOutput.call(document.getElementById("#keysGrid"), JSON.parse(JSON.stringify(values)), "keys");
        });

        //putting column output values in select2 dropdown
        $('#valuesGrid').prop("disabled", false).select2({
            data: function () {
                return {
                    results: newValues
                };
            },
            multiple: true,
            placeholder: "-- Select Values --",
            processResults: function (data) {
                return data.text;
            }
        }).on('change', function (e) {
            newKeys = syncInputOutput.call(this, JSON.parse(JSON.stringify(keys)), "values");
        });

        //this event would be triggered when selected output value gets unselected
        $('#valuesGrid .select2-search-choice-close').click(function () {
            newValues = syncInputOutput.call(document.getElementById("#valuesGrid"), JSON.parse(JSON.stringify(keys)), "values");
        });
    });