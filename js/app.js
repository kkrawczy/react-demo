/** @jsx React.DOM */
(function(){
	'use strict';

	var Book = React.createClass({
		
		propTypes: {
			title: React.PropTypes.string.isRequired
		},
		render: function(){
			return <div className="answer bg-info active" onClick={this.handleClick}><h4>{this.props.title}</h4></div>
		},
		handleClick: function() {
			this.props.onBookSelected(this.props.title);
		}
	});

	var Quiz = React.createClass({
		propTypes: {
			books: React.PropTypes.array.isRequired
		},
		getInitialState: function(){
			return _.extend({
				bgClass: 'neutral',
				showContinue: false
			}, this.props.data.selectGame());
		},
		handleBookSelected: function(title) {
			var isCorrect = this.state.checkAnswer(title);
			this.setState({
				bgClass: isCorrect ? 'pass' : 'fail',
				showContinue: isCorrect
			})
		},
		handleContinue: function() {
			this.setState(this.getInitialState());
		},
		render: function(){
			return <div className="row">
				<div className="col-sm-4">
					<img src={this.state.imageUrl}/>
				</div>
				<div className="col-sm-7">
					{this.state.books.map(function(b) {
						return <Book onBookSelected={this.handleBookSelected} title={b}/>;
					}, this)}
				</div>
				<div className={"col-sm-1 " + this.state.bgClass}>
				</div>
				{this.state.showContinue ?
						<div className="row">
							<div className="col-sm-12">
								<input onClick={this.handleContinue} className="btn btn-default" type="button" value="Continue"/>
							</div>
						</div>
						:<span/>}
			</div>;
		}
	});

	

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
	];
	
	data.selectGame = function() {
		var authorData = data[_.random(data.length-1)];
		var authorsBook = authorData.books[_.random(authorData.books.length-1)];
		
		var allBooks = [];
		
		for(var i=0; i<data.length; i++){
			allBooks = allBooks.concat(data[i].books);
		}
		
		var index = allBooks.indexOf(authorsBook);
		allBooks.splice(index,1);
		
		var books = _.shuffle(allBooks).slice(0,3);
		books.push(authorsBook);
		_.shuffle(books);
		
		var selectedAuthor= {name: authorData.name, imageUrl: authorData.imageUrl, books: books};
		console.log(selectedAuthor);
		return {
			name: authorData.name, 
			imageUrl: authorData.imageUrl, 
			books: books,
			checkAnswer: function(title) {
				return authorData.books.some(function(t){
					return t === title;
				})
			}
			};
	};

	
	
	var Counter = React.createClass({
		getInitialState: function(){
			var state = {timeout:10};
			setInterval(function() {
				this.setState({timeout : this.state.timeout-1});
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
	

	React.render(<Quiz data = {data}/>, document.getElementById("app"));
	//React.render(<Counter />, document.getElementById("app"));
	

})();