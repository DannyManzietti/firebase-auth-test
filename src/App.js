import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const config = {
  apiKey: "AIzaSyDNUFrTDLqO6b9T3VN2xRQholoM0RjVaJk",
  authDomain: "danny-test-app-4378e.firebaseapp.com"
};
firebase.initializeApp(config);

class SignInTest extends React.Component {
  state = {
    isSignedIn: false
  };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>Hello!</h1>
          <p>Please sign in:</p>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
    return (
      <div>
        <h1>Test App</h1>
        <p>
          Welcome {firebase.auth().currentUser.displayName}! You are now signed
          in!
        </p>
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      </div>
    );
  }
}

export default SignInTest;
