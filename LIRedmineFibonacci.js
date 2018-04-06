// ==UserScript==
// @namespace https://suivi.libre-informatique.fr/
// @include https://suivi.libre-informatique.fr/*
// @require https://suivi.libre-informatique.fr/javascripts/jquery-1.11.1-ui-1.11.0-ujs-3.1.4.js?1508097600
// @name     Redmine
// @version  1
// @grant    none
// ==/UserScript==

jQuery(document).ready(function() {
  	let fiboFieldsSelector = '#issue_custom_field_values_11, #issue_custom_field_values_4';
    let fiboFields = $(fiboFieldsSelector);
  	var fibo = {
      	container: null,
      	currentElement: null,
      	styles: null,
      	initPopup: function() {
          	fibo.addStyles();

          	let container = $('<div/>');
          	let fiboSuite = [0,0.5,1,2,3,5,8,13,20,40,100,1000];
          	let fiboSuiteLabels = [0,0.5,1,2,3,5,8,13,20,40,100,'?'];

          	container.addClass('fibo-container');

          	for (let i=0; i< fiboSuite.length; i++ ) {

              	let value = fiboSuite[i];
              	let label = fiboSuiteLabels[i];

              	container.append(
                  	$('<div/>')
                  			.addClass('fiboValue')
                  			.html(label)
                  			.attr('data-value',value)
                );
            }

          	fibo.container = container;
          	$('body').append(container);
          	fibo.container.hide();
        },
      	movePopupToElement: function(element) {
          	fibo.currentElement = element;
        		let elementPos = fibo.currentElement.offset();

          	fibo.container.css({
              	'left': elementPos.left+'px',
                'top': (elementPos.top + fibo.currentElement.outerHeight(true))+'px'
            });
          	fibo.container.find('.fiboValue').removeClass('current');
          	fibo.container.find('.fiboValue[data-value="'+fibo.currentElement.val()+'"]').addClass('current');
      	},
      	hide: function() {
          	fibo.container.hide();
          	fibo.currentElement = null;
        },
      	show: function() {
          	fibo.container.show();
        },
      	addStyles: function() {
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);

            fibo.styles = style.sheet;

          	fibo.styles.insertRule(
                ".fibo-container {" +
                "    display: flex;" +
                "    justify-content: center;" +
                "    flex-flow: column wrap;" +
                "    position: absolute;" +
                "    background: #FFF;" +
                "    max-width: 100px;" +
                "    width: 100px;" +
                "    max-height: 200px;" +
                "    box-shadow: 0 2px 2px #333;" +
            		"}"
            );

            fibo.styles.insertRule(
                ".fibo-container > .fiboValue {" +
                "    text-align: center;" +
                "    padding:0.5em;" +
                "    border-bottom: 1px solid #999;" +
                "    border-right: 1px solid #999;" +
                "    cursor: pointer;" +
                "    width: 50px;" +
								"    box-sizing: border-box;" +
            		"}"
            );

          	fibo.styles.insertRule(
                ".fibo-container > .fiboValue:hover," +
              	".fibo-container > .fiboValue.current {" +
                "    background: #2996CC;" +
              	"    color: #FFF;" +
              	"    font-weight: bold;" +
            		"}"
            );
        }
    };

  	fibo.initPopup();

  	$(document).on('focusin', fiboFieldsSelector, function() {
      	fibo.movePopupToElement($(this));
      	if (!fibo.container.is(':visible')) {
            fibo.show();
        }
    });

  	$(document).on('focusout', '*', function() {
      	if ($('.fibo-container').is(':visible') && !$('.fibo-container').is(':hover')) {
          	fibo.hide();
      	}
    });

  	$(document).on('click', '.fibo-container > div.fiboValue', function() {
        fibo.currentElement.val($(this).attr('data-value'));
        fibo.hide();
    });
});
