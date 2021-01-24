$(function(){
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $('.carousel').carousel({
      interval:2000
    });
    $('#Modal').on('show.bs.modal',function(e){
      console.log('el modal se esta mostrando');
      $('#modalbtn').removeClass('btn-info');
      $('#modalbtn').addClass('btn-success');
      $('#modalbtn').prop('disabled',true);
    });
    $('#Modal').on('shown.bs.modal',function(e){
      console.log('el modal se esta mostro');
    });
    $('#Modal').on('hide.bs.modal',function(e){
      console.log('el modal se esta ocultando');
    });
    $('#Modal').on('hidden.bs.modal',function(e){
      console.log('el modal se oculto');
      $('#modalbtn').prop('disabled',false);
      $('#modalbtn').removeClass('btn-success');
      $('#modalbtn').addClass('btn-info');
    });
  })