var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var NUM_1 = 49;
var NUM_0 = 57;

function hideDetails()
{
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails()
{
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function(){
        frame.classList.remove(TINY_EFFECT_CLASS);
    },50);
}

function addKeyPressListener()
{
    document.body.addEventListener('keyup', function(event)
    {
        event.preventDefault();
        if(event.keyCode === ESC_KEY)
        {
            hideDetails();
        }
    });
}

function setDetails(imageURL, titleText)
{
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail)
{
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail)
{
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail)
{
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickListener(thumb)
{
    'use strict';
    thumb.addEventListener('click', function(event){
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}


function addThumbButtonListener(nails)
{
    'use strict';
    document.body.addEventListener('keydown', function(event) {
        event.preventDefault();
        if(event.keyCode >= NUM_1 && event.keyCode <= NUM_0)
        {
            if(nails[event.keyCode-49] != undefined){
                setDetailsFromThumb(nails[event.keyCode - 49]);
                showDetails();
            }
        }
    });
}


function getThumbnailsArray(){
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function initializeEvenets()
{
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickListener);
    addThumbButtonListener(thumbnails);
    addKeyPressListener();
}

initializeEvenets();
