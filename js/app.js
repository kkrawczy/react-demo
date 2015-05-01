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
		handleAddGame: function() {
			routie("add");
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
				<div className="row">
					<div className="col-sm-6">
						<input onClick={this.handleAddGame} className="btn btn-default" type="button" value="Add game"/>
					</div>						
					{this.state.showContinue ?
					<div className="col-sm-6 text-right">
						<input onClick={this.handleContinue} className="btn btn-default" type="button" value="Continue"/>
					</div>
					:<span/>}
					</div></div>
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

	
	var AddGameForm = React.createClass({
		propType: {
			onGameFormSubmitted: React.PropTypes.func.isRequired
		},
		handleSubmit: function() {
			var data = getAuthorDataFromForm(this);
			this.props.onGameFormSubmitted(data);
			routie("");
		},
		render: function() {
			return <div>
			<h3>New Author</h3>
			<form role="form" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input ref="authorsName" type="text" className="form-control" placeholder="Author Name"/>
				</div>
				<div className="form-group">
					<input ref="imageUrl" type="text" className="form-control" placeholder="Image Url"/>
				</div>
				<div className="form-group">
					<input ref="book1" type="text" className="form-control" placeholder="Book 1"/>
				</div>
				<div className="form-group">
					<input ref="book2" type="text" className="form-control" placeholder="Book 2"/>
				</div>
				<div className="form-group">
					<input ref="book3" type="text" className="form-control" placeholder="Book 3"/>
				</div>
				<div className="form-group">
					<input ref="book4" type="text" className="form-control" placeholder="Book 4"/>
				</div>
				<button type="submit" className="btn btn-default">Submit</button>
			
			</form>
		</div>
		}
	});
	
	function getAuthorDataFromForm(component){
		var result = {};
		result["imageUrl"] = component.refs["imageUrl"].getDOMNode().value;
		result["name"] = component.refs["authorsName"].getDOMNode().value;
		result["books"] = [];
		Object.keys(component.refs).forEach(function(refName) {
			if(refName.indexOf("book") >-1){
				var bookName = component.refs[refName].getDOMNode().value;
				if(bookName){
					result["books"].push(bookName);
				}
			}
		})
		return result;
	}
	
	var Counter = React.createClass({
		getInitialState: function(){
			var state = {timeout:10};
			setInterval(function() {
				this.setState({timeout : this.state.timeout-1});
			}.bind(this), 1000)
			return state;
		},
		render: function(){
			return 	<div>
			<h1>Counter</h1>
			<p>{this.state.timeout}</p>
			</div>;
		}
	})
	
	routie({
		'': function(){
			React.render(<Quiz data = {data}/>, document.getElementById("app"));
		},
		'add': function() {
			React.render(<AddGameForm onGameFormSubmitted={onGameFormSubmitted}/>, document.getElementById("app"));
		}
	});
			
	function onGameFormSubmitted (authorData) {
		data.push(authorData);
		console.dir(data);
	}
})();