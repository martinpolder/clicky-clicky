import React, { Component } from "react";
import FriendCard from "./components/friendcard";
import Wrapper from "./components/wrapper";
import Title from "./components/title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0,
    topScore: 0,
    message: ""
  };

  theScore = this.state.score;

//When loaded display friends in a shuffled state
  componentDidMount() {
    this.setState({
      friends: this.shuffle(this.state.friends)
    });
  }

  shuffle = friends => {
    let newFriends = friends.sort(function (a, b) { return 0.5 - Math.random() });
    return newFriends;
  };

  reset = friends => {
    const resetFriends = friends.map(friend => ({ ...friend, clicked: false }));
    return this.shuffle(resetFriends);
  }

//When correct guess update score and topscore where viable the shuffle friends.
  correctGuess = newFriend => {
    let newScore = this.state.score;
    newScore++;
    let newTopScore = Math.max(newScore, this.state.topScore)

    this.setState({
      friends: this.shuffle(newFriend),
      score: newScore,
      topScore: newTopScore,
      message: "correct!"
    })
    console.log(this.state.score);


if (this.state.score === 11) {

  alert("you win")


    this.setState({
      friends: this.reset(newFriend),
      score: 0,
         message: ""


    
    })

  
  
}


  }

//when incorrect guess reset friends and score 
  wrongGuess = newFriend => {
    this.setState({
      friends: this.reset(newFriend),
      score: 0,
      message: "incorrect! start over!"

    
    })
    console.log(this.state.score);
  }

//when a friend is clicked check if its been clicked if not update score +1 and shuffle friends.
//if this friend has been clicked before end game shuffle cards and reset score to 0
  handleClick = id => {
    let guessedCorrectly = false;

    const newFriend = this.state.friends.map(friend => {
      if (friend.id === id) {
        if (!friend.clicked) {
          friend.clicked = true;
          guessedCorrectly = true;
        }
      }
      return friend;
    });

    guessedCorrectly ? this.correctGuess(newFriend) : this.wrongGuess(newFriend);

  };



  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Clicky Clicky! make sure you only click each renaissance artist(?) once!<div>score: {this.state.score}</div>  </Title>
        <Title><div>{this.state.message}</div>  </Title>
        {this.state.friends.map(friend => (
          <FriendCard
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            clicked={friend.clicked}
              handleClick={this.handleClick}
        
          />
        ))}
      </Wrapper>
    );
  }
}
export default App;