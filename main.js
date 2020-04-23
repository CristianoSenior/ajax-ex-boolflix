$(document).ready(function(){
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);
$(".cerca").click(
  function(){


    var cercaFilm = $("input").val();

    // reset di pagina
    $(".secondoContainer").empty();
    //-------------------Prima chiamata ajax per Film------------------------------
    $.ajax({
      url : "https://api.themoviedb.org/3/search/movie",
      method : "GET",
      data: {
        api_key:"a227080b6106916c6a0a4dd714757b37",
        language:"it-IT",
        query: cercaFilm
      },
      success: function (data,stato){
        var filmUnico = data.results;
        aggiungiPellicola(filmUnico,0)
      },

          error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }
    });

    //-------------------Seconda chiamata ajax per Serie TV------------------------------
    $.ajax({
          url : "https://api.themoviedb.org/3/search/tv",
          method : "GET",
          data: {
            api_key:"a227080b6106916c6a0a4dd714757b37",
            language:"it-IT",
            query: cercaFilm
          },
          success: function (data,stato){
            var filmUnico = data.results;
            aggiungiPellicola(filmUnico,1)


          },

          error: function(richiesta,stato,errore){
        alert("Chiamata fallita!!!");
      }

    });

  });
  // -------------------Funzione genera Film(movie) e SerieTv--------------
   function aggiungiPellicola(filmUnico,numeroElemento){
     for(var i=0; i<filmUnico.length; i++){
       var filmTrovato = filmUnico[i]
       // console.log(filmUnico[i]);

       var titolo="";
       var titoloOriginale="";
       var tipologiaPellicola="";

       if( numeroElemento === 0){
         titolo = filmTrovato.title;
         titoloOriginale = filmTrovato.original_title;
         tipologiaPellicola = "Movie";

       } else{
         titolo = filmTrovato.name;
         titoloOriginale = filmTrovato.original_name;
         tipologiaPellicola = "SerieTv";
       }

       var lingua = filmTrovato.original_language;

       var context={
         title: titolo,
         originalTitle: titoloOriginale,
         vote: generaStelle(filmTrovato.vote_average),
         language: filmTrovato.original_language
       };
       
       var html = template(context);
       $(".secondoContainer").append(html);
     }

   }

   function generaStelle(voto){
     var stelle = "";
     var votoIntero = Math.ceil( voto/2 );
     for( var i=0 ; i < votoIntero ; i++ ){
        stelle += '<i class="fas fa-star"></i>';
     }

     for( var i=0 ; i < 5 - votoIntero ; i++){
     stelle += '<i class="far fa-star"></i>'

   }
   return stelle;
  }

});
