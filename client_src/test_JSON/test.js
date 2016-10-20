$( document ).ready( function () {
    var postsJSON = Handlebars.compile( $( '#posts-json-template' ).html() );
    var postsTable = Handlebars.compile( $( '#posts-table-template' ).html() );

    Handlebars.registerHelper( 'json', function( posts ) {
        var out = JSON.stringify(posts, null, '\t');

        return out;
    });

    Handlebars.registerHelper( "table", function( posts, options ) {
        var out = '<table>';
        var counter = 0;

        for(var i = 0; i < posts.length; i++) {
            if(posts[i].description) {
                if(counter%2 === 0) {
                    out += '<tr><td style="background: grey">' + 
                            options.fn( { description: posts[i].description } ) + '</td></tr>';
                    counter++;
                } else {
                    out += '<tr><td>' + options.fn( { description: posts[i].description } ) + '</td></tr>';
                    counter++;
                }
            }
        }

        out += '</table>';
        
        return out;
    } );


    render();

    function render() {
        renderJSONPosts();
        renderTable();
    }

    function renderJSONPosts() {
        $( '.posts-json' ).html( postsJSON( {
            posts: Data.getPosts()
        } ) );
    }

    function renderTable() {
        $( '.posts-table' ).html( postsTable( {
            posts: Data.getPosts()
        } ) );
    }
});