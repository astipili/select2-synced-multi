# select2-synced-multi
This is a plugin that works with well known select2 jquery replacement for select boxes and provides ability to sync 2 or more select box's contents.

Here is the <a href="http://140coffee.com/demos/select2-sync-multi/">Demo</a>

Here is how it works. When you select item from one dropdown it disables that selection for other dropdowns and vice versa. 
Also when you unselect item by pressing to x button next to selection it would restore it's availability for other dropdowns.

# How to use it
if you have 2 dropdowns with ids #first and #second, then to sync them simply write 
```
$('#first').sync_select2_multi({
	    data: myData,
	    placeholder: "-- Select Keys --",
	    sync:['#second']
	})
```
where myData is an array of data <br/>
placeholder is what will appear in select box as a placeholder. By default it is --Select Item--<br>
and sync is the array of other select box id's which needs to be synced with this one.

