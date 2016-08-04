var DynamicSearchView = function(){}

DynamicSearchView.prototype = {
  showDynamicSearch: function(){
    var toggledDynamicSearchContent = document.getElementById('toggledDynamicSearchContent');
    var dynamicSearchClick = document.getElementById('dynamicSearchClick');
    dynamicSearchClick.id = 'dynamicSearchClickInit'
    dynamicSearchClick.addEventListener('click',function(){
      toggledDynamicSearchContent.style.height == '0px' || toggledDynamicSearchContent.style.height == ''
      ? toggledDynamicSearchContent.style.height = '50px' 
      : toggledDynamicSearchContent.style.height = '0px';
    }, false );
  }
}

module.exports = DynamicSearchView;