$( document ).ready( function () {
    var post = Data.getCurrentPost();
    var relatedPosts = Data.getRelatedPosts();
    var comments = Data.getPostComments();

    var relatedPostsTemplate = Handlebars.compile( $( '#posts-container__related-post-template' ).html() );
    var postTemplate = Handlebars.compile( $( '#posts-container__post-template' ).html() );
    var commentTemplate = Handlebars.compile( $( '#posts-container__comment-template' ).html() );

    Handlebars.registerPartial( 'related-post', $( '#related-post-template' ).html() );
    Handlebars.registerPartial( 'comment-list', $( '#comment-list-template' ).html() );

    /*Handlebars.registerHelper( "nav", function( count, selected, options ) {
        var numbers = '';
        Array.apply( null, Array( count ) )
            .forEach(
                     function( v, i ) {
                         numbers += options.fn( { number: i + 1, selected: selectedPage == i } );
                     }
            );
        return numbers;
    } );*/

    render();

    function render() {
        renderPost();
        renderComment();
        renderRelatedPosts();
    }    

    function renderRelatedPosts() {
        $( '.posts-container__related-post' ).html( relatedPostsTemplate( {
            relatedPosts: relatedPosts
        }));
    }

    function renderPost() {
        $( '.posts-container__post' ).html( postTemplate(post) );
    }

    function renderComment() {
        $( '.posts-container__comment' ).html( commentTemplate({
            comment: comments
        }) );
    }

    /*function subscribeHandlers() {
        $( '.posts-container__list' ).click( function ( event ) {
            var id = $( event.target ).closest( '.post-preview' ).data( 'id' );
            if ( id === undefined ) {
                return;
            }
            console.log( 'click: post id - ' + id );
        } );

        $( '.posts-container__navigation' ).click( function( event ) {
            var selected = $( event.target ).data( 'id' ) - 1;
            if ( selected === selectedPage ) {
                return;
            }

            selectedPage = selected;

            renderPosts();
            renderNavigation();

            $( 'html, body' ).animate( { scrollTop : 0 }, 0 );
        });
    }*/
});

