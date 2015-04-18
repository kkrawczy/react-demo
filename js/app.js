/** @jsx React.DOM */
(function(){
	'use strict';

	var Book = React.createClass({
		propTypes: {
			title: React.PropTypes.string.isRequired
		},
		render: function(){
			return <div className="row">{this.props.title}</div> 
		}
	});

	var Quiz = React.createClass({
		propTypes: {
			books: React.PropTypes.array.isRequired
		},
		render: function(){
			return <div className="row">
				<div className="col-sm-4">
					<img src="images/twain.jpg"/>
				</div>
				<div className="col-sm-7">
					Book Title
				</div>
				<div className="col-sm-1">
					
				</div>
	</div>;
		}
	});

	var Counter = React.createClass({
		getInitialState: function(){
			var state = {timeout:10};
			setInterval(function() {
				this.setState({timeout : this.state.timeout+1});
			}.bind(this), 1000)
			return state
		},
		render: function(){
			return 	<div>
			<h1>Counter</h1>
			<p>{this.state.timeout}</p>
			</div>;


		}
	})

	var data=[
	    {
	    	name: 'Fyodor Dostoyevsky',
	    	imageUrl: 'images/dostoyevsky.jpg',
	    	books: ['Crime and Punishment', 'The Idiot', 'Demons']
	    },
	    {
	    	name: 'George Orwell',
	    	imageUrl: 'images/orwell.jpg',
	    	books: ['1984', 'Aniamal Farm']
	    },
	    {
	    	name: 'William Shakespeare',
	    	imageUrl: 'images/shakespeare.jpg',
	    	books: ['Mackbeth', 'Hamlet']
	    },
	    {
	    	name: 'J. R. R. Tolkien',
	    	imageUrl: 'images/tolkien.jpg',
	    	books: ['Hobbit', 'The Lord of the Rings']
	    },
	    {
	    	name: 'Mark Twain',
	    	imageUrl: 'images/twain.jpg',
	    	books: ['The Adventures of Tom Sawyer', 'Adventures of Huckleberry Finn']
	    }
	]

	React.render(<Quiz books = {["Hamlet","Makbet"]}/>, document.getElementById("app"));
	//React.render(<Counter />, document.getElementById("test"));
	

})();