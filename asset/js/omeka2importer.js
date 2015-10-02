(function ($) {
    var activeElement = null;
    
    $(document).ready(function() {
        $('#mapping-data').on('click', 'tr.mappable', function(e) {
            if (activeElement !== null) {
                activeElement.removeClass('active');
            }
            activeElement = $(e.target).closest('tr.mappable');
            activeElement.addClass('active');
            if (activeElement.hasClass('element')) {
                $('#resource-class-selector').removeClass('active');
                $('#property-selector').addClass('active');
            }
            
            if (activeElement.hasClass('item-type')) {
                $('#resource-class-selector').addClass('active');
                $('#property-selector').removeClass('active');
            }
        });
        
        $('li.selector-child').on('click', function(e){
            e.stopPropagation();
            //looks like a stopPropagation on the selector-parent forces
            //me to bind the event lower down the DOM, then work back
            //up to the li
            var targetLi = $(e.target).closest('li.selector-child');
            if (activeElement == null) {
                alert("Select an element at the left before choosing a property.");
            } else {
                //first, check if the property is already added
                var hasMapping = activeElement.find('ul.mappings li[data-property-id="' + targetLi.data('property-id') + '"]');
                if (hasMapping.length === 0) {
                    var elementId = activeElement.data('element-id');
                    var newInput = $('<input type="hidden" name="element-property[' + elementId + '][]" ></input>');
                    newInput.val(targetLi.data('property-id'));
                    activeElement.find('td.mapping').append(newInput);
                    activeElement.find('ul.mappings').append('<li data-property-id="' + targetLi.data('property-id') + '">' + targetLi.data('child-search') + '</li>');
                } else {
                    alert('Element is already mapped');
                }
            }
        });
        
        $('.omeka2-import-fieldset-label').on('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var fieldsetId = $(e.target).attr('id') + '-fieldset';
            $('#' + fieldsetId).toggle();
        });
        
        $('#omeka2-import-fetch-mapping-data').click(function() {
            $.ajax('omeka2importer/mapping')
                .done(function(data) {
                    $('#mapping-data').append(data);
                });
        });
    });
})(jQuery);