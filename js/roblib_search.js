/**
 * Created by ppound on 2014-06-19.
 */

function qtipify(divs, content, title){
    for (index = 0; index < divs.length; index++) {
        jQuery('#' + divs[index]).qtip({
            content: {
                text: content[index],
                title: title,
            },
            style: "qtip-light",
            position: {
                viewport: jQuery(window),
                adjust: {
                    method: 'flip',
                },
                my: 'left center',
                at: 'right center',
            },
        });
    }
}